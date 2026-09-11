export interface ContactData {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export type ConnectData = ContactData;
