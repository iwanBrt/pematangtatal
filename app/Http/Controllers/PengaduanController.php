<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use App\Http\Requests\PengaduanRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PengaduanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Pengaduan');
    }

    public function store(PengaduanRequest $request)
    {
        $data = $request->validated();

        // Upload foto bukti jika ada
        if ($request->hasFile('foto_bukti')) {
            $data['foto_bukti'] = $request->file('foto_bukti')->store('foto-pengaduan', 'public');
        }

        // Sembunyikan nama jika anonim
        if (!empty($data['is_anonim'])) {
            $data['nama_pelapor'] = null;
            $data['no_telepon']   = null;
        }

        $data['no_tiket'] = Pengaduan::generateNoTiket();

        $pengaduan = Pengaduan::create($data);

        return back()->with([
            'success'   => true,
            'no_tiket'  => $pengaduan->no_tiket,
        ]);
    }

    public function cekStatus(Request $request): Response
    {
        $pengaduan = null;

        if ($request->filled('no_tiket')) {
            $pengaduan = Pengaduan::where('no_tiket', $request->no_tiket)
                ->first(['id', 'no_tiket', 'kategori', 'status', 'respon_admin', 'created_at', 'selesai_at']);
        }

        return Inertia::render('CekStatusPengaduan', [
            'pengaduan' => $pengaduan,
            'no_tiket'  => $request->no_tiket,
        ]);
    }
}
