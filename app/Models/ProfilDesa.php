<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilDesa extends Model
{
    protected $table = 'profil_desa';

    protected $fillable = [
        'nama_desa', 'sejarah', 'visi', 'misi', 'kepala_desa',
        'luas_wilayah', 'jumlah_dusun', 'jumlah_rt', 'jumlah_rw',
        'batas_utara', 'batas_selatan', 'batas_timur', 'batas_barat',
        'ketinggian', 'curah_hujan', 'kecamatan', 'kabupaten', 'provinsi',
        'kode_pos', 'no_telepon', 'email', 'website',
        'latitude', 'longitude', 'foto_kantor',
    ];

    protected $casts = [
        'latitude'  => 'float',
        'longitude' => 'float',
    ];

    /**
     * Selalu ambil satu record (singleton pattern).
     */
    public static function getInstance(): static
    {
        return static::firstOrCreate(
            [],
            ['nama_desa' => 'Desa Pematang Tatal']
        );
    }
}
