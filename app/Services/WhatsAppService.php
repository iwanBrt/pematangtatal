<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    public function send(?string $phoneNumber, string $message): bool
    {
        $token = config('services.fonnte.token');

        if (blank($token) || blank($phoneNumber)) {
            return false;
        }

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->post(config('services.fonnte.url'), [
                'target' => $this->normalizePhoneNumber($phoneNumber),
                'message' => $message,
            ]);

        return $response->successful();
    }

    private function normalizePhoneNumber(string $phoneNumber): string
    {
        $phoneNumber = preg_replace('/[^0-9+]/', '', $phoneNumber);

        if (str_starts_with($phoneNumber, '+')) {
            return substr($phoneNumber, 1);
        }

        if (str_starts_with($phoneNumber, '0')) {
            return '62' . substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }
}