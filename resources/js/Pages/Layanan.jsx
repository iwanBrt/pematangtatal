import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { Search, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const statusColor = { menunggu: '#D9B56D', diproses: '#2F6B57', selesai: '#164A41', ditolak: '#B91C1C' };
const statusLabel = { menunggu: 'Menunggu', diproses: 'Sedang Diproses', selesai: 'Selesai', ditolak: 'Ditolak' };

export default function Layanan({ layanans, permohonan, no_referensi }) {
    const [activeTab, setActiveTab] = useState('layanan');
    const [selectedLayanan, setSelectedLayanan] = useState(null);
    const [cekRef, setCekRef] = useState(no_referensi || '');

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        layanan_id: '', nama_pemohon: '', nik: '', no_telepon: '', email: '', keperluan: '', berkas: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/layanan/permohonan', {
            forceFormData: true,
            onSuccess: () => { reset(); setSelectedLayanan(null); },
        });
    };

    const cekStatus = (e) => {
        e.preventDefault();
        router.get('/layanan/cek-status', { no_referensi: cekRef });
    };

    return (
        <PublicLayout>
            <Head title="Layanan Desa" />
            <PageHeader
                title="Layanan Publik Desa"
                subtitle="Urus keperluan surat-menyurat Anda secara online — cepat dan mudah."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Layanan' }]}
            />
            <div className="section-padding bg-background">
                <div className="container-custom">
                    {/* Tabs */}
                    <div className="flex gap-0 mb-8 border-b border-border-light">
                        {[
                            ['layanan', 'Jenis Layanan'],
                            ['ajukan', 'Ajukan Permohonan'],
                            ['cek', 'Cek Status'],
                        ].map(([tab, label]) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                                    activeTab === tab
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-text-muted hover:text-text-secondary'
                                }`}
                                style={activeTab !== tab ? {} : { fontFamily: 'var(--font-heading)' }}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tab: Jenis Layanan */}
                    {activeTab === 'layanan' && (
                        <ScrollReveal>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {layanans.map((l) => (
                                <div key={l.id} className="border border-border-light p-5 transition-colors hover:border-primary hover:shadow-card" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <div className="flex items-start gap-3 mb-3">
                                        <div
                                            className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-secondary-bg border border-border-light"
                                            style={{ borderRadius: 'var(--radius-sm)' }}
                                        >
                                            <FileText size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>{l.nama}</h3>
                                            <p className="text-xs flex items-center gap-1 mt-0.5 text-text-muted">
                                                <Clock size={11} /> {l.estimasi_waktu}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold mb-2 text-text-secondary">Persyaratan:</p>
                                        <ul className="space-y-1">
                                            {(l.persyaratan || []).map((s, i) => (
                                                <li key={i} className="text-xs flex gap-1.5 text-text-secondary">
                                                    <span className="text-primary mt-0.5">•</span>{s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => { setSelectedLayanan(l); setData('layanan_id', l.id); setActiveTab('ajukan'); }}
                                        className="btn btn-primary w-full justify-center text-sm py-2"
                                    >
                                        Ajukan Sekarang
                                    </button>
                                </div>
                            ))}
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Tab: Ajukan */}
                    {activeTab === 'ajukan' && (
                        <ScrollReveal>
                            {recentlySuccessful ? (
                                <div className="border border-border-light p-10 text-center" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                                    <h2 className="text-lg font-bold mb-2 text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Permohonan Berhasil Dikirim
                                    </h2>
                                    <p className="text-sm mb-6 text-text-secondary">
                                        Simpan nomor referensi Anda untuk memantau status permohonan.
                                    </p>
                                    <button onClick={() => reset()} className="btn btn-primary">Ajukan Lagi</button>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="border border-border-light p-6 space-y-4" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h2 className="font-bold text-base mb-1 text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Form Permohonan Surat
                                    </h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Jenis Layanan *</label>
                                        <select
                                            value={data.layanan_id}
                                            onChange={e => setData('layanan_id', e.target.value)}
                                            className="input-field"
                                        >
                                            <option value="">-- Pilih Layanan --</option>
                                            {layanans.map(l => <option key={l.id} value={l.id}>{l.nama}</option>)}
                                        </select>
                                        {errors.layanan_id && <p className="text-red-600 text-xs mt-1">{errors.layanan_id}</p>}
                                    </div>

                                    {[
                                        { label: 'Nama Lengkap *', key: 'nama_pemohon', type: 'text', placeholder: 'Sesuai KTP' },
                                        { label: 'NIK (16 digit) *', key: 'nik', type: 'text', placeholder: '3501XXXXXXXXXXXX' },
                                        { label: 'No. Telepon/WA *', key: 'no_telepon', type: 'tel', placeholder: '0812XXXXXXXX' },
                                        { label: 'Email (opsional)', key: 'email', type: 'email', placeholder: 'email@contoh.com' },
                                    ].map(({ label, key, type, placeholder }) => (
                                        <div key={key}>
                                            <label className="block text-sm font-medium mb-1.5 text-text-secondary">{label}</label>
                                            <input
                                                type={type}
                                                value={data[key]}
                                                onChange={e => setData(key, e.target.value)}
                                                placeholder={placeholder}
                                                className="input-field"
                                            />
                                            {errors[key] && <p className="text-red-600 text-xs mt-1">{errors[key]}</p>}
                                        </div>
                                    ))}

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Keperluan *</label>
                                        <textarea
                                            value={data.keperluan}
                                            onChange={e => setData('keperluan', e.target.value)}
                                            rows={3}
                                            placeholder="Jelaskan keperluan Anda..."
                                            className="input-field"
                                        />
                                        {errors.keperluan && <p className="text-red-600 text-xs mt-1">{errors.keperluan}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">Upload Berkas (PDF/JPG, maks. 5MB)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={e => setData('berkas', e.target.files[0])}
                                            className="input-field"
                                        />
                                        {errors.berkas && <p className="text-red-600 text-xs mt-1">{errors.berkas}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn btn-primary w-full justify-center py-3"
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Permohonan'}
                                    </button>
                                </form>
                            )}
                        </ScrollReveal>
                    )}

                    {/* Tab: Cek Status */}
                    {activeTab === 'cek' && (
                        <ScrollReveal>
                            <form onSubmit={cekStatus} className="flex gap-3 mb-8">
                                <input
                                    value={cekRef}
                                    onChange={e => setCekRef(e.target.value)}
                                    placeholder="Contoh: PS-2026-00001"
                                    className="input-field flex-1"
                                />
                                <button type="submit" className="btn btn-primary px-5">
                                    <Search size={16} /> Cek
                                </button>
                            </form>

                            {permohonan && (
                                <div className="border border-border-light p-5" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-xs mb-0.5 text-text-muted">No. Referensi</p>
                                            <p className="font-bold text-charcoal">{permohonan.no_referensi}</p>
                                        </div>
                                        <span className="badge text-white text-xs" style={{ background: statusColor[permohonan.status] }}>
                                            {statusLabel[permohonan.status]}
                                        </span>
                                    </div>
                                    <div className="text-sm border-t border-border-light">
                                        <div className="py-2.5 flex justify-between border-b border-border-light">
                                            <span className="text-text-secondary">Nama</span>
                                            <span className="font-medium text-charcoal">{permohonan.nama_pemohon}</span>
                                        </div>
                                        <div className="py-2.5 flex justify-between border-b border-border-light">
                                            <span className="text-text-secondary">Layanan</span>
                                            <span className="font-medium text-charcoal">{permohonan.layanan?.nama}</span>
                                        </div>
                                        <div className="py-2.5 flex justify-between">
                                            <span className="text-text-secondary">Diajukan</span>
                                            <span className="text-charcoal">{new Date(permohonan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        {permohonan.catatan_admin && (
                                            <div className="py-2.5 border-t border-border-light">
                                                <p className="mb-1 text-text-secondary">Catatan Admin</p>
                                                <p className="text-charcoal">{permohonan.catatan_admin}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {no_referensi && !permohonan && (
                                <div className="text-center py-10">
                                    <AlertCircle size={36} className="mx-auto mb-3 text-text-muted" />
                                    <p className="text-text-secondary">Nomor referensi tidak ditemukan.</p>
                                </div>
                            )}
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
