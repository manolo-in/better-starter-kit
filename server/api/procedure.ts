import { tryAsync } from "@/lib/tools";
import type { AUTH } from "@/server/auth";
import type { CreatedDB } from "@/server/db";
import { ORPCError, type ORPCErrorCode } from "@orpc/client";
import { os } from "@orpc/server";

export type StaticContextORPC = {
	db: CreatedDB;
	auth: AUTH;
	req: Request;
	waitUntil: WaitUntil;
};

export const getError = (
	code: ORPCErrorCode = "INTERNAL_SERVER_ERROR",
	message?: string,
	cause?: unknown,
) => {
	cause && console.error(cause);
	return new ORPCError(code, {
		message: message ?? "Something wrong",
		cause,
	});
};

export const handleError = (error: Error, message: string = "1") => {
	return getError(
		"INTERNAL_SERVER_ERROR",
		`INTERNAL_SERVER_ERROR - ${message}`,
		error,
	);
};

export const publicProcedure = os.$context<StaticContextORPC>();

export const protectedProcedure = publicProcedure.use(
	async ({ context, next }) => {
		const [error, session] = await tryAsync(
			context.auth.api.getSession({
				headers: context.req.headers,
			}),
		);

		if (error)
			throw getError("INTERNAL_SERVER_ERROR", "Failed to retrieve session");

		if (!session?.user)
			throw getError(
				"UNAUTHORIZED",
				"You are not authorized to access this action",
			);

		return next({
			context: {
				session: session,
				user: session.user,
			},
		});
	},
);
