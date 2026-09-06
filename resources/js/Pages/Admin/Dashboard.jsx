import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Newspaper, AlertTriangle, FileText, ShoppingBag } from 'lucide-react';

const statusColor = {
    menunggu: '#c08620',
    diproses: '#3a8b6c',
    selesai: '#235a48',
    ditolak: '#b91c1c',
    diterima: '#3a8b6c'
};

export default function Dashboard({ stats, pengaduan_terbaru = [], permohonan_terbaru = [] }) {
    const statCards = [
        { label: 'Total Berita', value: stats.berita_total || 0, desc: `${stats.berita_published || 0} Diterbitkan`, icon: Newspaper, color: 'var(--color-primary-light)' },
        { label: 'Pengaduan Baru', value: stats.pengaduan_baru || 0, desc: `${stats.pengaduan_diproses || 0} Sedang Diproses`, icon: AlertTriangle, color: 'var(--color-accent)' },
        { label: 'Permohonan Pending', value: stats.permohonan_pending || 0, desc: 'Perlu verifikasi', icon: FileText, color: 'var(--color-primary-dark)' },
        { label: 'UMKM Aktif', value: stats.umkm_total || 0, desc: 'Pelaku usaha terdaftar', icon: ShoppingBag, color: 'var(--color-text-secondary)' },
    ];
    const completion = [
        { label: 'Permohonan terselesaikan', value: stats.permohonan_selesai || 0, total: (stats.permohonan_selesai || 0) + (stats.permohonan_pending || 0) },
        { label: 'Pengaduan terselesaikan', value: stats.pengaduan_selesai || 0, total: (stats.pengaduan_selesai || 0) + (stats.pengaduan_baru || 0) + (stats.pengaduan_diproses || 0) },
    ];

    return (
        <AdminLayout title="Dashboard Utama">
            <Head title="Admin Dashboard" />

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {statCards.map((card) => (
                    <div key={card.label} className="card p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{card.label}</p>
                            <p className="text-3xl font-extrabold mt-1" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{card.value}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                        </div>
                        <div
                            className="w-12 h-12 rounded-md flex items-center justify-center"
                            style={{ backgroundColor: 'var(--color-bg-alt)', color: card.color }}
                        >
                            <card.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {completion.map((item) => {
                    const percent = item.total ? Math.round((item.value / item.total) * 100) : 0;
                    return <div key={item.label} className="card p-5"><div className="flex justify-between text-sm font-semibold"><span>{item.label}</span><span className="text-primary">{percent}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary-bg"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} /></div><p className="mt-2 text-xs text-text-muted">{item.value} dari {item.total} laporan</p></div>;
                })}
            </div>

            {/* Grid Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Permohonan Surat Terbaru */}
                <div className="card p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                            Permohonan Surat Terbaru
                        </h3>
                        <Link href="/admin/permohonan" className="text-xs font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
                            Lihat Semua
                        </Link>
                    </div>
                    {permohonan_terbaru.length === 0 ? (
                        <p className="text-xs py-6 text-center" style={{ color: 'var(--color-text-muted)' }}>Tidak ada permohonan baru.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b font-semibold" style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}>
                                        <th className="pb-2">Nomor Ref</th>
                                        <th className="pb-2">Pemohon</th>
                                        <th className="pb-2">Layanan</th>
                                        <th className="pb-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                                    {permohonan_terbaru.map((p) => (
                                        <tr key={p.id}>
                                            <td className="py-2.5 font-bold" style={{ color: 'var(--color-text)' }}>{p.no_referensi}</td>
                                            <td className="py-2.5" style={{ color: 'var(--color-text-secondary)' }}>{p.nama_pemohon}</td>
                                            <td className="py-2.5" style={{ color: 'var(--color-text-muted)' }}>{p.layanan?.nama}</td>
                                            <td className="py-2.5">
                                                <span className="badge text-white text-[10px] uppercase tracking-wider" style={{ background: statusColor[p.status] }}>
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pengaduan Warga Terbaru */}
                <div className="card p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                            Pengaduan Warga Terbaru
                        </h3>
                        <Link href="/admin/pengaduan" className="text-xs font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
                            Lihat Semua
                        </Link>
                    </div>
                    {pengaduan_terbaru.length === 0 ? (
                        <p className="text-xs py-6 text-center" style={{ color: 'var(--color-text-muted)' }}>Tidak ada pengaduan baru.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b font-semibold" style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}>
                                        <th className="pb-2">Nomor Tiket</th>
                                        <th className="pb-2">Pelapor</th>
                                        <th className="pb-2">Kategori</th>
                                        <th className="pb-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ divideColor: 'var(--color-border-light)' }}>
                                    {pengaduan_terbaru.map((p) => (
                                        <tr key={p.id}>
                                            <td className="py-2.5 font-bold" style={{ color: 'var(--color-text)' }}>{p.no_tiket}</td>
                                            <td className="py-2.5" style={{ color: 'var(--color-text-secondary)' }}>{p.is_anonim ? 'Anonim' : p.nama_pelapor}</td>
                                            <td className="py-2.5 capitalize" style={{ color: 'var(--color-text-muted)' }}>{p.kategori}</td>
                                            <td className="py-2.5">
                                                <span className="badge text-white text-[10px] uppercase tracking-wider" style={{ background: statusColor[p.status] }}>
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
