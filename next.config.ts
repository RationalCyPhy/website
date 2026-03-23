import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Set basePath to match your GitHub repo name for org pages:
  // basePath: "/your-repo-name",
  // Remove basePath when using a custom domain.
};

export default nextConfig;
