/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config options ...
  // Mark the institution route as dynamic
  experimental: {
    // This ensures the route is handled dynamically
    serverActions: {
      enabled: true
    }
  },
  // Disable ESLint during builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during builds
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig