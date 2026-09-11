import type { StrapiImage } from "./strapi-image";

export interface StylePanelData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  panelNumber: string;
  image?: StrapiImage | null;
}
