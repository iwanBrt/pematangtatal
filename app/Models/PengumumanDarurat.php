<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class PengumumanDarurat extends Model { protected $fillable=['judul','isi','tautan','berakhir_pada','aktif']; protected $casts=['aktif'=>'boolean','berakhir_pada'=>'datetime']; public function scopeTayang($q){return $q->where('aktif',true)->where(fn($q)=>$q->whereNull('berakhir_pada')->orWhere('berakhir_pada','>',now()));} }
