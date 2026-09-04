import { Head, useForm, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { CheckCircle, AlertCircle, Search } from 'lucide-react';
import { useState } from 'react';

const kategoriOptions = [
    { value: 'infrastruktur', label: 'Infrastruktur' },
    { value: 'sosial', label: 'Sosial' },
    { value: 'sampah', label: 'Sampah & Kebersihan' },
    { value: 'keamanan', label: 'Keamanan' },
    { value: 'administrasi', label: 'Administrasi' },
    { value: 'lainnya', label: 'Lainnya' },
];
const statusColor = { diterima: '#2F6B57', diproses: '#D9B56D', selesai: '#164A41', ditolak: '#B91C1C' };
const statusLabel = { diterima: 'Diterima', diproses: 'Sedang Diproses', selesai: 'Selesai', ditolak: 'Ditolak' };

export default function Pengaduan({ pengaduan, no_tiket }) {
    const [tab, setTab] = useState('form');
    const [cekTiket, setCekTiket] = useState(no_tiket || '');
    const { data, setData, post, processing, errors, reset, recentlySuccessful, wasSuccessful } = useForm({
        nama_pelapor: '', no_telepon: '', is_anonim: false,
        kategori: '', deskripsi: '', foto_bukti: null, lokasi: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/pengaduan', { forceFormData: true, onSuccess: () => reset() });
    };

    const cekStatus = (e) => {
        e.preventDefault();
        router.get('/pengaduan/cek-status', { no_tiket: cekTiket });
    };

    return (
        <PublicLayout>
            <Head title="Pengaduan Warga" />
            <PageHeader
                title="Pengaduan Warga"
                subtitle="Sampaikan laporan dan keluhan Anda. Kami siap mendengar dan menindaklanjuti."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Pengaduan' }]}
            />
            <div className="section-padding bg-background">
                <div className="container-custom max-w-3xl">
                    {/* Tabs */}
                    <div className="flex gap-0 mb-8 border-b border-border-light">
                        {[
                            ['form', 'Laporkan Masalah'],
                            ['cek', 'Cek Status'],
                        ].map(([t, l]) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                                    tab === t
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-text-muted hover:text-text-secondary'
                                }`}
                                style={tab !== t ? {} : { fontFamily: 'var(--font-heading)' }}>
                                {l}
                            </button>
                        ))}
                    </div>

                    {tab === 'form' && (
                        <ScrollReveal>
                            {recentlySuccessful || wasSuccessful ? (
                                <div className="border border-border-light p-10 text-center" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                                    <h2 className="text-lg font-bold mb-2 text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Laporan Berhasil Dikirim
                                    </h2>
                                    <p className="text-sm mb-2 text-text-secondary">
                                        Nomor tiket Anda untuk memantau status:
                                    </p>
                                    <p className="text-2xl font-bold mb-6 text-primary">
                                        —
                                    </p>
                                    <p className="text-xs mb-6 text-text-muted">
                                        Catat nomor tiket Anda untuk cek status di halaman ini.
                                    </p>
                                    <button onClick={() => reset()} className="btn btn-primary">Buat Laporan Baru</button>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="border border-border-light p-6 space-y-4" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h2 className="font-bold text-base mb-1 text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Form Pengaduan
                                    </h2>

                                    {/* Anonim toggle */}
                                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-secondary-bg border border-border-light" style={{ borderRadius: 'var(--radius-md)' }}>
                                        <input type="checkbox" checked={data.is_anonim}
                                            onChange={e => setData('is_anonim', e.target.checked)}
                                            className="w-4 h-4 rounded text-primary focus:ring-primary border-border" />
                                        <span className="text-sm text-text-secondary">
                                            Kirim sebagai <strong className="text-charcoal">Anonim</strong> (nama & no. HP disembunyikan)
                                        </span>
                                    </label>

                                    {!data.is_anonim && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1.5 text-text-secondary">Nama Pelapor</label>
                                                <input type="text" value={data.nama_pelapor}
                                                    onChange={e => setData('nama_pelapor', e.target.value)}
                                                    placeholder="Nama lengkap Anda"
                                                    className="input-field" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1.5 text-text-secondary">No. Telepon</label>
                                                <input type="tel" value={data.no_telepon}
                                                    onChange={e => setData('no_telepon', e.target.value)}
                                                    placeholder="0812XXXXXXXX"
                                                    className="input-field" />
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Kategori Masalah *</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {kategoriOptions.map(({ value, label }) => (
                                                <button key={value} type="button"
                                                    onClick={() => setData('kategori', value)}
                                                    className={`text-sm py-2 px-3 border font-medium transition-colors text-left ${
                                                        data.kategori === value
                                                            ? 'bg-primary-600 text-white border-primary-600'
                                                            : 'border-border text-text-secondary hover:border-primary'
                                                    }`}
                                                    style={{ borderRadius: 'var(--radius-sm)' }}>
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.kategori && <p className="text-red-600 text-xs mt-1">{errors.kategori}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Deskripsi Masalah *</label>
                                        <textarea value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)}
                                            rows={4} placeholder="Jelaskan masalah secara rinci..."
                                            className="input-field" />
                                        {errors.deskripsi && <p className="text-red-600 text-xs mt-1">{errors.deskripsi}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Lokasi Kejadian</label>
                                        <input type="text" value={data.lokasi} onChange={e => setData('lokasi', e.target.value)}
                                            placeholder="Contoh: RT 03, Jl. Mawar No. 5"
                                            className="input-field" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Foto Bukti (opsional, maks. 5MB)</label>
                                        <input type="file" accept="image/*" onChange={e => setData('foto_bukti', e.target.files[0])}
                                            className="input-field" />
                                    </div>

                                    <button type="submit" disabled={processing}
                                        className="btn btn-primary w-full justify-center py-3">
                                        {processing ? 'Mengirim...' : 'Kirim Laporan'}
                                    </button>
                                    <p className="text-xs text-center text-text-muted">
                                        Laporan akan diproses dalam 1–3 hari kerja oleh perangkat desa.
                                    </p>
                                </form>
                            )}
                        </ScrollReveal>
                    )}

                    {tab === 'cek' && (
                        <ScrollReveal>
                            <div>
                                <form onSubmit={cekStatus} className="flex gap-3 mb-8">
                                    <input value={cekTiket} onChange={e => setCekTiket(e.target.value)}
                                        placeholder="Contoh: TKT-2026-00001"
                                        className="input-field flex-1" />
                                    <button type="submit" className="btn btn-primary px-5">
                                        <Search size={16} /> Cek
                                    </button>
                                </form>
                                {pengaduan ? (
                                    <div className="border border-border-light p-5" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs mb-0.5 text-text-muted">No. Tiket</p>
                                                <p className="font-bold text-charcoal">{pengaduan.no_tiket}</p>
                                            </div>
                                            <span className="badge text-white text-xs" style={{ background: statusColor[pengaduan.status] }}>
                                                {statusLabel[pengaduan.status]}
                                            </span>
                                        </div>
                                        <div className="text-sm border-t border-border-light">
                                            <div className="py-2.5 flex justify-between border-b border-border-light">
                                                <span className="text-text-secondary">Kategori</span>
                                                <span className="capitalize font-medium text-charcoal">{pengaduan.kategori}</span>
                                            </div>
                                            <div className="py-2.5 flex justify-between">
                                                <span className="text-text-secondary">Dilaporkan</span>
                                                <span className="text-charcoal">{new Date(pengaduan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                            {pengaduan.respon_admin && (
                                                <div className="py-2.5 border-t border-border-light">
                                                    <p className="mb-1 text-text-secondary">Respon Desa</p>
                                                    <p className="text-charcoal">{pengaduan.respon_admin}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : no_tiket ? (
                                    <div className="text-center py-10">
                                        <AlertCircle size={36} className="mx-auto mb-3 text-text-muted" />
                                        <p className="text-text-secondary">Nomor tiket tidak ditemukan.</p>
                                    </div>
                                ) : null}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
