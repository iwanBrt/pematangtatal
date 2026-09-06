import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircle, Copy, Printer, Search } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

const statusLabels = {
    diterima: 'Diterima',
    diproses: 'Sedang Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

export default function CekStatusPengaduan({ pengaduan, no_tiket }) {
    const [ticket, setTicket] = useState(no_tiket || '');
    const [copied, setCopied] = useState(false);

    const copyTicket = async () => {
        if (!pengaduan?.no_tiket) return;
        await navigator.clipboard?.writeText(pengaduan.no_tiket);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    const checkStatus = (event) => {
        event.preventDefault();
        router.get('/pengaduan/cek-status', { no_tiket: ticket }, { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Cek Status Pengaduan" />
            <main className="container mx-auto max-w-3xl px-4 pt-20 pb-12">
                <h1 className="text-3xl font-bold text-charcoal mb-3">Cek Status Pengaduan</h1>
                <p className="text-text-secondary mb-8">Masukkan nomor tiket yang Anda terima setelah mengirim pengaduan.</p>

                <form onSubmit={checkStatus} className="flex gap-3 mb-8">
                    <input
                        value={ticket}
                        onChange={(event) => setTicket(event.target.value.toUpperCase())}
                        placeholder="Contoh: TKT-2026-00001"
                        className="form-input flex-1"
                        required
                    />
                    <button type="submit" className="btn btn-primary"><Search size={18} /> Cek</button>
                </form>

                {no_tiket && !pengaduan && (
                    <div className="border border-red-200 bg-red-50 text-red-700 p-4 mb-6" role="alert">
                        Nomor tiket tidak ditemukan. Periksa kembali kode yang Anda masukkan.
                    </div>
                )}

                {pengaduan && (
                    <section className="border border-border-light p-6 bg-surface print-area" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="text-primary" />
                            <div>
                                <p className="text-sm text-text-secondary">Nomor Tiket</p>
                                <h2 className="text-xl font-bold text-primary">{pengaduan.no_tiket}</h2>
                            </div>
                        </div>
                        <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                            <div><dt className="text-text-secondary">Kategori</dt><dd className="font-semibold">{pengaduan.kategori}</dd></div>
                            <div><dt className="text-text-secondary">Tanggal laporan</dt><dd className="font-semibold">{new Date(pengaduan.created_at).toLocaleDateString('id-ID')}</dd></div>
                            <div><dt className="text-text-secondary">Status</dt><dd className="font-semibold">{statusLabels[pengaduan.status] || pengaduan.status}</dd></div>
                            <div><dt className="text-text-secondary">Tanggal selesai</dt><dd className="font-semibold">{pengaduan.selesai_at ? new Date(pengaduan.selesai_at).toLocaleDateString('id-ID') : '-'}</dd></div>
                        </dl>
                        {pengaduan.respon_admin && (
                            <div className="border-t border-border-light mt-6 pt-5">
                                <p className="text-sm text-text-secondary mb-1">Respons kantor desa</p>
                                <p>{pengaduan.respon_admin}</p>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-3 mt-6 print:hidden">
                            <button type="button" onClick={copyTicket} className="btn btn-secondary"><Copy size={17} /> {copied ? 'Tersalin' : 'Salin Nomor'}</button>
                            <button type="button" onClick={() => window.print()} className="btn btn-primary"><Printer size={17} /> Cetak / Simpan PDF</button>
                        </div>
                    </section>
                )}
            </main>
        </PublicLayout>
    );
}
