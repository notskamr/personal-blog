import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://blog.vsahni.me",
  prefetch: {
    prefetchAll: true
  },
  integrations: [tailwind(), sitemap(), svelte()],
  adapter: vercel(),
  build: {
    redirects: false
  },
  trailingSlash: "never",
});