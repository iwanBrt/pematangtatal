<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up():void{Schema::create('pengumuman_darurats',function(Blueprint $t){$t->id();$t->string('judul');$t->text('isi');$t->string('tautan')->nullable();$t->timestamp('berakhir_pada')->nullable();$t->boolean('aktif')->default(false);$t->timestamps();});} public function down():void{Schema::dropIfExists('pengumuman_darurats');} };
