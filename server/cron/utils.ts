import type { CronContext, CronMiddleware } from "kuron";
import type { HonoType } from "../context/types";

export const createCronVar =
	<T extends keyof HonoType["Variables"]>(
		name: T,
		runner: (c: CronContext<HonoType>) => HonoType["Variables"][T],
	): CronMiddleware<HonoType> =>
	async (c, next) => {
		c.set(name, runner(c));
		await next();
	};
