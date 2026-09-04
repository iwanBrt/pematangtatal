import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FileText, Search, Eye } from 'lucide-react';
import { useState } from 'react';

const statusColor = {
    menunggu: { bg: '#fdf3e3', text: '#a16207', label: 'Menunggu' },
    diproses: { bg: '#eef6f3', text: '#235a48', label: 'Diproses' },
    selesai: { bg: '#e6f4ea', text: '#166534', label: 'Selesai' },
    ditolak: { bg: '#fdeaea', text: '#b91c1c', label: 'Ditolak' },
};

export default function PermohonanIndex({ permohonans, filters }) {
    const [search, setSearch] = useState(filters.q || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.permohonan.index'), { q: search, status: statusFilter }, { preserveState: true });
    };

    return (
        <AdminLayout title="Permohonan Surat">
            <Head title="Permohonan Surat" />

            <div className="card p-5 mb-6">
                <form onSubmit={applyFilter} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari no. referensi / pemohon..."
                            className="input-field pl-9"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field max-w-[160px]"
                    >
                        <option value="">Semua Status</option>
                        <option value="menunggu">Menunggu</option>
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
                                <th className="px-5 py-3">No. Referensi</th>
                                <th className="px-5 py-3">Pemohon</th>
                                <th className="px-5 py-3">Layanan</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Tanggal</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                            {permohonans.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-8 text-center text-gray-500">
                                        Belum ada permohonan surat masuk.
                                    </td>
                                </tr>
                            ) : (
                                permohonans.data.map((p) => {
                                    const sc = statusColor[p.status] || statusColor.menunggu;
                                    return (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3 font-bold text-gray-900">{p.no_referensi}</td>
                                            <td className="px-5 py-3 text-gray-700">{p.nama_pemohon}</td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                    <FileText size={12} /> {p.layanan?.nama || '-'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                                                    {sc.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-gray-500 text-xs">
                                                {new Date(p.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <Link
                                                    href={route('admin.permohonan.show', p.id)}
                                                    className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    title="Detail"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {permohonans.last_page > 1 && (
                <div className="flex justify-end gap-1 mt-6">
                    {permohonans.links.map((link, i) => (
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
