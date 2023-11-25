import { createDirectus, rest, readItems, readItem, staticToken } from "@directus/sdk";
import type { BlogsSchema, BlogPost } from "./types";


const client = createDirectus<BlogsSchema>(
    "https://blog-directus.vsahni.me"
).with(rest()).with(staticToken(import.meta.env.API_TOKEN));

export async function getPosts(limit: number = 4, onlyPublished: boolean = true) {
    let blogs = await client.request<BlogPost[]>(
        readItems("blogs", {
            limit: limit, sort: "-date_created", ...(onlyPublished && {
                filter: {
                    status: {
                        _eq: "published",
                    }
                }
            })
        })
    );
    return blogs
}

export async function getPost(id: number | string) {
    return client.request<BlogPost>(readItem("blogs", id))
}
export async function getPostWithSlug(slug: string) {
    const post = await client.request<BlogPost[]>(
        readItems("blogs", {
            filter: {
                slug: {
                    _eq: slug,
                },
            },
        })
    );
    return (post[0])
}
export function getClient() {
    return client;
}