import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { schema, type SchemaType } from "./schema";
import type { D1Database } from "@cloudflare/workers-types";

export const createDB = (db: D1Database) => drizzle(db, { schema });

export type DATABASE = DrizzleD1Database<SchemaType>;
export type CreatedDB = ReturnType<typeof createDB>;
