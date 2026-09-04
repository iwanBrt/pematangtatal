<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perangkat_desas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('jabatan');
            $table->string('nip')->nullable();
            $table->string('foto')->nullable();
            $table->string('no_telepon')->nullable();
            $table->text('bio')->nullable();
            $table->integer('urutan')->default(0);   // untuk sorting tampil
            $table->boolean('is_aktif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perangkat_desas');
    }
};
