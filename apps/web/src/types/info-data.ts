import type { StrapiBase } from "./strapi-base";

export interface InformationContent {
  content?: string;
}

export interface ScheduleContent {
  day?: string;
  start_time?: string;
  end_time?: string;
  note?: string;
}

export type InfoType = "information" | "schedule";

export interface InfoData extends StrapiBase {
  name: string;
  type: InfoType;
  content: InformationContent | ScheduleContent | string;
}

