import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, CheckCheck, XCircle } from 'lucide-react';

const statusColor = {
    diterima: { bg: '#eef6f3', text: '#235a48', label: 'Diterima' },
    diproses: { bg: '#fdf3e3', text: '#a16207', label: 'Diproses' },
    selesai: { bg: '#e6f4ea', text: '#166534', label: 'Selesai' },
    ditolak: { bg: '#fdeaea', text: '#b91c1c', label: 'Ditolak' },
};

export default function PengaduanShow({ pengaduan }) {
    const sc = statusColor[pengaduan.status] || statusColor.diterima;
    const { data, setData, patch } = useForm({
        status: pengaduan.status,
        respon_admin: pengaduan.respon_admin || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.pengaduan.update', pengaduan.id), { preserveScroll: true });
    };

    return (
        <AdminLayout title={`Detail Pengaduan ${pengaduan.no_tiket}`}>
            <Head title={`Detail ${pengaduan.no_tiket}`} />

            <Link href={route('admin.pengaduan.index')} className="inline-flex items-center gap-2 text-sm font-medium mb-5 hover:underline" style={{ color: 'var(--color-primary)' }}>
                <ArrowLeft size={16} /> Kembali ke daftar
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                                Detail Pengaduan
                            </h2>
                            <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                                {sc.label}
                            </span>
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Nomor Tiket</dt>
                                <dd className="mt-1 font-bold text-gray-900">{pengaduan.no_tiket}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Pelapor</dt>
                                <dd className="mt-1 text-gray-900">{pengaduan.is_anonim ? 'Anonim' : (pengaduan.nama_pelapor || '-')}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">No. Telepon</dt>
                                <dd className="mt-1 text-gray-900">{pengaduan.is_anonim ? '-' : (pengaduan.no_telepon || '-')}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Kategori</dt>
                                <dd className="mt-1 text-gray-900 capitalize">{pengaduan.kategori}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Lokasi</dt>
                                <dd className="mt-1 text-gray-900">{pengaduan.lokasi || '-'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-gray-500">Dikirim</dt>
                                <dd className="mt-1 text-gray-900">{new Date(pengaduan.created_at).toLocaleString('id-ID')}</dd>
                            </div>
                        </dl>

                        <div className="mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                            <dt className="text-xs uppercase tracking-wide text-gray-500">Deskripsi Pengaduan</dt>
                            <p className="mt-2 text-gray-800 leading-relaxed whitespace-pre-line">{pengaduan.deskripsi}</p>
                        </div>

                        {pengaduan.foto_bukti && (
                            <div className="mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                                <dt className="text-xs uppercase tracking-wide text-gray-500 mb-2">Foto Bukti</dt>
                                <a href={`/storage/${pengaduan.foto_bukti}`} target="_blank" rel="noreferrer">
                                    <img src={`/storage/${pengaduan.foto_bukti}`} alt="Foto bukti" className="max-h-72 rounded-md border" style={{ borderColor: 'var(--color-border-light)' }} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <form onSubmit={submit} className="card p-6">
                        <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                            Perbarui Status
                        </h3>

                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status Pengaduan</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="input-field w-full mb-4"
                        >
                            <option value="diterima">Diterima</option>
                            <option value="diproses">Diproses</option>
                            <option value="selesai">Selesai</option>
                            <option value="ditolak">Ditolak</option>
                        </select>

                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Respon / Tindak lanjut</label>
                        <textarea
                            value={data.respon_admin}
                            onChange={(e) => setData('respon_admin', e.target.value)}
                            rows="5"
                            placeholder="Tulis respon atau tindak lanjut untuk pelapor..."
                            className="input-field w-full mb-5"
                        />

                        <button type="submit" className="btn btn-primary w-full py-2.5">
                            <CheckCheck size={16} /> Simpan Perubahan
                        </button>
                    </form>

                    {pengaduan.selesai_at && (
                        <div className="card p-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Diselesaikan/ditutup pada {new Date(pengaduan.selesai_at).toLocaleString('id-ID')}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
