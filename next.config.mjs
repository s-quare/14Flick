/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compress: true, 
  images: {
    // This disables the Vercel Image Optimization API entirely for your app.
    // It forces Next.js to serve images as-is, saving you from transformation costs.
    unoptimized: true,
  },
};

export default nextConfig;