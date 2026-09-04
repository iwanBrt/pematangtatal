<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StatistikPenduduk extends Model
{
    use HasFactory;

    protected $fillable = ['kelompok', 'label', 'nilai', 'tahun', 'urutan'];

    protected $casts = [
        'nilai'  => 'integer',
        'tahun'  => 'integer',
        'urutan' => 'integer',
    ];

    // Scope per kelompok dan tahun
    public function scopeKelompok($query, string $kelompok, ?int $tahun = null)
    {
        $q = $query->where('kelompok', $kelompok);
        if ($tahun) {
            $q->where('tahun', $tahun);
        }
        return $q->orderBy('urutan');
    }

    // Get data terformat untuk chart (array label => nilai)
    public static function forChart(string $kelompok, ?int $tahun = null): array
    {
        return static::kelompok($kelompok, $tahun)
            ->get()
            ->map(fn ($s) => ['label' => $s->label, 'nilai' => $s->nilai])
            ->toArray();
    }
}
