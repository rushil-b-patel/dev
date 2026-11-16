/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Old links keep working after the blog -> writing rename.
  async redirects() {
    return [
      // Slugs renamed in 452868e. Listed first so /blog/<old> goes straight to the new slug.
      { source: "/:section(blog|writing)/upi", destination: "/writing/how-upi-works", permanent: true },
      { source: "/:section(blog|writing)/query", destination: "/writing/new-query-method", permanent: true },
      { source: "/:section(blog|writing)/uae", destination: "/writing/uae-through-my-lens", permanent: true },
      { source: "/blog/:path*", destination: "/writing/:path*", permanent: true },
      { source: "/Blogs/:path*", destination: "/Writing/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
