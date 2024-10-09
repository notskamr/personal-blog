import type { APIContext, APIRoute } from "astro";
import { allPosts } from "../../../utils/posts";
import type { BlogPost } from "../../../utils/types";


export const GET: APIRoute = async ({ params, props }: APIContext) => {
    const { slug } = params;
    const post = props["post"] as BlogPost;

    const image = {
        url: `https://blog-directus.vsahni.me/assets/${post.image}/${slug}.webp?key=blog`,
        width: 1200,
        height: 630,
    };

    const imageResponse = await fetch(image.url);
    const imageBuffer = await imageResponse.arrayBuffer();

    return new Response(imageBuffer, {
        headers: {
            "Content-Type": "image/webp",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });

};

export const getStaticPaths = async () => {
    return allPosts.map((post) => ({
        params: { slug: post.slug },
        props: { post },
    }));
};