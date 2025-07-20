CREATE TABLE IF NOT EXISTS public.ebooks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    author text NOT NULL,
    description text,
    genre text,
    cover_image_url text,
    pdf_url text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_by uuid REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) UNIQUE,
    role text NOT NULL DEFAULT 'user',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.reading_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id),
    ebook_id uuid REFERENCES public.ebooks(id),
    current_page integer DEFAULT 1,
    total_pages integer,
    last_read_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, ebook_id)
);

alter publication supabase_realtime add table ebooks;
alter publication supabase_realtime add table user_roles;
alter publication supabase_realtime add table reading_progress;

INSERT INTO public.ebooks (title, author, description, genre, cover_image_url, pdf_url) VALUES
('Laskar Pelangi', 'Andrea Hirata', 'Novel tentang perjuangan anak-anak Belitung untuk mendapatkan pendidikan', 'Novel', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Novel sejarah tentang kehidupan di masa kolonial Belanda', 'Sejarah', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
('Filosofi Teras', 'Henry Manampiring', 'Buku pengembangan diri berdasarkan filosofi Stoikisme', 'Pengembangan Diri', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
('Ayat-Ayat Cinta', 'Habiburrahman El Shirazy', 'Novel religi tentang cinta dan kehidupan', 'Religi', 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
('Negeri 5 Menara', 'Ahmad Fuadi', 'Novel inspiratif tentang pendidikan dan persahabatan', 'Inspiratif', 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&q=80', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
('Perahu Kertas', 'Dee Lestari', 'Novel romance tentang cinta dan mimpi', 'Romance', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
