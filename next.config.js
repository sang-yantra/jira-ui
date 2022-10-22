/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["bhnrieohgidkilckoyyi.supabase.co","cloudflare-ipfs.com"],
  },
};

module.exports = nextConfig;
