import { dateToJSTDateTime } from '@/utils/Date.mjs';
import type { CollectionEntry } from 'astro:content';

export function getSlug(post: CollectionEntry<"blog">): string {
    const publishDate = dateToJSTDateTime(post.data.publishDate);
    if (publishDate.year <= 2025) {
        return post.id;
    } else {
        return (
            publishDate.toPlainDate().toString().split("-").join("")
            + "-"
            + post.id.split("-").slice(1).join("-"));
    }
}

export function getState(post: CollectionEntry<"blog">): "private" | "publishing" | "published" {
    if (!post.data.publish) {
        return "private";
    }
    const publishDate = dateToJSTDateTime(post.data.publishDate);
    if (Temporal.ZonedDateTime.compare(publishDate, Temporal.Now.zonedDateTimeISO("Asia/Tokyo")) > 0) {
        return "publishing"
    }
    return "published"
}