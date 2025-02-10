import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Jan2025TaskManager',
  assetPrefix: '/Jan2025TaskManager',
};

export default nextConfig;
