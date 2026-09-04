<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nomor_sequences', function (Blueprint $table) {
            $table->id();
            $table->string('jenis', 30);          // 'pengaduan' | 'permohonan'
            $table->unsignedInteger('tahun');     // 2026
            $table->unsignedBigInteger('last_number')->default(0);
            $table->unique(['jenis', 'tahun']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nomor_sequences');
    }
};
