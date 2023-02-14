/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {...config.experiments, topLevelAwait: true}
    return config
  },
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
