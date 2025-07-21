import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Users,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kami siap membantu Anda! Jangan ragu untuk menghubungi tim
              EbookDes jika ada pertanyaan, saran, atau masalah yang perlu
              diselesaikan.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-600" />
                Kirim Pesan
              </CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan merespons dalam 24 jam.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input id="firstName" placeholder="Masukkan nama depan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input id="lastName" placeholder="Masukkan nama belakang" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nama@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon (Opsional)</Label>
                  <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    placeholder="Apa yang ingin Anda sampaikan?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Informasi Kontak</CardTitle>
                <CardDescription>
                  Berikut adalah cara lain untuk menghubungi kami.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@ebookdes.com</p>
                    <p className="text-gray-600">info@ebookdes.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telepon</h3>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                    <p className="text-gray-600">+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Teknologi Digital No. 123
                      <br />
                      Jakarta Selatan, DKI Jakarta 12345
                      <br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Jam Operasional
                    </h3>
                    <p className="text-gray-600">
                      Senin - Jumat: 09:00 - 18:00 WIB
                      <br />
                      Sabtu: 09:00 - 15:00 WIB
                      <br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Pertanyaan Umum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Bagaimana cara mendaftar akun?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Klik tombol &quot;Daftar&quot; di halaman utama dan isi
                      formulir pendaftaran.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Apakah layanan ini gratis?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Ya, EbookDes menyediakan akses gratis ke ribuan e-book
                      berkualitas.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Bagaimana cara mengunduh e-book?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Saat ini kami menyediakan layanan baca online. Fitur unduh
                      akan segera hadir.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Ikuti Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Telegram
                  </Button>
                  <Button variant="outline" className="justify-start">
                    📘 Facebook
                  </Button>
                  <Button variant="outline" className="justify-start">
                    📷 Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Butuh Bantuan Segera?</h2>
              <p className="text-xl mb-6 opacity-90">
                Tim customer service kami siap membantu Anda 24/7 melalui live
                chat.
              </p>
              <Button size="lg" variant="secondary" className="px-8">
                <MessageCircle className="w-5 h-5 mr-2" />
                Mulai Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
