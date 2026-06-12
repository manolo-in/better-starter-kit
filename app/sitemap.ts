import type { MetadataRoute } from "next";
import { getBaseURL } from "@/lib/web";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: getBaseURL(),
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
