// @ts-check
import { defineConfig, envField, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  env: {
    schema: {
      STRAPI_URL: envField.string({
        context: "server",
        access: "public",
        default: "https://aieien-backend.onrender.com",
      }),
      PUBLIC_STRAPI_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://aieien-backend.onrender.com",
        optional: true,
      }),
      STRAPI_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  },

  integrations: [react()],
});
