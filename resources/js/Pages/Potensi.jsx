import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { Leaf, Compass, Youtube } from 'lucide-react';

export default function Potensi() {
    return (
        <PublicLayout>
            <Head title="Potensi Desa" />
            <PageHeader
                title="Potensi Desa"
                subtitle="Kekayaan alam, pariwisata, pertanian, dan kebudayaan Desa Pematang Tatal."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Potensi Desa' }]}
            />

            <div className="section-padding bg-background">
                <div className="container-custom space-y-20">
                    {/* Section 1: Pertanian & Perkebunan */}
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div className="space-y-5">
                                <div
                                    className="w-12 h-12 flex items-center justify-center bg-primary-bg border border-primary/10"
                                    style={{ borderRadius: 'var(--radius-sm)' }}
                                >
                                    <Leaf className="text-primary" size={24} />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Sektor Pertanian &amp; Perkebunan
                                </h2>
                                <p className="leading-relaxed text-base text-text-secondary">
                                    Desa Pematang Tatal dianugerahi tanah yang subur. Sebagian besar wilayah desa dimanfaatkan untuk sektor pertanian dan perkebunan, yang menjadi mata pencaharian utama warga desa.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="border border-border-light p-5 bg-white" style={{ borderRadius: 'var(--radius-md)' }}>
                                        <h4 className="font-bold text-sm text-charcoal mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Kelapa Sawit</h4>
                                        <p className="text-xs text-text-muted">Komoditas perkebunan utama warga desa.</p>
                                    </div>
                                    <div className="border border-border-light p-5 bg-white" style={{ borderRadius: 'var(--radius-md)' }}>
                                        <h4 className="font-bold text-sm text-charcoal mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Padi Sawah</h4>
                                        <p className="text-xs text-text-muted">Ketahanan pangan lokal yang melimpah.</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border border-border-light overflow-hidden aspect-video flex items-center justify-center bg-secondary-bg"
                                style={{ borderRadius: 'var(--radius-lg)' }}
                            >
                                <span className="text-sm text-text-muted">Foto Pertanian</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Section 2: Pariwisata & Alam */}
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div className="lg:order-2 space-y-5">
                                <div
                                    className="w-12 h-12 flex items-center justify-center bg-accent-bg border border-accent/10"
                                    style={{ borderRadius: 'var(--radius-sm)' }}
                                >
                                    <Compass className="text-accent" size={24} />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Pariwisata &amp; Keindahan Alam
                                </h2>
                                <p className="leading-relaxed text-base text-text-secondary">
                                    Suasana desa yang asri, udara segar, dan pemandangan persawahan hijau menawarkan destinasi wisata alam pedesaan yang menenangkan. Kami terus mengembangkan fasilitas agar wisatawan dapat menikmati keramahan desa kami.
                                </p>
                                <ul className="space-y-3 text-sm text-text-secondary">
                                    <li className="flex items-start gap-2.5">
                                        <span className="mt-1 text-primary">•</span>
                                        <span>Hamparan persawahan hijau berlatar perbukitan.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="mt-1 text-primary">•</span>
                                        <span>Jalur wisata bersepeda keliling dusun.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="mt-1 text-primary">•</span>
                                        <span>Wisata kuliner khas pedesaan dari UMKM lokal.</span>
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="lg:order-1 border border-border-light overflow-hidden aspect-video flex items-center justify-center bg-secondary-bg"
                                style={{ borderRadius: 'var(--radius-lg)' }}
                            >
                                <span className="text-sm text-text-muted">Foto Pemandangan</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Section 3: Video Profil Desa */}
                    <ScrollReveal>
                        <div className="border border-border-light p-8 lg:p-12 text-center" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                            <div className="max-w-xl mx-auto space-y-4 mb-8">
                                <div
                                    className="w-12 h-12 flex items-center justify-center mx-auto bg-secondary-bg border border-border-light"
                                    style={{ borderRadius: 'var(--radius-sm)' }}
                                >
                                    <Youtube className="text-red-600" size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Video Profil Desa
                                </h2>
                                <p className="text-sm leading-relaxed text-text-secondary">
                                    Saksikan keindahan lanskap, aktivitas warga, dan program pembangunan desa kami dalam video dokumenter singkat berikut.
                                </p>
                            </div>
                            <div
                                className="max-w-4xl mx-auto border border-border-light overflow-hidden aspect-video flex items-center justify-center bg-secondary-bg"
                                style={{ borderRadius: 'var(--radius-lg)' }}
                            >
                                <p className="text-sm text-text-muted">
                                    Embed Video YouTube
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </PublicLayout>
    );
}
