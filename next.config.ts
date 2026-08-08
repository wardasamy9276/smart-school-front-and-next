// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {

// };
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/smart-schools-complex",
  assetPrefix: "/smart-schools-complex/",
};

export default nextConfig;