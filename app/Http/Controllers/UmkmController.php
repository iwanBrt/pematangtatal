<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UmkmController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Umkm::aktif()
            ->select('id', 'nama_usaha', 'nama_pemilik', 'kategori', 'deskripsi', 'no_wa', 'foto', 'is_unggulan');

        if ($request->filled('kategori')) {
            $query->kategori($request->kategori);
        }

        if ($request->filled('q')) {
            $query->whereLike(['nama_usaha', 'nama_pemilik'], $request->q);
        }

        return Inertia::render('UMKM', [
            'umkms'      => $query->paginate(12)->withQueryString(),
            'kategoris'  => ['kuliner', 'kerajinan', 'pertanian', 'jasa', 'perdagangan', 'lainnya'],
            'filters'    => $request->only(['kategori', 'q']),
        ]);
    }

    public function show(Umkm $umkm): Response
    {
        $umkm->load('produks');
        return Inertia::render('UMKMDetail', ['umkm' => $umkm]);
    }
}
