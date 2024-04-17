import { createDirectus, rest, readItems, readItem, staticToken } from "@directus/sdk";
import type { BlogsSchema, BlogPost, SEO } from "./types";


const client = createDirectus<BlogsSchema>(
    "https://blog-directus.vsahni.me"
).with(rest()).with(staticToken(import.meta.env.API_TOKEN));

export async function getPosts(limit: number = 4, onlyPublished: boolean = true) {
    let blogs = await client.request<BlogPost[]>(
        readItems("blogs", {
            limit: limit, sort: "-published_at", ...(onlyPublished && {
                filter: {
                    status: {
                        _eq: "published",
                    }
                },
                fields: ["*,seo.*"]
            })
        })
    );
    // filter blogs that have a published_at date in the future
    blogs = blogs.filter((blog) => {
        if (blog.published_at) {
            return new Date(blog.published_at) <= new Date();
        }
        return true;
    });
    return blogs;
}

export async function getPost(id: number | string) {
    return client.request<BlogPost>(readItem("blogs", id));
}

export async function getPostWithSlug(slug: string, onlyPublished: boolean = true) {
    const post = await client.request<BlogPost[]>(
        readItems("blogs", {
            filter: {
                slug: {
                    _eq: slug,
                }, ...(onlyPublished && {
                    published_at: {
                        _lte: new Date().toISOString()
                    }
                })
            },
            fields: ["*,seo.*"]
        })
    );
    return (post[0]);
}

export const allPosts = await getPosts(-1);

export function getClient() {
    return client;
}