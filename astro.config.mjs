import { defineConfig } from 'astro/config';
import { unified } from "@astrojs/markdown-remark";
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
    processor: unified({
      rehypePlugins: [
        [rehypeWrapAll, { selector: "table", wrap: "div" }],
        rehypeUnwrapImages,
      ],
    }),
  },
  integrations: [
    // ↓こいつのせいでdeprecatedな`markdown.なんちゃら`の警告が出る
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
  experimental: {
    rustCompiler: true,
  },
});