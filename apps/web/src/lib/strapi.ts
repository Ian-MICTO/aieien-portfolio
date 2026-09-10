interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StylePanelData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  panelNumber: string;
  mainClass: string;
  clipClass: string;
  image?: StrapiImage | null;
}

export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const strapiUrl =
    import.meta.env.STRAPI_URL ||
    import.meta.env.PUBLIC_STRAPI_URL ||
    "http://localhost:1337";
  return `${strapiUrl}${url}`;
}

export async function getStylePanels(): Promise<StylePanelData[]> {
  const strapiUrl =
    import.meta.env.STRAPI_URL ||
    import.meta.env.PUBLIC_STRAPI_URL ||
    "http://localhost:1337";

  try {
    const res = await fetch(
      `${strapiUrl}/api/style-panels?populate=*&sort=panelNumber:asc`,
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch from Strapi: ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const json = await res.json();
    const data: StylePanelData[] = json.data || [];

    // Sort numerically by panelNumber (01, 02, 03, 04) or fallback to ID
    return data.sort((a, b) => {
      const numA = parseInt(a.panelNumber, 10);
      const numB = parseInt(b.panelNumber, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return (a.panelNumber || "").localeCompare(b.panelNumber || "", undefined, {
        numeric: true,
      });
    });
  } catch (error) {
    console.error("Error fetching Strapi panels: ", error);
    return [];
  }
}
