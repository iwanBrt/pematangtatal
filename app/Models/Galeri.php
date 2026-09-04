<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Galeri extends Model
{
    use HasFactory;

    protected $fillable = ['judul', 'foto', 'kategori', 'keterangan', 'tanggal', 'is_featured'];

    protected $casts = [
        'tanggal'     => 'date',
        'is_featured' => 'boolean',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->latest();
    }

    public function scopeKategori($query, string $kategori)
    {
        return $query->where('kategori', $kategori);
    }

    public function getFotoUrlAttribute(): string
    {
        return asset('storage/' . $this->foto);
    }
}
