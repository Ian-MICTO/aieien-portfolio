import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutContentPanel extends Struct.ComponentSchema {
  collectionName: 'components_layout_content_panels';
  info: {
    displayName: 'Content Panel';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'layout.content-panel': LayoutContentPanel;
    }
  }
}
