<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class KategoriController extends Controller
{
    public function index(): Response
    {
        $kategoris = Kategori::withCount('beritas')->orderBy('nama')->get();

        return Inertia::render('Admin/Kategori/Index', [
            'kategoris' => $kategoris,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama'   => 'required|string|max:100|unique:kategoris,nama',
            'warna'  => 'nullable|string|max:20',
        ]);

        $validated['slug'] = Str::slug($validated['nama']);

        Kategori::create($validated);

        return redirect()->route('admin.kategori.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, Kategori $kategori): RedirectResponse
    {
        $validated = $request->validate([
            'nama'   => 'required|string|max:100|unique:kategoris,nama,'.$kategori->id,
            'warna'  => 'nullable|string|max:20',
        ]);

        $validated['slug'] = Str::slug($validated['nama']);

        $kategori->update($validated);

        return redirect()->route('admin.kategori.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Kategori $kategori): RedirectResponse
    {
        if ($kategori->beritas()->exists()) {
            return redirect()->route('admin.kategori.index')
                ->with('error', 'Kategori masih memiliki berita dan tidak dapat dihapus.');
        }

        $kategori->delete();

        return redirect()->route('admin.kategori.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
