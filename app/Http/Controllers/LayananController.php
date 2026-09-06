<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\PermohonanSurat;
use App\Http\Requests\PermohonanSuratRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LayananController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Layanan', [
            'layanans' => Layanan::aktif()->get(),
        ]);
    }

    public function store(PermohonanSuratRequest $request)
    {
        $data = $request->validated();

        // Upload berkas jika ada
        if ($request->hasFile('berkas')) {
            $data['berkas'] = $request->file('berkas')->store('berkas-permohonan', 'public');
        }

        $data['no_referensi'] = PermohonanSurat::generateNoReferensi();

        $permohonan = PermohonanSurat::create($data);

        return back()->with([
            'success'      => true,
            'no_referensi' => $permohonan->no_referensi,
        ]);
    }

    public function cekStatus(Request $request): Response
    {
        $permohonan = null;

        if ($request->filled('no_referensi')) {
            $permohonan = PermohonanSurat::with('layanan:id,nama')
                ->where('no_referensi', $request->no_referensi)
                ->first(['id', 'no_referensi', 'layanan_id', 'status', 'catatan_admin', 'created_at', 'selesai_at']);
        }

        return Inertia::render('CekStatusPermohonan', [
            'permohonan'   => $permohonan,
            'no_referensi' => $request->no_referensi,
        ]);
    }
}
