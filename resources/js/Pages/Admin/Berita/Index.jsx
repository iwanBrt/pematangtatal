import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function BeritaIndex({ beritas, filters }) {
    const [search, setSearch] = useState(filters.q || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const { delete: destroy } = useForm();

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.berita.index'), { q: search, status: statusFilter }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            destroy(route('admin.berita.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout title="Manajemen Berita">
            <Head title="Manajemen Berita" />

            <div className="card p-5 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <form onSubmit={applyFilter} className="flex flex-1 gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul berita..."
                                className="input-field pl-9"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="input-field max-w-[150px]"
                        >
                            <option value="">Semua Status</option>
                            <option value="published">Diterbitkan</option>
                            <option value="draft">Draft</option>
                        </select>
                        <button type="submit" className="btn btn-outline py-2.5">
                            Filter
                        </button>
                    </form>
                    <Link href={route('admin.berita.create')} className="btn btn-primary py-2.5">
                        <Plus size={16} /> Tambah Berita
                    </Link>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider" style={{ borderColor: 'var(--color-border-light)' }}>
                                <th className="px-5 py-3">Thumbnail</th>
                                <th className="px-5 py-3">Judul Berita</th>
                                <th className="px-5 py-3">Kategori</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Tgl Terbit</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                            {beritas.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-8 text-center text-gray-500">
                                        Data berita tidak ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                beritas.data.map((b) => (
                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {b.thumbnail ? (
                                                    <img src={`/storage/${b.thumbnail}`} alt="thumb" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xl opacity-20">📰</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-gray-900 line-clamp-1">{b.judul}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{b.ringkasan || 'Tidak ada ringkasan'}</p>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="text-xs font-medium text-gray-600">{b.kategori?.nama}</span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {b.status === 'published' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Diterbitkan
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                                    Draft
                                                </span>
                                            )}
                                            {b.is_pinned && (
                                                <span className="inline-flex items-center ml-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    Pinned
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">
                                            {b.published_at ? new Date(b.published_at).toLocaleDateString('id-ID') : '-'}
                                        </td>
                                        <td className="px-5 py-3 text-right space-x-2">
                                            <Link
                                                href={route('admin.berita.edit', b.id)}
                                                className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(b.id)}
                                                className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {beritas.last_page > 1 && (
                <div className="flex justify-end gap-1 mt-6">
                    {beritas.links.map((link, i) => (
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
