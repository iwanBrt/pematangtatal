import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

export default function GaleriIndex({ galeris }) {
    const { delete: destroy } = useForm();
    const [kategori, setKategori] = useState('');

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.galeri.index'), { kategori }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
            destroy(route('admin.galeri.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Galeri Foto">
            <Head title="Galeri Foto" />

            <div className="card p-5 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <form onSubmit={applyFilter} className="flex gap-3">
                        <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="input-field max-w-[180px]">
                            <option value="">Semua Kategori</option>
                            <option value="kegiatan">Kegiatan</option>
                            <option value="alam">Alam</option>
                            <option value="pembangunan">Pembangunan</option>
                            <option value="budaya">Budaya</option>
                        </select>
                        <button type="submit" className="btn btn-outline py-2.5">Filter</button>
                    </form>
                    <Link href={route('admin.galeri.create')} className="btn btn-primary py-2.5">
                        <Plus size={16} /> Tambah Foto
                    </Link>
                </div>
            </div>

            {galeris.data.length === 0 ? (
                <div className="card p-10 text-center text-gray-500">Belum ada foto galeri.</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galeris.data.map((g) => (
                        <div key={g.id} className="card overflow-hidden group">
                            <div className="aspect-square overflow-hidden bg-gray-100 relative">
                                <img
                                    src={`/storage/${g.foto}`}
                                    alt={g.judul}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                {g.is_featured && (
                                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase" style={{ backgroundColor: 'var(--color-accent)' }}>
                                        Unggulan
                                    </span>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-semibold text-gray-900 line-clamp-1">{g.judul}</p>
                                <p className="text-xs text-gray-500 capitalize mt-0.5">{g.kategori}</p>
                                <div className="flex justify-end gap-1 mt-2">
                                    <a href={`/storage/${g.foto}`} target="_blank" rel="noreferrer" className="p-1.5 rounded text-gray-400 hover:text-gray-600" title="Lihat">
                                        <Eye size={15} />
                                    </a>
                                    <Link href={route('admin.galeri.edit', g.id)} className="p-1.5 rounded text-gray-400 hover:text-blue-600" title="Edit">
                                        <Edit size={15} />
                                    </Link>
                                    <button onClick={() => handleDelete(g.id)} className="p-1.5 rounded text-gray-400 hover:text-red-600" title="Hapus">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {galeris.last_page > 1 && (
                <div className="flex justify-end gap-1 mt-6">
                    {galeris.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                                link.active ? 'bg-primary-700 text-white border-primary-700'
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
