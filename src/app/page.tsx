import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { ArrowUpRight, CheckCircle2, Shield, Users, Zap } from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* E-book Collection Section */}
      <section id="koleksi" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Koleksi E-book Terlengkap
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan ribuan e-book berkualitas dari berbagai genre dan penulis
              terbaik Indonesia dan dunia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
                title: "Laskar Pelangi",
                author: "Andrea Hirata",
                genre: "Novel",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80",
                title: "Bumi Manusia",
                author: "Pramoedya Ananta Toer",
                genre: "Sejarah",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
                title: "Filosofi Teras",
                author: "Henry Manampiring",
                genre: "Pengembangan Diri",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80",
                title: "Ayat-Ayat Cinta",
                author: "Habiburrahman El Shirazy",
                genre: "Religi",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&q=80",
                title: "Negeri 5 Menara",
                author: "Ahmad Fuadi",
                genre: "Inspiratif",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80",
                title: "Perahu Kertas",
                author: "Dee Lestari",
                genre: "Romance",
              },
            ].map((book, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                      {book.genre}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    oleh {book.author}
                  </p>
                  <Link href={user ? "/dashboard" : "/sign-in"}>
                    <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      {user ? "Baca Sekarang" : "Masuk untuk Membaca"}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium">
              Lihat Semua Koleksi
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Mengapa Memilih EbookDes?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform pembaca e-book terdepan dengan fitur-fitur canggih untuk
              pengalaman membaca yang tak terlupakan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Akses Instan",
                description: "Baca langsung tanpa perlu download",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Aman & Terpercaya",
                description: "Data pribadi Anda terlindungi",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Komunitas Pembaca",
                description: "Bergabung dengan ribuan pembaca",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Kualitas Terjamin",
                description: "E-book berkualitas tinggi",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">E-book Tersedia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Pembaca Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-blue-100">Rating Pengguna</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memulai Petualangan Membaca?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pembaca yang telah mempercayai EbookDes
            sebagai platform membaca favorit mereka.
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Daftar Gratis Sekarang
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
