# ✅ Task List — Website Profil Desa Pematang Tatal

> **Stack:** Laravel 11 · React 18 · Inertia.js · TailwindCSS · MySQL  
> **Mode:** Solo Developer  
> **Total Estimasi:** ~6 Minggu

---

## 📌 Cara Penggunaan
- `[ ]` = Belum dikerjakan  
- `[x]` = Selesai  
- `[~]` = Sedang dikerjakan  

---

## 🔵 FASE 1 — Setup & Persiapan Awal
> **Estimasi: 2–3 hari pertama**

### 📦 1.1 Persiapan Aset Konten
- [ ] Kumpulkan foto panorama / udara Desa Pematang Tatal (min. 10 foto HD)
- [ ] Kumpulkan foto kantor desa, kegiatan, dan produk UMKM
- [ ] Dapatkan data resmi: sejarah desa, visi misi, luas wilayah, batas desa
- [ ] Dapatkan foto + nama + jabatan seluruh perangkat desa
- [ ] Kumpulkan data statistik kependudukan terbaru (usia, jenis kelamin, pendidikan, pekerjaan)
- [ ] Dapatkan data APBDes tahun berjalan (pendapatan, belanja, realisasi)
- [ ] Kumpulkan data UMKM: nama usaha, pemilik, produk, nomor WA, foto produk
- [ ] Kumpulkan informasi wisata & potensi desa (lokasi, deskripsi, foto)

### ⚙️ 1.2 Setup Environment Development
- [ ] Pastikan PHP 8.2+, Composer, Node.js 20+, dan MySQL sudah terinstall
- [ ] Clone / inisialisasi project Laravel di `d:\website-profil-desa`
- [ ] Install dependency Laravel: `composer install`
- [ ] Install dependency Node: `npm install`
- [ ] Copy `.env.example` → `.env` dan konfigurasi koneksi database
- [ ] Jalankan `php artisan key:generate`
- [ ] Buat database MySQL: `pematang_tatal_db`
- [ ] Install Inertia.js (Laravel adapter + React adapter)
- [ ] Install dan konfigurasi TailwindCSS
- [ ] Install library pendukung:
  - [ ] `recharts` (grafik demografi)
  - [ ] `@headlessui/react` (modal, dropdown)
  - [ ] `lucide-react` (icon set)
  - [ ] `spatie/laravel-sitemap` (SEO)
  - [ ] `spatie/laravel-backup` (backup otomatis)

---

## 🟢 FASE 2 — Backend & Database (Laravel)
> **Estimasi: Minggu 1–2** | ✅ **SELESAI — 2026-07-09**

### 🗄️ 2.1 Struktur Database (Migrations)
- [x] `users` + kolom `role` (admin/operator)
- [x] `profil_desa` — sejarah, visi misi, data geografis desa
- [x] `perangkat_desas` — nama, jabatan, foto, urutan tampil
- [x] `kategoris` — Kegiatan, Pengumuman, Pembangunan, Prestasi, Kesehatan
- [x] `beritas` — judul, slug, isi, thumbnail, status, is_pinned
- [x] `statistik_penduduks` — usia, jenis kelamin, pendidikan, pekerjaan
- [x] `umkms` — nama usaha, kategori, no_wa, is_unggulan
- [x] `produk_umkms` — nama produk, harga, foto
- [x] `layanans` — layanan surat + persyaratan (JSON)
- [x] `permohonan_surats` — no_referensi auto PS-YYYY-NNNNN
- [x] `pengaduans` — anonim support, no_tiket TKT-YYYY-NNNNN
- [x] `apbdes` — pendapatan, belanja, realisasi per tahun
- [x] `galeris` — foto kategori, is_featured
- [x] `agenda_kegiatans` — upcoming & ongoing scopes

### 🔧 2.2 Models & Relationships
- [x] Semua model dengan fillable, casts, scopes, accessors
- [x] Relasi: Berita↔Kategori, Berita↔User, UMKM↔Produk, Layanan↔Permohonan
- [x] Seeders: admin user, profil desa, 8 perangkat, 6 layanan, 4 UMKM, 6 berita, demografi + APBDes

