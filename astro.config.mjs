// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alyss.cc",
  integrations: [icon(), sitemap()],
  markdown: {
    // Coloration syntaxique adaptative : couleurs "light" en inline (défaut),
    // bascule en "dark" via [data-theme="dark"] (voir proto.css).
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: "light",
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
