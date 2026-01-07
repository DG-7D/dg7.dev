import { getCollection } from "astro:content";
import { getSlug, getState } from "./_functions";
import rss from '@astrojs/rss';

// TODO: ハードコードやめたい

export async function GET() {
    return rss({
        title: "あづみのブログ – あづみのメモ帳",
        description: "あづみがどうでもいいことを書いたり書かなかったりするブログです。",
        site: "https://dg7.dev/blog/",
        items: (await getCollection("blog", post => getState(post) === "published")).map(post => {
            return {
                title: post.data.title,
                link: new URL(`/blog/${getSlug(post)}/`, "https://dg7.dev/").toString(),
                description: post.data.description,
                pubDate: post.data.publishDate,
            }
        }),
    })
}