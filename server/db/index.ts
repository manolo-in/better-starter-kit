import { createClient } from "@libsql/client";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle as drizzleLocal } from "drizzle-orm/libsql";

import { schema, type SchemaType } from "./schema";
import { env } from "@/env";

export const createDB = (DATABASE: DATABASE) =>
    env.NODE_ENV === "production"
        ? drizzle(DATABASE, {
              schema,
          })
        : drizzleLocal(
              createClient({
                  url: "file:./local.db",
              }),
              {
                  schema,
              },
          );

export type DATABASE = DrizzleD1Database<SchemaType>;
