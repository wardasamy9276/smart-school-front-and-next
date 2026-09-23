// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
//   basePath: "/smart-school-front-and-next",
//   assetPrefix: "/smart-school-front-and-next/",
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";

// const nextConfig: NextConfig = {
//   basePath: isProd ? "/smart-school-front-and-next" : "",
//   assetPrefix: isProd ? "/smart-school-front-and-next" : "",
// };

// export default nextConfig;

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/smart-school-front-and-next" : "",
  assetPrefix: isProd ? "/smart-school-front-and-next/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;