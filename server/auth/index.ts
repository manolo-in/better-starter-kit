import type { CreatedDB } from "@/server/db";
import { schema } from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "env";

export const createAuth = (db: CreatedDB) =>
  betterAuth({
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
      schema,
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
      //             subject: "Magic Link for App",
      //             html: `<a href="${url}">Click here to login</a>`,
      //         });
      //     },
      // }),
    ],
  });

export type AUTH = ReturnType<typeof createAuth>;
export type USER = typeof schema.user.$inferSelect;
export type FULLSESSION = AUTH["$Infer"]["Session"];
