import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: false, // disable for export
  },

  images: { 
    domains: ['picsum.photos'], // ✅ only domain
    unoptimized: true,
  },

  trailingSlash: false,
  output: 'export',
  distDir: 'out',
  turbopack: {
    resolveAlias: { underscore: 'lodash' },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
};

export default nextConfig;
