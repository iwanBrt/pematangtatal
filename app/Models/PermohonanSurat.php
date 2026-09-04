<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PermohonanSurat extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'layanan_id', 'no_referensi', 'nama_pemohon', 'nik',
        'no_telepon', 'email', 'keperluan', 'berkas',
        'status', 'catatan_admin', 'selesai_at',
    ];

    protected $casts = [
        'selesai_at' => 'datetime',
    ];

    // Generate nomor referensi unik: PS-2026-00001 (race-condition safe)
    public static function generateNoReferensi(): string
    {
        $tahun = now()->year;
        $last  = NomorSequence::next('permohonan', $tahun);
        return 'PS-' . $tahun . '-' . str_pad($last, 5, '0', STR_PAD_LEFT);
    }

    // Status label
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'menunggu' => 'Menunggu',
            'diproses' => 'Sedang Diproses',
            'selesai'  => 'Selesai',
            'ditolak'  => 'Ditolak',
            default    => $this->status,
        };
    }

    // Relationships
    public function layanan()
    {
        return $this->belongsTo(Layanan::class);
    }
}
