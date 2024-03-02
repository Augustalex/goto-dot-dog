/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "goto-dog-images.s3.us-east-005.backblazeb2.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
