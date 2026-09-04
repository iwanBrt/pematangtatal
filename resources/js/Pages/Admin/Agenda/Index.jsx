import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Search, CalendarDays } from 'lucide-react';
import { useState } from 'react';

export default function AgendaIndex({ agendas }) {
    const [search, setSearch] = useState('');
    const { delete: destroy } = useForm();

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.agenda.index'), { q: search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
            destroy(route('admin.agenda.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Agenda Kegiatan">
            <Head title="Agenda Kegiatan" />

            <div className="card p-5 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <form onSubmit={applyFilter} className="flex flex-1 gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari agenda..." className="input-field pl-9" />
                        </div>
                        <button type="submit" className="btn btn-outline py-2.5">Filter</button>
                    </form>
                    <Link href={route('admin.agenda.create')} className="btn btn-primary py-2.5">
                        <Plus size={16} /> Tambah Agenda
                    </Link>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider" style={{ borderColor: 'var(--color-border-light)' }}>
                                <th className="px-5 py-3">Judul</th>
                                <th className="px-5 py-3">Tanggal Mulai</th>
                                <th className="px-5 py-3">Lokasi</th>
                                <th className="px-5 py-3">Penyelenggara</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                            {agendas.data.length === 0 ? (
                                <tr><td colSpan="6" className="px-5 py-8 text-center text-gray-500">Belum ada agenda.</td></tr>
                            ) : (
                                agendas.data.map((a) => (
                                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-gray-900 line-clamp-1">{a.judul}</p>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">
                                            <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {new Date(a.tanggal_mulai).toLocaleDateString('id-ID')}</span>
                                            {a.tanggal_selesai && <span> - {new Date(a.tanggal_selesai).toLocaleDateString('id-ID')}</span>}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">{a.lokasi || '-'}</td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">{a.penyelenggara || '-'}</td>
                                        <td className="px-5 py-3">
                                            {a.is_publik ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Publik</span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">Tersimpan</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right space-x-2">
                                            <Link href={route('admin.agenda.edit', a.id)} className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(a.id)} className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
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

            {agendas.last_page > 1 && (
                <div className="flex justify-end gap-1 mt-6">
                    {agendas.links.map((link, i) => (
                        <button key={i} disabled={!link.url} onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${link.active ? 'bg-primary-700 text-white border-primary-700' : 'bg-white text-gray-600 hover:border-gray-400 disabled:opacity-40 border-gray-200'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
