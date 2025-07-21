import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { User, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold text-blue-600">
          EbookDes
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/book"
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            E-book
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Tentang
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Kontak
          </Link>
          {user ? (
            <>
              <Link href="/dashboard">
                <Button>Perpustakaan Saya</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Masuk
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Daftar Sekarang
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
