"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Home, Search, ArrowLeft, Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white rounded-full p-4 shadow-lg animate-bounce">
                <Frown className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mb-8">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Halaman Tidak Ditemukan
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Maaf, halaman yang Anda cari sepertinya telah berpindah,
                dihapus, atau mungkin tidak pernah ada. Seperti buku yang hilang
                dari rak!
              </p>
            </div>

            {/* Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Coba Cari</h3>
                <p className="text-sm text-gray-600">
                  Gunakan fitur pencarian untuk menemukan e-book yang Anda
                  inginkan
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Ke Beranda</h3>
                <p className="text-sm text-gray-600">
                  Kembali ke halaman utama dan jelajahi koleksi e-book kami
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  Baca E-book
                </h3>
                <p className="text-sm text-gray-600">
                  Lihat daftar e-book populer dan mulai membaca sekarang
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>

              <Link href="/book">
                <Button variant="outline" size="lg" className="px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Jelajahi E-book
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="lg"
                className="px-8"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Halaman Sebelumnya
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fun Quote */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <p className="text-lg italic text-gray-700 mb-2">
            &quot;Tidak ada buku yang benar-benar hilang, hanya menunggu untuk
            ditemukan kembali.&quot;
          </p>
          <p className="text-sm text-gray-500">- Tim EbookDes</p>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-10 left-10 animate-float">
          <div className="w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>
        </div>
        <div
          className="fixed top-20 right-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-6 h-6 bg-pink-400 rounded-full opacity-40"></div>
        </div>
        <div
          className="fixed bottom-20 left-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-5 h-5 bg-blue-400 rounded-full opacity-50"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
