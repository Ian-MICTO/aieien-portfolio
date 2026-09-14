import type { StrapiBase } from "./strapi-base";

export interface SectionData extends StrapiBase {
  sectionId: string;
  isEnabled: boolean;
}
