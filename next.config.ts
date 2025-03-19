import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // ビルド時にESLintエラーを無視する
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v4-api.art-tunes.art',
      },
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
        hostname: 'media.art-tunes.art',
      },
      {
        protocol: 'https',
        hostname: 'app.art-tunes.art',
      },
      {
        protocol: 'https',
        hostname: 'stg-app.art-tunes.art',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" }
        ]
      }
    ];
  }
};

export default nextConfig;
