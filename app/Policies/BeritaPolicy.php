<?php

namespace App\Policies;

use App\Models\Berita;
use App\Models\User;

class BeritaPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isOperator();
    }

    public function view(User $user, Berita $berita): bool
    {
        return $user->isOperator();
    }

    public function create(User $user): bool
    {
        return $user->isOperator();
    }

    public function update(User $user, Berita $berita): bool
    {
        return $user->isAdmin() || $user->id === $berita->user_id;
    }

    public function delete(User $user, Berita $berita): bool
    {
        return $user->isAdmin() || $user->id === $berita->user_id;
    }

    public function restore(User $user, Berita $berita): bool
    {
        return $user->isAdmin();
    }

    public function forceDelete(User $user, Berita $berita): bool
    {
        return $user->isAdmin();
    }
}
