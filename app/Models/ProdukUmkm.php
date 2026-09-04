<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProdukUmkm extends Model
{
    use HasFactory;

    protected $fillable = ['umkm_id', 'nama_produk', 'deskripsi', 'harga', 'foto', 'is_aktif'];

    protected $casts = [
        'harga'    => 'float',
        'is_aktif' => 'boolean',
    ];

    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    public function getHargaFormatAttribute(): ?string
    {
        return $this->harga ? 'Rp ' . number_format($this->harga, 0, ',', '.') : null;
    }

    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}
