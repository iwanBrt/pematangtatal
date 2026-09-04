<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kategori;
use App\Models\Berita;
use App\Models\User;
use Illuminate\Support\Str;

class KategoriBeritaSeeder extends Seeder
{
    public function run(): void
    {
        $kategoris = [
            ['nama' => 'Kegiatan',     'slug' => 'kegiatan',     'warna' => '#059669'],
            ['nama' => 'Pengumuman',   'slug' => 'pengumuman',   'warna' => '#dc2626'],
            ['nama' => 'Pembangunan',  'slug' => 'pembangunan',  'warna' => '#2563eb'],
            ['nama' => 'Prestasi',     'slug' => 'prestasi',     'warna' => '#d97706'],
            ['nama' => 'Kesehatan',    'slug' => 'kesehatan',    'warna' => '#7c3aed'],
        ];

        foreach ($kategoris as $k) {
            Kategori::firstOrCreate(['slug' => $k['slug']], $k);
        }

        $admin = User::where('role', 'admin')->first();
        if (!$admin) return;

        $sample = [
            ['judul' => 'Musrenbang Desa Pematang Tatal Tahun 2026 Resmi Dibuka', 'kategori' => 'kegiatan', 'pinned' => false],
            ['judul' => 'Pengumuman: Jadwal Posyandu Bulan Juli 2026', 'kategori' => 'pengumuman', 'pinned' => true],
            ['judul' => 'Pembangunan Jalan Rabat Beton RT 03 Rampung 100%', 'kategori' => 'pembangunan', 'pinned' => false],
            ['judul' => 'Desa Pematang Tatal Raih Juara 2 Lomba Desa Bersih Tingkat Kabupaten', 'kategori' => 'prestasi', 'pinned' => false],
            ['judul' => 'Posyandu Mawar Aktifkan Kembali Program Gizi Balita', 'kategori' => 'kesehatan', 'pinned' => false],
            ['judul' => 'BUMDes Pematang Tatal Luncurkan Program Simpan Pinjam Warga', 'kategori' => 'kegiatan', 'pinned' => false],
        ];

        foreach ($sample as $b) {
            $kategori = Kategori::where('slug', $b['kategori'])->first();
            Berita::firstOrCreate(
                ['slug' => Str::slug($b['judul'])],
                [
                    'kategori_id'  => $kategori->id,
                    'user_id'      => $admin->id,
                    'judul'        => $b['judul'],
                    'slug'         => Str::slug($b['judul']),
                    'ringkasan'    => 'Ringkasan singkat dari berita: ' . $b['judul'],
                    'isi'          => '<p>Ini adalah isi lengkap dari berita <strong>' . $b['judul'] . '</strong>. Konten ini akan diisi oleh operator desa melalui dashboard admin.</p>',
                    'status'       => 'published',
                    'published_at' => now()->subDays(rand(1, 30)),
                    'is_pinned'    => $b['pinned'],
                ]
            );
        }
    }
}
