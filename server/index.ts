import { appRouter } from "@/server/api";
import { type AUTH } from "@/server/auth";
import { cloudflare, createContext, resolvePath } from "@/server/context";
import { type DATABASE } from "@/server/db";

import { RPCHandler } from "@orpc/server/fetch";
import { env } from "env";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

type Variables = {
    auth: AUTH;
    db: DATABASE;
};

export type HonoType = {
    Bindings: CloudflareBinding;
    Variables: Variables;
};

const app = new Hono<HonoType>({
    strict: false,
}).basePath("/api");

app.use(resolvePath);

app.use(logger());
app.use(
    "/*",
    cors({
        origin: env.CORS_ORIGIN || "",
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

app.use(cloudflare);

app.on(["POST", "GET"], "/auth/*", (c) => {
    const auth = c.get("auth");
    return auth.handler(c.req.raw);
});

const handler = new RPCHandler(appRouter);

app.use("/*", async (c, next) => {
    const context = await createContext(c);

    const { matched, response } = await handler.handle(c.req.raw, {
        prefix: "/api",
        context,
    });

    if (matched) {
        return c.newResponse(response.body, response);
    }
    await next();
});

app.get("/", (c) => {
    return c.text("OK");
});

export default app;
