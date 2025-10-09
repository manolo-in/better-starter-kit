import { createAuth } from "@/server/auth";
import { createDB } from "@/server/db";

const db = createDB({} as D1Database);
const auth = createAuth(db);

export default auth;
