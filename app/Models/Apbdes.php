<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Apbdes extends Model
{
    use HasFactory;

    protected $table = 'apbdes';

    protected $fillable = [
        'tahun', 'jenis', 'sub_kategori', 'anggaran', 'realisasi', 'keterangan', 'urutan',
    ];

    protected $casts = [
        'tahun'     => 'integer',
        'anggaran'  => 'float',
        'realisasi' => 'float',
        'urutan'    => 'integer',
    ];

    // Scope per tahun
    public function scopeTahun($query, int $tahun)
    {
        return $query->where('tahun', $tahun)->orderBy('urutan');
    }

    // Accessor: persentase realisasi
    public function getPersentaseRealisasiAttribute(): float
    {
        if ($this->anggaran == 0) return 0;
        return round(($this->realisasi / $this->anggaran) * 100, 1);
    }

    // Accessor: format rupiah
    public function getAnggaranFormatAttribute(): string
    {
        return 'Rp ' . number_format($this->anggaran, 0, ',', '.');
    }

    public function getRealisasiFormatAttribute(): string
    {
        return 'Rp ' . number_format($this->realisasi, 0, ',', '.');
    }
}
