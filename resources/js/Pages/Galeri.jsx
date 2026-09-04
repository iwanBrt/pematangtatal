import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { X } from 'lucide-react';

export default function Galeri({ galeris, kategoris, filters }) {
    const [lightbox, setLightbox] = useState(null);

    const applyFilter = (k) => {
        router.get('/galeri', k ? { kategori: k } : {}, { preserveState: true, preserveScroll: true });
    };

    return (
        <PublicLayout>
            <Head title="Galeri Desa" />
            <PageHeader
                title="Galeri Desa Pematang Tatal"
                subtitle="Dokumentasi kegiatan, pembangunan, alam, dan budaya Desa Pematang Tatal."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Galeri' }]}
            />

            <div className="section-padding bg-background">
                <div className="container-custom">
                    {/* Filter */}
                    <ScrollReveal>
                        <div className="flex flex-wrap gap-2 mb-8">
                            <button onClick={() => applyFilter('')}
                                className={`text-sm px-4 py-2 font-medium border transition-colors ${
                                    !filters.kategori
                                        ? 'bg-primary-600 text-white border-primary-600'
                                        : 'border-border text-text-secondary hover:border-primary'
                                }`}
                                style={{ borderRadius: 'var(--radius-sm)' }}>
                                Semua
                            </button>
                            {kategoris.map((k) => (
                                <button key={k} onClick={() => applyFilter(k)}
                                    className={`text-sm px-4 py-2 font-medium border transition-colors capitalize ${
                                        filters.kategori === k
                                            ? 'bg-primary-600 text-white border-primary-600'
                                            : 'border-border text-text-secondary hover:border-primary'
                                    }`}
                                    style={{ borderRadius: 'var(--radius-sm)' }}>
                                    {k}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Grid */}
                    {galeris.data.length === 0 ? (
                        <ScrollReveal>
                            <div className="text-center py-20 text-text-muted">
                                <p>Belum ada foto di kategori ini.</p>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <ScrollReveal>
                            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                                {galeris.data.map((g) => (
                                    <div key={g.id}
                                        onClick={() => setLightbox(g)}
                                        className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-border-light"
                                        style={{ borderRadius: 'var(--radius-md)' }}
                                    >
                                        <img src={`/storage/${g.foto}`} alt={g.judul}
                                            loading="lazy"
                                            className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-end p-3">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs font-semibold">{g.judul}</p>
                                                <p className="text-white/70 text-xs capitalize">{g.kategori}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Pagination */}
                    {galeris.last_page > 1 && (
                        <ScrollReveal>
                            <div className="flex justify-center gap-2 mt-12">
                                {galeris.links.map((link, i) => (
                                    <button key={i} disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                        className={`px-3.5 py-2 text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-white border border-border text-text-secondary hover:border-primary disabled:opacity-40'
                                        }`}
                                        style={{ borderRadius: 'var(--radius-sm)' }}
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}>
                    <button onClick={() => setLightbox(null)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white"
                        aria-label="Tutup"
                    >
                        <X size={28} />
                    </button>
                    <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
                        <img src={`/storage/${lightbox.foto}`} alt={lightbox.judul}
                            className="w-full max-h-[80vh] object-contain" style={{ borderRadius: 'var(--radius-lg)' }} />
                        <div className="text-center mt-3">
                            <p className="text-white font-semibold text-lg">{lightbox.judul}</p>
                            <p className="text-white/70 text-sm capitalize">{lightbox.kategori}</p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
