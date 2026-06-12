import { triedAsync } from "@/lib/tools";
import { Cron } from "kuron";
import type { HonoType } from "../context/types";
import { createDB } from "../db";
import { createCronVar } from "./utils";

const cron = new Cron<HonoType>();

cron.use(
	createCronVar("waitUntil", (c) => {
		return (p: Promise<unknown>) => {
			if (!c.executionCtx || c.executionCtx.waitUntil === undefined) {
				throw new Error("No execution context waitUntil available");
			}
			c.executionCtx.waitUntil(triedAsync(p, "Inside Cron waitUntil"));
		};
	}),
);

cron.use(createCronVar("db", (c) => createDB(c.env.DATABASE)));

cron.schedule("30 6 * * *", async (c) => {
	console.log("Cron Working")
});

export default cron;
