import type { HonoType } from "@/server";
import { createDB } from "@/server/db";
import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { createAuth } from "@/server/auth";

export const resolvePath = createMiddleware(async (c, next) => {
  if (c.req.path.includes("//")) {
    return c.redirect(c.req.path.replaceAll(/\/+/g, "/"));
  }
  await next();
});

export const cloudflare = createMiddleware<HonoType>(async (c, next) => {
  if (!c.env.DATABASE) throw new Error("Not Cloudflare");

  const db = createDB(c.env.DATABASE);
  const auth = createAuth(db);

  c.set("auth", auth);
  c.set("db", db);

  await next();
});

export async function createContext(c: Context<HonoType>) {
  const db = c.get("db");
  const auth = c.get("auth");

  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  return {
    db,
    auth,
    session,
    // chat: c.env.CHAT,
    req: c.req.raw,
  };
}

// export type ContextORPC = Awaited<ReturnType<typeof createContext>>;