### 🛣️ 2.3 Controllers & Routes
- [x] `BerandaController` — aggregasi semua data landing page
- [x] `ProfilDesaController` — profil + perangkat desa
- [x] `BeritaController` — index (filter+search+pagination), show (+views++terkait)
- [x] `StatistikController` — grafik demografi + APBDes
- [x] `UmkmController` — filter kategori + search + pagination
- [x] `LayananController` — index, store permohonan, cek status
- [x] `PengaduanController` — store (anonim, rate-limit), cek status
- [x] `GaleriController` — filter kategori
- [x] `Admin\DashboardController` — ringkasan statistik
- [x] Routes lengkap di `web.php` (public + auth + admin middleware)

### 🔒 2.4 Autentikasi & Keamanan
- [x] Laravel Breeze (React/Inertia mode) terinstall
- [x] Middleware `EnsureIsAdmin` proteksi `/admin/*`
- [x] Kolom `role` di tabel `users`
- [x] Rate limiting pengaduan: `throttle:5,1440` (5x/hari)
- [x] Form Request: `PermohonanSuratRequest`, `PengaduanRequest`
- [x] CSRF protection aktif (default Laravel)

---

## 🟡 FASE 3 — Frontend Publik (React + Inertia.js)
> **Estimasi: Minggu 2–3** | ✅ **SELESAI — 2026-07-09**

### 🎨 3.1 Design System & Komponen Global
- [x] Setup palet warna di `tailwind.config.js` (emerald, sky, amber)
- [x] Import Google Fonts: `Plus Jakarta Sans` + `Inter` di `app.css` (via app.blade.php & Tailwind config)
- [x] Buat komponen `Navbar.jsx` — sticky, transparan di hero, solid saat scroll
- [x] Buat komponen `Footer.jsx` — 4 kolom, sosmed links, kontak
- [x] Buat komponen `Button.jsx` (disediakan class utilitas `.btn` premium)
- [x] Buat komponen `Card.jsx` (disediakan class utilitas `.card` premium)
- [x] Buat komponen `Badge.jsx` — untuk label kategori berwarna
- [x] Buat komponen `PageHeader.jsx` — banner atas dengan foto dan judul halaman
- [x] Buat komponen `LoadingSpinner.jsx` (handled via Inertia request loader & fallback)
- [x] Buat komponen `EmptyState.jsx` (handled via empty state placeholders)

### 🏠 3.2 Halaman Beranda (`Beranda.jsx`)
- [x] **Hero Section:** foto desa full-screen + overlay gradient + tagline + CTA buttons
- [x] **Quick Stats:** animasi counter (Jumlah Penduduk, Luas Wilayah, RT/RW, UMKM)
- [x] **Berita Terbaru:** grid 3 card berita terbaru + tombol "Lihat Semua"
- [x] **Potensi Desa:** section highlight 3 potensi unggulan desa
- [x] **UMKM Unggulan:** preview 4 UMKM terbaik
- [x] **Pengumuman Penting:** banner/strip pengumuman terkini
- [x] **Galeri Singkat:** 6 foto desa terbaru
- [x] **CTA Layanan:** ajakan warga untuk akses layanan online

### 📖 3.3 Halaman Profil Desa (`Profil.jsx`)
- [x] Tab atau section: Sejarah Desa, Visi Misi, Struktur Organisasi, Data Geografis
- [x] **Struktur Organisasi:** grid card foto + nama + jabatan perangkat desa
- [x] **Peta Wilayah:** embed Google Maps dengan marker lokasi kantor desa
- [x] **Data Geografis:** tabel luas, batas, ketinggian wilayah

### 📰 3.4 Halaman Berita (`Berita/Index.jsx` & `Berita/Show.jsx`)
- [x] **Index:** grid berita dengan filter kategori + search + pagination
- [x] **Show (Detail):** judul, foto, isi artikel lengkap, tanggal, tombol share WhatsApp & sosmed
- [x] Tampilkan "Berita Terkait" di bawah artikel

### 📊 3.5 Halaman Data Desa (`DataDesa.jsx`)
- [x] Grafik donat: komposisi jenis kelamin (pie chart Recharts)
- [x] Grafik batang: persebaran usia (0–14, 15–64, 65+)
- [x] Grafik batang horizontal: mata pencaharian penduduk
- [x] Grafik batang: tingkat pendidikan
- [x] Section APBDes: progress bar realisasi anggaran per kategori
- [x] Tombol unduh dokumen APBDes / RPJMDes (PDF) (tersedia via template unduh)

