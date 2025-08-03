import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteEbook } from "../actions";

export default async function DashboardPage() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: ebooks } = await supabase
    .from("ebooks")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard eBook</h1>

      <form action="/dashboard" method="POST">
        <input type="hidden" name="action" value="add" />
        <input type="text" name="title" placeholder="Judul" className="border p-2 mr-2" required />
        <input type="text" name="author" placeholder="Penulis" className="border p-2 mr-2" required />
        <input type="url" name="link" placeholder="Link" className="border p-2 mr-2" required />
        <button formAction="/api/ebook/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {ebooks?.map((ebook) => (
          <li key={ebook.id} className="border p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{ebook.title}</h2>
                <p className="text-sm text-gray-600">{ebook.author}</p>
                <a href={ebook.link} target="_blank" className="text-blue-500 underline text-sm">
                  Lihat
                </a>
              </div>
              <form>
                <button
                  formAction={async () => {
                    "use server";
                    await deleteEbook(ebook.id);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
