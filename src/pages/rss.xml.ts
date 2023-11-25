import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../utils/posts';

export async function GET(context: APIContext) {

    const allPosts = await getPosts(-1);
    return rss({
        title: "Varun Sahni's Blog",
        description: "A place for discussions and posts on topics ranging from tech to film and anything in between.",
        site: context.site as URL,
        items: allPosts.map((post) => ({
            title: post.title,
            description: post.description,
            pubDate: new Date(post.published_at),
            link: `/posts/${post.slug}`
        })),
        customData: `<language>en-us</language>`,
    })
}