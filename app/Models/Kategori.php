<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'slug', 'warna'];

    // Relationships
    public function beritas()
    {
        return $this->hasMany(Berita::class);
    }
}
