// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      STRAPI_URL: envField.string({
        context: "server",
        access: "public",
        default: "http://localhost:1337",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
