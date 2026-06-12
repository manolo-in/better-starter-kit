import Providers from "@/components/providers";
import "@/components/style.css";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	metadataBase: new URL("https://example.com"),
	title: "",
	description: "",
	keywords: [],
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<div className="grid min-h-svh grid-rows-[1fr]">
						<Suspense>{children}</Suspense>
					</div>
				</Providers>
			</body>
		</html>
	);
}
