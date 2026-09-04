<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Umkm extends Model
{
    use HasFactory;

    protected $table = 'umkms';

    protected $fillable = [
        'nama_usaha', 'nama_pemilik', 'kategori', 'deskripsi',
        'no_wa', 'alamat', 'foto', 'link_tokopedia', 'link_shopee',
        'is_unggulan', 'is_aktif',
    ];

    protected $casts = [
        'is_unggulan' => 'boolean',
        'is_aktif'    => 'boolean',
    ];

    // Scopes
    public function scopeAktif($query)
    {
        return $query->where('is_aktif', true);
    }

    public function scopeUnggulan($query)
    {
        return $query->where('is_unggulan', true)->where('is_aktif', true);
    }

    public function scopeKategori($query, string $kategori)
    {
        return $query->where('kategori', $kategori);
    }

    // Accessor URL WA
    public function getWhatsappUrlAttribute(): string
    {
        $pesan = urlencode("Halo, saya tertarik dengan usaha {$this->nama_usaha}");
        return "https://wa.me/{$this->no_wa}?text={$pesan}";
    }

    // Accessor foto URL
    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    // Relationships
    public function produks()
    {
        return $this->hasMany(ProdukUmkm::class);
    }
}
