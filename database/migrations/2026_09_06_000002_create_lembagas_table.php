<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up():void{Schema::create('lembagas',function(Blueprint $t){$t->id();$t->string('nama');$t->string('singkatan')->nullable();$t->string('ketua')->nullable();$t->string('kontak')->nullable();$t->text('deskripsi')->nullable();$t->text('program')->nullable();$t->boolean('aktif')->default(true);$t->timestamps();});} public function down():void{Schema::dropIfExists('lembagas');} };
