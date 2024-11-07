import type { APIRoute } from "astro";
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
    const viewedAlready: number[] = cookies.get("vsahni_blog_viewed")?.json() ?? [];
    if (viewedAlready.includes(id) || import.meta.env.DEV) {
        return new Response("Already viewed post", { status: 200 });
    }

    const TClient = getTursoClient();
    await TClient.execute({ sql: "INSERT INTO post_views (post_id, views) VALUES (?, 1) ON CONFLICT(post_id) DO UPDATE SET views = views + 1", args: [id] });
    viewedAlready.push(id);
    return new Response("Incremented", { status: 200, headers: { "Set-Cookie": `vsahni_blog_viewed=${JSON.stringify(viewedAlready)}; SameSite=Strict; Max-Age=3600; Secure; HttpOnly;` } });
};