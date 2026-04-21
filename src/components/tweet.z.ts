import { z } from "astro/zod";

// 使わないのは書いてない
const tweetSchemeWithoutParent = z.object({
    created_at: z.string(),
    entities: z.object({
        hashtags: z.object({
            text: z.string(),
        }).array(),
        urls: z.object({
            display_url: z.string(),
            expanded_url: z.string().url(),
            url: z.string().url(),
        }).array(),
        user_mentions: z.object({
            screen_name: z.string(),
        }).array(),
        // symbols: z.object({}).array(), //謎
        media: z.object({
            display_url: z.string(),
            expanded_url: z.string().url(),
            url: z.string().url(),
        }).array().optional(),
    }),
    id_str: z.string(),
    text: z.string(),
    user: z.object({
        id_str: z.string(),
        name: z.string(),
        profile_image_url_https: z.string().url(),
        screen_name: z.string(),
    }),
    // parent: ,
    photos: z.object({
        expandedUrl: z.string().url(),
        url: z.string().url(),
        width: z.number(),
        height: z.number(),
    }).array().optional(),
    video: z.object({
        aspectRatio: z.number().array().length(2),
        poster: z.string(),
        variants: z.object({
            type: z.string(),
            src: z.string().url(),
        }).array(),
    }).optional(),
})
export const tweetScheme = tweetSchemeWithoutParent.extend({ parent: tweetSchemeWithoutParent.optional() })
