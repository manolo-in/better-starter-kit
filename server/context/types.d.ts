import type { Hyperdrive, KVNamespace, D1Database } from "@cloudflare/workers-types";
import type { AUTH } from "@/server/auth";
import type { CreatedDB } from "@/server/db";

type WaitUntil = (p: Promise<unknown>) => void

export type HonoType = {
	Bindings: {
		DATABASE: D1Database,
		HYPERDRIVE: Hyperdrive;
		KEYVALUE: KVNamespace;
	};
	Variables: {
		auth: AUTH;
		db: CreatedDB;
		waitUntil: WaitUntil;
	};
};
