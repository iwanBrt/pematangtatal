import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function AgendaForm({ agenda }) {
    const isEdit = !!agenda;
    const { data, setData, post, put, errors, processing } = useForm({
        judul: agenda?.judul || '',
        deskripsi: agenda?.deskripsi || '',
        tanggal_mulai: agenda?.tanggal_mulai || '',
        tanggal_selesai: agenda?.tanggal_selesai || '',
        waktu: agenda?.waktu || '',
        lokasi: agenda?.lokasi || '',
        penyelenggara: agenda?.penyelenggara || '',
        is_publik: agenda?.is_publik ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.agenda.update', agenda.id));
        } else {
            post(route('admin.agenda.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Agenda' : 'Tambah Agenda'}>
            <Head title={isEdit ? 'Edit Agenda' : 'Tambah Agenda'} />

            <Link href={route('admin.agenda.index')} className="inline-flex items-center gap-2 text-sm font-medium mb-5 hover:underline" style={{ color: 'var(--color-primary)' }}>
                <ArrowLeft size={16} /> Kembali
            </Link>

            <form onSubmit={submit} className="card p-6 max-w-2xl">
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Judul Agenda *</label>
                    <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="input-field w-full" />
                    {errors.judul && <p className="text-xs text-red-600 mt-1">{errors.judul}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Deskripsi</label>
                    <textarea value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} rows="4" className="input-field w-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tanggal Mulai *</label>
                        <input type="date" value={data.tanggal_mulai} onChange={(e) => setData('tanggal_mulai', e.target.value)} className="input-field w-full" />
                        {errors.tanggal_mulai && <p className="text-xs text-red-600 mt-1">{errors.tanggal_mulai}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tanggal Selesai</label>
                        <input type="date" value={data.tanggal_selesai} onChange={(e) => setData('tanggal_selesai', e.target.value)} className="input-field w-full" />
                        {errors.tanggal_selesai && <p className="text-xs text-red-600 mt-1">{errors.tanggal_selesai}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Waktu</label>
                        <input type="text" value={data.waktu} onChange={(e) => setData('waktu', e.target.value)} placeholder="mis. 08.00 - 12.00 WIB" className="input-field w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Lokasi</label>
                        <input type="text" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} className="input-field w-full" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Penyelenggara</label>
                    <input type="text" value={data.penyelenggara} onChange={(e) => setData('penyelenggara', e.target.value)} className="input-field w-full" />
                </div>

                <label className="flex items-center gap-2 mb-6 text-sm text-gray-700">
                    <input type="checkbox" checked={data.is_publik} onChange={(e) => setData('is_publik', e.target.checked)} className="w-4 h-4" />
                    Tampilkan publik
                </label>

                <button type="submit" disabled={processing} className="btn btn-primary py-2.5">
                    <Save size={16} /> {isEdit ? 'Simpan Perubahan' : 'Tambah Agenda'}
                </button>
            </form>
        </AdminLayout>
    );
}
