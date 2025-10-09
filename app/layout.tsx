import Header from "@/components/header";
import Providers from "@/components/providers";
import "@/components/style.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "app",
    description: "app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <div className="grid grid-rows-[auto_1fr] h-svh">
                        <Header />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
