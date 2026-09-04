<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfilDesa;
use App\Models\PerangkatDesa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Profil/Index', [
            'profil' => ProfilDesa::getInstance(),
            'perangkat' => PerangkatDesa::orderBy('urutan')->get(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $profil = ProfilDesa::getInstance();

        $validated = $request->validate([
            'nama_desa'     => 'required|string|max:255',
            'sejarah'       => 'nullable|string',
            'visi'          => 'nullable|string',
            'misi'          => 'nullable|string',
            'luas_wilayah'  => 'nullable|string|max:255',
            'jumlah_dusun'  => 'nullable|integer',
            'jumlah_rt'     => 'nullable|integer',
            'jumlah_rw'     => 'nullable|integer',
            'batas_utara'   => 'nullable|string|max:255',
            'batas_selatan' => 'nullable|string|max:255',
            'batas_timur'   => 'nullable|string|max:255',
            'batas_barat'   => 'nullable|string|max:255',
            'no_telepon'    => 'nullable|string|max:50',
            'email'         => 'nullable|email|max:255',
            'website'       => 'nullable|string|max:255',
            'foto_kantor'   => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto_kantor')) {
            if ($profil->foto_kantor) {
                Storage::disk('public')->delete($profil->foto_kantor);
            }
            $validated['foto_kantor'] = $request->file('foto_kantor')->store('profil', 'public');
        }

        $profil->update($validated);

        return redirect()->back()->with('success', 'Profil desa berhasil diperbarui.');
    }
}
