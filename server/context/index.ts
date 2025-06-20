import { createMiddleware } from "hono/factory";
import { createAuth } from "./auth";
import type { Context } from "hono";
import { createDB, type DATABASE } from "@/server/db";
import type { BUCKET } from "./bucket";

export const resolvePath = createMiddleware(async (c, next) => {
    if (c.req.path.includes("//")) {
        return c.redirect(c.req.path.replaceAll(/\/+/g, "/"));
    }
    await next();
});

export async function createContext(c: Context<HonoType>) {
    const db = createDB(c.env.DATABASE);
    const auth = createAuth(db)

    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    return {
        session,
        db,
        auth
    };
}

type Bindings = {
    DATABASE: DATABASE;
    BUCKET: BUCKET;
};

export type HonoType = { Bindings: Bindings; Variables: {} };

export type ContextORPC = Awaited<ReturnType<typeof createContext>>;
