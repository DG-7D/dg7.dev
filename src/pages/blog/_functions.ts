import { dateToJSTDateTime } from '@/utils/Date.mjs';
import type { CollectionEntry } from 'astro:content';

export function getSlug(post: CollectionEntry<"blog">): string {
    if (post.data.publishDate.getFullYear() <= 2025) {
        return post.id;
    } else {
        return (
            dateToJSTDateTime(post.data.publishDate).toPlainDate().toString().split("-").join("")
            + "-"
            + post.id.split("-").slice(1).join("-"));
    }
}

export function getState(post: CollectionEntry<"blog">): "private" | "publishing" | "published" {
    if (!post.data.publish) {
        return "private";
    }
    if (new Date() < post.data.publishDate) {
        return "publishing"
    }
    return "published"
}