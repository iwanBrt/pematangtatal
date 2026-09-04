import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { MessageSquare } from 'lucide-react';

export default function UMKM({ umkms, kategoris, filters }) {
    const [search, setSearch] = useState(filters.q || '');

    const applyFilter = (params) => {
        router.get('/umkm', { ...filters, ...params }, { preserveState: true, preserveScroll: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter({ q: search, page: 1 });
    };

    return (
        <PublicLayout>
            <Head title="Direktori UMKM" />
            <PageHeader
                title="Direktori UMKM Desa"
                subtitle="Temukan produk dan jasa unggulan dari pelaku usaha Desa Pematang Tatal."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'UMKM' }]}
            />
            <div className="section-padding bg-background">
                <div className="container-custom">
                    {/* Filter & Search */}
                    <ScrollReveal>
                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                                <input value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Cari nama usaha atau pemilik..."
                                    className="input-field flex-1" />
                                <button type="submit" className="btn btn-primary py-2.5 px-4 text-sm">Cari</button>
                            </form>
                            <div className="flex gap-2 flex-wrap">
                                <button onClick={() => applyFilter({ kategori: '', page: 1 })}
                                    className={`text-xs px-3 py-2 font-medium border transition-colors ${
                                        !filters.kategori
                                            ? 'bg-primary-600 text-white border-primary-600'
                                            : 'border-border text-text-secondary hover:border-primary'
                                    }`}
                                    style={{ borderRadius: 'var(--radius-sm)' }}>
                                    Semua
                                </button>
                                {kategoris.map((k) => (
                                    <button key={k} onClick={() => applyFilter({ kategori: k, page: 1 })}
                                        className={`text-xs px-3 py-2 font-medium border transition-colors capitalize ${
                                            filters.kategori === k
                                                ? 'bg-primary-600 text-white border-primary-600'
                                                : 'border-border text-text-secondary hover:border-primary'
                                        }`}
                                        style={{ borderRadius: 'var(--radius-sm)' }}>
                                        {k}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Grid */}
                    {umkms.data.length === 0 ? (
                        <ScrollReveal>
                            <div className="text-center py-20 text-text-muted">
                                <p>Belum ada UMKM ditemukan.</p>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <ScrollReveal>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {umkms.data.map((u) => (
                                    <div key={u.id} className="border border-border-light overflow-hidden transition-colors hover:border-primary hover:shadow-card flex flex-col" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                        <div className="h-44 overflow-hidden bg-secondary-bg">
                                            {u.foto
                                                ? <img src={`/storage/${u.foto}`} alt={u.nama_usaha}
                                                    loading="lazy" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
                                                : <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">Foto Usaha</div>
                                            }
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                                                {u.kategori}
                                            </span>
                                            <h3 className="font-bold text-charcoal mt-0.5 line-clamp-1 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {u.nama_usaha}
                                            </h3>
                                            <p className="text-xs text-text-muted mb-3">Pemilik: {u.nama_pemilik}</p>
                                            <a href={`https://wa.me/${u.no_wa}?text=Halo, saya tertarik dengan usaha ${encodeURIComponent(u.nama_usaha)}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="btn w-full justify-center text-xs py-2 mt-auto"
                                                style={{ background: '#25d366', color: 'white' }}>
                                                <MessageSquare size={13} /> Chat WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Pagination */}
                    {umkms.last_page > 1 && (
                        <ScrollReveal>
                            <div className="flex justify-center gap-2 mt-12">
                                {umkms.links.map((link, i) => (
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
        </PublicLayout>
    );
}
