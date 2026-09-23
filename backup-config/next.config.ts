import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/smart-school-front-and-next",
  assetPrefix: "/smart-school-front-and-next/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;