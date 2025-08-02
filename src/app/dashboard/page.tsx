"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createEbookAction,
  updateEbookAction,
  deleteEbookAction,
  updatePageContentAction,
} from "../actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [readingProgress, setReadingProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();

      try {
        // Get user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("Error fetching user:", userError?.message);
          router.push("/sign-in");
          return;
        }

        setUser(user);

        // Get user role
        const { data: userRole, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (roleError) {
          console.error("Error fetching user role:", roleError.message);
          setIsAdmin(false);
        } else {
          const adminStatus = userRole?.role === "admin";
          console.log("User role:", userRole?.role, "Is admin:", adminStatus);
          setIsAdmin(adminStatus);
        }

        // Get e-books
        const { data: ebooksData, error: ebooksError } = await supabase
          .from("ebooks")
          .select("*")
          .order("created_at", { ascending: false });

        if (ebooksError) {
          console.error("Error fetching ebooks:", {
            message: ebooksError.message,
            details: ebooksError.details,
            hint: ebooksError.hint,
            code: ebooksError.code,
          });
          setError("Gagal memuat e-book. Silakan coba lagi.");
          setEbooks([]);
        } else {
          console.log("Ebooks fetched:", ebooksData?.length || 0);
          setEbooks(ebooksData || []);
        }

        // Get reading progress
        const { data: progressData, error: progressError } = await supabase
          .from("reading_progress")
          .select(
            `
            *,
            ebooks (
              id,
              title,
              author,
              cover_image_url
            )
          `
          )
          .eq("user_id", user.id);

        if (progressError) {
          console.error("Error fetching reading progress:", progressError.message);
          setReadingProgress([]);
        } else {
          setReadingProgress(progressData || []);
        }
      } catch (error) {
        console.error("Unexpected error in loadData:", error);
        setError("Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleDeleteEbook = async (ebookId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus e-book ini?")) {
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append("id", ebookId);

    try {
      const result = await deleteEbookAction(formData);
      if (result?.error) {
        setError(result.error);
        alert(result.error);
        return;
      }
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting ebook:", error);
      const errorMessage = "Gagal menghapus e-book. Silakan coba lagi.";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  if (loading) {
    return (
      <>
        <DashboardNavbar />
        <main className="w-full bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Perpustakaan Saya</h1>
            </div>
            {error && (
              <div className="bg-red-50 text-sm p-3 px-4 rounded-lg text-red-700 flex gap-2 items-center">
                <InfoIcon size="14" />
                <span>{error}</span>
              </div>
            )}
            <div className="bg-blue-50 text-sm p-3 px-4 rounded-lg text-blue-700 flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Selamat datang di perpustakaan digital Anda!
                {isAdmin
                  ? " Anda memiliki akses admin untuk mengelola e-book."
                  : " Nikmati koleksi e-book yang tersedia."}
                {process.env.NODE_ENV === "development" && (
                  <span className="ml-2 text-xs opacity-75">
                    (Debug: {ebooks.length} ebooks loaded, Admin:{" "}
                    {isAdmin ? "Yes" : "No"})
                  </span>
                )}
              </span>
            </div>
          </header>

          {/* Reading Progress Section */}
          {readingProgress.length > 0 && (
            <section className="bg-white rounded-xl p-6 border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sedang Dibaca
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readingProgress.map((progress: any) => (
                  <Card
                    key={progress.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={
                            progress.ebooks?.cover_image_url ||
                            "/placeholder-book.jpg"
                          }
                          alt={progress.ebooks?.title || "E-book"}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">
                            {progress.ebooks?.title || "Unknown Title"}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">
                            {progress.ebooks?.author || "Unknown Author"}
                          </p>
                          <div className="text-xs text-blue-600">
                            Halaman {progress.current_page} dari{" "}
                            {progress.total_pages || "?"}
                          </div>
                          <Link href={`/read/${progress.ebook_id}`}>
                            <Button size="sm" className="mt-2 w-full">
                              Lanjut Baca
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Admin Settings Menu */}
          {isAdmin && (
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-800">
                <Settings className="w-5 h-5" />
                Menu Admin - Pengaturan Aplikasi
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200 bg-purple-50">
                      <CardContent className="p-4 text-center">
                        <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-purple-800">
                          Pengaturan Halaman Utama
                        </h3>
                        <p className="text-sm text-purple-600">
                          Ubah nama aplikasi, konten, dan informasi lainnya
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Pengaturan Halaman Utama</DialogTitle>
                      <DialogDescription>
                        Ubah konten yang ditampilkan di halaman utama aplikasi.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      action={updatePageContentAction}
                      className="space-y-4"
                    >
                      <input type="hidden" name="page_type" value="homepage" />
                      <div className="space-y-2">
                        <Label htmlFor="app_name">Nama Aplikasi</Label>
                        <Input
                          name="app_name"
                          placeholder="EbookDes"
                          defaultValue="EbookDes"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero_title">Judul Hero</Label>
                        <Input
                          name="hero_title"
                          placeholder="Baca E-book Favorit Anda Kapan Saja"
                          defaultValue="Baca E-book Favorit Anda Kapan Saja"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero_description">Deskripsi Hero</Label>
                        <Textarea
                          name="hero_description"
                          placeholder="Platform pembaca e-book terlengkap di Indonesia..."
                          defaultValue="Platform pembaca e-book terlengkap di Indonesia. Nikmati ribuan koleksi buku digital dengan pengalaman membaca yang nyaman dan mudah."
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Simpan Pengaturan
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-indigo-200 bg-indigo-50">
                      <CardContent className="p-4 text-center">
                        <Edit className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-indigo-800">
                          Pengaturan Halaman Tentang
                        </h3>
                        <p className="text-sm text-indigo-600">
                          Ubah konten halaman tentang kami
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Pengaturan Halaman Tentang</DialogTitle>
                      <DialogDescription>
                        Ubah konten yang ditampilkan di halaman tentang kami.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      action={updatePageContentAction}
                      className="space-y-4"
                    >
                      <input type="hidden" name="page_type" value="about" />
                      <div className="space-y-2">
                        <Label htmlFor="about_title">Judul Halaman</Label>
                        <Input
                          name="about_title"
                          placeholder="Tentang EbookDes"
                          defaultValue="Tentang EbookDes"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="about_description">Deskripsi</Label>
                        <Textarea
                          name="about_description"
                          placeholder="Platform pembaca e-book digital pertama di Indonesia..."
                          defaultValue="Platform pembaca e-book digital pertama di Indonesia yang didedikasikan untuk menyediakan akses mudah dan nyaman ke ribuan buku berkualitas dalam bahasa Indonesia."
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Simpan Pengaturan
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </section>
          )}

          {/* Admin E-book CRUD Menu */}
          {isAdmin && (
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <BookOpen className="w-5 h-5" />
                Menu Admin - Kelola E-book
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200 bg-green-50">
                      <CardContent className="p-4 text-center">
                        <Plus className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-green-800">
                          Tambah E-book
                        </h3>
                        <p className="text-sm text-green-600">
                          Tambah e-book baru ke koleksi
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Tambah E-book Baru</DialogTitle>
                      <DialogDescription>
                        Isi form di bawah untuk menambah e-book baru ke koleksi.
                      </DialogDescription>
                    </DialogHeader>
                    <form action={createEbookAction} className="space-y-4">
                      <Input name="title" placeholder="Judul e-book" required />
                      <Input name="author" placeholder="Penulis" required />
                      <Textarea name="description" placeholder="Deskripsi" />
                      <Select name="genre">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Novel">Novel</SelectItem>
                          <SelectItem value="Sejarah">Sejarah</SelectItem>
                          <SelectItem value="Pengembangan Diri">
                            Pengembangan Diri
                          </SelectItem>
                          <SelectItem value="Religi">Religi</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        name="cover_image_url"
                        placeholder="URL gambar sampul"
                      />
                      <Input
                        name="pdf_url"
                        placeholder="URL file PDF"
                        required
                      />
                      <Button type="submit" className="w-full">
                        Tambah E-book
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Edit className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">Edit E-book</h3>
                    <p className="text-sm text-blue-600">
                      Pilih e-book di bawah untuk mengedit
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4 text-center">
                    <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-red-800">Hapus E-book</h3>
                    <p className="text-sm text-red-600">
                      Pilih e-book di bawah untuk menghapus
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* E-books Collection */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Koleksi E-book
              </h2>
              {isAdmin && (
                <div className="text-sm text-gray-500">
                  Total: {ebooks.length} e-book
                </div>
              )}
            </div>

            {ebooks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ebooks.map((ebook: any) => (
                  <Card
                    key={ebook.id}
                    className="hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                      <img
                        src={ebook.cover_image_url || "/placeholder-book.jpg"}
                        alt={ebook.title || "E-book"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        {ebook.genre && (
                          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                            {ebook.genre}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1 text-gray-900 line-clamp-2">
                        {ebook.title || "Unknown Title"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        oleh {ebook.author || "Unknown Author"}
                      </p>
                      {ebook.description && (
                        <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                          {ebook.description}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Link href={`/read/${ebook.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-1" />
                            Baca
                          </Button>
                        </Link>
                        {isAdmin && (
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Edit E-book</DialogTitle>
                                  <DialogDescription>
                                    Edit informasi e-book di bawah ini.
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  action={updateEbookAction}
                                  className="space-y-4"
                                >
                                  <input
                                    type="hidden"
                                    name="id"
                                    value={ebook.id}
                                  />
                                  <Input
                                    name="title"
                                    placeholder="Judul e-book"
                                    defaultValue={ebook.title}
                                    required
                                  />
                                  <Input
                                    name="author"
                                    placeholder="Penulis"
                                    defaultValue={ebook.author}
                                    required
                                  />
                                  <Textarea
                                    name="description"
                                    placeholder="Deskripsi"
                                    defaultValue={ebook.description || ""}
                                  />
                                  <Select
                                    name="genre"
                                    defaultValue={ebook.genre || ""}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Novel">Novel</SelectItem>
                                      <SelectItem value="Sejarah">
                                        Sejarah
                                      </SelectItem>
                                      <SelectItem value="Pengembangan Diri">
                                        Pengembangan Diri
                                      </SelectItem>
                                      <SelectItem value="Religi">Religi</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    name="cover_image_url"
                                    placeholder="URL gambar sampul"
                                    defaultValue={ebook.cover_image_url || ""}
                                  />
                                  <Input
                                    name="pdf_url"
                                    placeholder="URL file PDF"
                                    defaultValue={ebook.pdf_url}
                                    required
                                  />
                                  <Button type="submit" className="w-full">
                                    Update E-book
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteEbook(ebook.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Belum ada e-book
                </h3>
                <p className="text-gray-500 mb-4">
                  Koleksi e-book akan muncul di sini setelah ditambahkan.
                </p>
                {isAdmin && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah E-book Pertama
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Tambah E-book Baru</DialogTitle>
                        <DialogDescription>
                          Isi form di bawah untuk menambah e-book baru ke koleksi.
                        </DialogDescription>
                      </DialogHeader>
                      <form action={createEbookAction} className="space-y-4">
                        <Input
                          name="title"
                          placeholder="Judul e-book"
                          required
                        />
                        <Input name="author" placeholder="Penulis" required />
                        <Textarea name="description" placeholder="Deskripsi" />
                        <Select name="genre">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Novel">Novel</SelectItem>
                            <SelectItem value="Sejarah">Sejarah</SelectItem>
                            <SelectItem value="Pengembangan Diri">
                              Pengembangan Diri
                            </SelectItem>
                            <SelectItem value="Religi">Religi</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          name="cover_image_url"
                          placeholder="URL gambar sampul"
                        />
                        <Input
                          name="pdf_url"
                          placeholder="URL file PDF"
                          required
                        />
                        <Button type="submit" className="w-full">
                          Tambah E-book
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
