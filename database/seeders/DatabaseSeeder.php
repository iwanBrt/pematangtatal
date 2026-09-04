<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            MasterDataSeeder::class,       // Admin, Profil, Perangkat, Layanan, UMKM
            KategoriBeritaSeeder::class,   // Kategori + sample berita
            StatistikSeeder::class,        // Demografi + APBDes
        ]);
    }
}
