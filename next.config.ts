import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the Turbopack root to this project directory to ensure root
  // resolution is correct when Next.js infers the project root from
  // where `next dev` is run or when workspaces are involved.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
