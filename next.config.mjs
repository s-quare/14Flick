/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compress: true, // Saves bandwidth by zipping responses
  images: {
    minimumCacheTTL: 31536000, // Cache optimized images for 1 year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
      },
    ],
  },
};

export default nextConfig;