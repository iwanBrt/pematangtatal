<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // LIKE search yang aman dari wildcard injection (% _ \)
        Builder::macro('whereLike', function ($columns, string $value) {
            $escaped = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $value);
            $columns = is_array($columns) ? $columns : [$columns];

            return $this->where(function ($q) use ($columns, $escaped) {
                foreach ($columns as $i => $column) {
                    $method = $i === 0 ? 'where' : 'orWhere';
                    $q->{$method}($column, 'like', "%{$escaped}%");
                }
            });
        });
    }
}
