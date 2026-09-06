<?php
namespace App\Http\Controllers; use App\Models\Lembaga; use Inertia\Inertia; class LembagaController extends Controller { public function index(){return Inertia::render('Lembaga',['lembagas'=>Lembaga::where('aktif',true)->orderBy('nama')->get()]);} }
