/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {} // must be an object (NOT true/false)
  }
};

module.exports = nextConfig;
