-- Disable RLS for ebooks table to allow public read access
ALTER TABLE public.ebooks DISABLE ROW LEVEL SECURITY;

-- Add some indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ebooks_created_at ON public.ebooks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ebooks_genre ON public.ebooks(genre);
CREATE INDEX IF NOT EXISTS idx_ebooks_author ON public.ebooks(author);
