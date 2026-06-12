import type { MetadataRoute } from "next";
import { getBaseURL } from "@/lib/web";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/*",
			disallow: [
				"/api/*",
				"/ui",
				"/error",
				"/login",
			],
		},
		sitemap: getBaseURL("/sitemap.xml"),
	};
}
