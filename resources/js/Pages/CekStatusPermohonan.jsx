import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircle, Copy, Printer, Search } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

const statusLabels = {
    menunggu: 'Menunggu',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

export default function CekStatusPermohonan({ permohonan, no_referensi }) {
    const [reference, setReference] = useState(no_referensi || '');
    const [copied, setCopied] = useState(false);

    const copyReference = async () => {
        if (!permohonan?.no_referensi) return;
        await navigator.clipboard?.writeText(permohonan.no_referensi);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    const checkStatus = (event) => {
        event.preventDefault();
        router.get('/layanan/cek-status', { no_referensi: reference }, { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Cek Status Permohonan" />
            <main className="container mx-auto max-w-3xl px-4 pt-20 pb-12">
                <h1 className="text-3xl font-bold text-charcoal mb-3">Cek Status Permohonan Surat</h1>
                <p className="text-text-secondary mb-8">Masukkan nomor referensi yang Anda terima setelah mengajukan surat.</p>

                <form onSubmit={checkStatus} className="flex gap-3 mb-8">
                    <input
                        value={reference}
                        onChange={(event) => setReference(event.target.value.toUpperCase())}
                        placeholder="Contoh: PS-2026-00001"
                        className="form-input flex-1"
                        required
                    />
                    <button type="submit" className="btn btn-primary"><Search size={18} /> Cek</button>
                </form>

                {no_referensi && !permohonan && (
                    <div className="border border-red-200 bg-red-50 text-red-700 p-4 mb-6" role="alert">
                        Nomor referensi tidak ditemukan. Periksa kembali kode yang Anda masukkan.
                    </div>
                )}

                {permohonan && (
                    <section className="border border-border-light p-6 bg-surface print-area" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="text-primary" />
                            <div>
                                <p className="text-sm text-text-secondary">Nomor Referensi</p>
                                <h2 className="text-xl font-bold text-primary">{permohonan.no_referensi}</h2>
                            </div>
                        </div>
                        <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                            <div><dt className="text-text-secondary">Jenis layanan</dt><dd className="font-semibold">{permohonan.layanan?.nama || '-'}</dd></div>
                            <div><dt className="text-text-secondary">Tanggal pengajuan</dt><dd className="font-semibold">{new Date(permohonan.created_at).toLocaleDateString('id-ID')}</dd></div>
                            <div><dt className="text-text-secondary">Status</dt><dd className="font-semibold">{statusLabels[permohonan.status] || permohonan.status}</dd></div>
                            <div><dt className="text-text-secondary">Tanggal selesai</dt><dd className="font-semibold">{permohonan.selesai_at ? new Date(permohonan.selesai_at).toLocaleDateString('id-ID') : '-'}</dd></div>
                        </dl>
                        {permohonan.catatan_admin && (
                            <div className="border-t border-border-light mt-6 pt-5">
                                <p className="text-sm text-text-secondary mb-1">Informasi dari kantor desa</p>
                                <p>{permohonan.catatan_admin}</p>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-3 mt-6 print:hidden">
                            <button type="button" onClick={copyReference} className="btn btn-secondary"><Copy size={17} /> {copied ? 'Tersalin' : 'Salin Nomor'}</button>
                            <button type="button" onClick={() => window.print()} className="btn btn-primary"><Printer size={17} /> Cetak / Simpan PDF</button>
                        </div>
                    </section>
                )}
            </main>
        </PublicLayout>
    );
}
