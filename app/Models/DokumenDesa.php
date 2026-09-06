<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DokumenDesa extends Model { protected $fillable = ['judul','kategori','tahun','file','is_publik']; protected $casts = ['is_publik'=>'boolean']; }
