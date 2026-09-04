<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PermohonanSuratRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'layanan_id'   => ['required', 'exists:layanans,id'],
            'nama_pemohon' => ['required', 'string', 'max:255'],
            'nik'          => ['required', 'digits:16'],
            'no_telepon'   => ['required', 'string', 'max:15'],
            'email'        => ['nullable', 'email', 'max:255'],
            'keperluan'    => ['required', 'string', 'min:10'],
            'berkas'       => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'], // 5MB
        ];
    }

    public function messages(): array
    {
        return [
            'layanan_id.required'   => 'Jenis layanan wajib dipilih.',
            'nik.digits'            => 'NIK harus terdiri dari 16 digit angka.',
            'berkas.max'            => 'Ukuran file maksimal 5 MB.',
            'berkas.mimes'          => 'Format file yang diterima: PDF, JPG, PNG.',
        ];
    }
}
