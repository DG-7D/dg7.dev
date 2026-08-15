import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import satteriHastUnwrapImages from "@/utils/satteri-hast-unwrap-images";

// https://astro.build/config
export default defineConfig({
  site: "https://dg7.dev/",
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
    processor: satteri({
      hastPlugins: [
        satteriHastUnwrapImages
      ]
    }),
  },
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    incrementalBuild: true,
  },
});