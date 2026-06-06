/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All images are delivered via Cloudinary with on-the-fly f_auto,q_auto + responsive
    // widths. See src/lib/cloudinaryLoader.ts (admin dataURL uploads pass through).
    loader: "custom",
    loaderFile: "./src/lib/cloudinaryLoader.ts",
  },
};

export default nextConfig;
