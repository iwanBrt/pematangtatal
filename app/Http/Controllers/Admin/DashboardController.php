<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Pengaduan;
use App\Models\PermohonanSurat;
use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'berita_total'        => Berita::count(),
            'berita_published'    => Berita::where('status', 'published')->count(),
            'pengaduan_baru'      => Pengaduan::where('status', 'diterima')->count(),
            'pengaduan_diproses'  => Pengaduan::where('status', 'diproses')->count(),
            'permohonan_pending'  => PermohonanSurat::where('status', 'menunggu')->count(),
            'umkm_total'          => Umkm::aktif()->count(),
            'permohonan_selesai'  => PermohonanSurat::where('status', 'selesai')->count(),
            'pengaduan_selesai'   => Pengaduan::where('status', 'selesai')->count(),
        ];

        $pengaduan_terbaru = Pengaduan::latest()
            ->limit(5)
            ->get(['id', 'no_tiket', 'kategori', 'status', 'created_at', 'is_anonim', 'nama_pelapor']);

        $permohonan_terbaru = PermohonanSurat::with('layanan:id,nama')
            ->latest()
            ->limit(5)
            ->get(['id', 'no_referensi', 'layanan_id', 'nama_pemohon', 'status', 'created_at']);

        return Inertia::render('Admin/Dashboard', compact(
            'stats', 'pengaduan_terbaru', 'permohonan_terbaru'
        ));
    }
}
