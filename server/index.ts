import { RPCHandler } from "@orpc/server/fetch";
import { env } from "env";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { triedAsync } from "@/lib/tools";
import { appRouter } from "@/server/api";
import { createAuth } from "@/server/auth";
import { createContext, createVar } from "@/server/context";
import { createDB } from "@/server/db";
import type { HonoType } from "./context/types";
import cron from "./cron";

const app = new Hono<HonoType>({
	strict: false,
}).basePath("/api");

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

app.get("/", (c) => {
	return c.text("Hello");
});

app.use(
	createVar("waitUntil", (c) => {
		return (p: Promise<unknown>) => {
			if (!c.executionCtx || c.executionCtx.waitUntil === undefined) {
				throw new Error("No execution context waitUntil available");
			}
			c.executionCtx.waitUntil(triedAsync(p, "Inside waitUntil"));
		};
	}),
);

app.use(
	createVar("db", (c) => createDB(c.env.DATABASE))
);

app.use(
	createVar("auth", (c) => {
		const baseURL = new URL(c.req.url).origin;
		return createAuth(c.var.db, baseURL, c.var.waitUntil);
	}),
);

app.on(["POST", "GET"], "/auth/*", (c) => {
	const auth = c.get("auth");
	return auth.handler(c.req.raw);
});

app.use("/*", async (c, next) => {
	const handler = new RPCHandler(appRouter);

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

export default {
	fetch: app.fetch,
	scheduled: cron.scheduled,
};
