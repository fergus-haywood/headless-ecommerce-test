/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const imagesConfig = {
  images: {
    domains: ['images.pexels.com', 'cdn.shopify.com'],
  },
}

module.exports = {
  ...nextConfig,
  ...imagesConfig,
}
