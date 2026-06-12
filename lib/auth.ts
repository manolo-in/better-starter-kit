import {
	type BetterAuthClientOptions,
	createAuthClient,
} from "better-auth/client";
import {
	genericOAuthClient,
	inferAdditionalFields,
	magicLinkClient,
} from "better-auth/client/plugins";
import { env } from "env";
import type { AUTH } from "@/server/auth";

export const authConfig = {
	plugins: [
		inferAdditionalFields<AUTH>(),
		genericOAuthClient(),
		magicLinkClient(),
	],
	...(env.NEXT_PUBLIC_SERVER_URL
		? { baseURL: env.NEXT_PUBLIC_SERVER_URL }
		: {}),
} satisfies BetterAuthClientOptions;

export const authClient = createAuthClient(authConfig);

export type USER = AUTH["$Infer"]["Session"]["user"];
