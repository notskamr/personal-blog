import type { APIRoute } from "astro";
import { allPosts } from "../../utils/posts";
import { getTursoClient } from "../../db";

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
    const viewedAlready: number[] = cookies.get("viewed")?.json() ?? [];
    if (viewedAlready.includes(id)) {
        return new Response("Already viewed post", { status: 200 });
    }
    const doesPostExist = allPosts.some(post => post.id === id);
    if (!doesPostExist) {
        return new Response("Post not found", { status: 404 });
    }
    const TClient = getTursoClient();
    await TClient.execute({ sql: "INSERT INTO post_views (post_id, views) VALUES (?, 1) ON CONFLICT(post_id) DO UPDATE SET views = views + 1", args: [id] });
    viewedAlready.push(id);
    cookies.set("viewed", JSON.stringify(viewedAlready), { httpOnly: true, path: "/", domain: import.meta.env.PROD ? ".vsahni.me" : undefined, sameSite: "lax" });
    return new Response("Incremented", { status: 200 });
};