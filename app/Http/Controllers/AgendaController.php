<?php

namespace App\Http\Controllers;

use App\Models\AgendaKegiatan;
use Inertia\Inertia;
use Inertia\Response;

class AgendaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Agenda', [
            'agendas' => AgendaKegiatan::upcoming()->paginate(12)->withQueryString(),
        ]);
    }
}
