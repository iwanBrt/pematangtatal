import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { MapPin, Phone, Mail, Globe, Users, Map } from 'lucide-react';

export default function Profil({ profil, perangkat }) {
    return (
        <PublicLayout>
            <Head title="Profil Desa" />
            <PageHeader
                title="Profil Desa Pematang Tatal"
                subtitle="Mengenal lebih dekat Desa Pematang Tatal — sejarah, visi misi, dan struktur pemerintahan desa."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Profil Desa' }]}
            />

            <div className="section-padding bg-background">
                <div className="container-custom space-y-16">

                    {/* Profil Utama */}
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Sidebar info */}
                            <div className="space-y-6">
                                <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h3 className="font-bold text-charcoal mb-4 text-base" style={{ fontFamily: 'var(--font-heading)' }}>Informasi Kontak</h3>
                                    <ul className="space-y-3 text-sm">
                                        {[
                                            { icon: MapPin, value: `Kec. ${profil?.kecamatan || '–'}, Kab. ${profil?.kabupaten || '–'}` },
                                            { icon: Phone, value: profil?.no_telepon || '–' },
                                            { icon: Mail, value: profil?.email || '–' },
                                            { icon: Globe, value: profil?.website || 'pematangtatal.desa.id' },
                                        ].map(({ icon: Icon, value }) => (
                                            <li key={value} className="flex gap-2.5 text-text-secondary">
                                                <Icon size={15} className="text-primary flex-shrink-0 mt-0.5" />
                                                {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h3 className="font-bold text-charcoal mb-4 text-base" style={{ fontFamily: 'var(--font-heading)' }}>Data Geografis</h3>
                                    <div className="space-y-0">
                                        {[
                                            ['Luas Wilayah', profil?.luas_wilayah || '–'],
                                            ['Jumlah Dusun', profil?.jumlah_dusun || '–'],
                                            ['Jumlah RT', profil?.jumlah_rt || '–'],
                                            ['Jumlah RW', profil?.jumlah_rw || '–'],
                                            ['Batas Utara', profil?.batas_utara || '–'],
                                            ['Batas Selatan', profil?.batas_selatan || '–'],
                                            ['Batas Timur', profil?.batas_timur || '–'],
                                            ['Batas Barat', profil?.batas_barat || '–'],
                                        ].map(([k, v], i, arr) => (
                                            <div key={k} className={`flex justify-between py-2.5 text-sm ${i < arr.length - 1 ? 'border-b border-border-light' : ''}`}>
                                                <span className="text-text-muted">{k}</span>
                                                <span className="text-text font-medium">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="border border-border-light p-6 sm:p-8" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Sejarah Desa
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed">
                                        {profil?.sejarah || 'Data sejarah desa belum tersedia.'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="border-l-4 border-primary p-6 bg-white" style={{ borderRadius: '0 var(--radius-lg) var(--radius-lg) 0' }}>
                                        <h2 className="text-lg font-bold text-charcoal mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Visi</h2>
                                        <p className="text-text-secondary text-sm leading-relaxed italic">
                                            "{profil?.visi || 'Visi belum tersedia.'}"
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-secondary p-6 bg-white" style={{ borderRadius: '0 var(--radius-lg) var(--radius-lg) 0' }}>
                                        <h2 className="text-lg font-bold text-charcoal mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Misi</h2>
                                        <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                                            {profil?.misi || 'Misi belum tersedia.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Struktur Organisasi */}
                    <ScrollReveal>
                        <div>
                            <div className="text-center mb-10">
                                <h2 className="section-title">Struktur Organisasi Desa</h2>
                                <p className="section-subtitle mx-auto text-center mt-2">Perangkat Desa Pematang Tatal yang melayani masyarakat</p>
                            </div>

                            {perangkat.length === 0 ? (
                                <p className="text-center text-text-muted py-12">Data perangkat desa belum tersedia.</p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                                    {perangkat.map((p) => (
                                        <div key={p.id} className="border border-border-light p-5 text-center transition-colors hover:border-primary hover:shadow-card" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                            <div className="w-20 h-20 mx-auto mb-3 overflow-hidden bg-secondary-bg flex items-center justify-center" style={{ borderRadius: 'var(--radius-md)' }}>
                                                {p.foto
                                                    ? <img src={`/storage/${p.foto}`} alt={p.nama} className="w-full h-full object-cover" />
                                                    : <span className="text-3xl text-text-muted">👤</span>
                                                }
                                            </div>
                                            <h3 className="font-bold text-charcoal text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{p.nama}</h3>
                                            <p className="text-xs text-primary font-medium mt-0.5">{p.jabatan}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Peta */}
                    <ScrollReveal>
                        <div>
                            <h2 className="text-xl font-bold text-charcoal mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                <Map size={22} className="text-primary" /> Peta Lokasi Kantor Desa
                            </h2>
                            <div className="border border-border-light overflow-hidden h-72 bg-secondary-bg flex items-center justify-center" style={{ borderRadius: 'var(--radius-lg)' }}>
                                <p className="text-sm text-text-muted">Embed Google Maps — tambahkan koordinat desa di dashboard admin</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </PublicLayout>
    );
}
