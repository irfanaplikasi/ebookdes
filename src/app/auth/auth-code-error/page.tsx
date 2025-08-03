import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Terjadi Kesalahan Autentikasi
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Maaf, terjadi kesalahan saat memproses login Anda.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/sign-in">
            <Button className="w-full">Kembali ke Halaman Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
