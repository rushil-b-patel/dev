/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Listed first so /blog/<old> goes straight to the new slug.
      { source: "/:section(blog|writing)/upi", destination: "/writing/how-upi-works", permanent: true },
      { source: "/:section(blog|writing)/query", destination: "/writing/new-query-method", permanent: true },
      { source: "/:section(blog|writing)/uae", destination: "/writing/uae-through-my-lens", permanent: true },
      { source: "/blog/:path*", destination: "/writing/:path*", permanent: true },
      // Old image folder, not pages.
      { source: "/Blogs/:path*", destination: "/Writing/:path*", permanent: true },
      { source: "/resume", destination: "/resume.pdf", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
