<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use App\Models\ProdukUmkm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class UmkmController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Umkm::latest();

        if ($request->filled('q')) {
            $query->whereLike(['nama_usaha', 'nama_pemilik'], $request->q);
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $umkms = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Umkm/Index', [
            'umkms' => $umkms,
            'filters' => $request->only(['q', 'kategori']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Umkm/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama_usaha'     => 'required|string|max:255',
            'nama_pemilik'   => 'required|string|max:255',
            'kategori'       => 'required|string|max:100',
            'deskripsi'      => 'nullable|string',
            'no_wa'          => 'nullable|string|max:20',
            'alamat'         => 'nullable|string',
            'link_tokopedia' => 'nullable|url|max:255',
            'link_shopee'    => 'nullable|url|max:255',
            'is_unggulan'    => 'boolean',
            'is_aktif'       => 'boolean',
            'foto'           => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('umkm', 'public');
        }

        Umkm::create($validated);

        return redirect()->route('admin.umkm.index')->with('success', 'Data UMKM berhasil ditambahkan.');
    }

    public function edit(Umkm $umkm): Response
    {
        $umkm->load('produks');
        return Inertia::render('Admin/Umkm/Form', [
            'umkm' => $umkm,
        ]);
    }

    public function update(Request $request, Umkm $umkm): RedirectResponse
    {
        $this->authorize('update', $umkm);

        $validated = $request->validate([
            'nama_usaha'     => 'required|string|max:255',
            'nama_pemilik'   => 'required|string|max:255',
            'kategori'       => 'required|string|max:100',
            'deskripsi'      => 'nullable|string',
            'no_wa'          => 'nullable|string|max:20',
            'alamat'         => 'nullable|string',
            'link_tokopedia' => 'nullable|url|max:255',
            'link_shopee'    => 'nullable|url|max:255',
            'is_unggulan'    => 'boolean',
            'is_aktif'       => 'boolean',
            'foto'           => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto')) {
            if ($umkm->foto) Storage::disk('public')->delete($umkm->foto);
            $validated['foto'] = $request->file('foto')->store('umkm', 'public');
        }

        $umkm->update($validated);

        return redirect()->route('admin.umkm.index')->with('success', 'Data UMKM berhasil diperbarui.');
    }

    public function destroy(Umkm $umkm): RedirectResponse
    {
        $this->authorize('delete', $umkm);

        if ($umkm->foto) Storage::disk('public')->delete($umkm->foto);
        foreach($umkm->produks as $produk) {
            if ($produk->foto) Storage::disk('public')->delete($produk->foto);
        }
        $umkm->delete();

        return redirect()->route('admin.umkm.index')->with('success', 'Data UMKM berhasil dihapus.');
    }

    public function storeProduk(Request $request, Umkm $umkm): RedirectResponse
    {
        $this->authorize('storeProduk', $umkm);

        $validated = $request->validate([
            'id'          => 'nullable|exists:produk_umkms,id',
            'nama_produk' => 'required|string|max:255',
            'deskripsi'   => 'nullable|string',
            'harga'       => 'nullable|numeric|min:0',
            'is_aktif'    => 'boolean',
            'foto'        => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('umkm/produk', 'public');
        }

        if (isset($validated['id']) && $validated['id']) {
            $produk = ProdukUmkm::findOrFail($validated['id']);
            if ($request->hasFile('foto') && $produk->foto) {
                Storage::disk('public')->delete($produk->foto);
            }
            $produk->update($validated);
            $msg = 'Produk berhasil diperbarui.';
        } else {
            $umkm->produks()->create($validated);
            $msg = 'Produk berhasil ditambahkan.';
        }

        return redirect()->back()->with('success', $msg);
    }

    public function destroyProduk($id): RedirectResponse
    {
        $this->authorize('destroyProduk', Umkm::class);

        $produk = ProdukUmkm::findOrFail($id);
        if ($produk->foto) Storage::disk('public')->delete($produk->foto);
        $produk->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
    }
}
