<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;

class BeritaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Berita::with(['kategori', 'user'])->latest();

        if ($request->filled('q')) {
            $query->whereLike('judul', $request->q);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $beritas = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Berita/Index', [
            'beritas' => $beritas,
            'filters' => $request->only(['q', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Berita/Form', [
            'kategoris' => Kategori::all(['id', 'nama']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', Berita::class);

        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategoris,id',
            'judul'       => 'required|string|max:255',
            'ringkasan'   => 'nullable|string|max:500',
            'isi'         => 'required|string',
            'status'      => 'required|in:draft,published',
            'is_pinned'   => 'boolean',
            'thumbnail'   => 'nullable|image|max:5120', // max 5MB
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('berita', 'public');
        }

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = Str::slug($validated['judul']);
        
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        Berita::create($validated);

        return redirect()->route('admin.berita.index')->with('success', 'Berita berhasil ditambahkan.');
    }

    public function edit(Berita $beritum): Response
    {
        return Inertia::render('Admin/Berita/Form', [
            'berita' => $beritum,
            'kategoris' => Kategori::all(['id', 'nama']),
        ]);
    }

    public function update(Request $request, Berita $beritum): RedirectResponse
    {
        $this->authorize('update', $beritum);

        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategoris,id',
            'judul'       => 'required|string|max:255',
            'ringkasan'   => 'nullable|string|max:500',
            'isi'         => 'required|string',
            'status'      => 'required|in:draft,published',
            'is_pinned'   => 'boolean',
            'thumbnail'   => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($beritum->thumbnail) {
                Storage::disk('public')->delete($beritum->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('berita', 'public');
        }

        $validated['slug'] = Str::slug($validated['judul']);

        if ($beritum->status === 'draft' && $validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $beritum->update($validated);

        return redirect()->route('admin.berita.index')->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(Berita $beritum): RedirectResponse
    {
        $this->authorize('delete', $beritum);

        if ($beritum->thumbnail) {
            Storage::disk('public')->delete($beritum->thumbnail);
        }
        
        $beritum->delete();

        return redirect()->route('admin.berita.index')->with('success', 'Berita berhasil dihapus.');
    }
}
