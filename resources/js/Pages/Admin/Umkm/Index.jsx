import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Search, Star, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function UmkmIndex({ umkms, filters }) {
    const [search, setSearch] = useState(filters.q || '');
    const [kategoriFilter, setKategoriFilter] = useState(filters.kategori || '');
    const { delete: destroy } = useForm();

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.umkm.index'), { q: search, kategori: kategoriFilter }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus UMKM ini? Semua produknya juga akan terhapus.')) {
            destroy(route('admin.umkm.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout title="Manajemen UMKM">
            <Head title="Manajemen UMKM" />

            <div className="card p-5 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <form onSubmit={applyFilter} className="flex flex-1 gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama usaha atau pemilik..."
                                className="input-field pl-9"
                            />
                        </div>
                        <select
                            value={kategoriFilter}
                            onChange={(e) => setKategoriFilter(e.target.value)}
                            className="input-field max-w-[180px]"
                        >
                            <option value="">Semua Kategori</option>
                            <option value="Kuliner">Kuliner</option>
                            <option value="Kerajinan">Kerajinan & Kriya</option>
                            <option value="Pertanian">Pertanian & Peternakan</option>
                            <option value="Jasa">Jasa</option>
                        </select>
                        <button type="submit" className="btn btn-outline py-2.5">
                            Filter
                        </button>
                    </form>
                    <Link href={route('admin.umkm.create')} className="btn btn-primary py-2.5">
                        <Plus size={16} /> Tambah UMKM
                    </Link>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                <th className="px-5 py-3">Usaha</th>
                                <th className="px-5 py-3">Pemilik & Kontak</th>
                                <th className="px-5 py-3">Kategori</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {umkms.data.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-5 py-8 text-center text-gray-500">
                                        Data UMKM tidak ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                umkms.data.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                                                    {u.foto ? (
                                                        <img src={`/storage/${u.foto}`} alt="thumb" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-gray-400">🏪</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 flex items-center gap-1">
                                                        {u.nama_usaha}
                                                        {u.is_unggulan && <Star size={14} className="text-amber-500 fill-current" title="UMKM Unggulan" />}
                                                    </p>
                                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{u.deskripsi || 'Tidak ada deskripsi'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <p className="font-medium text-gray-800">{u.nama_pemilik}</p>
                                            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                <MessageCircle size={12}/> {u.no_wa || '-'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                {u.kategori}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {u.is_aktif ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Non-aktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right space-x-2 whitespace-nowrap">
                                            <Link
                                                href={route('admin.umkm.edit', u.id)}
                                                className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                title="Edit & Kelola Produk"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(u.id)}
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
            {umkms.last_page > 1 && (
                <div className="flex justify-end gap-1 mt-6">
                    {umkms.links.map((link, i) => (
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
