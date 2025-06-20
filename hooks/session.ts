import { env } from "@/env";
import type { AuthType } from "@/server/context/auth";
import { createAuthClient } from "better-auth/client";
import {
    inferAdditionalFields,
    magicLinkClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [magicLinkClient(), inferAdditionalFields<AuthType>()],
    ...(env.NEXT_PUBLIC_SERVER_URL
        ? { baseURL: env.NEXT_PUBLIC_SERVER_URL }
        : {}),
});
