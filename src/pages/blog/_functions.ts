import type { CollectionEntry } from 'astro:content';

export function getSlug(post: CollectionEntry<"blog">): string {
    return post.id;
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