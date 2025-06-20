import { env } from "@/env";
import type { AppRouter } from "@/server/api";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            toast.error(`Error: ${error.message}`, {
                action: {
                    label: "retry",
                    onClick: () => {
                        queryClient.invalidateQueries();
                    },
                },
            });
        },
    }),
});

const baseUrl =
    env.NEXT_PUBLIC_SERVER_URL ??
    (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

export const link = new RPCLink({
    url: `${baseUrl}/api/rpc`,
    fetch(url, options) {
        return fetch(url, {
            ...options,
            credentials: "include",
        });
    },
});

export const client: RouterClient<AppRouter> = createORPCClient(link);

export const api = createTanstackQueryUtils(client);
