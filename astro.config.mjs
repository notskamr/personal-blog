import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";



/**
 * @type {import('astro').AstroIntegration}
 */
const startBuildIntegration = {
  name: 'start-build',
  hooks: {
    "astro:build:start": async (astro) => {
      astro.logger.info("Starting build");
      astro.logger.info(`Time: ${new Date()}`);
    }
  }
};

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://blog.vsahni.me",
  prefetch: {
    prefetchAll: true
  },
  integrations: [tailwind(), sitemap(), svelte(), startBuildIntegration],
  adapter: vercel(),
  build: {
    redirects: false,
  },
  trailingSlash: "never",
});