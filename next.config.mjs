/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '8081' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8081' },
    ],
  },
}

export default nextConfig
