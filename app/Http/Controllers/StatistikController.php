<?php

namespace App\Http\Controllers;

use App\Models\StatistikPenduduk;
use App\Models\Apbdes;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatistikController extends Controller
{
    public function index(): Response
    {
        $tahun = now()->year;

        return Inertia::render('DataDesa', [
            'tahun'         => $tahun,
            'usia'          => StatistikPenduduk::forChart('usia', $tahun),
            'jenis_kelamin' => StatistikPenduduk::forChart('jenis_kelamin', $tahun),
            'pendidikan'    => StatistikPenduduk::forChart('pendidikan', $tahun),
            'pekerjaan'     => StatistikPenduduk::forChart('pekerjaan', $tahun),
            'apbdes'        => Apbdes::tahun($tahun)->get(),
            'tahun_apbdes'  => Apbdes::distinct()->pluck('tahun')->sortDesc()->values(),
        ]);
    }

    // API endpoint untuk update tahun filter (AJAX)
    public function apbdesByTahun(Request $request)
    {
        $tahun = $request->integer('tahun', now()->year);
        return response()->json(Apbdes::tahun($tahun)->get());
    }
}
