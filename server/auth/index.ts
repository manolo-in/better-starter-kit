import type { CreatedDB } from "@/server/db";
import { schema } from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "env";

export const trustedOrigins = [
	env.CORS_ORIGIN ?? "",
].filter((o) => o.length > 0);

export const createAuth = (
	db: CreatedDB,
	baseURL: string,
	waitUntil: WaitUntil,
) =>
  betterAuth({
    secret: env.AUTH_SECRET,
    baseURL,
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
      },
    },
    trustedOrigins,
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

			onAPIError: {
				errorURL: "/error",
			},
    plugins: [],
  });

export type AUTH = ReturnType<typeof createAuth>;
export type USER = typeof schema.user.$inferSelect;
export type SESSION = AUTH["$Infer"]["Session"];
