import type { AUTH } from "@/server/auth";
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "env";

export const authConfig = {
  plugins: [inferAdditionalFields<AUTH>()],
  ...(env.NEXT_PUBLIC_SERVER_URL
    ? { baseURL: env.NEXT_PUBLIC_SERVER_URL }
    : {}),
};

export const authClient = createAuthClient(authConfig);
