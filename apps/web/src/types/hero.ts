import type { StrapiBase } from "./strapi-base";
import type { StrapiImage } from "./strapi-image";

export interface HeroData extends StrapiBase {
  sectionId?: string;
  image?: StrapiImage | null;
}
