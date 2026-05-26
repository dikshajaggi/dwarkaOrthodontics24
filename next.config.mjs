/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
    formats: ['image/avif', 'image/webp'], // serve avif first, webp fallback
  },
};

export default nextConfig;
