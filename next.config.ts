import type { NextConfig } from "next";
import { env } from "@/env"

const nextConfig: NextConfig = {
    output: "export",
    distDir: "out"
};

export default nextConfig;
