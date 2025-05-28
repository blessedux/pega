/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Ensure static files are properly served
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'image/x-icon',
          },
        ],
      },
      {
        source: '/chiledaodots.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'image/png',
          },
        ],
      },
    ];
  },
  // Ensure static files are included in the build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ico|png)$/,
      type: 'asset/resource',
    });
    return config;
  },
  // Disable static optimization for the root page
  output: 'standalone',
  // Add rewrites to ensure static assets are served correctly
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/public/favicon.ico',
      },
      {
        source: '/chiledaodots.png',
        destination: '/public/chiledaodots.png',
      },
    ];
  },
}

module.exports = nextConfig 