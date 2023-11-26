import { createDirectus, rest, readItems, readItem, staticToken } from "@directus/sdk";
import type { BlogsSchema, BlogPost, SEO } from "./types";


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
                    },
                    published_at: {
                        _lte: new Date().toISOString()
                    }
                },
                fields: ["*,seo.*"]
            })
        })
    );
    return blogs
}

export async function getSEO(id: string | undefined) {
    if (!id) {
        return false;
    }
    return client.request<SEO>(readItem("seo", id))
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
                published_at: {
                    _lte: new Date().toISOString()
                }
            },
            fields: ["*,seo.*"]
        })
    );
    return (post[0])
}

export function getClient() {
    return client;
}