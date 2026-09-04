<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LayananController extends Controller
{
    public function index(): Response
    {
        $layanans = Layanan::withCount('permohonan')->orderBy('urutan')->get();

        return Inertia::render('Admin/Layanan/Index', [
            'layanans' => $layanans,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Layanan/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama'            => 'required|string|max:255',
            'kode'            => 'required|string|max:20|unique:layanans,kode',
            'deskripsi'       => 'nullable|string',
            'persyaratan'     => 'nullable|array',
            'persyaratan.*'   => 'string',
            'estimasi_waktu'  => 'nullable|string|max:255',
            'ikon'            => 'nullable|string|max:50',
            'urutan'          => 'nullable|integer',
            'is_aktif'        => 'boolean',
        ]);

        Layanan::create($validated);

        return redirect()->route('admin.layanan.index')->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function edit(Layanan $layanan): Response
    {
        return Inertia::render('Admin/Layanan/Form', ['layanan' => $layanan]);
    }

    public function update(Request $request, Layanan $layanan): RedirectResponse
    {
        $validated = $request->validate([
            'nama'            => 'required|string|max:255',
            'kode'            => 'required|string|max:20|unique:layanans,kode,'.$layanan->id,
            'deskripsi'       => 'nullable|string',
            'persyaratan'     => 'nullable|array',
            'persyaratan.*'   => 'string',
            'estimasi_waktu'  => 'nullable|string|max:255',
            'ikon'            => 'nullable|string|max:50',
            'urutan'          => 'nullable|integer',
            'is_aktif'        => 'boolean',
        ]);

        $layanan->update($validated);

        return redirect()->route('admin.layanan.index')->with('success', 'Layanan berhasil diperbarui.');
    }

    public function destroy(Layanan $layanan): RedirectResponse
    {
        if ($layanan->permohonan()->exists()) {
            return redirect()->route('admin.layanan.index')
                ->with('error', 'Layanan masih memiliki riwayat permohonan dan tidak dapat dihapus.');
        }

        $layanan->delete();

        return redirect()->route('admin.layanan.index')->with('success', 'Layanan berhasil dihapus.');
    }
}
