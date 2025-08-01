# EbookDes - Platform Pembaca E-book Indonesia

EbookDes adalah aplikasi Next.js yang memungkinkan pengguna untuk membaca e-book dalam format PDF dengan antarmuka yang sepenuhnya berbahasa Indonesia, dilengkapi dengan sistem autentikasi dan panel admin untuk mengelola konten.

## 🚀 Fitur Utama

- **Halaman Utama** - Menampilkan daftar e-book dengan gambar sampul, judul, dan tombol login/register yang menonjol
- **PDF Reader** - Pembaca PDF yang responsif dengan kontrol navigasi halaman dan opsi zoom untuk pengalaman membaca yang nyaman
- **Panel Admin** - Antarmuka intuitif untuk mengunggah, mengedit, dan menghapus e-book serta file PDF
- **Sistem Autentikasi** - Menggunakan Supabase Auth dengan opsi login menggunakan email/password
- **Rute Dinamis** - Halaman detail buku dengan informasi lengkap dan tombol "Baca Sekarang"
- **Manajemen Konten** - Admin dapat mengelola konten aplikasi seperti judul hero, deskripsi, dan informasi kontak

## 🛠️ Teknologi yang Digunakan

- **Next.js 14** - Framework React dengan App Router
- **Supabase** - Database dan autentikasi
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Radix UI** - Komponen UI
- **Lucide React** - Icons

## 📋 Prasyarat

- Node.js 18+ 
- npm atau yarn
- Akun Supabase

