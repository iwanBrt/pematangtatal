import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Plus, Edit, Trash2, Camera } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function ProfilIndex({ profil, perangkat }) {
    const [tab, setTab] = useState('profil');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPerangkat, setEditingPerangkat] = useState(null);

    // Form Profil Desa
    const formProfil = useForm({
        _method: 'PUT',
        nama_desa: profil?.nama_desa || '',
        sejarah: profil?.sejarah || '',
        visi: profil?.visi || '',
        misi: profil?.misi || '',
        luas_wilayah: profil?.luas_wilayah || '',
        jumlah_dusun: profil?.jumlah_dusun || '',
        jumlah_rt: profil?.jumlah_rt || '',
        jumlah_rw: profil?.jumlah_rw || '',
        batas_utara: profil?.batas_utara || '',
        batas_selatan: profil?.batas_selatan || '',
        batas_timur: profil?.batas_timur || '',
        batas_barat: profil?.batas_barat || '',
        no_telepon: profil?.no_telepon || '',
        email: profil?.email || '',
        website: profil?.website || '',
        foto_kantor: null,
    });

    const [previewKantor, setPreviewKantor] = useState(profil?.foto_kantor ? `/storage/${profil.foto_kantor}` : null);

    const submitProfil = (e) => {
        e.preventDefault();
        formProfil.post(route('admin.profil.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    // Form Perangkat Desa
    const formPerangkat = useForm({
        _method: 'POST',
        nama: '',
        jabatan: '',
        nip: '',
        no_telepon: '',
        urutan: 1,
        is_aktif: true,
        foto: null,
    });

    const [previewPerangkat, setPreviewPerangkat] = useState(null);

    const openModal = (p = null) => {
        if (p) {
            setEditingPerangkat(p);
            formPerangkat.setData({
                _method: 'PUT',
                nama: p.nama,
                jabatan: p.jabatan,
                nip: p.nip || '',
                no_telepon: p.no_telepon || '',
                urutan: p.urutan,
                is_aktif: p.is_aktif,
                foto: null,
            });
            setPreviewPerangkat(p.foto ? `/storage/${p.foto}` : null);
        } else {
            setEditingPerangkat(null);
            formPerangkat.reset();
            formPerangkat.setData('_method', 'POST');
            setPreviewPerangkat(null);
        }
        setIsModalOpen(true);
    };

    const submitPerangkat = (e) => {
        e.preventDefault();
        const url = editingPerangkat ? route('admin.perangkat.update', editingPerangkat.id) : route('admin.perangkat.store');
        formPerangkat.post(url, {
            forceFormData: true,
            onSuccess: () => setIsModalOpen(false),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus perangkat desa ini?')) {
            router.delete(route('admin.perangkat.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout title="Manajemen Profil & Perangkat">
            <Head title="Profil Desa" />

            <div className="flex gap-2 mb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['profil', 'perangkat'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px capitalize ${
                            tab === t
                                ? 'border-primary-700 text-primary-700'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {t === 'profil' ? 'Informasi Profil Desa' : 'Perangkat Desa'}
                    </button>
                ))}
            </div>

            {tab === 'profil' && (
                <form onSubmit={submitProfil} className="space-y-6">
                    <div className="card p-6">
                        <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Identitas Utama</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Desa</label>
                                <input type="text" value={formProfil.data.nama_desa} onChange={e => formProfil.setData('nama_desa', e.target.value)} className="input-field" />
                            </div>
                            <div className="row-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Kantor Desa</label>
                                {previewKantor ? (
                                    <div className="relative group rounded-md overflow-hidden aspect-video border border-gray-200">
                                        <img src={previewKantor} alt="Kantor" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => { formProfil.setData('foto_kantor', null); setPreviewKantor(null); }} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            Hapus Foto
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                                        <Camera className="text-gray-400 mb-2" size={24} />
                                        <span className="text-sm text-gray-500">Pilih foto kantor desa</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={e => {
                                            const file = e.target.files[0];
                                            formProfil.setData('foto_kantor', file);
                                            if (file) setPreviewKantor(URL.createObjectURL(file));
                                        }} />
                                    </label>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sejarah Singkat</label>
                                <textarea rows={4} value={formProfil.data.sejarah} onChange={e => formProfil.setData('sejarah', e.target.value)} className="input-field"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Visi & Misi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Visi</label>
                                <textarea rows={4} value={formProfil.data.visi} onChange={e => formProfil.setData('visi', e.target.value)} className="input-field"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Misi</label>
                                <textarea rows={4} value={formProfil.data.misi} onChange={e => formProfil.setData('misi', e.target.value)} className="input-field" placeholder="Gunakan urutan nomor untuk misi..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Kontak & Sosial Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon / WA</label>
                                <input type="text" value={formProfil.data.no_telepon} onChange={e => formProfil.setData('no_telepon', e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <input type="email" value={formProfil.data.email} onChange={e => formProfil.setData('email', e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Website Utama</label>
                                <input type="text" value={formProfil.data.website} onChange={e => formProfil.setData('website', e.target.value)} className="input-field" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Data Geografis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Luas Wilayah</label>
                                <input type="text" value={formProfil.data.luas_wilayah} onChange={e => formProfil.setData('luas_wilayah', e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jml Dusun</label>
                                <input type="number" value={formProfil.data.jumlah_dusun} onChange={e => formProfil.setData('jumlah_dusun', e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Batas Utara</label>
                                <input type="text" value={formProfil.data.batas_utara} onChange={e => formProfil.setData('batas_utara', e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Batas Selatan</label>
                                <input type="text" value={formProfil.data.batas_selatan} onChange={e => formProfil.setData('batas_selatan', e.target.value)} className="input-field" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" disabled={formProfil.processing} className="btn btn-primary py-2.5 px-6">
                            <Save size={16} /> {formProfil.processing ? 'Menyimpan...' : 'Simpan Profil Desa'}
                        </button>
                    </div>
                </form>
            )}

            {tab === 'perangkat' && (
                <div className="card">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Daftar Perangkat Desa</h3>
                        <button onClick={() => openModal()} className="btn btn-primary py-2 px-4 text-sm">
                            <Plus size={16} /> Tambah
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                    <th className="px-5 py-3">Foto</th>
                                    <th className="px-5 py-3">Nama & Jabatan</th>
                                    <th className="px-5 py-3">Urutan</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {perangkat.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                                                {p.foto ? <img src={`/storage/${p.foto}`} alt={p.nama} className="w-full h-full object-cover" /> : <span className="text-gray-400">👤</span>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-gray-900">{p.nama}</p>
                                            <p className="text-xs text-primary-600 mt-0.5">{p.jabatan}</p>
                                        </td>
                                        <td className="px-5 py-3 font-medium text-gray-600">{p.urutan}</td>
                                        <td className="px-5 py-3">
                                            {p.is_aktif ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Aktif</span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">Nonaktif</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right space-x-2">
                                            <button onClick={() => openModal(p)} className="inline-flex p-1.5 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="inline-flex p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {perangkat.length === 0 && (
                                    <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-500">Belum ada data perangkat desa.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal Perangkat */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={submitPerangkat} className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 font-heading mb-4 border-b pb-2">
                        {editingPerangkat ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'}
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                            <input type="text" value={formPerangkat.data.nama} onChange={e => formPerangkat.setData('nama', e.target.value)} className="input-field" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Jabatan</label>
                            <input type="text" value={formPerangkat.data.jabatan} onChange={e => formPerangkat.setData('jabatan', e.target.value)} className="input-field" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">NIP (Opsional)</label>
                            <input type="text" value={formPerangkat.data.nip} onChange={e => formPerangkat.setData('nip', e.target.value)} className="input-field" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon (Opsional)</label>
                            <input type="text" value={formPerangkat.data.no_telepon} onChange={e => formPerangkat.setData('no_telepon', e.target.value)} className="input-field" />
                        </div>
                        
                        <div className="col-span-2 flex gap-4 mt-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Pas Foto (Rasio 3:4)</label>
                                <input type="file" accept="image/*" onChange={e => {
                                    const file = e.target.files[0];
                                    formPerangkat.setData('foto', file);
                                    if(file) setPreviewPerangkat(URL.createObjectURL(file));
                                }} className="input-field text-sm" />
                            </div>
                            {previewPerangkat && (
                                <div className="w-16 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                    <img src={previewPerangkat} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="col-span-2 sm:col-span-1 mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Urutan Tampil</label>
                            <input type="number" value={formPerangkat.data.urutan} onChange={e => formPerangkat.setData('urutan', e.target.value)} className="input-field" min="1" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1 mt-2 flex items-center pt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={formPerangkat.data.is_aktif} onChange={e => formPerangkat.setData('is_aktif', e.target.checked)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4" />
                                <span className="text-sm font-medium text-gray-700">Aktif Menjabat</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline py-2 px-4">Batal</button>
                        <button type="submit" disabled={formPerangkat.processing} className="btn btn-primary py-2 px-4">
                            {formPerangkat.processing ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
