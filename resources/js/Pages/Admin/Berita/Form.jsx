import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

export default function BeritaForm({ berita, kategoris }) {
    const isEdit = !!berita;

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        kategori_id: berita?.kategori_id || '',
        judul: berita?.judul || '',
        ringkasan: berita?.ringkasan || '',
        isi: berita?.isi || '',
        status: berita?.status || 'draft',
        is_pinned: berita?.is_pinned || false,
        thumbnail: null,
    });

    const [preview, setPreview] = useState(berita?.thumbnail ? `/storage/${berita.thumbnail}` : null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('thumbnail', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(berita?.thumbnail ? `/storage/${berita.thumbnail}` : null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('admin.berita.update', berita.id) : route('admin.berita.store');
        post(url, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Berita' : 'Tambah Berita Baru'}>
            <Head title={isEdit ? 'Edit Berita' : 'Tambah Berita'} />

            <div className="mb-6">
                <Link href={route('admin.berita.index')} className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2">
                    <ArrowLeft size={16} /> Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Berita *</label>
                                <input
                                    type="text"
                                    value={data.judul}
                                    onChange={e => setData('judul', e.target.value)}
                                    className="input-field"
                                    placeholder="Masukkan judul berita"
                                />
                                {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ringkasan (Opsional)</label>
                                <textarea
                                    value={data.ringkasan}
                                    onChange={e => setData('ringkasan', e.target.value)}
                                    rows="2"
                                    className="input-field"
                                    placeholder="Singkat, padat, dan menarik..."
                                ></textarea>
                                {errors.ringkasan && <p className="text-red-500 text-xs mt-1">{errors.ringkasan}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Isi Berita *</label>
                                <textarea
                                    value={data.isi}
                                    onChange={e => setData('isi', e.target.value)}
                                    rows="15"
                                    className="input-field font-mono text-sm"
                                    placeholder="Tuliskan isi berita di sini (bisa gunakan format HTML dasar jika diperlukan)..."
                                ></textarea>
                                {errors.isi && <p className="text-red-500 text-xs mt-1">{errors.isi}</p>}
                                <p className="text-xs text-gray-400 mt-2">
                                    Catatan: Editor teks sederhana digunakan saat ini. Gunakan &lt;p&gt; atau &lt;br&gt; untuk paragraf.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Form */}
                <div className="space-y-6">
                    <div className="card p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Publikasi</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="input-field"
                                >
                                    <option value="draft">Draft (Simpan Sementara)</option>
                                    <option value="published">Diterbitkan (Publik)</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer mt-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_pinned}
                                    onChange={e => setData('is_pinned', e.target.checked)}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                                />
                                <span className="text-sm text-gray-700">Tandai sebagai Pengumuman (Sematkan)</span>
                            </label>

                            <button type="submit" disabled={processing} className="btn btn-primary w-full justify-center mt-4 py-2.5">
                                <Save size={16} />
                                {processing ? 'Menyimpan...' : 'Simpan Berita'}
                            </button>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Kategori</h3>
                        <div>
                            <select
                                value={data.kategori_id}
                                onChange={e => setData('kategori_id', e.target.value)}
                                className="input-field"
                            >
                                <option value="">-- Pilih Kategori --</option>
                                {kategoris.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                ))}
                            </select>
                            {errors.kategori_id && <p className="text-red-500 text-xs mt-1">{errors.kategori_id}</p>}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Gambar Utama (Thumbnail)</h3>
                        <div>
                            {preview ? (
                                <div className="mb-3 relative group rounded-md overflow-hidden border border-gray-200">
                                    <img src={preview} alt="Preview" className="w-full aspect-[4/3] object-cover" />
                                    <button 
                                        type="button" 
                                        onClick={() => { setData('thumbnail', null); setPreview(null); }}
                                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Hapus Foto
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-3 w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center text-gray-400">
                                    <span className="text-2xl mb-2">📸</span>
                                    <span className="text-xs">Belum ada gambar</span>
                                </div>
                            )}
                            
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="input-field text-sm"
                            />
                            {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>}
                            <p className="text-xs text-gray-500 mt-2">Maks. 5MB, format JPG/PNG/WebP disarankan 800x600px.</p>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
