/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'nextjs.org',
      'www.typescriptlang.org',
      'developer.mozilla.org',
      'www.freecodecamp.org',
      'ahrefs.com',
      'images.unsplash.com'
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;