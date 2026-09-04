<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('layanans', function (Blueprint $table) {
            $table->id();
            $table->string('nama');            // Surat Keterangan Domisili, dll.
            $table->string('kode')->unique();  // SKD, STM, SKU, dll.
            $table->text('deskripsi')->nullable();
            $table->json('persyaratan');       // array list persyaratan
            $table->string('estimasi_waktu')->default('1–3 hari kerja');
            $table->string('ikon')->nullable(); // nama icon lucide
            $table->boolean('is_aktif')->default(true);
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('layanans');
    }
};
