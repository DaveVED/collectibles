const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  pageExtensions: ["ts", "tsx", "md", "mdx", "js"],
  output: "standalone",
  images: {
    domains: ["s.gravatar.com"],
  },
};

export default nextConfig;
