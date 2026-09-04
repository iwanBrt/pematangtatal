import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';

export default function LayananForm({ layanan }) {
    const isEdit = !!layanan;
    const { data, setData, post, put, errors, processing } = useForm({
        nama: layanan?.nama || '',
        kode: layanan?.kode || '',
        deskripsi: layanan?.deskripsi || '',
        persyaratan: layanan?.persyaratan || [''],
        estimasi_waktu: layanan?.estimasi_waktu || '',
        ikon: layanan?.ikon || 'FileText',
        urutan: layanan?.urutan || 0,
        is_aktif: layanan?.is_aktif ?? true,
    });

    const addSyarat = () => setData('persyaratan', [...data.persyaratan, '']);
    const removeSyarat = (i) => setData('persyaratan', data.persyaratan.filter((_, idx) => idx !== i));
    const setSyarat = (i, val) => setData('persyaratan', data.persyaratan.map((s, idx) => idx === i ? val : s));

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.layanan.update', layanan.id));
        } else {
            post(route('admin.layanan.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Layanan' : 'Tambah Layanan'}>
            <Head title={isEdit ? 'Edit Layanan' : 'Tambah Layanan'} />

            <Link href={route('admin.layanan.index')} className="inline-flex items-center gap-2 text-sm font-medium mb-5 hover:underline" style={{ color: 'var(--color-primary)' }}>
                <ArrowLeft size={16} /> Kembali
            </Link>

            <form onSubmit={submit} className="card p-6 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Layanan *</label>
                        <input type="text" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="input-field w-full" />
                        {errors.nama && <p className="text-xs text-red-600 mt-1">{errors.nama}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kode *</label>
                        <input type="text" value={data.kode} onChange={(e) => setData('kode', e.target.value)} placeholder="mis. SKD" className="input-field w-full" />
                        {errors.kode && <p className="text-xs text-red-600 mt-1">{errors.kode}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Deskripsi</label>
                    <textarea value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} rows="3" className="input-field w-full" />
                </div>

                <div className="mb-4">
                    <label className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-1.5">
                        <span>Persyaratan</span>
                        <button type="button" onClick={addSyarat} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                            <Plus size={13} /> Tambah
                        </button>
                    </label>
                    {data.persyaratan.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={s}
                                onChange={(e) => setSyarat(i, e.target.value)}
                                placeholder={`Syarat ${i + 1}`}
                                className="input-field flex-1"
                            />
                            {data.persyaratan.length > 1 && (
                                <button type="button" onClick={() => removeSyarat(i)} className="p-2 text-gray-400 hover:text-red-600">
                                    <X size={15} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Estimasi Waktu</label>
                        <input type="text" value={data.estimasi_waktu} onChange={(e) => setData('estimasi_waktu', e.target.value)} placeholder="1-3 hari kerja" className="input-field w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ikon</label>
                        <input type="text" value={data.ikon} onChange={(e) => setData('ikon', e.target.value)} className="input-field w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Urutan</label>
                        <input type="number" value={data.urutan} onChange={(e) => setData('urutan', e.target.value)} className="input-field w-full" />
                    </div>
                </div>

                <label className="flex items-center gap-2 mb-6 text-sm text-gray-700">
                    <input type="checkbox" checked={data.is_aktif} onChange={(e) => setData('is_aktif', e.target.checked)} className="w-4 h-4" />
                    Layanan aktif
                </label>

                <button type="submit" disabled={processing} className="btn btn-primary py-2.5">
                    <Save size={16} /> {isEdit ? 'Simpan Perubahan' : 'Tambah Layanan'}
                </button>
            </form>
        </AdminLayout>
    );
}
