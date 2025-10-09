import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        AUTH_SECRET: z.string(),
        AUTH_URL: z.string().url().optional(),
        CORS_ORIGIN: z.string().url().optional(),

        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),

        // UPSTASH_REDIS_URL: z.string().url(),
        // UPSTASH_REDIS_TOKEN: z.string(),

        // NODEMAILER_EMAIL: z.string().email(),
        // NODEMAILER_PASS: z.string(),

        // BUCKET_ENDPOINT: z.string().url(),
        // BUCKET_ACCESS_KEY_ID: z.string(),
        // BUCKET_ACCESS_KEY_SECRET: z.string(),

        // BUCKET_PUBLIC_URL: z.string().url(),

        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_SERVER_URL: z.string().url().optional(),
    },

    /**
     * You can't destruct `env.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_URL: process.env.AUTH_URL,
        CORS_ORIGIN: process.env.CORS_ORIGIN,

        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

        // UPSTASH_REDIS_URL: env.UPSTASH_REDIS_URL,
        // UPSTASH_REDIS_TOKEN: env.UPSTASH_REDIS_TOKEN,

        // NODEMAILER_EMAIL: env.NODEMAILER_EMAIL,
        // NODEMAILER_PASS: env.NODEMAILER_PASS,

        // BUCKET_ENDPOINT: env.BUCKET_ENDPOINT,
        // BUCKET_ACCESS_KEY_ID: env.BUCKET_ACCESS_KEY_ID,
        // BUCKET_ACCESS_KEY_SECRET: env.BUCKET_ACCESS_KEY_SECRET,
        // BUCKET_PUBLIC_URL: env.BUCKET_PUBLIC_URL,

        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,

        NODE_ENV: process.env.NODE_ENV
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});
