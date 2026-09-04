<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statistik_penduduks', function (Blueprint $table) {
            $table->id();
            $table->string('kelompok');   // usia, jenis_kelamin, pendidikan, pekerjaan
            $table->string('label');      // contoh: "0-14 Tahun", "Laki-laki", "S1"
            $table->unsignedInteger('nilai');
            $table->year('tahun');
            $table->integer('urutan')->default(0);
            $table->timestamps();

            $table->index(['kelompok', 'tahun']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statistik_penduduks');
    }
};
