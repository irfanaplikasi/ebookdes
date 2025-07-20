import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import PDFReader from "@/components/pdf-reader";

interface ReadPageProps {
  params: {
    id: string;
  };
}

export default async function ReadPage({ params }: ReadPageProps) {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get e-book details
  const { data: ebook } = await serviceSupabase
    .from("ebooks")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!ebook) {
    return redirect("/dashboard");
  }

  // Get or create reading progress
  const { data: progress } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("ebook_id", params.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold text-lg">{ebook.title}</h1>
              <p className="text-sm text-gray-600">oleh {ebook.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {progress ? `Halaman ${progress.current_page}` : "Halaman 1"}
            </span>
          </div>
        </div>
      </header>

      {/* PDF Reader */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <PDFReader
            pdfUrl={ebook.pdf_url}
            ebookId={ebook.id}
            initialPage={progress?.current_page || 1}
          />
        </div>
      </main>
    </div>
  );
}
