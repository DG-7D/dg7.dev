import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { tweetScheme } from "@/components/tweet.z.ts";

// fetch-site-metadata ImageInfo
const zodImageInfo = z.object({
    src: z.string(),
    width: z.string().optional(),
    height: z.string().optional(),
    alt: z.string().optional(),
});
// fetch-site-metadata Metadata
const zodMetadata = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: zodImageInfo.optional(),
});
// OGPCache
const zodOGPCache = zodMetadata.extend({
    url: z.url(),
});

export const collections = {
    "blog": defineCollection({
        loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/blog" }),
        schema: z.object({
            publish: z.boolean(),
            publishDate: z.date(),
            title: z.string(),
            description: z.string(),
            // tags: z.array(z.string()),
        })
    }),
    "tweet-cache": defineCollection({
        loader: glob({ pattern: "**/*.json", base: "./src/content/tweet-cache" }),
        schema: tweetScheme,
    }),
    "ogp-cache": defineCollection({
        loader: glob({ pattern: "**/*.json", base: "./src/content/ogp-cache" }),
        schema: zodOGPCache,
    }),
};