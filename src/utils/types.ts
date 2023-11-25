export interface BlogPost {
    id: number;
    status: string;
    user_created: string;
    date_created: string;
    date_updated: string;
    published_at: string;
    content: string;
    slug: string;
    title: string;
    description: string;
    image?: string;
}
export interface BlogsSchema {
    blogs: BlogPost[]
}