import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import ScrollReveal from '@/Components/ScrollReveal';
import Badge from '@/Components/Badge';
import { Share2, Eye, ArrowLeft, MessageSquare } from 'lucide-react';

export default function BeritaShow({ berita, terkait }) {
    const share = () => {
        const url = window.location.href;
        const text = `${berita.judul} — ${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <PublicLayout>
            <Head title={berita.judul} />
            <div className="bg-background min-h-screen">
                <div className="container-custom max-w-3xl py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                        <span>/</span>
                        <Link href="/berita" className="hover:text-primary transition-colors">Berita</Link>
                        <span>/</span>
                        <span className="text-text font-medium line-clamp-1">{berita.judul}</span>
                    </nav>

                    {/* Article */}
                    <ScrollReveal>
                    <article className="bg-white border border-border-light overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
                        {berita.thumbnail && (
                            <div className="w-full h-64 sm:h-80 overflow-hidden bg-secondary-bg">
                                <img src={`/storage/${berita.thumbnail}`} alt={berita.judul} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="p-6 sm:p-8 lg:p-10">
                            {berita.kategori && <Badge color={berita.kategori.warna} className="mb-4">{berita.kategori.nama}</Badge>}
                            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                {berita.judul}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-6 border-b border-border-light">
                                <span>
                                    {berita.published_at && new Date(berita.published_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                                {berita.user && <span>oleh <strong className="text-text-secondary">{berita.user.name}</strong></span>}
                                <span className="flex items-center gap-1"><Eye size={14} /> {berita.views} kali dibaca</span>
                            </div>
                            <div className="prose prose-slate max-w-none text-text-secondary leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: berita.isi }} />

                            {/* Share */}
                            <div className="mt-10 pt-6 border-t border-border-light flex items-center justify-between flex-wrap gap-4">
                                <Link href="/berita" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                                    <ArrowLeft size={16} /> Kembali ke Berita
                                </Link>
                                <button onClick={share}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors"
                                    style={{ background: '#25d366', borderRadius: 'var(--radius-sm)' }}>
                                    <MessageSquare size={15} /> Bagikan via WhatsApp
                                </button>
                            </div>
                            </div>
                        </article>
                    </ScrollReveal>

                    {/* Berita Terkait */}
                    {terkait.length > 0 && (
                        <ScrollReveal>
                            <h2 className="text-xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Berita Terkait</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {terkait.map((b) => (
                                    <Link key={b.id} href={`/berita/${b.slug}`} className="card group block overflow-hidden">
                                        <div className="h-32 bg-secondary-bg overflow-hidden">
                                            {b.thumbnail
                                                ? <img src={`/storage/${b.thumbnail}`} alt={b.judul} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                                                : <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">Foto</div>
                                            }
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm font-semibold text-charcoal line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{b.judul}</p>
                                            <p className="text-xs text-text-muted mt-1">
                                                {b.published_at && new Date(b.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
