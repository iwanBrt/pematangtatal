<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GaleriController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Galeri::latest('tanggal');

        if ($request->filled('kategori')) {
            $query->kategori($request->kategori);
        }

        return Inertia::render('Galeri', [
            'galeris'  => $query->paginate(18)->withQueryString(),
            'kategoris' => ['kegiatan', 'pembangunan', 'budaya', 'alam', 'lainnya'],
            'filters'   => $request->only('kategori'),
        ]);
    }
}
