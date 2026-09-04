import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export default function GaleriForm({ galeri }) {
    const isEdit = !!galeri;
    const { data, setData, post, put, errors, processing } = useForm({
        judul: galeri?.judul || '',
        kategori: galeri?.kategori || 'kegiatan',
        keterangan: galeri?.keterangan || '',
        tanggal: galeri?.tanggal || '',
        is_featured: galeri?.is_featured || false,
        foto: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.galeri.update', galeri.id));
        } else {
            post(route('admin.galeri.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'}>
            <Head title={isEdit ? 'Edit Galeri' : 'Tambah Galeri'} />

            <Link href={route('admin.galeri.index')} className="inline-flex items-center gap-2 text-sm font-medium mb-5 hover:underline" style={{ color: 'var(--color-primary)' }}>
                <ArrowLeft size={16} /> Kembali
            </Link>

            <form onSubmit={submit} encType="multipart/form-data" className="card p-6 max-w-2xl">
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Judul Foto *</label>
                    <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="input-field w-full" />
                    {errors.judul && <p className="text-xs text-red-600 mt-1">{errors.judul}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kategori</label>
                        <select value={data.kategori} onChange={(e) => setData('kategori', e.target.value)} className="input-field w-full">
                            <option value="kegiatan">Kegiatan</option>
                            <option value="alam">Alam</option>
                            <option value="pembangunan">Pembangunan</option>
                            <option value="budaya">Budaya</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tanggal</label>
                        <input type="date" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} className="input-field w-full" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Keterangan</label>
                    <textarea value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} rows="3" className="input-field w-full" />
                </div>

                <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Foto {!isEdit && '*'}</label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--color-border-light)' }}>
                        <Upload size={24} className="mb-2 text-gray-400" />
                        <span className="text-sm text-gray-500">{data.foto ? data.foto.name : (isEdit && galeri.foto ? 'Klik untuk mengganti foto' : 'Klik untuk memilih foto')}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setData('foto', e.target.files[0])} />
                    </label>
                    {isEdit && galeri.foto && !data.foto && (
                        <img src={`/storage/${galeri.foto}`} alt="current" className="mt-3 h-32 rounded-md object-cover border" style={{ borderColor: 'var(--color-border-light)' }} />
                    )}
                    {errors.foto && <p className="text-xs text-red-600 mt-1">{errors.foto}</p>}
                </div>

                <label className="flex items-center gap-2 mb-6 text-sm text-gray-700">
                    <input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} className="w-4 h-4" />
                    Jadikan foto unggulan
                </label>

                <button type="submit" disabled={processing} className="btn btn-primary py-2.5">
                    <Save size={16} /> {isEdit ? 'Simpan Perubahan' : 'Tambah Foto'}
                </button>
            </form>
        </AdminLayout>
    );
}
