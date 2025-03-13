import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v4-stg-api.art-tunes.art',
      },
      {
        protocol: 'https',
        hostname: 'stg-media.art-tunes.art',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  }
};

export default nextConfig;
