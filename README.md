## Public Upload Storage

Uploaded Berita thumbnails and Perangkat Desa photos are stored on Laravel's `public` disk and served through `/storage/...`. After installing or deploying the application, create the public storage link once:

```bash
php artisan storage:link
```


admin@pematangtatal.desa.id
Admin@PematangTatal2026!



# 🏡 Website Profil Desa Pematang Tatal

> **Stack:** Laravel · React (Inertia.js) · TailwindCSS · MySQL  
> **Status:** 🚧 Dalam Pengembangan  
> **Tujuan:** Membangun platform digital desa yang informatif, modern, dan berkelanjutan.

---

## 📋 Daftar Isi

1. [Visi & Misi Website](#1-visi--misi-website)
2. [Rekomendasi Fitur & Konten](#2-rekomendasi-fitur--konten)
3. [Struktur Halaman](#3-struktur-halaman)
4. [Panduan Desain UI/UX](#4-panduan-desain-uiux)
5. [Implementasi Teknis](#5-implementasi-teknis)
6. [Rencana Kerja (Timeline)](#6-rencana-kerja-timeline)
7. [Strategi SEO & Keberlanjutan](#7-strategi-seo--keberlanjutan)

---

## 1. Visi & Misi Website

**Visi:**
Menjadikan website Desa Pematang Tatal sebagai pintu gerbang digital yang memperkuat transparansi pemerintahan, mendorong pertumbuhan ekonomi lokal, dan mempererat hubungan antara pemerintah desa dengan warga.

**Misi:**
- Menyediakan informasi desa yang akurat, mudah diakses, dan selalu terkini.
- Memfasilitasi pelayanan publik secara digital agar lebih efisien.
- Mempromosikan potensi wisata, UMKM, dan budaya Desa Pematang Tatal kepada dunia.
- Membangun kepercayaan warga melalui transparansi anggaran dan laporan kegiatan desa.

---

## 2. Rekomendasi Fitur & Konten

Berikut adalah rekomendasi fitur lengkap yang dibagi berdasarkan prioritas implementasi:

### 🟢 Prioritas Tinggi (Wajib Ada)

#### 🏠 A. Beranda (Hero Section yang Memukau)
- **Banner utama** dengan foto udara atau foto panorama Desa Pematang Tatal berkualitas tinggi.
- **Tagline desa** yang kuat dan memorable (contoh: *"Pematang Tatal — Desa Maju, Warga Sejahtera"*).
- **Quick Stats** animasi: Total Penduduk, Luas Wilayah, Jumlah RT/RW, Jumlah UMKM aktif.
- **Tombol CTA (Call-to-Action):** "Lihat Layanan" & "Hubungi Kami".

#### 👥 B. Profil Desa
- **Sejarah Desa:** Narasi singkat asal-usul nama "Pematang Tatal" dan perjalanan sejarahnya.
- **Visi & Misi Desa** resmi dari kepala desa.
- **Struktur Organisasi Pemerintahan Desa:** Tampilkan foto, nama, dan jabatan setiap perangkat desa (Kepala Desa, Sekretaris, Kaur, Kasi, Kadus).
- **Peta Wilayah Desa:** Integrasi Google Maps embed dengan batas wilayah desa.
- **Data Geografis:** Batas wilayah, luas, ketinggian, curah hujan (cocok untuk desa berbasis pertanian).

#### 📰 C. Berita & Pengumuman Desa
- **Artikel berita** kegiatan desa dengan thumbnail, kategori (Kegiatan, Pengumuman, Pembangunan), dan tanggal.
- **Pengumuman penting** di bagian atas (contoh: jadwal posyandu, musrenbang, pemilu).
- **Pagination** dan **filter kategori berita**.
- **Fitur berbagi ke WhatsApp & media sosial.**

#### 📊 D. Data Kependudukan (Demografi Interaktif)
- **Grafik batang/donat** jumlah penduduk per kelompok usia.
- **Grafik persentase** berdasarkan jenis kelamin.
- **Grafik mata pencaharian** penduduk (petani, nelayan, pedagang, dll.).
- **Grafik tingkat pendidikan** warga desa.
- **Data diperbarui** secara berkala oleh admin desa.

#### 🏛️ E. Layanan Publik (e-Service)
- **Panduan & persyaratan** pengurusan surat-menyurat (Surat Keterangan Domisili, Surat Tidak Mampu, Surat Pengantar, dll.).
- **Form permohonan online** dengan upload berkas digital (mengurangi antrian fisik).
- **Tracking status** permohonan surat dengan nomor referensi.
- **Jadwal pelayanan** dan jam operasional kantor desa.

#### 📢 F. Pengaduan Warga (Sistem Lapor Desa)
- **Form pengaduan** berisi: Nama Pelapor, Kategori Masalah (Infrastruktur, Sosial, Sampah, Keamanan), deskripsi, dan unggah foto bukti.
- **Opsi laporan anonim** untuk mendorong lebih banyak warga melapor.
- **Notifikasi email/WhatsApp** otomatis ke admin saat ada laporan masuk.
- **Status laporan:** Diterima → Diproses → Selesai (dapat dipantau warga).

---

### 🟡 Prioritas Menengah (Sangat Direkomendasikan)

#### 🛒 G. Direktori UMKM & Produk Unggulan
- **Galeri produk lokal** dengan foto, nama produk, harga estimasi, dan deskripsi.
- **Profil usaha:** nama pemilik, lokasi, kategori usaha (kuliner, kerajinan, pertanian).
- **Filter & pencarian** berdasarkan kategori UMKM.
- **Tombol "Pesan via WhatsApp"** langsung ke pemilik usaha (`wa.me/628xxxx`).
- **Link ke marketplace:** Tokopedia/Shopee jika pelaku UMKM sudah terdaftar.

#### 🌿 H. Potensi & Wisata Desa
- **Galeri foto wisata** alam, budaya, dan kuliner khas desa.
- **Kartu destinasi wisata** dengan lokasi di Google Maps dan deskripsi singkat.
- **Potensi pertanian/perkebunan:** produk unggulan desa (padi, sawit, karet, dll.).
- **Video profil desa** (embed YouTube) untuk kesan pertama yang memukau.

#### 💰 I. Transparansi Keuangan Desa (APBDes)
- **Rekapitulasi anggaran desa** per tahun (pendapatan, belanja, pembiayaan).
- **Realisasi anggaran** dalam bentuk grafik progress bar.
- **Laporan kegiatan pembangunan** dengan foto progress fisik.
- **Dokumen publik** yang dapat diunduh (PDF: RPJMDes, APBDes, LPPDes).

#### 🖼️ J. Galeri Foto & Video
- **Galeri terkategori:** Kegiatan Sosial, Pembangunan, Budaya, Alam Desa.
- **Lightbox viewer** saat gambar diklik.
- **Embed video YouTube** kegiatan desa.

---

### 🔵 Prioritas Tambahan (Nilai Lebih)

#### 📅 K. Agenda & Kalender Kegiatan
- **Kalender interaktif** dengan event/kegiatan desa yang akan datang.
- **Reminder berbasis waktu:** tampil otomatis di halaman beranda H-7 sebelum kegiatan.

#### 🎓 L. Profil Lembaga Desa
- Halaman khusus untuk: **BPD (Badan Permusyawaratan Desa)**, **PKK**, **Karang Taruna**, **Posyandu**, **BUMDes**.
- Setiap lembaga memiliki profil, program kerja, dan kontak penghubung.

#### 🌐 M. Zona Kontak & Sosial Media
- **Peta Google Maps** lokasi kantor desa.
- **Form kontak** langsung ke admin desa.
- **Link resmi media sosial:** Facebook, Instagram, YouTube Desa.
- **Nomor WhatsApp** kantor desa yang aktif.

#### 🔔 N. Widget Darurat & Informasi Penting
- **Banner darurat** yang bisa diaktifkan admin (contoh: banjir, wabah penyakit).
- **Link pengaduan cepat** ke BPBD atau Puskesmas terdekat.

---

## 3. Struktur Halaman

```
website-pematang-tatal/
│
├── 🏠  Beranda (/)
├── 📖  Profil Desa (/profil)
│       ├── Sejarah Desa
│       ├── Visi & Misi
│       ├── Struktur Organisasi
│       └── Peta Wilayah
│
├── 📰  Berita & Pengumuman (/berita)
│       ├── Berita Terbaru
│       ├── Pengumuman
│       └── Detail Berita (/berita/{slug})
│
├── 📊  Data Desa (/data-desa)
│       ├── Kependudukan (Grafik Interaktif)
│       └── Transparansi APBDes
│
├── 💼  Layanan (/layanan)
│       ├── Panduan Surat
│       ├── Form Permohonan Online
│       └── Status Permohonan
│
├── 🛒  UMKM (/umkm)
│       └── Direktori Produk Lokal
│
├── 🌿  Potensi Desa (/potensi)
│       ├── Wisata
│       └── Unggulan Pertanian
│
├── 🖼️  Galeri (/galeri)
│
└── 📞  Kontak (/kontak)
```

---

## 4. Panduan Desain UI/UX

### 🎨 Palet Warna

| Token | Hex | Kegunaan |
|---|---|---|
| **Primary** | `#059669` | Emerald Green — alam, pertanian, kesegaran desa |
| **Secondary** | `#0284c7` | Sky Blue — kepercayaan, pelayanan publik, profesional |
| **Accent** | `#f59e0b` | Amber — CTA button, highlight penting |
| **Background** | `#f8fafc` | Slate 50 — dasar bersih, nyaman dibaca lama |
| **Surface** | `#ffffff` | Putih bersih untuk card dan panel |
| **Text Primary** | `#0f172a` | Slate 900 — teks konten utama |
| **Text Muted** | `#64748b` | Slate 500 — teks sekunder, metadata |

### 🔤 Tipografi
- **Heading:** `Plus Jakarta Sans` (Bold 700/800) — modern, tegas, mudah dibaca.
- **Body:** `Inter` (Regular 400, Medium 500) — legible untuk teks panjang.
- **Kode/Data:** `JetBrains Mono` — untuk angka statistik.

### ✨ Prinsip Desain
1. **Mobile-First:** Mayoritas warga mengakses via smartphone — prioritaskan tampilan mobile.
2. **Kontras Tinggi:** Pastikan teks selalu terbaca jelas di atas background apapun (WCAG AA).
3. **Loading Cepat:** Kompres semua gambar (WebP), lazy load gambar di bawah fold.
4. **Micro-Animations:** Gunakan animasi halus pada scroll, hover card, dan counter angka statistik.
5. **Glassmorphism subtle:** Gunakan efek kaca tipis pada navbar dan card untuk kesan premium.

### 🧩 Komponen UI Utama
- **Navbar:** Sticky, transparan saat di atas hero, solid saat di-scroll.
- **Hero Section:** Full-screen dengan parallax foto desa + overlay gradient hijau.
- **Stats Counter:** Animasi angka naik saat pertama kali terlihat.
- **News Card:** Thumbnail, kategori badge berwarna, tanggal, judul, dan tombol baca selengkapnya.
- **UMKM Card:** Foto produk, nama usaha, kategori, rating bintang, tombol WhatsApp.
- **Footer:** 4 kolom — Logo & deskripsi desa, navigasi cepat, kontak, dan link sosmed.

---

## 5. Implementasi Teknis

### Stack Teknologi

| Layer | Teknologi |
|---|---|
| Backend | Laravel 11 |
| Frontend | React 18 + Inertia.js |
| Styling | TailwindCSS + shadcn/ui |
| Database | MySQL 8 |
| Charts | Recharts / Chart.js |
| Storage | Laravel Storage (lokal / S3) |
| Auth | Laravel Breeze (Admin Only) |
| Maps | Google Maps Embed API |

### A. Dashboard Admin Desa
- **Deskripsi:** Halaman CMS khusus operator desa untuk mengelola seluruh konten web.
- **Fitur:** CRUD berita, kelola data UMKM, update data statistik penduduk, kelola APBDes, monitoring & respons pengaduan warga.
- **Keamanan:** Login dengan 2FA (OTP email), role-based access (Kepala Desa vs Operator Biasa).

### B. Komponen Demografi Interaktif (React + Recharts)
- Grafik menggunakan `Recharts` yang menerima data dari Laravel API endpoint.
- Data dapat diperbarui admin melalui dashboard tanpa perlu sentuh kode.

### C. Direktori UMKM (Filterable Gallery)
- Filter kategori real-time menggunakan React `useState`.
- Tombol CTA WhatsApp dengan format: `https://wa.me/628XXXXXXXXXX?text=Halo, saya tertarik dengan produk [nama_produk]`.

### D. Keamanan Formulir Pengaduan
- Validasi server-side dengan `Laravel Form Request Validation`.
- Proteksi CSRF bawaan Laravel.
- Rate limiting untuk mencegah spam: maksimal 5 pengaduan per IP per hari.

### E. Database Migrations (Tabel Utama)

```
✅ users (admin)          ✅ berita           ✅ kategori_berita
✅ penduduk_stats         ✅ umkm             ✅ produk_umkm
✅ pengaduan              ✅ layanan_surat     ✅ permohonan_surat
✅ apbdes                 ✅ galeri            ✅ agenda_kegiatan
```

---

## 6. Rencana Kerja (Timeline)

| Minggu | Fokus | Output Target |
|:---:|:---|:---|
| **1** | Koordinasi & Setup Proyek | Pengumpulan data & foto desa, instalasi Laravel + React + Tailwind, konfigurasi DB MySQL |
| **2** | Backend & Database | Migrations, Model, Controller untuk: berita, UMKM, pengaduan, layanan, demografi, APBDes |
| **3** | Frontend — Halaman Publik | Beranda, Profil, Berita, Galeri, Kontak — responsive & animasi |
| **4** | Frontend — Fitur Interaktif | Demografi chart, UMKM direktori + WhatsApp, Form Pengaduan, Form Layanan Surat |
| **5** | Dashboard Admin | Panel CMS: CRUD berita, UMKM, monitoring pengaduan, manajemen APBDes |
| **6** | Testing, Optimasi & Deploy | Bug fixing, SEO on-page, deploy ke hosting `.desa.id`, pelatihan perangkat desa |

---

## 7. Strategi SEO & Keberlanjutan

### 🔍 Strategi SEO

| Teknik | Detail |
|---|---|
| **On-Page SEO** | Title tag unik, meta description, heading hierarchy (H1 → H6) di setiap halaman |
| **Local SEO** | Daftarkan ke Google Business Profile (dulu Google My Business) dengan link ke website |
| **Open Graph** | Meta OG agar preview menarik saat link dibagikan di WhatsApp & Facebook |
| **Sitemap XML** | Generate otomatis via `spatie/laravel-sitemap` |
| **Schema Markup** | Tambahkan `LocalBusiness` & `GovernmentOrganization` JSON-LD schema |
| **Google Search Console** | Daftarkan domain dan pantau performa pencarian setiap bulan |
| **Kecepatan** | Target Lighthouse Score > 85 (gunakan WebP, lazy load, Vite bundling) |

### 🔄 Strategi Keberlanjutan Pasca-KKN

1. **Pelatihan Operator:** 2 sesi pelatihan singkat (2 jam/sesi) untuk staf desa — fokus pada cara menambah berita dan merespons pengaduan.
2. **Dokumentasi PDF:** Buku panduan admin bergambar (langkah-langkah dengan screenshot) ditinggalkan dalam format cetak & digital.
3. **WhatsApp Group Support:** Buat grup WA antara developer, perangkat desa, dan relawan IT lokal untuk dukungan teknis jangka panjang.
4. **Backup Otomatis:** Setup backup database otomatis harian ke Google Drive menggunakan `spatie/laravel-backup`.
5. **Domain Resmi:** Ajukan domain `pematangtatal.desa.id` melalui Diskominfo Kabupaten (GRATIS untuk desa).
6. **Google Maps:** Tandai lokasi kantor desa di Google Maps dengan link website — memperkuat SEO lokal.

---

## 📁 Struktur Proyek Laravel + React

```
website-profil-desa/
├── app/
│   ├── Http/Controllers/
│   │   ├── BeritaController.php
│   │   ├── UMKMController.php
│   │   ├── PengaduanController.php
│   │   ├── LayananController.php
│   │   └── Admin/DashboardController.php
│   └── Models/
│       ├── Berita.php, UMKM.php, Pengaduan.php ...
├── resources/
│   ├── js/
│   │   ├── Pages/          (Halaman React via Inertia.js)
│   │   │   ├── Beranda.jsx
│   │   │   ├── Profil.jsx
│   │   │   ├── Berita/     (Index.jsx, Show.jsx)
│   │   │   ├── UMKM.jsx
│   │   │   ├── DataDesa.jsx
│   │   │   ├── Layanan.jsx
│   │   │   ├── Galeri.jsx
│   │   │   └── Admin/      (Dashboard, CMS pages)
│   │   └── Components/     (Navbar, Footer, Card, Chart, dll.)
│   └── css/app.css
├── routes/web.php
├── database/migrations/
└── public/
```

---

> 💡 **Tips:** Mulailah dengan mengumpulkan **foto berkualitas tinggi** desa Pematang Tatal sebagai aset utama. Website desa yang memiliki foto asli & autentik akan jauh lebih menarik dan mendapat kepercayaan lebih tinggi dari pengunjung maupun mesin pencari.

---

*Dokumen ini dibuat sebagai panduan pengembangan Website Profil Desa Pematang Tatal.*  
*Dikembangkan untuk kegiatan KKN — Solo Developer Mode.*