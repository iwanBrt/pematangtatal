<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BeritaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Berita::with('kategori:id,nama,slug,warna')
            ->published()
            ->select('id', 'kategori_id', 'judul', 'slug', 'ringkasan', 'thumbnail', 'published_at', 'views', 'is_pinned');

        // Filter kategori
        if ($request->filled('kategori')) {
            $query->whereHas('kategori', fn ($q) => $q->where('slug', $request->kategori));
        }

        // Search (aman dari wildcard injection)
        if ($request->filled('q')) {
            $query->whereLike(['judul', 'ringkasan'], $request->q);
        }

        $beritas    = $query->paginate(9)->withQueryString();
        $kategoris  = Kategori::all(['id', 'nama', 'slug', 'warna']);
        $pengumuman = Berita::pinned()
            ->latest('published_at')
            ->limit(3)
            ->get(['id', 'judul', 'slug', 'published_at']);

        return Inertia::render('Berita/Index', [
            'beritas'    => $beritas,
            'kategoris'  => $kategoris,
            'pengumuman' => $pengumuman,
            'filters'    => $request->only(['kategori', 'q']),
        ]);
    }

    public function show(string $slug): Response
    {
        $berita = Berita::with('kategori:id,nama,slug,warna', 'user:id,name')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment views
        $berita->increment('views');

        // Berita terkait dari kategori yang sama
        $terkait = Berita::with('kategori:id,nama,slug,warna')
            ->published()
            ->where('kategori_id', $berita->kategori_id)
            ->where('id', '!=', $berita->id)
            ->limit(3)
            ->get(['id', 'kategori_id', 'judul', 'slug', 'thumbnail', 'published_at']);

        return Inertia::render('Berita/Show', [
            'berita'  => $berita,
            'terkait' => $terkait,
        ]);
    }
}
