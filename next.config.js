/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },

  /**
   * Rewrite /api/v1/* and /health to the FastAPI backend.
   * This avoids exposing the raw backend URL in client-side JS and sidesteps
   * any browser CORS restrictions in development.
   *
   * The NEXT_PUBLIC_API_URL env var is still used by diagnosticService.js for
   * direct browser requests, but you can switch to relative paths (/api/v1/…)
   * if you want all traffic to flow through Next.js at some point.
   */
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
      {
        source: "/health",
        destination: `${backendUrl}/health`,
      },
    ];
  },

  turbopack: {},

  webpack: (config) => {
    // Custom Webpack configurations can go here
    return config;
  },
};
