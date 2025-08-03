/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    // Inisialisasi experimental sebagai objek kosong untuk keamanan
    swcPlugins: [],
  },
};

// Aktifkan tempo-devtools hanya jika TEMPO diatur
if (process.env.TEMPO) {
  // Pilih versi swcPlugins berdasarkan versi Next.js atau kebutuhan proyek
  nextConfig.experimental.swcPlugins = [
    [
      require.resolve('tempo-devtools/swc/0.90'),
      {},
    ],
  ];
}

module.exports = nextConfig;
