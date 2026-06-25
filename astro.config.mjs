import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://dg7.dev/",
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
    processor: satteri(),
    // TODO: 移植
    // processor: unified({
    //   rehypePlugins: [
    //     [rehypeWrapAll, { selector: "table", wrap: "div" }],
    //     rehypeUnwrapImages,
    //   ],
    // }),
  },
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
  prefetch: {
    prefetchAll: true,
  },
});