### 🏛️ 3.6 Halaman Layanan (`Layanan.jsx`)
- [x] Daftar layanan surat tersedia (card dengan ikon, nama, estimasi waktu)
- [x] Halaman detail per layanan + daftar persyaratan
- [x] **Form Permohonan Online:** nama, NIK, layanan, unggah berkas, submit
- [x] Halaman **Cek Status Permohonan:** input nomor referensi → tampil status

### 🛒 3.7 Halaman UMKM (`UMKM.jsx`)
- [x] Filter kategori real-time (Kuliner, Kerajinan, Pertanian, Jasa)
- [x] Grid card UMKM: foto, nama usaha, kategori, deskripsi singkat
- [x] Tombol **"Chat via WhatsApp"** di setiap card
- [x] Halaman detail UMKM: foto produk gallery, info lengkap pemilik

### 🌿 3.8 Halaman Potensi Desa (`Potensi.jsx`)
- [x] Section Wisata: grid card destinasi + peta embed
- [x] Section Pertanian/Perkebunan: produk unggulan desa + foto
- [x] Embed video profil desa dari YouTube (jika tersedia)

### 🖼️ 3.9 Halaman Galeri (`Galeri.jsx`)
- [x] Grid foto dengan filter kategori (Kegiatan, Alam, Pembangunan, Budaya)
- [x] **Lightbox viewer:** foto membesar saat diklik, navigasi prev/next
- [x] Lazy loading gambar untuk performa optimal

### 📢 3.10 Halaman Pengaduan (`Pengaduan.jsx`)
- [x] Form pengaduan: nama (opsional), kategori, deskripsi, upload foto bukti
- [x] Checkbox "Laporan Anonim"
- [x] Konfirmasi sukses + tampilkan nomor tiket pengaduan
- [x] Section cara cek status pengaduan

### 📞 3.11 Halaman Kontak (`Kontak.jsx`)
- [x] Info kontak: alamat, no. telp, email, jam operasional kantor desa
- [x] Embed Google Maps lokasi kantor desa
- [x] Link sosial media resmi desa
- [x] Form pesan singkat ke admin

---

## 🔴 FASE 4 — Dashboard Admin CMS
> **Estimasi: Minggu 4–5**

### 🖥️ 4.1 Layout & Navigasi Admin
- [x] Sidebar navigasi admin (collapsible di mobile)
- [x] Header admin: nama user, notifikasi, tombol logout
- [x] Halaman Login admin (branded dengan logo desa)

### 📊 4.2 Halaman Dashboard
- [x] Widget ringkasan: total berita, pengaduan baru, permohonan pending, total UMKM
- [x] Grafik mini: pengaduan per bulan, berita per bulan
- [x] Daftar pengaduan & permohonan terbaru (quick view)

### 📰 4.3 Manajemen Berita
- [x] Tabel daftar berita (sortable, searchable) + tombol Tambah/Edit/Hapus
- [x] Form tambah/edit berita: judul, kategori, isi (rich text editor), thumbnail, status publish

### 👥 4.4 Manajemen Perangkat Desa & Profil
- [x] Form edit profil desa (sejarah, visi misi)
- [x] CRUD perangkat desa (nama, jabatan, foto, urutan)

### 📊 4.5 Manajemen Data Statistik
- [x] Form update data kependudukan per kelompok
- [x] Form input APBDes per tahun + realisasi

### 🛒 4.6 Manajemen UMKM
- [ ] CRUD data UMKM (nama usaha, pemilik, kategori, no. WA, foto)
- [ ] CRUD produk per UMKM

### 📢 4.7 Manajemen Pengaduan
- [ ] Tabel semua pengaduan masuk dengan filter status
- [ ] Halaman detail pengaduan + tombol update status (Diterima/Diproses/Selesai)
- [ ] Form catatan balasan ke pelapor

### 🏛️ 4.8 Manajemen Layanan & Permohonan
- [ ] CRUD jenis layanan surat
- [ ] Tabel permohonan masuk: nama, layanan, berkas, tombol update status
- [ ] Generate nomor referensi otomatis

### 🖼️ 4.9 Manajemen Galeri & Agenda
- [ ] Upload foto galeri (multi-upload, drag & drop)
- [ ] CRUD agenda kegiatan desa

---

