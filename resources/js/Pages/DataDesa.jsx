import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import {
    BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
    Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#164A41', '#2F6B57', '#4A8A6A', '#8A9A5B', '#6B7A4E', '#D9B56D', '#C4A35A', '#867038'];

export default function DataDesa({ tahun, usia, jenis_kelamin, pendidikan, pekerjaan, apbdes }) {
    const totalPenduduk = jenis_kelamin.reduce((s, d) => s + d.nilai, 0);

    return (
        <PublicLayout>
            <Head title="Data Desa" />
            <PageHeader
                title="Data & Statistik Desa"
                subtitle={`Data kependudukan dan transparansi keuangan Desa Pematang Tatal tahun ${tahun}`}
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Data Desa' }]}
            />

            <div className="section-padding bg-background">
                <div className="container-custom space-y-14">

                    {/* Jenis Kelamin & Usia */}
                    <ScrollReveal>
                        <div>
                            <h2 className="section-title mb-1">Komposisi Penduduk</h2>
                            <p className="text-sm mb-6 text-text-secondary">
                                Total: <strong>{totalPenduduk.toLocaleString('id-ID')} Jiwa</strong>
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h3 className="font-semibold text-sm mb-4 text-text-secondary" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Berdasarkan Jenis Kelamin
                                    </h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie data={jenis_kelamin} dataKey="nilai" nameKey="label" cx="50%" cy="50%" outerRadius={80}
                                                label={({ label, nilai }) => `${label}: ${nilai.toLocaleString('id-ID')}`}>
                                                {jenis_kelamin.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h3 className="font-semibold text-sm mb-4 text-text-secondary" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Berdasarkan Kelompok Usia
                                    </h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={usia} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                                            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} />
                                            <Bar dataKey="nilai" fill="#164A41" radius={[3, 3, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Pendidikan & Pekerjaan */}
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                <h3 className="font-semibold text-sm mb-4 text-text-secondary" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Tingkat Pendidikan
                                </h3>
                                <ResponsiveContainer width="100%" height={240}>
                                    <BarChart data={pendidikan} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
                                        <XAxis type="number" tick={{ fontSize: 11 }} />
                                        <YAxis type="category" dataKey="label" width={110} tick={{ fontSize: 11 }} />
                                        <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} />
                                        <Bar dataKey="nilai" fill="#2F6B57" radius={[0, 3, 3, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                <h3 className="font-semibold text-sm mb-4 text-text-secondary" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Mata Pencaharian
                                </h3>
                                <ResponsiveContainer width="100%" height={240}>
                                    <BarChart data={pekerjaan} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
                                        <XAxis type="number" tick={{ fontSize: 11 }} />
                                        <YAxis type="category" dataKey="label" width={110} tick={{ fontSize: 11 }} />
                                        <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} />
                                        <Bar dataKey="nilai" fill="#D9B56D" radius={[0, 3, 3, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* APBDes */}
                    <ScrollReveal>
                        <div>
                            <h2 className="section-title mb-1">Transparansi Keuangan (APBDes {tahun})</h2>
                            <p className="text-sm mb-6 text-text-secondary">
                                Anggaran Pendapatan dan Belanja Desa tahun {tahun}
                            </p>
                            <div className="space-y-4">
                                {['pendapatan', 'belanja'].map((jenis) => {
                                    const items = apbdes.filter(a => a.jenis === jenis);
                                    const totalAnggaran = items.reduce((s, a) => s + parseFloat(a.anggaran), 0);
                                    return (
                                        <div key={jenis} className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                            <h3 className="font-bold mb-4 text-charcoal capitalize" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {jenis === 'pendapatan' ? 'Pendapatan' : 'Belanja'}
                                            </h3>
                                            <div className="space-y-3">
                                                {items.map((item) => {
                                                    const persen = item.anggaran > 0
                                                        ? Math.round((item.realisasi / item.anggaran) * 100)
                                                        : 0;
                                                    return (
                                                        <div key={item.id}>
                                                            <div className="flex justify-between text-sm mb-1.5">
                                                                <span className="text-text-secondary">{item.sub_kategori}</span>
                                                                <span className="font-semibold text-charcoal">{persen}%</span>
                                                            </div>
                                                            <div className="h-2 overflow-hidden bg-secondary-bg" style={{ borderRadius: '2px' }}>
                                                                <div
                                                                    className="h-full transition-all duration-700"
                                                                    style={{
                                                                        width: `${persen}%`,
                                                                        background: persen >= 80 ? '#164A41' : persen >= 50 ? '#D9B56D' : '#B91C1C',
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex justify-between text-xs mt-1 text-text-muted">
                                                                <span>Realisasi: {(item.realisasi / 1_000_000).toFixed(0)} Jt</span>
                                                                <span>Anggaran: {(item.anggaran / 1_000_000).toFixed(0)} Jt</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="mt-4 pt-3 flex justify-between text-sm font-semibold border-t border-border-light">
                                                <span className="text-text-secondary">Total</span>
                                                <span className="text-charcoal">Rp {(totalAnggaran / 1_000_000).toFixed(0)} Jt</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </PublicLayout>
    );
}
