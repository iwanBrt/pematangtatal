import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AlertTriangle, Search, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

const statusColor = {
    diterima: { bg: '#eef6f3', text: '#235a48', label: 'Diterima' },
    diproses: { bg: '#fdf3e3', text: '#a16207', label: 'Diproses' },
    selesai: { bg: '#e6f4ea', text: '#166534', label: 'Selesai' },
    ditolak: { bg: '#fdeaea', text: '#b91c1c', label: 'Ditolak' },
};

export default function PengaduanIndex({ pengaduans, filters }) {
    const [search, setSearch] = useState(filters.q || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const { delete: destroy } = useForm();

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.pengaduan.index'), { q: search, status: statusFilter }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengaduan ini?')) {
            destroy(route('admin.pengaduan.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Pengaduan Warga">
            <Head title="Pengaduan Warga" />

            <div className="card p-5 mb-6">
                <form onSubmit={applyFilter} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nomor tiket / nama pelapor..."
                            className="input-field pl-9"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field max-w-[160px]"
                    >
                        <option value="">Semua Status</option>
                        <option value="diterima">Diterima</option>
                        <option value="diproses">Diproses</option>
                        <option value="selesai">Selesai</option>
                        <option value="ditolak">Ditolak</option>
                    </select>
                    <button type="submit" className="btn btn-outline py-2.5">Filter</button>
                </form>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider" style={{ borderColor: 'var(--color-border-light)' }}>
                                <th className="px-5 py-3">No. Tiket</th>
                                <th className="px-5 py-3">Pelapor</th>
                                <th className="px-5 py-3">Kategori</th>
                                <th className="px-5 py-3">Lokasi</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Tanggal</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                            {pengaduans.data.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-5 py-8 text-center text-gray-500">
                                        Belum ada pengaduan masuk.
                                    </td>
                                </tr>
                            ) : (
                                pengaduans.data.map((p) => {
                                    const sc = statusColor[p.status] || statusColor.diterima;
                                    return (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3 font-bold text-gray-900">{p.no_tiket}</td>
                                            <td className="px-5 py-3 text-gray-700">
                                                {p.is_anonim ? <span className="italic text-gray-400">Anonim</span> : (p.nama_pelapor || '-')}
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                                    <AlertTriangle size={12} /> {p.kategori}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-gray-500 text-xs line-clamp-1">{p.lokasi || '-'}</td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                                                    {sc.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-gray-500 text-xs">
                                                {new Date(p.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-5 py-3 text-right space-x-2">
                                                <Link
                                                    href={route('admin.pengaduan.show', p.id)}
                                                    className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    title="Detail"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pengaduans.last_page > 1 && (
                <div className="flex justify-end gap-1 mt-6">
                    {pengaduans.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                                link.active
                                    ? 'bg-primary-700 text-white border-primary-700'
                                    : 'bg-white text-gray-600 hover:border-gray-400 disabled:opacity-40 border-gray-200'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
