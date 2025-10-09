import { user, account, verification, session } from "./auth";

export const schema = {
    user,
    account,
    verification,
    session,
} as const;

export type SchemaType = typeof schema;
