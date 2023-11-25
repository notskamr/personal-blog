import { createDirectus, rest, readItems, readItem } from "@directus/sdk";
import type { BlogsSchema, BlogPost } from "./types";


const client = createDirectus<BlogsSchema>(
    "https://blog-directus.vsahni.me"
).with(rest());
export async function getPosts(limit: number = 4, onlyPublished: boolean = true) {
    let blogs = await client.request<BlogPost[]>(
        readItems("blogs", { limit: limit, sort: "-date_created" })
    );
    if (onlyPublished) {
        blogs = blogs.filter(blog => blog.status === "published")
    }
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