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
      STRAPI_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
        default:
          "e9a529e01acdf94252c971ed2eace29b1bca402851e7a072f898d6214082edb9d18c5f925839f0b5815ed2dab529667ccbe04f4bac38b229c715d42d6b263cc9084431ce2a2f2a6ef75ee269131c9b4051d59091814164f242b242af1fe4545d5c5161171446b4451e5698f68629f9335c6ad58282de3b7ab103280bc5c47f98",
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
