<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Berita extends Model
{
    use HasFactory;

    protected $fillable = [
        'kategori_id', 'user_id', 'judul', 'slug', 'ringkasan',
        'isi', 'thumbnail', 'status', 'published_at', 'views', 'is_pinned',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_pinned'    => 'boolean',
        'views'        => 'integer',
    ];

    // Auto generate slug dari judul
    protected static function booted(): void
    {
        static::creating(function (Berita $berita) {
            if (empty($berita->slug)) {
                $berita->slug = Str::slug($berita->judul);
            }
        });
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->whereNotNull('published_at')
                     ->orderByDesc('published_at');
    }

    public function scopePinned($query)
    {
        return $query->where('is_pinned', true)->where('status', 'published');
    }

    // Accessors
    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }

    public function getRingkasanAutoAttribute(): string
    {
        return $this->ringkasan ?: Str::limit(strip_tags($this->isi), 150);
    }

    // Relationships
    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
