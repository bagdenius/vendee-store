import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      new URL(
        'https://llwedkywjjlauduymnhr.supabase.co/storage/v1/object/public/product-images/**',
      ),
    ],
  },
};

export default nextConfig;
