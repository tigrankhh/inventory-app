/** @type {import('next').NextConfig} */
const nextConfig = {
  // НИКАКИХ output: 'export'! Для Cloudflare это не нужно.
  // Убедись, что нет basePath или сложных редиректов.
};

export default nextConfig;
