import createMDX from "@next/mdx";
import { env } from "env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	output: "export",
	distDir: "out",
	trailingSlash: true,
	images: { unoptimized: true },
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: ["remark-gfm"],
	},
});

export default withMDX(nextConfig);
