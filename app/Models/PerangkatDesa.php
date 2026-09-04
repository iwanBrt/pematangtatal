<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PerangkatDesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama', 'jabatan', 'nip', 'foto', 'no_telepon', 'bio', 'urutan', 'is_aktif',
    ];

    protected $casts = [
        'is_aktif' => 'boolean',
        'urutan'   => 'integer',
    ];

    // Scope untuk tampil aktif, urut sesuai field urutan
    public function scopeAktif($query)
    {
        return $query->where('is_aktif', true)->orderBy('urutan');
    }

    // Accessor foto URL
    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }
}
