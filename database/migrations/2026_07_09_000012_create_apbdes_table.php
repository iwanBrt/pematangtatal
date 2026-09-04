<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('apbdes', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->enum('jenis', ['pendapatan', 'belanja', 'pembiayaan']);
            $table->string('sub_kategori');       // Dana Desa, PADes, Belanja Pembangunan, dll.
            $table->decimal('anggaran', 15, 2);   // jumlah yang dianggarkan
            $table->decimal('realisasi', 15, 2)->default(0); // jumlah yang terealisasi
            $table->text('keterangan')->nullable();
            $table->integer('urutan')->default(0);
            $table->timestamps();

            $table->index(['tahun', 'jenis']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('apbdes');
    }
};
