<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PerangkatDesa;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class PerangkatController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama'       => 'required|string|max:255',
            'jabatan'    => 'required|string|max:255',
            'nip'        => 'nullable|string|max:100',
            'no_telepon' => 'nullable|string|max:50',
            'urutan'     => 'required|integer',
            'is_aktif'   => 'boolean',
            'foto'       => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('perangkat_desa', 'public');
        }

        PerangkatDesa::create($validated);

        return redirect()->back()->with('success', 'Perangkat desa berhasil ditambahkan.');
    }

    public function update(Request $request, PerangkatDesa $perangkat): RedirectResponse
    {
        $validated = $request->validate([
            'nama'       => 'required|string|max:255',
            'jabatan'    => 'required|string|max:255',
            'nip'        => 'nullable|string|max:100',
            'no_telepon' => 'nullable|string|max:50',
            'urutan'     => 'required|integer',
            'is_aktif'   => 'boolean',
            'foto'       => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto')) {
            if ($perangkat->foto) {
                Storage::disk('public')->delete($perangkat->foto);
            }
            $validated['foto'] = $request->file('foto')->store('perangkat_desa', 'public');
        }

        $perangkat->update($validated);

        return redirect()->back()->with('success', 'Perangkat desa berhasil diperbarui.');
    }

    public function destroy(PerangkatDesa $perangkat): RedirectResponse
    {
        if ($perangkat->foto) {
            Storage::disk('public')->delete($perangkat->foto);
        }
        $perangkat->delete();

        return redirect()->back()->with('success', 'Perangkat desa berhasil dihapus.');
    }
}
