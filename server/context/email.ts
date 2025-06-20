// import { triedAsync } from "@/lib/utils";
// import { createMiddleware } from "hono/factory";
// import nodemailer from "nodemailer";
// import type { HonoType } from "./type";

// export const initEmail = createMiddleware<HonoType>(async (c, next) => {
// 	const transporter = nodemailer.createTransport({
// 		pool: true,
// 		service: "gmail",
// 		host: "smtp.gmail.com",
// 		auth: {
// 			user: env.NODEMAILER_EMAIL,
// 			pass: env.NODEMAILER_PASS,
// 		},
// 	});

// 	c.set(
// 		"email",
// 		async (props) => await triedAsync(transporter.sendMail(props)),
// 	);
// 	await next();
// });
