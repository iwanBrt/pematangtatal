<?php
namespace App\Http\Controllers;
use App\Models\DokumenDesa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
class DokumenController extends Controller { public function index(Request $request): Response { $query = DokumenDesa::where('is_publik', true)->latest('tahun'); if ($request->filled('kategori')) $query->where('kategori', $request->kategori); return Inertia::render('Dokumen', ['dokumens'=>$query->paginate(15)->withQueryString(), 'kategoris'=>DokumenDesa::where('is_publik', true)->distinct()->orderBy('kategori')->pluck('kategori'), 'filters'=>$request->only('kategori')]); } }
