import { defineConfig } from "drizzle-kit";

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
    server: {
        CLOUDFLARE_ACCOUNT_ID: z.string(),
        CLOUDFLARE_DATABASE_ID: z.string(),
        CLOUDFLARE_D1_TOKEN: z.string(),
    },
    runtimeEnv: {
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
        CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
        CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
    },
    skipValidation: true,
    emptyStringAsUndefined: true,
});

export default defineConfig({
    schema: "./server/db/schema/*",
    out: "./drizzle",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        accountId: env.CLOUDFLARE_ACCOUNT_ID,
        databaseId: env.CLOUDFLARE_DATABASE_ID,
        token: env.CLOUDFLARE_D1_TOKEN,
    },
});

// export default defineConfig({
//     schema: "./server/db/schema/*",
//     out: "./drizzle",
//     dialect: 'sqlite',
//     dbCredentials: {
//         url: "file:./local.db",
//     },
// });
