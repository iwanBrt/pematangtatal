<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AgendaKegiatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgendaKegiatanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = AgendaKegiatan::latest('tanggal_mulai');

        if ($request->filled('q')) {
            $query->whereLike('judul', $request->q);
        }

        $agendas = $query->paginate(12)->withQueryString();

        return Inertia::render('Admin/Agenda/Index', [
            'agendas' => $agendas,
            'filters' => $request->only('q'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Agenda/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul'          => 'required|string|max:255',
            'deskripsi'      => 'nullable|string',
            'tanggal_mulai'  => 'required|date',
            'tanggal_selesai'=> 'nullable|date|after_or_equal:tanggal_mulai',
            'waktu'          => 'nullable|string|max:255',
            'lokasi'         => 'nullable|string|max:255',
            'penyelenggara'  => 'nullable|string|max:255',
            'is_publik'      => 'boolean',
        ]);

        AgendaKegiatan::create($validated);

        return redirect()->route('admin.agenda.index')->with('success', 'Agenda berhasil ditambahkan.');
    }

    public function edit(AgendaKegiatan $agenda): Response
    {
        return Inertia::render('Admin/Agenda/Form', ['agenda' => $agenda]);
    }

    public function update(Request $request, AgendaKegiatan $agenda): RedirectResponse
    {
        $validated = $request->validate([
            'judul'          => 'required|string|max:255',
            'deskripsi'      => 'nullable|string',
            'tanggal_mulai'  => 'required|date',
            'tanggal_selesai'=> 'nullable|date|after_or_equal:tanggal_mulai',
            'waktu'          => 'nullable|string|max:255',
            'lokasi'         => 'nullable|string|max:255',
            'penyelenggara'  => 'nullable|string|max:255',
            'is_publik'      => 'boolean',
        ]);

        $agenda->update($validated);

        return redirect()->route('admin.agenda.index')->with('success', 'Agenda berhasil diperbarui.');
    }

    public function destroy(AgendaKegiatan $agenda): RedirectResponse
    {
        $agenda->delete();

        return redirect()->route('admin.agenda.index')->with('success', 'Agenda berhasil dihapus.');
    }
}
