import { Link } from '@inertiajs/react';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Heart } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-charcoal text-slate-300" style={{ fontFamily: 'var(--font-body)' }}>
            {/* Main Footer */}
            <div className="container-custom py-12 lg:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Kolom 1: Logo & Deskripsi */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-primary text-white" style={{ borderRadius: 'var(--radius-sm)' }}>
                                <span className="text-sm">🏡</span>
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Desa Pematang Tatal
                                </div>
                                <div className="text-xs text-slate-400">Kab. Contoh · Sumatera Utara</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-5">
                            Portal resmi Desa Pematang Tatal. Informasi, layanan, dan transparansi untuk masyarakat desa.
                        </p>
                        {/* Sosmed */}
                        <div className="flex gap-2.5">
                            {[
                                { Icon: Facebook, href: '#', label: 'Facebook' },
                                { Icon: Instagram, href: '#', label: 'Instagram' },
                                { Icon: Youtube, href: '#', label: 'YouTube' },
                            ].map(({ Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label}
                                    className="w-8 h-8 flex items-center justify-center border border-slate-700 text-slate-400 hover:border-primary hover:text-primary transition-colors"
                                    style={{ borderRadius: 'var(--radius-sm)' }}>
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Kolom 2: Navigasi */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Navigasi</h4>
                        <ul className="space-y-2.5">
                            {[
                                ['Beranda', '/'],
                                ['Profil Desa', '/profil'],
                                ['Berita & Pengumuman', '/berita'],
                                ['Data Desa', '/data-desa'],
                                ['Dokumen Publik', '/dokumen'],
                                ['Lembaga Desa', '/lembaga'],
                                ['UMKM', '/umkm'],
                                ['Galeri', '/galeri'],
                            ].map(([label, href]) => (
                                <li key={href}>
                                    <Link href={href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 3: Layanan */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Layanan</h4>
                        <ul className="space-y-2.5">
                            {[
                                ['Layanan Surat', '/layanan'],
                                ['Pengaduan Warga', '/pengaduan'],
                                ['Agenda Kegiatan', '/agenda'],
                                ['Cek Status Permohonan', '/layanan/cek-status'],
                                ['Cek Status Pengaduan', '/pengaduan/cek-status'],
                                ['Potensi Desa', '/potensi'],
                                ['Kontak Kami', '/kontak'],
                            ].map(([label, href]) => (
                                <li key={href}>
                                    <Link href={href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Kontak</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-slate-400">
                                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                                <span>Jl. Desa Pematang Tatal No. 1, Kec. Contoh, Kab. Contoh, Sumatera Utara</span>
                            </li>
                            <li className="flex gap-3 text-sm text-slate-400">
                                <Phone size={16} className="text-primary flex-shrink-0" />
                                <span>0812-3456-7890</span>
                            </li>
                            <li className="flex gap-3 text-sm text-slate-400">
                                <Mail size={16} className="text-primary flex-shrink-0" />
                                <span>desa@pematangtatal.desa.id</span>
                            </li>
                            <li className="mt-3">
                                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Jam Pelayanan</div>
                                <div className="text-sm text-slate-400">Senin – Jumat: 08.00 – 15.00 WIB</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                    <span>© {year} Desa Pematang Tatal. Hak Cipta Dilindungi.</span>
                    <span className="flex items-center gap-1">
                        Dibuat dengan <Heart size={12} className="text-red-400" /> untuk kemajuan desa
                    </span>
                    <Link href="/privasi" className="hover:text-primary transition-colors">Privasi & Ketentuan</Link>
                </div>
            </div>
        </footer>
    );
}
