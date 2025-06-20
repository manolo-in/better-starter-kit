import { ORPCError, os } from "@orpc/server";
import type { ContextORPC } from "@/server/context";

export const basicProcedure = os.$context<ContextORPC>();

export const publicProcedure = basicProcedure;

const requireAuth = basicProcedure.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next({
    context: {
      session: context.session,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);
