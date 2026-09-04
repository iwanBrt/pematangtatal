import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import StatCounter from '@/Components/StatCounter';
import Badge from '@/Components/Badge';
import ScrollReveal from '@/Components/ScrollReveal';
import {
    ArrowRight, MapPin, Users, Building2, ShoppingBag, Newspaper,
    ChevronRight, Phone, MessageSquare, Calendar
} from 'lucide-react';

export default function Beranda({ profil, beritas = [], pengumuman = [], umkms = [], galeris = [], agenda = [], stats = {} }) {
    const featured = beritas[0];
    const secondary = beritas.slice(1, 5);

    return (
        <PublicLayout transparentNav>
            <Head title="Beranda" />

            {/* ══════ HERO SECTION ══════ */}
            <section className="relative min-h-[70vh] lg:min-h-[75vh] flex items-center overflow-hidden bg-charcoal">
                <div className="absolute inset-0">
                    {profil?.foto_kantor ? (
                        <img
                            src={`/storage/${profil.foto_kantor}`}
                            alt="Kantor Desa Pematang Tatal"
                            className="h-full w-full object-cover"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/35" />
                </div>
                <div className="container-custom relative z-10 py-20 lg:py-0">
                    <div className="max-w-2xl">
                        <p className="text-primary-light font-semibold text-sm mb-4 uppercase tracking-wider">
                            Portal Resmi Desa
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            Desa Pematang Tatal
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                            Portal informasi dan pelayanan masyarakat Desa Pematang Tatal. Transparan, modern, dan mudah diakses.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/profil" className="btn btn-primary px-6 py-3">
                                Profil Desa <ArrowRight size={16} />
                            </Link>
                            <Link href="/layanan" className="btn btn-secondary px-6 py-3 !text-white !border-white hover:bg-white/10 hover:!text-white">
                                Layanan Desa
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════ QUICK STATS ══════ */}
            <ScrollReveal>
                <section className="py-14 bg-white border-y border-border-light">
                    <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-x divide-border-light">
                            {[
                                { label: 'Total Penduduk', value: stats.penduduk || 2550, suffix: ' Jiwa' },
                                { label: 'Jumlah Layanan', value: stats.layanan || 6, suffix: ' Jenis' },
                                { label: 'UMKM Aktif', value: stats.umkm || 4, suffix: ' Usaha' },
                                { label: 'Total Berita', value: stats.berita || 6, suffix: ' Artikel' },
                            ].map(({ label, value, suffix }) => (
                                <div key={label} className="text-center lg:text-left">
                                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <StatCounter target={value} suffix={suffix} />
                                    </div>
                                    <div className="text-sm text-text-muted">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ══════ PENGUMUMAN PENTING ══════ */}
            {pengumuman.length > 0 && (
                <ScrollReveal>
                    <section className="py-5 bg-primary-bg border-b border-primary/10">
                        <div className="container-custom">
                            <div className="flex items-center gap-4 overflow-hidden">
                                <span className="flex-shrink-0 px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wide" style={{ borderRadius: 'var(--radius-sm)' }}>
                                    📢 Pengumuman
                                </span>
                                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                                    {pengumuman.map((p) => (
                                        <Link key={p.id} href={`/berita/${p.slug}`}
                                            className="flex-shrink-0 text-sm text-primary hover:text-primary-dark font-medium whitespace-nowrap">
                                            {p.judul}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ══════ BERITA TERBARU ══════ */}
            <ScrollReveal>
                <section className="section-padding bg-background">
                    <div className="container-custom">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <p className="text-primary font-semibold text-sm mb-1 uppercase tracking-wider">Terkini</p>
                                <h2 className="section-title">Berita & Pengumuman</h2>
                            </div>
                            <Link href="/berita" className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                                Lihat Semua <ChevronRight size={16} />
                            </Link>
                        </div>

                        {beritas.length === 0 ? (
                            <p className="text-text-muted text-center py-12">Belum ada berita.</p>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Featured Article */}
                                {featured && (
                                    <Link href={`/berita/${featured.slug}`} className="lg:col-span-7 card group overflow-hidden flex flex-col sm:flex-row">
                                        <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-secondary-bg flex-shrink-0">
                                            {featured.thumbnail
                                                ? <img src={`/storage/${featured.thumbnail}`} alt={featured.judul} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                                                : <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">Foto Berita</div>
                                            }
                                        </div>
                                        <div className="p-5 sm:p-6 flex flex-col justify-center sm:w-3/5">
                                            {featured.kategori && (
                                                <Badge color={featured.kategori.warna} className="mb-2 w-fit">{featured.kategori.nama}</Badge>
                                            )}
                                            <h3 className="font-bold text-charcoal text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                                                {featured.judul}
                                            </h3>
                                            <p className="text-sm text-text-secondary line-clamp-2 mb-3">{featured.ringkasan}</p>
                                            <span className="text-xs text-text-muted">
                                                {featured.published_at && new Date(featured.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </Link>
                                )}

                                {/* Secondary Articles */}
                                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                    {secondary.map((berita) => (
                                        <Link key={berita.id} href={`/berita/${berita.slug}`} className="card group flex gap-4 p-4">
                                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-secondary-bg" style={{ borderRadius: 'var(--radius-sm)' }}>
                                                {berita.thumbnail
                                                    ? <img src={`/storage/${berita.thumbnail}`} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                                                    : <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">Foto</div>
                                                }
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0">
                                                <h3 className="font-semibold text-charcoal text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                                    {berita.judul}
                                                </h3>
                                                <span className="text-xs text-text-muted">
                                                    {berita.published_at && new Date(berita.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="text-center mt-8 sm:hidden">
                            <Link href="/berita" className="btn btn-secondary">Lihat Semua Berita</Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ══════ POTENSI DESA ══════ */}
            <ScrollReveal>
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-10">
                            <p className="text-primary font-semibold text-sm mb-1 uppercase tracking-wider">Unggulan</p>
                            <h2 className="section-title">Potensi Desa Pematang Tatal</h2>
                            <p className="section-subtitle mx-auto text-center mt-2">
                                Beragam potensi alam, budaya, dan ekonomi yang siap berkembang bersama masyarakat desa.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Pertanian & Perkebunan', desc: 'Lahan pertanian subur dengan komoditas unggulan sawit, padi, dan karet yang menjadi tulang punggung ekonomi warga desa.', href: '/potensi' },
                                { title: 'Kerajinan Lokal', desc: 'Pengrajin anyaman bambu dan produk kerajinan tangan tradisional yang bernilai seni tinggi dan sudah dikenal luas.', href: '/umkm' },
                                { title: 'Wisata Alam', desc: 'Hamparan alam desa yang asri dan pemandangan alam yang indah menawarkan potensi wisata yang belum banyak dijelajahi.', href: '/potensi' },
                            ].map(({ title, desc, href }) => (
                                <Link key={title} href={href} className="group border border-border-light p-6 transition-colors hover:border-primary hover:shadow-card" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                    <h3 className="font-bold text-charcoal text-base mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ══════ UMKM UNGGULAN ══════ */}
            {umkms.length > 0 && (
                <ScrollReveal>
                    <section className="section-padding bg-background">
                        <div className="container-custom">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="text-primary font-semibold text-sm mb-1 uppercase tracking-wider">Ekonomi Lokal</p>
                                    <h2 className="section-title">UMKM Unggulan</h2>
                                </div>
                                <Link href="/umkm" className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                                    Lihat Semua <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {umkms.map((u) => (
                                    <div key={u.id} className="card group overflow-hidden flex flex-col">
                                        <div className="h-40 overflow-hidden bg-secondary-bg">
                                            {u.foto
                                                ? <img src={`/storage/${u.foto}`} alt={u.nama_usaha} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                                                : <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">Foto Usaha</div>
                                            }
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">{u.kategori}</span>
                                            <h3 className="font-bold text-charcoal mt-0.5 mb-0.5 text-sm line-clamp-1" style={{ fontFamily: 'var(--font-heading)' }}>{u.nama_usaha}</h3>
                                            <p className="text-xs text-text-muted mb-3">{u.nama_pemilik}</p>
                                            <a href={`https://wa.me/${u.no_wa}?text=Halo, saya tertarik dengan ${encodeURIComponent(u.nama_usaha)}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="btn w-full justify-center text-xs py-2 mt-auto"
                                                style={{ background: '#25d366', color: 'white' }}>
                                                <MessageSquare size={13} /> Chat WA
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ══════ GALERI SINGKAT ══════ */}
            {galeris.length > 0 && (
                <ScrollReveal>
                    <section className="section-padding bg-white">
                        <div className="container-custom">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="text-primary font-semibold text-sm mb-1 uppercase tracking-wider">Dokumentasi</p>
                                    <h2 className="section-title">Galeri Desa</h2>
                                </div>
                                <Link href="/galeri" className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                                    Lihat Semua <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {galeris.slice(0, 6).map((g) => (
                                    <div key={g.id} className="relative aspect-square overflow-hidden cursor-pointer group" style={{ borderRadius: 'var(--radius-md)' }}>
                                        <img src={`/storage/${g.foto}`} alt={g.judul} loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-end p-3">
                                            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{g.judul}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ══════ AGENDA ══════ */}
            {agenda.length > 0 && (
                <ScrollReveal>
                    <section className="py-14 bg-background">
                        <div className="container-custom">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="text-primary font-semibold text-sm mb-1 uppercase tracking-wider">Jadwal</p>
                                    <h2 className="section-title">Agenda Kegiatan</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {agenda.map((a) => (
                                    <div key={a.id} className="border border-border-light p-5 flex gap-4 transition-colors hover:border-primary hover:shadow-card" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                        <div className="flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center bg-primary-bg text-primary border border-primary/10" style={{ borderRadius: 'var(--radius-sm)' }}>
                                            <span className="text-xl font-bold leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {new Date(a.tanggal_mulai).getDate()}
                                            </span>
                                            <span className="text-xs font-medium">
                                                {new Date(a.tanggal_mulai).toLocaleDateString('id-ID', { month: 'short' })}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-charcoal text-sm mb-1 line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{a.judul}</h3>
                                            {a.lokasi && <p className="text-xs text-text-muted flex items-center gap-1"><MapPin size={11} />{a.lokasi}</p>}
                                            {a.waktu && <p className="text-xs text-text-muted mt-0.5">{a.waktu}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ══════ CTA LAYANAN ══════ */}
            <ScrollReveal>
                <section className="py-14 text-white" style={{ backgroundColor: '#164A41' }}>
                    <div className="container-custom text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Butuh Layanan Desa?</h2>
                        <p className="text-white text-base mb-6 max-w-xl mx-auto">
                            Urus surat-menyurat secara online tanpa harus antre. Cepat, mudah, dan transparan.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/layanan" className="btn bg-white text-primary hover:bg-white/90 px-6 py-3">
                                Ajukan Permohonan <ArrowRight size={16} />
                            </Link>
                            <Link href="/pengaduan" className="btn border border-white/40 text-white hover:bg-white/10 px-6 py-3">
                                Laporkan Masalah
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </PublicLayout>
    );
}
