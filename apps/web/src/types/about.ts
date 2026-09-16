import type { StrapiBase } from "./strapi-base";
import type { StrapiImage } from "./strapi-image";

export interface StrapiBlockChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiBlockChild[];
}

export interface StrapiBlock {
  type: string;
  children?: StrapiBlockChild[];
  [key: string]: unknown;
}

export interface ContentPanelData {
  id?: number;
  tag?: string;
  title?: string;
  content?: string | StrapiBlock[];
  image?: StrapiImage | null;
}

export interface AboutData extends StrapiBase {
  contents?: ContentPanelData[];
}
