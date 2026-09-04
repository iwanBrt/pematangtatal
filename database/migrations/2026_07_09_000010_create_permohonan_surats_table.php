<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('permohonan_surats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('layanan_id')->constrained('layanans')->cascadeOnDelete();
            $table->string('no_referensi')->unique();  // auto-generated: PS-2026-XXXX
            $table->string('nama_pemohon');
            $table->string('nik', 16);
            $table->string('no_telepon');
            $table->string('email')->nullable();
            $table->text('keperluan');
            $table->string('berkas')->nullable();     // path file upload
            $table->enum('status', ['menunggu', 'diproses', 'selesai', 'ditolak'])->default('menunggu');
            $table->text('catatan_admin')->nullable();
            $table->timestamp('selesai_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permohonan_surats');
    }
};
