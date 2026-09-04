<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ProfilDesa;
use App\Models\PerangkatDesa;
use App\Models\Layanan;
use App\Models\Umkm;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        $adminPassword = \Illuminate\Support\Str::random(16);

        $admin = User::firstOrCreate(
            ['email' => 'admin@pematangtatal.desa.id'],
            [
                'name' => 'Admin Desa',
                'password' => bcrypt($adminPassword),
                'role' => 'admin',
                'email_verified_at' => now(),
                'must_change_password' => true,
            ]
        );

        // Jika user sudah ada, jangan reset password-nya. Hanya tampilkan untuk user baru.
        if ($admin->wasRecentlyCreated) {
            $this->command?->warn('==============================================================');
            $this->command?->warn("  Admin login: admin@pematangtatal.desa.id");
            $this->command?->warn("  Password sementara: {$adminPassword}");
            $this->command?->warn("  WAJIB ganti password setelah login pertama !");
            $this->command?->warn('==============================================================');
        }

        // Profil Desa
        ProfilDesa::updateOrCreate([], [
            'nama_desa'    => 'Desa Pematang Tatal',
            'visi'         => 'Mewujudkan Desa Pematang Tatal yang Maju, Mandiri, dan Sejahtera Berlandaskan Nilai Gotong Royong.',
            'misi'         => "1. Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel.\n2. Mendorong pertumbuhan ekonomi berbasis potensi lokal dan UMKM.\n3. Meningkatkan kualitas infrastruktur desa secara merata.\n4. Memberdayakan masyarakat melalui pendidikan dan pelatihan.",
            'sejarah'      => 'Desa Pematang Tatal berdiri pada tahun 1952, berasal dari kata "Pematang" yang berarti dataran tinggi dan "Tatal" yang berarti serpihan kayu, mencerminkan kearifan lokal masyarakat yang sejak dahulu berprofesi sebagai pengrajin kayu.',
            'kepala_desa'  => 'Bapak Suratno, S.Pd.',
            'luas_wilayah' => '1.245 Ha',
            'jumlah_dusun' => '4 Dusun',
            'jumlah_rt'    => '18 RT',
            'jumlah_rw'    => '6 RW',
            'kecamatan'    => 'Kecamatan Contoh',
            'kabupaten'    => 'Kabupaten Contoh',
            'provinsi'     => 'Sumatera Utara',
            'no_telepon'   => '0812-3456-7890',
            'email'        => 'desa@pematangtatal.desa.id',
        ]);

        // Perangkat Desa
        $perangkat = [
            ['Suratno, S.Pd.', 'Kepala Desa', 0],
            ['Siti Rahayu', 'Sekretaris Desa', 1],
            ['Budi Santoso', 'Kaur Keuangan', 2],
            ['Dewi Lestari', 'Kaur Perencanaan', 3],
            ['Ahmad Fauzi', 'Kasi Pemerintahan', 4],
            ['Rina Marlina', 'Kasi Kesejahteraan', 5],
            ['Hendra Wijaya', 'Kepala Dusun I', 6],
            ['Supardi', 'Kepala Dusun II', 7],
        ];
        foreach ($perangkat as [$nama, $jabatan, $urutan]) {
            PerangkatDesa::firstOrCreate(
                ['nama' => $nama],
                ['jabatan' => $jabatan, 'urutan' => $urutan, 'is_aktif' => true]
            );
        }

        // Layanan Surat
        $layanans = [
            ['Surat Keterangan Domisili', 'SKD', 'FileText', ['KTP/KK asli', 'Surat pengantar RT/RW', 'Materai 10.000']],
            ['Surat Keterangan Tidak Mampu', 'SKTM', 'FileHeart', ['KTP/KK asli', 'Surat pengantar RT/RW', 'Foto rumah terkini', 'Materai 10.000']],
            ['Surat Keterangan Usaha', 'SKU', 'Store', ['KTP asli', 'Surat pengantar RT/RW', 'Foto tempat usaha', 'Materai 10.000']],
            ['Surat Pengantar KTP', 'SP-KTP', 'CreditCard', ['KK asli', 'Surat pengantar RT/RW']],
            ['Surat Keterangan Kelahiran', 'SKL', 'Baby', ['KK asli', 'Surat keterangan dari bidan/RS', 'KTP kedua orang tua']],
            ['Surat Keterangan Kematian', 'SKKm', 'FileX', ['KK asli', 'KTP almarhum', 'Surat keterangan dari puskesmas/RS']],
        ];
        foreach ($layanans as $i => [$nama, $kode, $ikon, $syarat]) {
            Layanan::firstOrCreate(
                ['kode' => $kode],
                ['nama' => $nama, 'ikon' => $ikon, 'persyaratan' => $syarat, 'estimasi_waktu' => '1–3 hari kerja', 'urutan' => $i]
            );
        }

        // UMKM contoh
        $umkms = [
            ['Warung Makan Bu Sari', 'Sartini', 'kuliner', '6281234567001', true],
            ['Kerajinan Anyaman Bambu Pak Darto', 'Sudarto', 'kerajinan', '6281234567002', true],
            ['Kebun Sawit Maju Bersama', 'Kelompok Tani Maju', 'pertanian', '6281234567003', true],
            ['Toko Sembako Pak Hendra', 'Hendra W.', 'perdagangan', '6281234567004', false],
        ];
        foreach ($umkms as [$nama, $pemilik, $kategori, $wa, $unggulan]) {
            Umkm::firstOrCreate(
                ['nama_usaha' => $nama],
                ['nama_pemilik' => $pemilik, 'kategori' => $kategori, 'no_wa' => $wa, 'is_unggulan' => $unggulan, 'is_aktif' => true, 'deskripsi' => 'Usaha lokal Desa Pematang Tatal yang berkualitas.']
            );
        }
    }
}
