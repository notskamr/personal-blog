export const prerender = false;
import type { APIRoute } from "astro";
import { getTursoClient } from "../../../db";

export const GET: APIRoute = async ({ params }) => {
    const id = parseInt(params.id as string);

    if (!id) {
        return new Response("Missing post id", { status: 400 });
    }

    const TClient = getTursoClient();
    const views = (await TClient.execute({
        sql: "SELECT views FROM post_views WHERE post_id = ?",
        args: [id]
    })).rows[0]?.views ?? 0;

    return new Response(JSON.stringify({ id: id, views: Number(views) }), { status: 200 });
};