## ⚙️ Instalasi dan Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd ebookdes
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` dan tambahkan variabel berikut:
```env
SUPABASE_PROJECT_ID=your_project_id
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Setup Database
Jalankan migrasi database Supabase:
```bash
# Pastikan Supabase CLI terinstall
npx supabase db push
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 👥 Penggunaan untuk Pengguna

### Registrasi dan Login
1. Kunjungi halaman utama aplikasi
2. Klik tombol **"Masuk"** atau **"Daftar"**
3. Isi form registrasi dengan email dan password
4. Setelah registrasi, login dengan kredensial yang telah dibuat

### Membaca E-book
1. Setelah login, Anda akan melihat daftar e-book yang tersedia
2. Klik pada e-book yang ingin dibaca
3. Anda akan diarahkan ke halaman detail e-book
4. Klik tombol **"Baca Sekarang"** untuk membuka PDF reader
5. Gunakan kontrol navigasi untuk:
   - Pindah halaman (tombol Previous/Next)
   - Zoom in/out
   - Kembali ke daftar e-book

### Navigasi Aplikasi
- **Beranda** - Daftar e-book yang tersedia
- **Buku** - Halaman khusus untuk menjelajahi koleksi buku
- **Kontak** - Informasi kontak dan cara menghubungi admin
- **Profil** - Pengaturan akun pengguna

## 👨‍💼 Panduan Admin

### Akses Panel Admin
1. Login dengan akun admin (email: admin@ebookdes.com)
2. Setelah login, klik menu **"Dashboard"** di navbar
3. Anda akan diarahkan ke panel admin

### Mengelola E-book

#### Menambah E-book Baru
1. Di dashboard admin, cari bagian **"Manajemen E-book"**
2. Klik tombol **"Tambah E-book Baru"**
3. Isi form dengan informasi berikut:
   - Judul e-book
   - Deskripsi
   - Penulis
   - Upload file PDF
   - Upload gambar sampul
4. Klik **"Simpan"** untuk menyimpan e-book

#### Mengedit E-book
1. Di daftar e-book admin, klik tombol **"Edit"** pada e-book yang ingin diubah
2. Ubah informasi yang diperlukan
3. Klik **"Update"** untuk menyimpan perubahan

#### Menghapus E-book
1. Di daftar e-book admin, klik tombol **"Hapus"** pada e-book yang ingin dihapus
2. Konfirmasi penghapusan
3. E-book akan dihapus dari sistem

### Mengelola Konten Aplikasi

#### Pengaturan Aplikasi
Di dashboard admin, Anda dapat mengelola:

1. **Nama Aplikasi**
   - Ubah nama aplikasi yang ditampilkan di header

2. **Hero Section**
   - Edit judul utama halaman beranda
   - Edit deskripsi hero section

3. **Fitur Aplikasi**
   - Edit judul bagian fitur
   - Tambah/edit deskripsi fitur

4. **Informasi Kontak**
   - Email kontak
   - Nomor telepon
   - Alamat kantor

5. **Halaman Tentang**
   - Edit judul halaman tentang
   - Edit deskripsi aplikasi
   - Edit misi dan visi

#### Cara Mengubah Konten
1. Di dashboard admin, scroll ke bagian **"Pengaturan Aplikasi"**
2. Klik pada bagian yang ingin diubah
3. Edit teks sesuai kebutuhan
4. Klik **"Simpan Perubahan"**
5. Perubahan akan langsung terlihat di aplikasi

### Mengelola Pengguna
1. Di dashboard admin, akses bagian **"Manajemen Pengguna"**
2. Lihat daftar pengguna yang terdaftar
3. Anda dapat:
   - Melihat detail pengguna
   - Menonaktifkan akun pengguna
   - Mengubah role pengguna (admin/user)

## 📊 Database Schema

### Tabel Utama
- `ebooks` - Menyimpan informasi e-book
- `page_contents` - Menyimpan konten halaman yang dapat diubah admin
- `auth.users` - Tabel pengguna Supabase
- `public.users` - Profil pengguna tambahan

## 🔒 Keamanan

- Autentikasi menggunakan Supabase Auth
- Row Level Security (RLS) untuk proteksi data
- Admin role untuk akses terbatas ke fitur manajemen
- Validasi input pada semua form

## 🚀 Deployment

### Deploy ke Vercel
1. Push kode ke repository Git
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy aplikasi

### Deploy ke Platform Lain
1. Build aplikasi: `npm run build`
2. Start aplikasi: `npm start`
3. Pastikan environment variables sudah diset

## 🐛 Troubleshooting

### Masalah Umum

**Error: Supabase connection failed**
- Pastikan environment variables sudah benar
- Cek koneksi internet
- Verifikasi URL dan API key Supabase

**Error: PDF tidak bisa dibuka**
- Pastikan file PDF valid dan tidak corrupt
- Cek ukuran file (maksimal yang diizinkan)
- Pastikan format file adalah PDF

**Error: Login gagal**
- Cek kredensial email dan password
- Pastikan akun sudah terdaftar
- Cek konfigurasi Supabase Auth

## 📞 Support

Jika mengalami masalah atau butuh bantuan:
- Email: support@ebookdes.com
- Buat issue di repository GitHub
- Hubungi admin melalui halaman kontak

## 📝 Lisensi

Aplikasi ini dilisensikan di bawah [MIT License](LICENSE)

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

---

**EbookDes** - Platform E-book Indonesia yang Modern dan User-Friendly
=======
# EbookDes - Platform Pembaca E-book Indonesia

EbookDes adalah aplikasi Next.js yang memungkinkan pengguna untuk membaca e-book dalam format PDF dengan antarmuka yang sepenuhnya berbahasa Indonesia, dilengkapi dengan sistem autentikasi dan panel admin untuk mengelola konten.

## 🚀 Fitur Utama

- **Halaman Utama** - Menampilkan daftar e-book dengan gambar sampul, judul, dan tombol login/register yang menonjol
- **PDF Reader** - Pembaca PDF yang responsif dengan kontrol navigasi halaman dan opsi zoom untuk pengalaman membaca yang nyaman
- **Panel Admin** - Antarmuka intuitif untuk mengunggah, mengedit, dan menghapus e-book serta file PDF
- **Sistem Autentikasi** - Menggunakan Supabase Auth dengan opsi login menggunakan email/password
- **Rute Dinamis** - Halaman detail buku dengan informasi lengkap dan tombol "Baca Sekarang"
- **Manajemen Konten** - Admin dapat mengelola konten aplikasi seperti judul hero, deskripsi, dan informasi kontak

## 🛠️ Teknologi yang Digunakan

- **Next.js 14** - Framework React dengan App Router
- **Supabase** - Database dan autentikasi
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Radix UI** - Komponen UI
- **Lucide React** - Icons

## 📋 Prasyarat

- Node.js 18+ 
- npm atau yarn
- Akun Supabase

## ⚙️ Instalasi dan Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd ebookdes
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` dan tambahkan variabel berikut:
```env
SUPABASE_PROJECT_ID=your_project_id
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Setup Database
Jalankan migrasi database Supabase:
```bash
# Pastikan Supabase CLI terinstall
npx supabase db push
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 👥 Penggunaan untuk Pengguna

### Registrasi dan Login
1. Kunjungi halaman utama aplikasi
2. Klik tombol **"Masuk"** atau **"Daftar"**
3. Isi form registrasi dengan email dan password
4. Setelah registrasi, login dengan kredensial yang telah dibuat

