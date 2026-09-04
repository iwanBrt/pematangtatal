<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('galeris', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('foto');
            $table->enum('kategori', ['kegiatan', 'pembangunan', 'budaya', 'alam', 'lainnya']);
            $table->text('keterangan')->nullable();
            $table->date('tanggal')->nullable();
            $table->boolean('is_featured')->default(false);  // tampil di beranda
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('galeris');
    }
};
