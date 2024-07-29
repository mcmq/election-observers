/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pkbcseukrxmzycweosxm.supabase.co',
      },
    ]
  }
}

export default nextConfig
