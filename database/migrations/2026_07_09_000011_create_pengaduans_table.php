<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengaduans', function (Blueprint $table) {
            $table->id();
            $table->string('no_tiket')->unique();   // TKT-2026-XXXX
            $table->string('nama_pelapor')->nullable();  // null jika anonim
            $table->string('no_telepon')->nullable();
            $table->boolean('is_anonim')->default(false);
            $table->enum('kategori', ['infrastruktur', 'sosial', 'sampah', 'keamanan', 'administrasi', 'lainnya']);
            $table->text('deskripsi');
            $table->string('foto_bukti')->nullable();
            $table->string('lokasi')->nullable();
            $table->enum('status', ['diterima', 'diproses', 'selesai', 'ditolak'])->default('diterima');
            $table->text('respon_admin')->nullable();
            $table->timestamp('selesai_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
    }
};
