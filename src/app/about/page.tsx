import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Target, Heart, Award, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Tentang EbookDes
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Platform pembaca e-book digital pertama di Indonesia yang
              didedikasikan untuk menyediakan akses mudah dan nyaman ke ribuan
              buku berkualitas dalam bahasa Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Menyediakan platform digital yang mudah diakses untuk membaca
                e-book berkualitas tinggi, mendukung literasi digital di
                Indonesia, dan memberikan pengalaman membaca yang menyenangkan
                bagi semua kalangan.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Visi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform e-book terdepan di Indonesia yang menghubungkan
                pembaca dengan konten berkualitas, mendorong budaya membaca, dan
                mendukung perkembangan industri penerbitan digital Indonesia.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Kualitas
              </h3>
              <p className="text-gray-600">
                Kami berkomitmen menyediakan e-book berkualitas tinggi dengan
                konten yang telah dikurasi dengan baik.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Komunitas
              </h3>
              <p className="text-gray-600">
                Membangun komunitas pembaca yang aktif dan saling mendukung
                dalam perjalanan literasi digital.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Dedikasi
              </h3>
              <p className="text-gray-600">
                Dedikasi penuh untuk mengembangkan budaya membaca dan mendukung
                kemajuan literasi di Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <Card className="bg-white shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Cerita Kami</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  EbookDes lahir dari keprihatinan akan rendahnya minat baca di
                  Indonesia dan sulitnya akses terhadap buku-buku berkualitas.
                  Kami percaya bahwa teknologi digital dapat menjadi jembatan
                  untuk mengatasi masalah ini.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Dimulai pada tahun 2024, kami mengembangkan platform yang
                  tidak hanya menyediakan akses mudah ke e-book, tetapi juga
                  memberikan pengalaman membaca yang nyaman dan menyenangkan.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Dengan dukungan penulis dan penerbit lokal, kami terus
                  berkembang menjadi platform e-book terpercaya di Indonesia.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 text-center">
                <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Pencapaian Kami
                </h3>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">
                    1000+ E-book
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    10K+ Pengguna Aktif
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    50+ Penerbit Partner
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tim Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AD</span>
                </div>
                <CardTitle>Ahmad Dani</CardTitle>
                <CardDescription>Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visioner di balik EbookDes dengan pengalaman 10+ tahun di
                  industri teknologi dan penerbitan.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">SR</span>
                </div>
                <CardTitle>Sari Rahayu</CardTitle>
                <CardDescription>Head of Content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ahli kurasi konten dengan latar belakang sastra Indonesia dan
                  pengalaman di industri penerbitan.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">BP</span>
                </div>
                <CardTitle>Budi Pratama</CardTitle>
                <CardDescription>Lead Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Teknisi handal yang memastikan platform EbookDes berjalan
                  dengan lancar dan aman.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bergabunglah dengan Kami
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Mari bersama-sama membangun budaya membaca digital di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="px-8">
                Mulai Membaca
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="px-8">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
