import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import Badge from '@/Components/Badge';
import { Search } from 'lucide-react';

export default function BeritaIndex({ beritas, kategoris, pengumuman, filters }) {
    const [search, setSearch] = useState(filters.q || '');

    const applyFilter = (params) => {
        router.get('/berita', { ...filters, ...params }, { preserveScroll: true, preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter({ q: search, page: 1 });
    };

    return (
        <PublicLayout>
            <Head title="Berita & Pengumuman" />
            <PageHeader
                title="Berita & Pengumuman"
                subtitle="Informasi terkini dari Desa Pematang Tatal"
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Berita' }]}
            />

            <div className="section-padding bg-background">
                <div className="container-custom">
                    {/* Pengumuman pinned */}
                    {pengumuman.length > 0 && (
                        <ScrollReveal>
                        <div className="mb-8 border-l-4 border-primary bg-primary-bg p-5" style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">📢 Pengumuman Penting</p>
                            <ul className="space-y-1.5">
                                {pengumuman.map((p) => (
                                    <li key={p.id}>
                                        <Link href={`/berita/${p.slug}`} className="text-sm text-primary-dark hover:underline font-medium">
                                            {p.judul}
                                        </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </ScrollReveal>
                    )}

                    {/* Filter & Search */}
                    <ScrollReveal>
                        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berita..."
                                    className="input-field !pl-10"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary py-2.5 px-4 text-sm">Cari</button>
                        </form>
                        <div className="mt-3 mb-8 flex gap-2 flex-wrap">
                            <button
                                onClick={() => applyFilter({ kategori: '', page: 1 })}
                                className={`text-xs px-3 py-2 font-medium border transition-colors ${!filters.kategori ? 'bg-primary-600 text-white border-primary-600' : 'border-border text-text-secondary hover:border-primary'}`}
                                style={{ borderRadius: 'var(--radius-sm)' }}>
                                Semua
                            </button>
                            {kategoris.map((k) => (
                                <button key={k.id}
                                    onClick={() => applyFilter({ kategori: k.slug, page: 1 })}
                                    className={`text-xs px-3 py-2 font-medium border transition-colors ${filters.kategori === k.slug ? 'text-white border-transparent' : 'border-border text-text-secondary hover:border-primary'}`}
                                    style={filters.kategori === k.slug ? { background: k.warna } : { borderRadius: 'var(--radius-sm)' }}>
                                    {k.nama}
                                </button>
                            ))}
                        </div>
                        </ScrollReveal>

                    {/* Grid */}
                    {beritas.data.length === 0 ? (
                        <ScrollReveal>
                            <div className="text-center py-20 text-text-muted">
                                <p className="text-4xl mb-3">📰</p>
                                <p>Belum ada berita ditemukan.</p>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <ScrollReveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {beritas.data.map((b) => (
                                <Link key={b.id} href={`/berita/${b.slug}`} className="card group block overflow-hidden">
                                    <div className="h-44 overflow-hidden bg-secondary-bg">
                                        {b.thumbnail
                                            ? <img src={`/storage/${b.thumbnail}`} alt={b.judul}
                                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                                            : <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">Foto Berita</div>
                                        }
                                    </div>
                                    <div className="p-5">
                                        {b.kategori && <Badge color={b.kategori.warna} className="mb-2">{b.kategori.nama}</Badge>}
                                        <h2 className="font-bold text-charcoal mb-1.5 group-hover:text-primary transition-colors line-clamp-2 text-base leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{b.judul}</h2>
                                        <p className="text-sm text-text-secondary line-clamp-2 mb-3">{b.ringkasan}</p>
                                        <span className="text-xs text-text-muted">
                                            {b.published_at && new Date(b.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        </ScrollReveal>
                    )}

                    {/* Pagination */}
                    {beritas.last_page > 1 && (
                        <ScrollReveal>
                            <div className="flex justify-center gap-2 mt-12">
                                {beritas.links.map((link, i) => (
                                    <button key={i}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                        className={`px-3.5 py-2 text-sm font-medium transition-colors ${link.active ? 'bg-primary-600 text-white' : 'bg-white border border-border text-text-secondary hover:border-primary disabled:opacity-40'}`}
                                        style={{ borderRadius: 'var(--radius-sm)' }}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
