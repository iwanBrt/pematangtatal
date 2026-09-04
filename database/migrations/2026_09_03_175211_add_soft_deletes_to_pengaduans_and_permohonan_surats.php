<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengaduans', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('permohonan_surats', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('pengaduans', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('permohonan_surats', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
