<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GaleriController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Galeri::latest();

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $galeris = $query->paginate(12)->withQueryString();

        return Inertia::render('Admin/Galeri/Index', [
            'galeris' => $galeris,
            'filters' => $request->only('kategori'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Galeri/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul'        => 'required|string|max:255',
            'kategori'     => 'required|string|max:100',
            'keterangan'   => 'nullable|string',
            'tanggal'      => 'nullable|date',
            'is_featured'  => 'boolean',
            'foto'         => 'required|image|max:5120',
        ]);

        $validated['foto'] = $request->file('foto')->store('galeri', 'public');

        Galeri::create($validated);

        return redirect()->route('admin.galeri.index')->with('success', 'Foto galeri berhasil ditambahkan.');
    }

    public function edit(Galeri $galeri): Response
    {
        return Inertia::render('Admin/Galeri/Form', ['galeri' => $galeri]);
    }

    public function update(Request $request, Galeri $galeri): RedirectResponse
    {
        $validated = $request->validate([
            'judul'        => 'required|string|max:255',
            'kategori'     => 'required|string|max:100',
            'keterangan'   => 'nullable|string',
            'tanggal'      => 'nullable|date',
            'is_featured'  => 'boolean',
            'foto'         => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto')) {
            if ($galeri->foto) Storage::disk('public')->delete($galeri->foto);
            $validated['foto'] = $request->file('foto')->store('galeri', 'public');
        }

        $galeri->update($validated);

        return redirect()->route('admin.galeri.index')->with('success', 'Foto galeri berhasil diperbarui.');
    }

    public function destroy(Galeri $galeri): RedirectResponse
    {
        if ($galeri->foto) Storage::disk('public')->delete($galeri->foto);
        $galeri->delete();

        return redirect()->route('admin.galeri.index')->with('success', 'Foto galeri berhasil dihapus.');
    }
}
