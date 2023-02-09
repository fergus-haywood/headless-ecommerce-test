const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config({})

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
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
    return config
  },
}
