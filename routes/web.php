<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BerandaController;
use App\Http\Controllers\ProfilDesaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\StatistikController;
use App\Http\Controllers\UmkmController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\LembagaController;
use App\Http\Controllers\PencarianController;
use App\Http\Controllers\Admin\BeritaController as AdminBeritaController;
use App\Http\Controllers\Admin\ProfilController as AdminProfilController;
use App\Http\Controllers\Admin\PerangkatController as AdminPerangkatController;
use App\Http\Controllers\Admin\StatistikController as AdminStatistikController;
use App\Http\Controllers\Admin\UmkmController as AdminUmkmController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PengaduanController as AdminPengaduanController;
use App\Http\Controllers\Admin\PermohonanSuratController as AdminPermohonanSuratController;
use App\Http\Controllers\Admin\GaleriController as AdminGaleriController;
use App\Http\Controllers\Admin\AgendaKegiatanController as AdminAgendaKegiatanController;
use App\Http\Controllers\Admin\KategoriController as AdminKategoriController;
use App\Http\Controllers\Admin\LayananController as AdminLayananController;
use App\Http\Controllers\Admin\DokumenController as AdminDokumenController;
use App\Http\Controllers\Admin\PengumumanDaruratController;
use App\Http\Controllers\Admin\LembagaController as AdminLembagaController;

// ─────────────────────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────────────────────

Route::get('/', [BerandaController::class, 'index'])->name('beranda');

// Alias dashboard (Breeze default redirect target) → beranda publik.
// Pengguna terautentikasi yang bukan admin melihat beranda; admin dapat mengakses /admin.
Route::redirect('/dashboard', '/admin')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/profil', [ProfilDesaController::class, 'index'])->name('profil');

Route::prefix('berita')->name('berita.')->group(function () {
    Route::get('/', [BeritaController::class, 'index'])->name('index');
    Route::get('/{slug}', [BeritaController::class, 'show'])->name('show');
});

Route::get('/data-desa', [StatistikController::class, 'index'])->name('data-desa');

// API untuk APBDes filter tahun (Inertia partial reload friendly)
Route::get('/api/apbdes', [StatistikController::class, 'apbdesByTahun'])->name('api.apbdes');

Route::prefix('umkm')->name('umkm.')->group(function () {
    Route::get('/', [UmkmController::class, 'index'])->name('index');
    Route::get('/{umkm}', [UmkmController::class, 'show'])->name('show');
});

Route::prefix('layanan')->name('layanan.')->group(function () {
    Route::get('/', [LayananController::class, 'index'])->name('index');
    Route::post('/permohonan', [LayananController::class, 'store'])
        ->middleware('throttle:10,1440')  // 10x per hari per IP
        ->name('permohonan.store');
    Route::get('/cek-status', [LayananController::class, 'cekStatus'])->name('cek-status');
});

Route::prefix('pengaduan')->name('pengaduan.')->group(function () {
    Route::get('/', [PengaduanController::class, 'index'])->name('index');
    Route::post('/', [PengaduanController::class, 'store'])
        ->middleware('throttle:5,1440')  // 5x per hari per IP
        ->name('store');
    Route::get('/cek-status', [PengaduanController::class, 'cekStatus'])->name('cek-status');
});

Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri');
Route::get('/agenda', [AgendaController::class, 'index'])->name('agenda');
Route::get('/dokumen', [DokumenController::class, 'index'])->name('dokumen');
Route::get('/lembaga', [LembagaController::class, 'index'])->name('lembaga');
Route::get('/cari', [PencarianController::class, 'index'])->name('cari');

Route::get('/kontak', fn () => Inertia::render('Kontak'))->name('kontak');
Route::get('/privasi', fn () => Inertia::render('Privasi'))->name('privasi');
Route::get('/potensi', fn () => Inertia::render('Potensi'))->name('potensi');

// ─────────────────────────────────────────────
// AUTH ROUTES (Breeze)
// ─────────────────────────────────────────────
require __DIR__.'/auth.php';

// ─────────────────────────────────────────────
// ADMIN ROUTES (protected)
// ─────────────────────────────────────────────
Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'admin'])
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Profile (Breeze default)
        Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::resource('berita', AdminBeritaController::class);

        Route::get('profil', [AdminProfilController::class, 'index'])->name('profil.index');
        Route::put('profil', [AdminProfilController::class, 'update'])->name('profil.update');
        
        Route::resource('perangkat', AdminPerangkatController::class)->except(['index', 'create', 'show']);

        // Statistik
        Route::get('statistik', [AdminStatistikController::class, 'index'])->name('statistik.index');
        Route::post('statistik/penduduk', [AdminStatistikController::class, 'storePenduduk'])->name('statistik.penduduk.store');
        Route::delete('statistik/penduduk/{id}', [AdminStatistikController::class, 'destroyPenduduk'])->name('statistik.penduduk.destroy');
        Route::post('statistik/apbdes', [AdminStatistikController::class, 'storeApbdes'])->name('statistik.apbdes.store');
        Route::delete('statistik/apbdes/{id}', [AdminStatistikController::class, 'destroyApbdes'])->name('statistik.apbdes.destroy');

        // UMKM
        Route::resource('umkm', AdminUmkmController::class);
        Route::post('umkm/{umkm}/produk', [AdminUmkmController::class, 'storeProduk'])->name('umkm.produk.store');
        Route::delete('umkm/produk/{id}', [AdminUmkmController::class, 'destroyProduk'])->name('umkm.produk.destroy');

        // Pengaduan
        Route::get('pengaduan', [AdminPengaduanController::class, 'index'])->name('pengaduan.index');
        Route::get('pengaduan/{pengaduan}', [AdminPengaduanController::class, 'show'])->name('pengaduan.show');
        Route::patch('pengaduan/{pengaduan}', [AdminPengaduanController::class, 'update'])->name('pengaduan.update');
        Route::delete('pengaduan/{pengaduan}', [AdminPengaduanController::class, 'destroy'])->name('pengaduan.destroy');

        // Permohonan Surat
        Route::get('permohonan', [AdminPermohonanSuratController::class, 'index'])->name('permohonan.index');
        Route::get('permohonan/{permohonan}', [AdminPermohonanSuratController::class, 'show'])->name('permohonan.show');
        Route::patch('permohonan/{permohonan}', [AdminPermohonanSuratController::class, 'update'])->name('permohonan.update');

        // Galeri
        Route::resource('galeri', AdminGaleriController::class)->except(['show']);

        // Agenda Kegiatan
        Route::resource('agenda', AdminAgendaKegiatanController::class)->except(['show']);

        // Kategori Berita
        Route::resource('kategori', AdminKategoriController::class)->except(['create', 'edit', 'show']);

        // Layanan
        Route::resource('layanan', AdminLayananController::class)->except(['show']);
        Route::resource('dokumen', AdminDokumenController::class)->except(['show']);
        Route::get('pengumuman-darurat', [PengumumanDaruratController::class,'index'])->name('pengumuman-darurat.index');
        Route::post('pengumuman-darurat', [PengumumanDaruratController::class,'store'])->name('pengumuman-darurat.store');
        Route::get('lembaga', [AdminLembagaController::class,'index'])->name('lembaga.index');
        Route::post('lembaga', [AdminLembagaController::class,'store'])->name('lembaga.store');
        Route::put('lembaga/{lembaga}', [AdminLembagaController::class,'update'])->name('lembaga.update');
        Route::delete('lembaga/{lembaga}', [AdminLembagaController::class,'destroy'])->name('lembaga.destroy');
    });
