<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StatistikPenduduk;
use App\Models\Apbdes;

class StatistikSeeder extends Seeder
{
    public function run(): void
    {
        $tahun = 2026;
        StatistikPenduduk::truncate();

        // Kelompok Usia
        $usia = [
            ['0–14 Tahun', 580], ['15–29 Tahun', 720], ['30–44 Tahun', 610],
            ['45–59 Tahun', 430], ['60+ Tahun', 210],
        ];
        foreach ($usia as $i => [$label, $nilai]) {
            StatistikPenduduk::create(['kelompok' => 'usia', 'label' => $label, 'nilai' => $nilai, 'tahun' => $tahun, 'urutan' => $i]);
        }

        // Jenis Kelamin
        StatistikPenduduk::create(['kelompok' => 'jenis_kelamin', 'label' => 'Laki-laki', 'nilai' => 1285, 'tahun' => $tahun, 'urutan' => 0]);
        StatistikPenduduk::create(['kelompok' => 'jenis_kelamin', 'label' => 'Perempuan', 'nilai' => 1265, 'tahun' => $tahun, 'urutan' => 1]);

        // Pendidikan
        $pendidikan = [
            ['Tidak/Belum Sekolah', 320], ['SD/Sederajat', 680], ['SMP/Sederajat', 520],
            ['SMA/Sederajat', 590], ['D1–D3', 85], ['S1', 130], ['S2/S3', 25],
        ];
        foreach ($pendidikan as $i => [$label, $nilai]) {
            StatistikPenduduk::create(['kelompok' => 'pendidikan', 'label' => $label, 'nilai' => $nilai, 'tahun' => $tahun, 'urutan' => $i]);
        }

        // Pekerjaan
        $pekerjaan = [
            ['Petani/Pekebun', 580], ['Pedagang/Wirausaha', 210], ['PNS/TNI/Polri', 45],
            ['Karyawan Swasta', 180], ['Buruh Harian', 320], ['Ibu Rumah Tangga', 290], ['Pelajar/Mahasiswa', 510], ['Lainnya', 415],
        ];
        foreach ($pekerjaan as $i => [$label, $nilai]) {
            StatistikPenduduk::create(['kelompok' => 'pekerjaan', 'label' => $label, 'nilai' => $nilai, 'tahun' => $tahun, 'urutan' => $i]);
        }

        // APBDes
        Apbdes::truncate();
        $apbdes = [
            // Pendapatan
            ['pendapatan', 'Dana Desa (DD)',          850000000, 850000000],
            ['pendapatan', 'Alokasi Dana Desa (ADD)', 420000000, 390000000],
            ['pendapatan', 'PADes',                    35000000,  28500000],
            // Belanja
            ['belanja', 'Belanja Pembangunan',         620000000, 580000000],
            ['belanja', 'Belanja Pemberdayaan',        250000000, 215000000],
            ['belanja', 'Belanja Operasional Desa',   185000000, 185000000],
            ['belanja', 'Belanja Tak Terduga',          50000000,  12000000],
        ];
        foreach ($apbdes as $i => [$jenis, $sub, $anggaran, $realisasi]) {
            Apbdes::create(['tahun' => $tahun, 'jenis' => $jenis, 'sub_kategori' => $sub, 'anggaran' => $anggaran, 'realisasi' => $realisasi, 'urutan' => $i]);
        }
    }
}
