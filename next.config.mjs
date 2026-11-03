/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Old links keep working after the blog -> writing rename.
  async redirects() {
    return [
      { source: "/blog/:path*", destination: "/writing/:path*", permanent: true },
      { source: "/Blogs/:path*", destination: "/Writing/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