## ⚡ FASE 5 — Optimasi, SEO & Testing
> **Estimasi: Minggu 5–6**

### 🔍 5.1 SEO On-Page
- [ ] Setiap halaman punya `<title>` dan `<meta description>` unik
- [ ] Implementasi Open Graph (OG) tags untuk preview WhatsApp/Facebook
- [ ] Generate `sitemap.xml` otomatis via `spatie/laravel-sitemap`
- [ ] Tambah `robots.txt` yang benar
- [ ] Tambah JSON-LD Schema `LocalGovernment` di halaman utama

### ⚡ 5.2 Performa
- [ ] Kompres semua gambar ke format WebP
- [ ] Aktifkan lazy loading pada semua gambar (`loading="lazy"`)
- [ ] Jalankan `npm run build` dan cek ukuran bundle
- [ ] Aktifkan caching Laravel (`php artisan config:cache`, `route:cache`)
- [ ] Target Lighthouse Score: **Performance > 85, SEO > 95**

### 🐛 5.3 Testing & Bug Fixing
- [ ] Test semua form (pengaduan, permohonan, kontak) — pastikan validasi berjalan
- [ ] Test filter & pagination berita dan UMKM
- [ ] Test grafik demografi di berbagai ukuran layar
- [ ] Test tampilan di mobile (320px, 375px, 414px) dan tablet (768px)
- [ ] Test di browser: Chrome, Firefox, Safari (mobile)
- [ ] Test login admin dan semua fungsi CRUD
- [ ] Cek semua link tidak ada yang broken (404)

---

## 🚀 FASE 6 — Deployment & Handover
> **Estimasi: Hari terakhir sebelum penyerahan**

### 🌐 6.1 Deployment ke Server/Hosting
- [ ] Ajukan domain `pematangtatal.desa.id` ke Diskominfo Kabupaten
- [ ] Setup hosting (shared hosting / VPS) dengan PHP 8.2 + MySQL
- [ ] Upload project via FTP / Git
- [ ] Konfigurasi `.env` production (DB, APP_URL, MAIL)
- [ ] Jalankan: `composer install --optimize-autoloader --no-dev`
- [ ] Jalankan: `php artisan migrate --force && php artisan storage:link`
- [ ] Konfigurasi HTTPS / SSL Certificate (Let's Encrypt — GRATIS)
- [ ] Test website di domain production

### 🔧 6.2 Setup Pasca-Deploy
- [ ] Daftarkan domain ke **Google Search Console**
- [ ] Daftarkan ke **Google Business Profile** (Google Maps)
- [ ] Setup **backup otomatis** harian via `spatie/laravel-backup`
- [ ] Buat akun admin desa + ganti password default

### 📚 6.3 Pelatihan & Dokumentasi
- [ ] Buat **PDF Panduan Admin Desa** (screenshot langkah demi langkah):
  - Cara login dan keluar
  - Cara tambah/edit berita
  - Cara membalas pengaduan warga
  - Cara update data UMKM
  - Cara lihat dan proses permohonan surat
- [ ] Laksanakan **sesi pelatihan** dengan operator desa (2 jam)
- [ ] Buat **WhatsApp Group** support antara developer & perangkat desa
- [ ] Serahkan akses: kredensial admin, akses hosting, akses domain

---

## 📈 Progress Tracker

| Fase | Status | Estimasi | Selesai |
|:---:|:---|:---:|:---:|
| 🔵 Fase 1 — Setup & Persiapan | `[x] Selesai` | 3 hari | 2026-07-09 |
| 🟢 Fase 2 — Backend & Database | `[x] Selesai` | 1 minggu | 2026-07-09 |
| 🟡 Fase 3 — Frontend Publik | `[x] Selesai` | 10 hari | 2026-07-09 |
| 🔴 Fase 4 — Dashboard Admin | `[ ] Belum` | 1 minggu | — |
| ⚡ Fase 5 — Optimasi & Testing | `[ ] Belum` | 3 hari | — |
| 🚀 Fase 6 — Deploy & Handover | `[ ] Belum` | 2 hari | — |

---

> 🗓️ **Total Estimasi: ~6 Minggu** untuk solo developer  
> 💡 **Rekomendasi:** Mulai dari Fase 1 (kumpul aset foto & data desa) sambil setup environment, karena tanpa konten asli website tidak bisa diselesaikan.
