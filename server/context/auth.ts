import { env } from "@/env";
import { type DATABASE } from "@/server/db";
import * as schema from "@/server/db/schema/auth";
import { betterAuth, type Session, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const createAuth = (db: DATABASE) =>
    betterAuth({
        appName: "Jem",
        secret: env.AUTH_SECRET,
        baseURL: env.AUTH_URL,
        session: {
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60, // Cache duration in seconds
            },
        },
        trustedOrigins: [env.CORS_ORIGIN || ""],
        database: drizzleAdapter(db, {
            provider: "sqlite",
            schema: schema,
        }),
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            google: {
                prompt: "select_account",
                clientId: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
            },
        },
        plugins: [
            // magicLink({
            //     sendMagicLink: async ({ email, token, url }, request) => {
            //         await c.var.email({
            //             to: email,
            //             subject: "Magic Link for ShowMyAds",
            //             html: `<a href="${url}">Click here to login</a>`,
            //         });
            //     },
            // }),
        ],
    });

export type AuthType = ReturnType<typeof createAuth>;

export type AuthData = null | {
    session: Session;
    user: User;
};
