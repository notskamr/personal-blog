import { createClient } from "@libsql/client";
import { allPosts } from "../utils/posts";
export const TClient = createClient({ url: import.meta.env.TURSO_DB_URL!, authToken: import.meta.env.TURSO_DB_AUTH_TOKEN });
const schemaExecute = await TClient.executeMultiple(
    `CREATE TABLE IF NOT EXISTS "post_views" (post_id INTEGER NOT NULL, views INTEGER NOT NULL, PRIMARY KEY (post_id))`,
);