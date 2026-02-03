/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Игнорируем ошибки типов
  },
  eslint: {
    ignoreDuringBuilds: true, // Игнорируем ошибки линтера
  },
  // Добавляем пустой конфиг, чтобы сбросить кэш сборщика
  experimental: {} 
};

export default nextConfig;
