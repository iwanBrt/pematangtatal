<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengaduanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_pelapor' => ['nullable', 'string', 'max:255'],
            'no_telepon'   => ['nullable', 'string', 'max:15'],
            'is_anonim'    => ['boolean'],
            'kategori'     => ['required', 'in:infrastruktur,sosial,sampah,keamanan,administrasi,lainnya'],
            'deskripsi'    => ['required', 'string', 'min:20'],
            'foto_bukti'   => ['nullable', 'image', 'max:5120'],  // 5MB
            'lokasi'       => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'kategori.required'    => 'Kategori masalah wajib dipilih.',
            'kategori.in'          => 'Kategori tidak valid.',
            'deskripsi.min'        => 'Deskripsi minimal 20 karakter.',
            'foto_bukti.image'     => 'File harus berupa gambar (JPG, PNG).',
            'foto_bukti.max'       => 'Ukuran foto maksimal 5 MB.',
        ];
    }
}
