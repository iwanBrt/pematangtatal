import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import ScrollReveal from '@/Components/ScrollReveal';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Kontak() {
    return (
        <PublicLayout>
            <Head title="Kontak" />
            <PageHeader
                title="Hubungi Kami"
                subtitle="Ada pertanyaan atau masukan? Kami siap melayani Anda."
                breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Kontak' }]}
            />
            <div className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Info Kontak */}
                        <ScrollReveal>
                        <div className="space-y-6">
                            <div className="border border-border-light p-6" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                                <h2 className="font-bold text-lg mb-5 text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Informasi Kantor Desa
                                </h2>
                                <div className="space-y-5">
                                    {[
                                        { icon: MapPin, label: 'Alamat', value: 'Jl. Desa Pematang Tatal No. 1, Kec. Sei Balai, Kab. Batubara, Sumatera Utara' },
                                        { icon: Phone, label: 'Telepon', value: '0812-3456-7890' },
                                        { icon: Mail, label: 'Email', value: 'desa@pematangtatal.desa.id' },
                                        { icon: Clock, label: 'Jam Pelayanan', value: 'Senin – Jumat: 08.00 – 15.00 WIB' },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex gap-4">
                                            <div
                                                className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-secondary-bg border border-border-light"
                                                style={{ borderRadius: 'var(--radius-sm)' }}
                                            >
                                                <Icon size={18} className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-text-muted">
                                                    {label}
                                                </p>
                                                <p className="text-sm text-charcoal">
                                                    {value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className="border border-border-light overflow-hidden h-56 flex items-center justify-center bg-secondary-bg"
                                style={{ borderRadius: 'var(--radius-lg)' }}
                            >
                                <p className="text-sm text-text-muted">
                                    Google Maps Embed
                                </p>
                            </div>
                        </div>
                        </ScrollReveal>

                        {/* Form Pesan */}
                        <ScrollReveal>
                        <div className="border border-border-light p-6 lg:p-8" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                            <h2 className="font-bold text-lg mb-5 text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                                Kirim Pesan / Masukan
                            </h2>
                            <form className="space-y-4">
                                {[
                                    { label: 'Nama Lengkap', type: 'text', placeholder: 'Nama Anda' },
                                    { label: 'Email (Opsional)', type: 'email', placeholder: 'email@contoh.com' },
                                    { label: 'No. Telepon', type: 'tel', placeholder: '0812XXXXXXXX' },
                                ].map(({ label, type, placeholder }) => (
                                    <div key={label}>
                                        <label className="block text-sm font-medium mb-1.5 text-text-secondary">
                                            {label}
                                        </label>
                                        <input type={type} placeholder={placeholder} className="input-field" />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-text-secondary">
                                        Pesan
                                    </label>
                                    <textarea rows={5} placeholder="Tuliskan pesan Anda..." className="input-field" />
                                </div>
                                <button type="submit" className="btn btn-primary w-full justify-center py-3 mt-2">
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
