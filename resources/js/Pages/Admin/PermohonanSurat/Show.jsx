import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, CheckCheck, Download } from 'lucide-react';

const statusColor = {
    menunggu: { bg: '#fdf3e3', text: '#a16207', label: 'Menunggu' },
    diproses: { bg: '#eef6f3', text: '#235a48', label: 'Diproses' },
    selesai: { bg: '#e6f4ea', text: '#166534', label: 'Selesai' },
    ditolak: { bg: '#fdeaea', text: '#b91c1c', label: 'Ditolak' },
};

export default function PermohonanShow({ permohonan }) {
    const sc = statusColor[permohonan.status] || statusColor.menunggu;
    const { data, setData, patch } = useForm({
        status: permohonan.status,
        catatan_admin: permohonan.catatan_admin || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.permohonan.update', permohonan.id), { preserveScroll: true });
    };

    return (
        <AdminLayout title={`Detail Permohonan ${permohonan.no_referensi}`}>
            <Head title={`Detail ${permohonan.no_referensi}`} />

            <Link href={route('admin.permohonan.index')} className="inline-flex items-center gap-2 text-sm font-medium mb-5 hover:underline" style={{ color: 'var(--color-primary)' }}>
                <ArrowLeft size={16} /> Kembali ke daftar
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                                Detail Permohonan
                            </h2>
                            <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                                {sc.label}
                            </span>
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">No. Referensi</dt>
                                <dd className="mt-1 font-bold text-gray-900">{permohonan.no_referensi}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Jenis Layanan</dt>
                                <dd className="mt-1 text-gray-900">{permohonan.layanan?.nama || '-'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Nama Pemohon</dt>
                                <dd className="mt-1 text-gray-900">{permohonan.nama_pemohon}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">NIK</dt>
                                <dd className="mt-1 text-gray-900">{permohonan.nik}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">No. Telepon</dt>
                                <dd className="mt-1 text-gray-900">{permohonan.no_telepon || '-'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Email</dt>
                                <dd className="mt-1 text-gray-900">{permohonan.email || '-'}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Keperluan</dt>
                                <dd className="mt-1 text-gray-800 leading-relaxed whitespace-pre-line">{permohonan.keperluan || '-'}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Diajukan Pada</dt>
                                <dd className="mt-1 text-gray-900">{new Date(permohonan.created_at).toLocaleString('id-ID')}</dd>
                            </div>
                        </dl>

                        {permohonan.berkas && (
                            <div className="mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                                <a
                                    href={`/storage/${permohonan.berkas}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white"
                                    style={{ backgroundColor: 'var(--color-primary-light)' }}
                                >
                                    <Download size={16} /> Unduh Berkas Permohonan
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <form onSubmit={submit} className="card p-6">
                        <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                            Proses Permohonan
                        </h3>

                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status Permohonan</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="input-field w-full mb-4"
                        >
                            <option value="menunggu">Menunggu</option>
                            <option value="diproses">Diproses</option>
                            <option value="selesai">Selesai</option>
                            <option value="ditolak">Ditolak</option>
                        </select>

                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Catatan Admin</label>
                        <textarea
                            value={data.catatan_admin}
                            onChange={(e) => setData('catatan_admin', e.target.value)}
                            rows="5"
                            placeholder="Catatan proses / alasan jika ditolak..."
                            className="input-field w-full mb-5"
                        />

                        <button type="submit" className="btn btn-primary w-full py-2.5">
                            <CheckCheck size={16} /> Simpan Perubahan
                        </button>
                    </form>

                    {permohonan.selesai_at && (
                        <div className="card p-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Diproses/ditutup pada {new Date(permohonan.selesai_at).toLocaleString('id-ID')}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
