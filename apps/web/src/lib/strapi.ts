import type { StylePanelData } from "@/types/style-panel";
import type { WorkData } from "@/types/work";
import type { ContactData } from "@/types/strapi-connect";
import type { SectionData } from "@/types/strapi-sections";
import type { HeroData } from "@/types/hero";

function getStrapiBaseUrl(): string {
  return (
    import.meta.env.STRAPI_URL ||
    import.meta.env.PUBLIC_STRAPI_URL ||
    "http://localhost:1337"
  );
}

function getStrapiHeaders(): Record<string, string> {
  const token =
    import.meta.env.STRAPI_API_TOKEN ||
    import.meta.env.STRAPI_TOKEN ||
    process.env.STRAPI_API_TOKEN ||
    "";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const strapiUrl = getStrapiBaseUrl();
  return `${strapiUrl}${url}`;
}

export async function getStylePanels(): Promise<StylePanelData[]> {
  const strapiUrl = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${strapiUrl}/api/style-panels?populate=*&sort=panelNumber:asc`,
      {
        headers: getStrapiHeaders(),
      },
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        console.error(
          `Strapi API Authentication Error (${res.status} ${res.statusText}): Access denied. Please ensure STRAPI_API_TOKEN is set in your .env file and has read permissions.`,
        );
      } else {
        console.error(
          `Failed to fetch style panels from Strapi: ${res.status} ${res.statusText}`,
        );
      }
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
      return (a.panelNumber || "").localeCompare(
        b.panelNumber || "",
        undefined,
        {
          numeric: true,
        },
      );
    });
  } catch (error) {
    console.error("Error fetching Strapi panels: ", error);
    return [];
  }
}

export async function getWorks(): Promise<WorkData[]> {
  const strapiUrl = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${strapiUrl}/api/works?populate=*&sort=createdAt:asc`,
      {
        headers: getStrapiHeaders(),
      },
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        console.error(
          `Strapi API Authentication Error (${res.status} ${res.statusText}): Access denied. Please ensure STRAPI_API_TOKEN is set in your .env file and has read permissions.`,
        );
      } else {
        console.error(
          `Failed to fetch works from Strapi: ${res.status} ${res.statusText}`,
        );
      }
      return [];
    }

    const json = await res.json();
    const data: WorkData[] = json.data || [];
    return data;
  } catch (error) {
    console.error("Error fetching Strapi works: ", error);
    return [];
  }
}

export async function getContacts(): Promise<ContactData[]> {
  const strapiUrl = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${strapiUrl}/api/contacts?populate=*&sort=createdAt:asc`,
      {
        headers: getStrapiHeaders(),
      },
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        console.error(
          `Strapi API Authentication Error (${res.status} ${res.statusText}): Access denied. Please ensure STRAPI_API_TOKEN is set in your .env file and has read permissions for Contacts.`,
        );
      } else {
        console.error(
          `Failed to fetch contacts from Strapi: ${res.status} ${res.statusText}`,
        );
      }
      return [];
    }

    const json = await res.json();
    const data: ContactData[] = json.data || [];
    return data;
  } catch (error) {
    console.error("Error fetching Strapi contacts: ", error);
    return [];
  }
}

export async function getSections(): Promise<SectionData[]> {
  const strapiUrl = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${strapiUrl}/api/sections?populate=*&sort=createdAt:asc`,
      {
        headers: getStrapiHeaders(),
      },
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        console.error(
          `Strapi API Authentication Error (${res.status} ${res.statusText}): Access denied. Please ensure STRAPI_API_TOKEN is set in your .env file and has read permissions for Sections.`,
        );
      } else {
        console.error(
          `Failed to fetch sections from Strapi: ${res.status} ${res.statusText}`,
        );
      }
      return [];
    }

    const json = await res.json();
    const data: SectionData[] = json.data || [];
    return data;
  } catch (error) {
    console.error("Error fetching Strapi sections: ", error);
    return [];
  }
}

export async function getHeroes(): Promise<HeroData[]> {
  const strapiUrl = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${strapiUrl}/api/heroes?populate=*&sort=createdAt:asc`,
      {
        headers: getStrapiHeaders(),
      },
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        console.error(
          `Strapi API Authentication Error (${res.status} ${res.statusText}): Access denied. Please ensure STRAPI_API_TOKEN is set in your .env file and has read permissions for Heroes.`,
        );
      } else {
        console.error(
          `Failed to fetch heroes from Strapi: ${res.status} ${res.statusText}`,
        );
      }
      return [];
    }

    const json = await res.json();
    const data: HeroData[] = json.data || [];
    return data;
  } catch (error) {
    console.error("Error fetching Strapi heroes: ", error);
    return [];
  }
}

export async function getHero(sectionId?: string): Promise<HeroData | null> {
  const heroes = await getHeroes();
  if (heroes.length === 0) return null;
  if (!sectionId) return heroes[0];

  const target = sectionId.toLowerCase().trim();
  const matched = heroes.find(
    (h) => (h.sectionId || "").toLowerCase().trim() === target
  );
  return matched || heroes[0];
}

/**
 * Checks if a section with the given sectionId (or div id / aliases) is enabled in Strapi.
 * Defaults to false if sections is empty/null/undefined or the section is not found.
 */
export function isSectionEnabled(
  sections: SectionData[] | undefined | null,
  sectionId: string,
  aliases: string[] = []
): boolean {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return false;
  }

  const targets = [sectionId, ...aliases].map((t) =>
    t.toLowerCase().replace(/^#/, "").trim()
  );

  const found = sections.find((s) => {
    const rawId = s.sectionId || (s as unknown as { idDiv?: string }).idDiv || "";
    const id = rawId.toLowerCase().replace(/^#/, "").trim();
    return targets.includes(id);
  });

  return Boolean(found?.isEnabled);
}

