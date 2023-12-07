export interface SEO {
    meta_description?: string;
    canonical_url?: URL | string;
    no_index: boolean;
    no_follow: boolean;
    og_image?: string;
    use_parent_fields: boolean;
}
export interface BlogPost {
    id: number;
    status: string;
    user_created: string;
    date_created: string;
    date_updated?: string;
    published_at?: string;
    content: string;
    slug: string;
    title: string;
    description: string;
    image?: string;
    seo?: SEO
}
export interface BlogsSchema {
    blogs: BlogPost[]
}