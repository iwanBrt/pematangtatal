<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pengaduan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'no_tiket', 'nama_pelapor', 'no_telepon', 'is_anonim',
        'kategori', 'deskripsi', 'foto_bukti', 'lokasi',
        'status', 'respon_admin', 'selesai_at',
    ];

    protected $casts = [
        'is_anonim'  => 'boolean',
        'selesai_at' => 'datetime',
    ];

    // Generate nomor tiket: TKT-2026-00001 (race-condition safe)
    public static function generateNoTiket(): string
    {
        $tahun = now()->year;
        $last  = NomorSequence::next('pengaduan', $tahun);
        return 'TKT-' . $tahun . '-' . str_pad($last, 5, '0', STR_PAD_LEFT);
    }

    // Accessor: tampilkan nama atau "Anonim"
    public function getNamaTampilAttribute(): string
    {
        return $this->is_anonim ? 'Anonim' : ($this->nama_pelapor ?? 'Anonim');
    }

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'diterima' => 'Diterima',
            'diproses' => 'Sedang Diproses',
            'selesai'  => 'Selesai',
            'ditolak'  => 'Ditolak',
            default    => $this->status,
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'diterima' => 'blue',
            'diproses' => 'amber',
            'selesai'  => 'green',
            'ditolak'  => 'red',
            default    => 'gray',
        };
    }
}
