/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config options ...
  
  // Mark the institution route as dynamic
  experimental: {
    // This ensures the route is handled dynamically
    serverActions: true,
  },
}

module.exports = nextConfig 