<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Umkm;
use App\Models\Galeri;
use App\Models\AgendaKegiatan;
use App\Models\ProfilDesa;
use Inertia\Inertia;
use Inertia\Response;

class BerandaController extends Controller
{
    public function index(): Response
    {
        $profil     = ProfilDesa::getInstance();

        $beritas    = Berita::with('kategori:id,nama,slug,warna')
            ->published()
            ->limit(6)
            ->get(['id', 'kategori_id', 'judul', 'slug', 'ringkasan', 'thumbnail', 'published_at', 'is_pinned']);

        $pengumuman = Berita::pinned()
            ->latest('published_at')
            ->limit(3)
            ->get(['id', 'judul', 'slug', 'published_at']);

        $umkms      = Umkm::unggulan()
            ->limit(4)
            ->get(['id', 'nama_usaha', 'nama_pemilik', 'kategori', 'foto', 'no_wa']);

        $galeris    = Galeri::featured()->limit(6)->get(['id', 'judul', 'foto', 'kategori']);

        $agenda     = AgendaKegiatan::upcoming()->limit(3)->get();

        // Statistik ringkas untuk quick-stats
        $stats = [
            'penduduk'   => \App\Models\StatistikPenduduk::where('kelompok', 'jenis_kelamin')->sum('nilai'),
            'umkm'       => Umkm::aktif()->count(),
            'layanan'    => \App\Models\Layanan::where('is_aktif', true)->count(),
            'berita'     => Berita::where('status', 'published')->count(),
        ];

        return Inertia::render('Beranda', compact(
            'profil', 'beritas', 'pengumuman', 'umkms', 'galeris', 'agenda', 'stats'
        ));
    }
}
