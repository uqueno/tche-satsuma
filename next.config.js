/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['pt-BR', 'ja'],
    defaultLocale: 'pt-BR',
  },
  images: {
    domains: [], // Add allowed image domains here
  },
  env: {
    APP_NAME: 'Tche Satsuma',
    APP_VERSION: '1.0.0',
  },
};

module.exports = nextConfig;
