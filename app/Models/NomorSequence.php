<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class NomorSequence extends Model
{
    protected $table = 'nomor_sequences';

    protected $fillable = [
        'jenis', 'tahun', 'last_number',
    ];

    protected $casts = [
        'last_number' => 'integer',
    ];

    /**
     * Ambil nomor urut berikutnya secara atomic (race-condition safe)
     * menggunakan row lock pada baris sequence per (jenis, tahun).
     */
    public static function next(string $jenis, ?int $tahun = null): int
    {
        $tahun = $tahun ?? (int) now()->year;

        return DB::transaction(function () use ($jenis, $tahun) {
            $sequence = static::where('jenis', $jenis)
                ->where('tahun', $tahun)
                ->lockForUpdate()
                ->first();

            if (!$sequence) {
                $lastExisting = static::where('jenis', $jenis)->count();
                $startNumber = $lastExisting === 0 ? 1 : static::where('jenis', $jenis)
                    ->where('tahun', $tahun)
                    ->max('last_number');

                $sequence = static::create([
                    'jenis'       => $jenis,
                    'tahun'       => $tahun,
                    'last_number' => 0,
                ]);
            }

            $sequence->increment('last_number');

            return $sequence->last_number;
        });
    }
}
