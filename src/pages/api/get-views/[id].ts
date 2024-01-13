export const prerender = false;
import type { APIRoute } from "astro";
import { getPost } from "../../../utils/posts";

export const GET: APIRoute = async ({ params }) => {
    const { id } = params;

    if (!id) {
        return new Response("Missing post id", { status: 400 })
    }
    const post = await getPost(id)
    if (!post) {
        return new Response("Post not found", { status: 404 })
    }
    return new Response(JSON.stringify({ id: post.id, views: Number(post.views) }), { status: 200 })
}