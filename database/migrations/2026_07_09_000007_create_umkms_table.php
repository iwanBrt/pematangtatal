<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('umkms', function (Blueprint $table) {
            $table->id();
            $table->string('nama_usaha');
            $table->string('nama_pemilik');
            $table->enum('kategori', ['kuliner', 'kerajinan', 'pertanian', 'jasa', 'perdagangan', 'lainnya']);
            $table->text('deskripsi')->nullable();
            $table->string('no_wa');        // format: 628xxxxxxxxxx
            $table->string('alamat')->nullable();
            $table->string('foto')->nullable();
            $table->string('link_tokopedia')->nullable();
            $table->string('link_shopee')->nullable();
            $table->boolean('is_unggulan')->default(false);  // tampil di beranda
            $table->boolean('is_aktif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('umkms');
    }
};
