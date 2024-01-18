import type { APIRoute } from "astro";
import { allPosts, getClient, getPost } from "../../utils/posts";
import { updateField, updateItem } from "@directus/sdk";
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

    if ((await cookies.get("viewed")?.json())?.includes(id)) {
        return new Response("Already viewed post", { status: 200 });
    }
    const doesPostExist = allPosts.some(post => post.id === id);
    if (!doesPostExist) {
        return new Response("Post not found", { status: 404 });
    }
    const TClient = getTursoClient();
    const incrementTransaction = await TClient.transaction("write");
    try {
        await incrementTransaction.execute({ sql: "INSERT INTO post_views (post_id, views) VALUES (?, 1) ON CONFLICT(post_id) DO UPDATE SET views = views + 1", args: [id] });
        await incrementTransaction.commit();
    }
    catch (e) {
        console.log(e);
        return new Response("Failed to increment", { status: 500 });
    }
    finally {
        incrementTransaction.close();
    }
    const cookie = cookies.get("viewed");
    // console.log(cookie?.json());
    let viewed: number[] = [];
    if (cookie) {
        viewed = cookie.json();
        viewed.push(id);
    }
    cookies.set("viewed", JSON.stringify(viewed), { httpOnly: true, path: "/", domain: import.meta.env.PROD ? ".vsahni.me" : undefined, sameSite: "strict", secure: import.meta.env.PROD });
    return new Response("Incremented", { status: 200 });
};