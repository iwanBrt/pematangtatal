import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Save, Filter } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function StatistikIndex({ penduduk, apbdes, currentTahun, availableYears }) {
    const [tab, setTab] = useState('penduduk');
    const [tahun, setTahun] = useState(currentTahun);

    // Modal States
    const [isPendudukModalOpen, setIsPendudukModalOpen] = useState(false);
    const [isApbdesModalOpen, setIsApbdesModalOpen] = useState(false);
    
    // Forms
    const formPenduduk = useForm({
        id: '',
        kelompok: 'usia',
        label: '',
        nilai: '',
        tahun: currentTahun,
        urutan: 1,
    });

    const formApbdes = useForm({
        id: '',
        tahun: currentTahun,
        jenis: 'pendapatan',
        sub_kategori: '',
        anggaran: '',
        realisasi: '',
        keterangan: '',
        urutan: 1,
    });

    const changeTahun = (newTahun) => {
        setTahun(newTahun);
        router.get(route('admin.statistik.index'), { tahun: newTahun }, { preserveState: true });
    };

    const openPendudukModal = (item = null, kelompok = 'usia') => {
        if (item) {
            formPenduduk.setData({
                id: item.id,
                kelompok: item.kelompok,
                label: item.label,
                nilai: item.nilai,
                tahun: item.tahun,
                urutan: item.urutan,
            });
        } else {
            formPenduduk.reset();
            formPenduduk.setData('kelompok', kelompok);
            formPenduduk.setData('tahun', tahun);
        }
        setIsPendudukModalOpen(true);
    };

    const openApbdesModal = (item = null, jenis = 'pendapatan') => {
        if (item) {
            formApbdes.setData({
                id: item.id,
                tahun: item.tahun,
                jenis: item.jenis,
                sub_kategori: item.sub_kategori,
                anggaran: item.anggaran,
                realisasi: item.realisasi,
                keterangan: item.keterangan || '',
                urutan: item.urutan,
            });
        } else {
            formApbdes.reset();
            formApbdes.setData('jenis', jenis);
            formApbdes.setData('tahun', tahun);
        }
        setIsApbdesModalOpen(true);
    };

    const submitPenduduk = (e) => {
        e.preventDefault();
        formPenduduk.post(route('admin.statistik.penduduk.store'), {
            onSuccess: () => setIsPendudukModalOpen(false)
        });
    };

    const submitApbdes = (e) => {
        e.preventDefault();
        formApbdes.post(route('admin.statistik.apbdes.store'), {
            onSuccess: () => setIsApbdesModalOpen(false)
        });
    };

    const deletePenduduk = (id) => {
        if (confirm('Hapus data ini?')) {
            router.delete(route('admin.statistik.penduduk.destroy', id), { preserveScroll: true });
        }
    };

    const deleteApbdes = (id) => {
        if (confirm('Hapus data APBDes ini?')) {
            router.delete(route('admin.statistik.apbdes.destroy', id), { preserveScroll: true });
        }
    };

    const renderPendudukTable = (kelompok, title) => {
        const data = penduduk[kelompok] || [];
        return (
            <div className="card mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 font-heading">{title}</h3>
                    <button onClick={() => openPendudukModal(null, kelompok)} className="btn btn-outline py-1.5 px-3 text-xs">
                        <Plus size={14} /> Tambah Data
                    </button>
                </div>
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="border-b bg-white text-gray-500 font-semibold text-xs tracking-wider">
                            <th className="px-5 py-3 w-16">Urutan</th>
                            <th className="px-5 py-3">Kategori / Label</th>
                            <th className="px-5 py-3">Jumlah (Jiwa)</th>
                            <th className="px-5 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr><td colSpan="4" className="px-5 py-6 text-center text-gray-400 text-xs">Belum ada data.</td></tr>
                        ) : data.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-5 py-2.5 text-gray-500">{item.urutan}</td>
                                <td className="px-5 py-2.5 font-medium text-gray-800">{item.label}</td>
                                <td className="px-5 py-2.5">{item.nilai.toLocaleString('id-ID')}</td>
                                <td className="px-5 py-2.5 text-right space-x-2">
                                    <button onClick={() => openPendudukModal(item)} className="text-gray-400 hover:text-primary-600"><Edit size={16}/></button>
                                    <button onClick={() => deletePenduduk(item.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderApbdesTable = (jenis, title) => {
        const data = apbdes[jenis] || [];
        
        // Hitung Total
        const totalAnggaran = data.reduce((sum, item) => sum + parseFloat(item.anggaran), 0);
        const totalRealisasi = data.reduce((sum, item) => sum + parseFloat(item.realisasi), 0);
        const totalPersentase = totalAnggaran > 0 ? (totalRealisasi / totalAnggaran) * 100 : 0;

        return (
            <div className="card mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 font-heading capitalize">{title}</h3>
                    <button onClick={() => openApbdesModal(null, jenis)} className="btn btn-outline py-1.5 px-3 text-xs">
                        <Plus size={14} /> Tambah Item
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b bg-white text-gray-500 font-semibold text-xs tracking-wider">
                                <th className="px-4 py-3 w-12">No</th>
                                <th className="px-4 py-3">Uraian / Sub Kategori</th>
                                <th className="px-4 py-3 text-right">Anggaran (Rp)</th>
                                <th className="px-4 py-3 text-right">Realisasi (Rp)</th>
                                <th className="px-4 py-3 text-center">%</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.length === 0 ? (
                                <tr><td colSpan="6" className="px-4 py-6 text-center text-gray-400 text-xs">Belum ada data.</td></tr>
                            ) : data.map((item, idx) => {
                                const persen = item.anggaran > 0 ? (item.realisasi / item.anggaran) * 100 : 0;
                                return (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2.5 text-gray-500">{item.urutan}</td>
                                    <td className="px-4 py-2.5 font-medium text-gray-800">{item.sub_kategori}</td>
                                    <td className="px-4 py-2.5 text-right font-mono text-xs">{parseFloat(item.anggaran).toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-2.5 text-right font-mono text-xs text-primary-700">{parseFloat(item.realisasi).toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-2.5 text-center text-xs">
                                        <span className={`px-2 py-0.5 rounded font-bold ${persen >= 100 ? 'bg-green-100 text-green-800' : persen >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                                            {persen.toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-2.5 text-right space-x-2">
                                        <button onClick={() => openApbdesModal(item, jenis)} className="text-gray-400 hover:text-primary-600"><Edit size={16}/></button>
                                        <button onClick={() => deleteApbdes(item.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                        {data.length > 0 && (
                            <tfoot className="bg-gray-50 font-bold border-t border-gray-200">
                                <tr>
                                    <td colSpan="2" className="px-4 py-3 text-right">Total {title}:</td>
                                    <td className="px-4 py-3 text-right font-mono text-xs">{totalAnggaran.toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3 text-right font-mono text-xs text-primary-700">{totalRealisasi.toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3 text-center font-mono text-xs">{totalPersentase.toFixed(1)}%</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout title="Statistik & APBDes">
            <Head title="Manajemen Statistik" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex gap-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    {['penduduk', 'apbdes'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px capitalize ${
                                tab === t ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {t === 'penduduk' ? 'Demografi Penduduk' : 'Transparansi APBDes'}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                    <Filter size={16} className="text-gray-400" />
                    <select 
                        value={tahun} 
                        onChange={(e) => changeTahun(e.target.value)}
                        className="border-none bg-transparent text-sm font-medium focus:ring-0 py-1 pl-1 pr-6"
                    >
                        {availableYears.map(y => (
                            <option key={y} value={y}>Tahun {y}</option>
                        ))}
                    </select>
                </div>
            </div>

            {tab === 'penduduk' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        {renderPendudukTable('usia', 'Kelompok Usia')}
                        {renderPendudukTable('pendidikan', 'Tingkat Pendidikan')}
                    </div>
                    <div>
                        {renderPendudukTable('pekerjaan', 'Mata Pencaharian')}
                        {renderPendudukTable('jenis_kelamin', 'Jenis Kelamin')}
                    </div>
                </div>
            )}

            {tab === 'apbdes' && (
                <div className="max-w-5xl">
                    {renderApbdesTable('pendapatan', 'Pendapatan Desa')}
                    {renderApbdesTable('belanja', 'Belanja Desa')}
                    {renderApbdesTable('pembiayaan', 'Pembiayaan Desa')}
                </div>
            )}

            {/* Modal Form Penduduk */}
            <Modal show={isPendudukModalOpen} onClose={() => setIsPendudukModalOpen(false)}>
                <form onSubmit={submitPenduduk} className="p-6">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">
                        {formPenduduk.data.id ? 'Edit Data Penduduk' : 'Tambah Data Penduduk'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tahun Data</label>
                            <input type="number" value={formPenduduk.data.tahun} onChange={e => formPenduduk.setData('tahun', e.target.value)} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Kelompok Data</label>
                            <select value={formPenduduk.data.kelompok} onChange={e => formPenduduk.setData('kelompok', e.target.value)} className="input-field">
                                <option value="usia">Usia</option>
                                <option value="jenis_kelamin">Jenis Kelamin</option>
                                <option value="pendidikan">Pendidikan</option>
                                <option value="pekerjaan">Pekerjaan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Label (Contoh: Laki-laki, 15-20 Tahun, dll)</label>
                            <input type="text" value={formPenduduk.data.label} onChange={e => formPenduduk.setData('label', e.target.value)} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Jumlah (Jiwa)</label>
                            <input type="number" value={formPenduduk.data.nilai} onChange={e => formPenduduk.setData('nilai', e.target.value)} className="input-field" min="0" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
                            <input type="number" value={formPenduduk.data.urutan} onChange={e => formPenduduk.setData('urutan', e.target.value)} className="input-field" min="1" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                        <button type="button" onClick={() => setIsPendudukModalOpen(false)} className="btn btn-outline py-2">Batal</button>
                        <button type="submit" disabled={formPenduduk.processing} className="btn btn-primary py-2">Simpan</button>
                    </div>
                </form>
            </Modal>

            {/* Modal Form APBDes */}
            <Modal show={isApbdesModalOpen} onClose={() => setIsApbdesModalOpen(false)}>
                <form onSubmit={submitApbdes} className="p-6">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2 capitalize">
                        {formApbdes.data.id ? 'Edit Data APBDes' : 'Tambah Data APBDes'} - {formApbdes.data.jenis}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium mb-1">Tahun Anggaran</label>
                            <input type="number" value={formApbdes.data.tahun} onChange={e => formApbdes.setData('tahun', e.target.value)} className="input-field" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium mb-1">Jenis</label>
                            <select value={formApbdes.data.jenis} onChange={e => formApbdes.setData('jenis', e.target.value)} className="input-field">
                                <option value="pendapatan">Pendapatan</option>
                                <option value="belanja">Belanja</option>
                                <option value="pembiayaan">Pembiayaan</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Uraian / Sub Kategori</label>
                            <input type="text" value={formApbdes.data.sub_kategori} onChange={e => formApbdes.setData('sub_kategori', e.target.value)} className="input-field" required placeholder="Contoh: Pendapatan Asli Desa" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium mb-1">Anggaran (Rp)</label>
                            <input type="number" value={formApbdes.data.anggaran} onChange={e => formApbdes.setData('anggaran', e.target.value)} className="input-field font-mono" min="0" step="1" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium mb-1">Realisasi (Rp)</label>
                            <input type="number" value={formApbdes.data.realisasi} onChange={e => formApbdes.setData('realisasi', e.target.value)} className="input-field font-mono" min="0" step="1" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
                            <input type="number" value={formApbdes.data.urutan} onChange={e => formApbdes.setData('urutan', e.target.value)} className="input-field w-32" min="1" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                        <button type="button" onClick={() => setIsApbdesModalOpen(false)} className="btn btn-outline py-2">Batal</button>
                        <button type="submit" disabled={formApbdes.processing} className="btn btn-primary py-2">Simpan</button>
                    </div>
                </form>
            </Modal>

        </AdminLayout>
    );
}
