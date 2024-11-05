export const prerender = false;
import { createClient } from "@libsql/client/web";

const TClient = createClient({ url: import.meta.env.TURSO_DB_URL!, authToken: import.meta.env.TURSO_DB_AUTH_TOKEN });
await TClient.executeMultiple(
    `CREATE TABLE IF NOT EXISTS "post_views" (post_id INTEGER NOT NULL, views INTEGER NOT NULL, PRIMARY KEY (post_id))`,
);

export const getTursoClient = () => TClient;