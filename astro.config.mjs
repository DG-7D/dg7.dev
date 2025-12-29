import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";
import AutoImport from 'astro-auto-import';
import rehypeWrapAll from 'rehype-wrap-all';
import rehypeUnwrapImages from 'rehype-unwrap-images';

// https://astro.build/config
export default defineConfig({
  site: "https://dg7.dev/",
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
    rehypePlugins: [
      [rehypeWrapAll, { selector: "table", wrap: "div" }],
      rehypeUnwrapImages,
    ],
  },
  integrations: [
    AutoImport({
      imports: [
        "@/components/OGPCard.astro",
        "@/components/Tweet.astro",
      ]
    }),
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
  prefetch: {
    prefetchAll: true,
  },
});