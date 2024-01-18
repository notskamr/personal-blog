import type { APIRoute } from "astro";
import { getClient, getPost } from "../../utils/posts";
import { updateField, updateItem } from "@directus/sdk";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request }) => {
    if (request.headers.get("Content-Type") !== "application/json") {
        return new Response("Invalid content type", { status: 400 });
    }
    const body = await request.json();
    const id = parseInt((body.id as string));
    // convert id to int
    if (!id) {
        return new Response("Missing post id", { status: 400 });
    }

    const post = await getPost(id);
    if (!post) {
        return new Response("Post not found", { status: 404 });
    }
    if (cookies.get("viewed")?.json().includes(id)) {
        return new Response("Already viewed post", { status: 200 });
    }
    const client = getClient();
    const increment = await client.request(updateItem("blogs", id, {
        views: parseInt(post.views) + 1
    }));
    if (!increment)
        return new Response("Failed to increment", { status: 500 });
    const cookie = cookies.get("viewed");
    let viewed: number[] = [];
    if (cookie) {
        viewed = cookie.json();
        viewed.push(id);
    }
    cookies.set("viewed", JSON.stringify(viewed), { httpOnly: true, path: "/", domain: import.meta.env.PROD ? ".vsahni.me" : undefined, sameSite: "strict", secure: import.meta.env.PROD });
    return new Response("Incremented", { status: 200 });
};