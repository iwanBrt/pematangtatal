import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
    { label: 'Beranda', href: '/' },
    {
        label: 'Tentang Desa',
        children: [
            { label: 'Profil Desa', href: '/profil' },
            { label: 'Data Desa', href: '/data-desa' },
            { label: 'Lembaga Desa', href: '/lembaga' },
            { label: 'Dokumen Publik', href: '/dokumen' },
        ],
    },
    { label: 'Berita', href: '/berita' },
    {
        label: 'Layanan',
        children: [
            { label: 'Ajukan Permohonan', href: '/layanan' },
            { label: 'Pengaduan Warga', href: '/pengaduan' },
            { label: 'Agenda Kegiatan', href: '/agenda' },
        ],
    },
    {
        label: 'Potensi',
        children: [
            { label: 'UMKM', href: '/umkm' },
            { label: 'Potensi Desa', href: '/potensi' },
            { label: 'Galeri', href: '/galeri' },
        ],
    },
    { label: 'Kontak', href: '/kontak' },
];

export default function Navbar({ transparent = false }) {
    const { url } = usePage();
    const pathname = url.split('?')[0];
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdown, setDropdown] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href) => pathname === href || pathname.startsWith(href + '/');
    const isLinkActive = (link) => isActive(link.href) || link.children?.some((child) => isActive(child.href));
    const navBg = transparent && !scrolled ? 'bg-transparent' : 'bg-white';
    const textColor = transparent && !scrolled ? 'text-white' : 'text-charcoal';
    const borderClass = transparent && !scrolled ? 'border-transparent' : 'border-border-light';
    const logoColor = transparent && !scrolled ? 'text-white' : 'text-primary';

    const handleClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setMobileOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${navBg} ${borderClass} border-b`}>
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 lg:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className={`w-9 h-9 flex items-center justify-center transition-colors text-white ${transparent && !scrolled ? 'bg-white/15' : 'bg-primary'}`} style={{ borderRadius: 'var(--radius-sm)' }}>
                            <span className="text-xs font-bold tracking-wide">PT</span>
                        </div>
                        <div>
                            <div className={`font-bold text-sm leading-tight transition-colors ${logoColor}`} style={{ fontFamily: 'var(--font-heading)' }}>
                                Desa Pematang Tatal
                            </div>
                            <div className={`text-xs transition-colors ${transparent && !scrolled ? 'text-white/70' : 'text-text-muted'}`}>
                                Kab. Contoh · Sumatera Utara
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-0.5">
                        {navLinks.map((link) =>
                            link.children ? (
                                <div key={link.label} className="relative"
                                    onMouseEnter={() => setDropdown(link.label)}
                                    onMouseLeave={() => setDropdown(null)}>
                                    <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium border-b-2 border-transparent transition-colors ${isLinkActive(link) ? 'text-[#185548] bg-[#e5f0eb] font-semibold border-[#185548]' : `${textColor} hover:text-primary hover:bg-secondary-bg`}`}>
                                        {link.label} <ChevronDown size={14} />
                                    </button>
                                    {dropdown === link.label && (
                                        <div className="absolute top-full left-0 w-52 bg-white border border-border-light shadow-elevated py-1 z-50" style={{ borderRadius: 'var(--radius-md)' }}>
                                            {link.children.map((c) => (
                                                <Link key={c.href} href={c.href}
                                                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-secondary-bg hover:text-primary transition-colors">
                                                    {c.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link key={link.href} href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                        className={`px-3 py-2 text-sm font-medium border-b-2 border-transparent transition-colors ${isLinkActive(link)
                                            ? 'text-[#185548] bg-[#e5f0eb] font-semibold border-[#185548]'
                                            : `${textColor} hover:text-primary hover:bg-secondary-bg`
                                        }`}
                                    style={{ borderRadius: 'var(--radius-sm)' }}>
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* CTA */}
                    <Link href="/layanan" className="!hidden md:!inline-flex btn btn-primary !bg-primary !text-white text-sm py-2 px-4 hover:!bg-primary-dark">
                        Layanan Desa
                    </Link>

                    {/* Mobile Toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)}
                        className={`lg:hidden p-2 transition-colors ${textColor}`}
                        aria-label="Menu">
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                    <div className="lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-white border-t border-border-light">
                    <div className="container-custom py-3 flex flex-col gap-0.5">
                        {navLinks.map((link) =>
                            link.children ? (
                                <div key={link.label}>
                                    <div className="px-3 py-2 text-xs font-bold text-text-muted uppercase tracking-wider mt-2">{link.label}</div>
                                    {link.children.map((c) => (
                                        <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                                            className="block px-5 py-2 text-sm text-text-secondary hover:text-primary transition-colors">
                                            {c.label}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                    className={`px-3 py-2.5 text-sm font-medium transition-colors ${isActive(link.href) ? 'text-[#185548] bg-[#e5f0eb] font-semibold border-l-2 border-[#185548]' : 'text-text-secondary hover:text-primary hover:bg-secondary-bg'}`}>
                                    {link.label}
                                </Link>
                            )
                        )}
                        <div className="mt-3 pt-3 border-t border-border-light">
                            <Link href="/layanan" onClick={() => setMobileOpen(false)} className="btn btn-primary w-full justify-center text-sm">
                                Layanan Desa
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
