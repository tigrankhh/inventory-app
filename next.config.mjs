/** @type {import('next').NextConfig} */
const nextConfig = {
  // Это важно для деплоя на Cloudflare
  output: 'export', // ТОЛЬКО если у тебя нет API роутов внутри Next.js
  images: { unoptimized: true }
};

export default nextConfig;
