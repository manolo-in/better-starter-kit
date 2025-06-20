// import { S3Client } from "@aws-sdk/client-s3";
// import { createMiddleware } from "hono/factory";
// import type { HonoType } from "./type";

// export const initBucket = createMiddleware<HonoType>(async (c, next) => {
// 	const bucket = new S3Client({
// 		region: "auto",
// 		endpoint: env.BUCKET_ENDPOINT,
// 		credentials: {
// 			accessKeyId: env.BUCKET_ACCESS_KEY_ID,
// 			secretAccessKey: env.BUCKET_ACCESS_KEY_SECRET,
// 		},
// 	});

// 	const getFileURL = (key: string) => {
// 		return `${env.BUCKET_PUBLIC_URL}/${key}`;
// 	};

// 	c.set("bucket", {
// 		client: bucket,
// 		getFileURL: getFileURL,
// 	});
// 	await next();
// });

import { R2Bucket } from "@cloudflare/workers-types";

export type BUCKET = R2Bucket;
