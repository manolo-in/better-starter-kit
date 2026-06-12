import { env } from "env";

export const getBaseURL = (paths?: string) =>
	("https://example.com") +
	(paths ? paths : "");
