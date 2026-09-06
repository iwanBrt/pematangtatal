<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void { Schema::create('dokumen_desas', function (Blueprint $table) { $table->id(); $table->string('judul'); $table->string('kategori', 100); $table->year('tahun'); $table->string('file'); $table->boolean('is_publik')->default(true); $table->timestamps(); }); }
    public function down(): void { Schema::dropIfExists('dokumen_desas'); }
};
