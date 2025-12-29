export function getState(post: any): "private" | "publishing" | "published" {
    if (!post.data.publish) {
        return "private";
    }
    if (new Date() < post.data.publishDate) {
        return "publishing"
    }
    return "published"
}