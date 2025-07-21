CREATE TABLE IF NOT EXISTS page_contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_page_contents_page_type ON page_contents(page_type);

alter publication supabase_realtime add table page_contents;

INSERT INTO page_contents (page_type, content) VALUES 
('about', '<h1>Tentang EbookDes</h1><p>Platform pembaca e-book digital pertama di Indonesia.</p>'),
('contact', '<h1>Hubungi Kami</h1><p>Tim kami siap membantu Anda 24/7.</p>')
ON CONFLICT (page_type) DO NOTHING;
