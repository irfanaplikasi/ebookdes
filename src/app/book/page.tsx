import { createClient, createServiceClient } from "../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function BookPage() {
  // Use service client to bypass RLS for public book display
  const supabase = createServiceClient();

  // Get featured books with better error handling
  console.log("Fetching books from Supabase...");
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase client initialized:", !!supabase);

  const { data: books, error } = await supabase
    .from("ebooks")
    .select("*")
    .limit(6);

  console.log("Supabase books response:", {
    data: books,
    error,
    dataLength: books?.length,
    hasData: !!books && books.length > 0,
  });

  if (error) {
    console.error("Error fetching books:", error);
    console.error("Error details:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }

  console.log("Books data received:", books);
  console.log("Number of books:", books?.length || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Koleksi E-book Indonesia
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan ribuan e-book berkualitas dalam bahasa Indonesia. Dari
              novel, non-fiksi, hingga buku akademis.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
            <p className="text-gray-600">E-book Tersedia</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Download className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50K+</h3>
            <p className="text-gray-600">Total Unduhan</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8</h3>
            <p className="text-gray-600">Rating Rata-rata</p>
          </div>
        </div>

        {/* Featured Books */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            E-book Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books && books.length > 0
              ? books.map((book) => (
                  <Card
                    key={book.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        {book.cover_image_url ? (
                          <Image
                            src={book.cover_image_url}
                            alt={book.title}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>oleh {book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {book.description || "Deskripsi tidak tersedia"}
                      </p>
                      <Link href={`/read/${book.id}`}>
                        <Button className="w-full">Baca Sekarang</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              : // Placeholder cards if no books
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-gray-400" />
                      </div>
                      <CardTitle className="text-lg">
                        Contoh E-book {i + 1}
                      </CardTitle>
                      <CardDescription>oleh Penulis Indonesia</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Deskripsi singkat tentang e-book ini yang menarik untuk
                        dibaca.
                      </p>
                      <Button className="w-full" disabled>
                        Segera Hadir
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mulai Membaca Hari Ini
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Bergabunglah dengan ribuan pembaca lainnya dan nikmati pengalaman
            membaca digital terbaik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="px-8">
                Daftar Gratis
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8">
                Jelajahi Koleksi
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
