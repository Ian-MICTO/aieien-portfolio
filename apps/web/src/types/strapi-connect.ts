import type { StrapiBase } from "./strapi-base";

export interface ContactData extends StrapiBase {
  title: string;
  description?: string;
  link?: string;
}

export type ConnectData = ContactData;
