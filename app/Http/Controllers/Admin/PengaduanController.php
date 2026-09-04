<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PengaduanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pengaduan::latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('q')) {
            $query->whereLike(['no_tiket', 'nama_pelapor'], $request->q);
        }

        $pengaduans = $query->paginate(12)->withQueryString();

        return Inertia::render('Admin/Pengaduan/Index', [
            'pengaduans' => $pengaduans,
            'filters'    => $request->only(['status', 'q']),
        ]);
    }

    public function show(Pengaduan $pengaduan): Response
    {
        return Inertia::render('Admin/Pengaduan/Show', [
            'pengaduan' => $pengaduan,
        ]);
    }

    public function update(Request $request, Pengaduan $pengaduan): RedirectResponse
    {
        $validated = $request->validate([
            'status'       => 'required|in:diterima,diproses,selesai,ditolak',
            'respon_admin' => 'nullable|string|max:2000',
        ]);

        if (in_array($validated['status'], ['selesai', 'ditolak'])) {
            $validated['selesai_at'] = now();
        } else {
            $validated['selesai_at'] = null;
        }

        $pengaduan->update($validated);

        return redirect()->route('admin.pengaduan.index')
            ->with('success', 'Status pengaduan berhasil diperbarui.');
    }

    public function destroy(Pengaduan $pengaduan): RedirectResponse
    {
        if ($pengaduan->foto_bukti) {
            Storage::disk('public')->delete($pengaduan->foto_bukti);
        }

        $pengaduan->delete();

        return redirect()->route('admin.pengaduan.index')
            ->with('success', 'Pengaduan berhasil dihapus.');
    }
}
