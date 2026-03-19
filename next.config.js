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
  turbopack: {},
  webpack: (config) => {
    // Custom Webpack configurations can go here
    return config;
  },
};
