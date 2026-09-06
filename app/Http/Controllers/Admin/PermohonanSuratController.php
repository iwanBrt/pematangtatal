<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PermohonanSurat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PermohonanSuratController extends Controller
{
    public function index(Request $request): Response
    {
        $query = PermohonanSurat::with('layanan:id,nama')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('q')) {
            $query->whereLike(['no_referensi', 'nama_pemohon'], $request->q);
        }

        $permohonans = $query->paginate(12)->withQueryString();

        return Inertia::render('Admin/PermohonanSurat/Index', [
            'permohonans' => $permohonans,
            'filters'     => $request->only(['status', 'q']),
        ]);
    }

    public function show(PermohonanSurat $permohonan): Response
    {
        $permohonan->load('layanan:id,nama');
        return Inertia::render('Admin/PermohonanSurat/Show', [
            'permohonan' => $permohonan,
        ]);
    }

    public function update(Request $request, PermohonanSurat $permohonan): RedirectResponse
    {
        $validated = $request->validate([
            'status'        => 'required|in:menunggu,diproses,selesai,ditolak',
            'catatan_admin' => 'nullable|string|max:2000',
        ]);

        if (in_array($validated['status'], ['selesai', 'ditolak'])) {
            $validated['selesai_at'] = now();
        } else {
            $validated['selesai_at'] = null;
        }

        if ($validated['status'] === 'selesai' && blank($validated['catatan_admin'])) {
            $validated['catatan_admin'] = 'Silakan menjemput surat di kantor desa.';
        }

        $permohonan->update($validated);

        return redirect()->route('admin.permohonan.index')
            ->with('success', 'Status permohonan berhasil diperbarui.');
    }

    public function destroy(PermohonanSurat $permohonan): RedirectResponse
    {
        if ($permohonan->berkas) {
            Storage::disk('public')->delete($permohonan->berkas);
        }

        $permohonan->delete();

        return redirect()->route('admin.permohonan.index')
            ->with('success', 'Permohonan berhasil dihapus.');
    }
}
