import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dulces-petalos.jakala.es",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
