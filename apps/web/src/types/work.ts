import type { StrapiImage } from "./strapi-image";

export interface WorkData {
  id: number;
  documentId: string;
  title?: string;
  image?: StrapiImage | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
