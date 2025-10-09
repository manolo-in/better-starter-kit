import type { AUTH } from "@/server/auth";
import type { DATABASE } from "@/server/db";
import { ORPCError, type ORPCErrorCode } from "@orpc/client";
import { os } from "@orpc/server";

type ContextORPC = {
  db: DATABASE;
  auth: AUTH;
  session: AUTH["$Infer"]["Session"] | null;
  req: Request;
};

const getError = (
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

export const o = os.$context<ContextORPC>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session?.user)
    throw getError(
      "UNAUTHORIZED",
      "You are not authorized to access this action",
    );

  return next({
    context: {
      session: context.session,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);
