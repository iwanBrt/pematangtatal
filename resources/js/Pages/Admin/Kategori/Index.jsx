import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { useState } from 'react';

export default function KategoriIndex({ kategoris }) {
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, put, delete: destroy, errors, processing, reset } = useForm({
        nama: '',
        warna: '',
    });

    const startCreate = () => {
        setEditing(null);
        reset();
        setShowForm(true);
    };

    const startEdit = (k) => {
        setEditing(k);
        setData({ nama: k.nama, warna: k.warna });
        setShowForm(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.kategori.update', editing.id), { onSuccess: () => { setShowForm(false); setEditing(null); reset(); } });
        } else {
            post(route('admin.kategori.store'), { onSuccess: () => { setShowForm(false); reset(); } });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            destroy(route('admin.kategori.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kategori Berita">
            <Head title="Kategori Berita" />

            <div className="card p-5 mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">Kelola kategori untuk berita &amp; pengumuman.</p>
                <button onClick={startCreate} className="btn btn-primary py-2.5">
                    <Plus size={16} /> Tambah Kategori
                </button>
            </div>

            {showForm && (
                <form onSubmit={submit} className="card p-6 mb-6 border-2" style={{ borderColor: 'var(--color-primary)' }}>
                    <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                        {editing ? 'Edit Kategori' : 'Tambah Kategori'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Kategori *</label>
                            <input type="text" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="input-field w-full" />
                            {errors.nama && <p className="text-xs text-red-600 mt-1">{errors.nama}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Warna</label>
                            <input type="color" value={data.warna || '#2F6B57'} onChange={(e) => setData('warna', e.target.value)} className="input-field w-full h-10 p-1" />
                        </div>
                        <div className="flex items-end gap-2">
                            <button type="submit" disabled={processing} className="btn btn-primary py-2.5 flex-1">Simpan</button>
                            <button type="button" onClick={() => { setShowForm(false); setEditing(null); reset(); }} className="btn btn-outline py-2.5">Batal</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider" style={{ borderColor: 'var(--color-border-light)' }}>
                                <th className="px-5 py-3">Nama Kategori</th>
                                <th className="px-5 py-3">Slug</th>
                                <th className="px-5 py-3">Warna</th>
                                <th className="px-5 py-3">Jumlah Berita</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                            {kategoris.length === 0 ? (
                                <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-500">Belum ada kategori.</td></tr>
                            ) : (
                                kategoris.map((k) => (
                                    <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-semibold text-gray-900">
                                            <span className="inline-flex items-center gap-2"><Tag size={14} /> {k.nama}</span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">{k.slug}</td>
                                        <td className="px-5 py-3">
                                            <span className="inline-block w-6 h-6 rounded border" style={{ backgroundColor: k.warna || '#2F6B57', borderColor: 'var(--color-border-light)' }} />
                                        </td>
                                        <td className="px-5 py-3 text-gray-600 text-xs">{k.beritas_count}</td>
                                        <td className="px-5 py-3 text-right space-x-2">
                                            <button onClick={() => startEdit(k)} className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(k.id)} className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
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
        </AdminLayout>
    );
}
