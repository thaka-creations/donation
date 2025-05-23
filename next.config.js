/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable the default CSS optimization
  experimental: {
    optimizeCss: false
  },
  // Ensure proper handling of static assets
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Disable the default font optimization
  optimizeFonts: false,
  // Ensure proper handling of CSS modules
  webpack: (config) => {
    return config;
  },
  // Ensure environment variables are available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}

module.exports = nextConfig 