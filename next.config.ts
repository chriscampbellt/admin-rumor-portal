// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove experimental.typedRoutes and use the new typedRoutes option
  typedRoutes: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
