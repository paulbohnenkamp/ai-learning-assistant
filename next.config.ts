import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prevent Next from discovering the unrelated package-lock in ~/ and
  // incorrectly treating the user's home directory as this app's root.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
