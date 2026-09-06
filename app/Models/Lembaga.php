<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class Lembaga extends Model { protected $fillable=['nama','singkatan','ketua','kontak','deskripsi','program','aktif']; protected $casts=['aktif'=>'boolean']; }
