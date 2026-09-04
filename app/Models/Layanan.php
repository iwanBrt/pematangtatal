<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Layanan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama', 'kode', 'deskripsi', 'persyaratan',
        'estimasi_waktu', 'ikon', 'is_aktif', 'urutan',
    ];

    protected $casts = [
        'persyaratan' => 'array',
        'is_aktif'    => 'boolean',
        'urutan'      => 'integer',
    ];

    // Scope aktif, urut
    public function scopeAktif($query)
    {
        return $query->where('is_aktif', true)->orderBy('urutan');
    }

    // Relationships
    public function permohonan()
    {
        return $this->hasMany(PermohonanSurat::class);
    }
}
