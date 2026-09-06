<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\DokumenDesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class DokumenController extends Controller {
 public function index(){ return Inertia::render('Admin/Dokumen/Index',['dokumens'=>DokumenDesa::latest()->paginate(12)]); }
 public function create(){ return Inertia::render('Admin/Dokumen/Form'); }
 public function store(Request $r){ $d=$r->validate(['judul'=>'required|max:255','kategori'=>'required|max:100','tahun'=>'required|integer|min:2000|max:2100','file'=>'required|file|mimes:pdf|max:10240','is_publik'=>'boolean']); $d['file']=$r->file('file')->store('dokumen','public'); DokumenDesa::create($d); return redirect()->route('admin.dokumen.index')->with('success','Dokumen berhasil diunggah.'); }
 public function edit(DokumenDesa $dokumen){ return Inertia::render('Admin/Dokumen/Form',['dokumen'=>$dokumen]); }
 public function update(Request $r,DokumenDesa $dokumen){ $d=$r->validate(['judul'=>'required|max:255','kategori'=>'required|max:100','tahun'=>'required|integer|min:2000|max:2100','file'=>'nullable|file|mimes:pdf|max:10240','is_publik'=>'boolean']); if($r->hasFile('file')){Storage::disk('public')->delete($dokumen->file);$d['file']=$r->file('file')->store('dokumen','public');}$dokumen->update($d);return redirect()->route('admin.dokumen.index')->with('success','Dokumen diperbarui.'); }
 public function destroy(DokumenDesa $dokumen){Storage::disk('public')->delete($dokumen->file);$dokumen->delete();return back()->with('success','Dokumen dihapus.');}
}