### Membaca E-book
1. Setelah login, Anda akan melihat daftar e-book yang tersedia
2. Klik pada e-book yang ingin dibaca
3. Anda akan diarahkan ke halaman detail e-book
4. Klik tombol **"Baca Sekarang"** untuk membuka PDF reader
5. Gunakan kontrol navigasi untuk:
   - Pindah halaman (tombol Previous/Next)
   - Zoom in/out
   - Kembali ke daftar e-book

### Navigasi Aplikasi
- **Beranda** - Daftar e-book yang tersedia
- **Buku** - Halaman khusus untuk menjelajahi koleksi buku
- **Kontak** - Informasi kontak dan cara menghubungi admin
- **Profil** - Pengaturan akun pengguna

## 👨‍💼 Panduan Admin

### Akses Panel Admin
1. Login dengan akun admin (email: admin@ebookdes.com)
2. Setelah login, klik menu **"Dashboard"** di navbar
3. Anda akan diarahkan ke panel admin

### Mengelola E-book

#### Menambah E-book Baru
1. Di dashboard admin, cari bagian **"Manajemen E-book"**
2. Klik tombol **"Tambah E-book Baru"**
3. Isi form dengan informasi berikut:
   - Judul e-book
   - Deskripsi
   - Penulis
   - Upload file PDF
   - Upload gambar sampul
4. Klik **"Simpan"** untuk menyimpan e-book

#### Mengedit E-book
1. Di daftar e-book admin, klik tombol **"Edit"** pada e-book yang ingin diubah
2. Ubah informasi yang diperlukan
3. Klik **"Update"** untuk menyimpan perubahan

#### Menghapus E-book
1. Di daftar e-book admin, klik tombol **"Hapus"** pada e-book yang ingin dihapus
2. Konfirmasi penghapusan
3. E-book akan dihapus dari sistem

### Mengelola Konten Aplikasi

#### Pengaturan Aplikasi
Di dashboard admin, Anda dapat mengelola:

1. **Nama Aplikasi**
   - Ubah nama aplikasi yang ditampilkan di header

2. **Hero Section**
   - Edit judul utama halaman beranda
   - Edit deskripsi hero section

3. **Fitur Aplikasi**
   - Edit judul bagian fitur
   - Tambah/edit deskripsi fitur

4. **Informasi Kontak**
   - Email kontak
   - Nomor telepon
   - Alamat kantor

5. **Halaman Tentang**
   - Edit judul halaman tentang
   - Edit deskripsi aplikasi
   - Edit misi dan visi

#### Cara Mengubah Konten
1. Di dashboard admin, scroll ke bagian **"Pengaturan Aplikasi"**
2. Klik pada bagian yang ingin diubah
3. Edit teks sesuai kebutuhan
4. Klik **"Simpan Perubahan"**
5. Perubahan akan langsung terlihat di aplikasi

### Mengelola Pengguna
1. Di dashboard admin, akses bagian **"Manajemen Pengguna"**
2. Lihat daftar pengguna yang terdaftar
3. Anda dapat:
   - Melihat detail pengguna
   - Menonaktifkan akun pengguna
   - Mengubah role pengguna (admin/user)

## 📊 Database Schema

### Tabel Utama
- `ebooks` - Menyimpan informasi e-book
- `page_contents` - Menyimpan konten halaman yang dapat diubah admin
- `auth.users` - Tabel pengguna Supabase
- `public.users` - Profil pengguna tambahan

## 🔒 Keamanan

- Autentikasi menggunakan Supabase Auth
- Row Level Security (RLS) untuk proteksi data
- Admin role untuk akses terbatas ke fitur manajemen
- Validasi input pada semua form

## 🚀 Deployment

### Deploy ke Vercel
1. Push kode ke repository Git
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy aplikasi

### Deploy ke Platform Lain
1. Build aplikasi: `npm run build`
2. Start aplikasi: `npm start`
3. Pastikan environment variables sudah diset

## 🐛 Troubleshooting

### Masalah Umum

**Error: Supabase connection failed**
- Pastikan environment variables sudah benar
- Cek koneksi internet
- Verifikasi URL dan API key Supabase

**Error: PDF tidak bisa dibuka**
- Pastikan file PDF valid dan tidak corrupt
- Cek ukuran file (maksimal yang diizinkan)
- Pastikan format file adalah PDF

**Error: Login gagal**
- Cek kredensial email dan password
- Pastikan akun sudah terdaftar
- Cek konfigurasi Supabase Auth

---

**EbookDes** - Platform E-book Indonesia yang Modern dan User-Friendly
