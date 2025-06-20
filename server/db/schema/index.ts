import * as authSchema from "./auth"

export const schema = {
    ...authSchema
}

export type SchemaType = typeof schema
