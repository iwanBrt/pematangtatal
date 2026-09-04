<?php

namespace App\Policies;

use App\Models\Umkm;
use App\Models\User;

class UmkmPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isOperator();
    }

    public function view(User $user, Umkm $umkm): bool
    {
        return $user->isOperator();
    }

    public function create(User $user): bool
    {
        return $user->isOperator();
    }

    public function update(User $user, Umkm $umkm): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Umkm $umkm): bool
    {
        return $user->isAdmin();
    }

    public function storeProduk(User $user, Umkm $umkm): bool
    {
        return $user->isAdmin();
    }

    public function destroyProduk(User $user, ?Umkm $umkm = null): bool
    {
        return $user->isAdmin();
    }
}
