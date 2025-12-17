/** @type {import('next').NextConfig} */
const nextConfig = {
  // Modo dinámico: permite rutas API y server-side rendering
  // Las rutas API funcionarán perfectamente en Vercel
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
