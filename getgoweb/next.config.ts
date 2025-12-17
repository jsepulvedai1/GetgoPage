/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Excluir rutas API del export estático
  // En Vercel, las rutas API funcionan automáticamente como serverless functions
  experimental: {
    // Esto permite que las rutas API funcionen en Vercel aunque se excluyan del export
  },
};

module.exports = nextConfig;
