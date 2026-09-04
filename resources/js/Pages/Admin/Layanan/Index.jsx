import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function LayananIndex({ layanans }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
            destroy(route('admin.layanan.destroy', id));
        }
    };

    return (
        <AdminLayout title="Layanan Desa">
            <Head title="Layanan Desa" />

            <div className="card p-5 mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">Kelola layanan surat yang tersedia untuk masyarakat.</p>
                <Link href={route('admin.layanan.create')} className="btn btn-primary py-2.5">
                    <Plus size={16} /> Tambah Layanan
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider" style={{ borderColor: 'var(--color-border-light)' }}>
                                <th className="px-5 py-3">Nama Layanan</th>
                                <th className="px-5 py-3">Kode</th>
                                <th className="px-5 py-3">Estimasi</th>
                                <th className="px-5 py-3">Jml Permohonan</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                            {layanans.length === 0 ? (
                                <tr><td colSpan="6" className="px-5 py-8 text-center text-gray-500">Belum ada layanan.</td></tr>
                            ) : (
                                layanans.map((l) => (
                                    <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-semibold text-gray-900">{l.nama}</td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">{l.kode}</td>
                                        <td className="px-5 py-3 text-gray-500 text-xs">{l.estimasi_waktu || '-'}</td>
                                        <td className="px-5 py-3 text-gray-600 text-xs">{l.permohonan_count}</td>
                                        <td className="px-5 py-3">
                                            {l.is_aktif ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Aktif</span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">Nonaktif</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right space-x-2">
                                            <Link href={route('admin.layanan.edit', l.id)} className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(l.id)} className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
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
