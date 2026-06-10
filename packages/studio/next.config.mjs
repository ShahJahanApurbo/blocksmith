/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@blocksmith/core",
    "@blocksmith/runtime",
    "@blocksmith/editor",
    "@blocksmith/components",
    "@blocksmith/agent",
    "@craftjs/core",
  ],
}

export default nextConfig
