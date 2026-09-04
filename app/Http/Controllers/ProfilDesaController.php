<?php

namespace App\Http\Controllers;

use App\Models\ProfilDesa;
use App\Models\PerangkatDesa;
use Inertia\Inertia;
use Inertia\Response;

class ProfilDesaController extends Controller
{
    public function index(): Response
    {
        $profil    = ProfilDesa::getInstance();
        $perangkat = PerangkatDesa::aktif()->get([
            'id', 'nama', 'jabatan', 'foto', 'bio', 'urutan',
        ]);

        return Inertia::render('Profil', [
            'profil'    => $profil,
            'perangkat' => $perangkat,
        ]);
    }
}
