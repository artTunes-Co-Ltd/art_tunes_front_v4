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
        hostname: 'art-tunes-v3-stg-bucket.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'art-tunes-v3-prd-bucket.s3.ap-northeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
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
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  async rewrites() {
    return [
      // iOS Universal Links (AASA)
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/api/.well-known/apple-app-site-association",
      },
      // Android App Links
      {
        source: "/.well-known/assetlinks.json",
        destination: "/api/.well-known/assetlinks.json",
      },
    ];
  },
};

export default nextConfig;
