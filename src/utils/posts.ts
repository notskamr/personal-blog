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
        if (onlyPublished && blog.published_at) {
            return new Date(blog.published_at).getTime() <= new Date().getTime();
        }
        return !onlyPublished;
    });
    return blogs;
}

export async function getPost(id: number | string) {
    return client.request<BlogPost>(readItem("blogs", id));
}

export async function getPostWithSlug(slug: string, onlyPublished: boolean = true) {
    let posts = await client.request<BlogPost[]>(
        readItems("blogs", {
            filter: {
                slug: {
                    _eq: slug,
                }
            },
            fields: ["*,seo.*"]
        })
    );
    posts = posts.filter((post) => {
        if (onlyPublished && post.published_at) {
            return new Date(post.published_at).getTime() <= new Date().getTime();
        }
        return !onlyPublished;
    });
    return posts[0] || null;
}

export const allPosts = await getPosts(-1);
console.log(allPosts.map((post) => post.title));

export function getClient() {
    return client;
}