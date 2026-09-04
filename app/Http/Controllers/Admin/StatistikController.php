<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StatistikPenduduk;
use App\Models\Apbdes;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class StatistikController extends Controller
{
    public function index(Request $request): Response
    {
        $tahun = $request->get('tahun', date('Y'));

        $penduduk = StatistikPenduduk::where('tahun', $tahun)
            ->orderBy('kelompok')
            ->orderBy('urutan')
            ->get()
            ->groupBy('kelompok');

        $apbdes = Apbdes::where('tahun', $tahun)
            ->orderBy('jenis')
            ->orderBy('urutan')
            ->get()
            ->groupBy('jenis');
            
        $availableYearsPenduduk = StatistikPenduduk::select('tahun')->distinct()->pluck('tahun')->toArray();
        $availableYearsApbdes = Apbdes::select('tahun')->distinct()->pluck('tahun')->toArray();
        $availableYears = collect(array_merge($availableYearsPenduduk, $availableYearsApbdes, [date('Y')]))->unique()->sortDesc()->values();

        return Inertia::render('Admin/Statistik/Index', [
            'penduduk' => $penduduk,
            'apbdes' => $apbdes,
            'currentTahun' => (int)$tahun,
            'availableYears' => $availableYears,
        ]);
    }

    public function storePenduduk(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id'       => 'nullable|exists:statistik_penduduks,id',
            'kelompok' => 'required|string|max:100',
            'label'    => 'required|string|max:255',
            'nilai'    => 'required|integer|min:0',
            'tahun'    => 'required|integer',
            'urutan'   => 'required|integer',
        ]);

        if (isset($validated['id']) && $validated['id']) {
            StatistikPenduduk::find($validated['id'])->update($validated);
            $msg = 'Data statistik berhasil diperbarui.';
        } else {
            StatistikPenduduk::create($validated);
            $msg = 'Data statistik berhasil ditambahkan.';
        }

        return redirect()->back()->with('success', $msg);
    }

    public function destroyPenduduk($id): RedirectResponse
    {
        StatistikPenduduk::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Data statistik berhasil dihapus.');
    }

    public function storeApbdes(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id'           => 'nullable|exists:apbdes,id',
            'tahun'        => 'required|integer',
            'jenis'        => 'required|in:pendapatan,belanja,pembiayaan',
            'sub_kategori' => 'required|string|max:255',
            'anggaran'     => 'required|numeric|min:0',
            'realisasi'    => 'required|numeric|min:0',
            'keterangan'   => 'nullable|string',
            'urutan'       => 'required|integer',
        ]);

        if (isset($validated['id']) && $validated['id']) {
            Apbdes::find($validated['id'])->update($validated);
            $msg = 'Data APBDes berhasil diperbarui.';
        } else {
            Apbdes::create($validated);
            $msg = 'Data APBDes berhasil ditambahkan.';
        }

        return redirect()->back()->with('success', $msg);
    }

    public function destroyApbdes($id): RedirectResponse
    {
        Apbdes::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Data APBDes berhasil dihapus.');
    }
}
