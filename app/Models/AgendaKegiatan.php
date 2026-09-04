<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AgendaKegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul', 'deskripsi', 'tanggal_mulai', 'tanggal_selesai',
        'waktu', 'lokasi', 'penyelenggara', 'is_publik',
    ];

    protected $casts = [
        'tanggal_mulai'   => 'date',
        'tanggal_selesai' => 'date',
        'is_publik'       => 'boolean',
    ];

    // Scope agenda yang akan datang (upcoming)
    public function scopeUpcoming($query)
    {
        return $query->where('tanggal_mulai', '>=', now()->toDateString())
                     ->where('is_publik', true)
                     ->orderBy('tanggal_mulai');
    }

    // Scope agenda yang sedang berlangsung
    public function scopeOngoing($query)
    {
        $today = now()->toDateString();
        return $query->where('tanggal_mulai', '<=', $today)
                     ->where(fn ($q) => $q->whereNull('tanggal_selesai')->orWhere('tanggal_selesai', '>=', $today))
                     ->where('is_publik', true);
    }
}
