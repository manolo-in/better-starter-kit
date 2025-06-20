import { appRouter } from "@/server/api";
import { createContext, resolvePath, type HonoType } from "@/server/context";
import { RPCHandler } from "@orpc/server/fetch";

import { env } from "@/env";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createDB } from "./db";
import { createAuth } from "./context/auth";

const app = new Hono<HonoType>({
	strict: false,
}).basePath("/api");

app.use(resolvePath)

app.use(logger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.on(["POST", "GET"], "/auth/**", (c) => {
    const db = createDB(c.env.DATABASE);
    const auth = createAuth(db)
    return auth.handler(c.req.raw)
});

const handler = new RPCHandler(appRouter);

app.use("/rpc/*", async (c, next) => {
  const context = await createContext(c);

  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/api/rpc",
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
