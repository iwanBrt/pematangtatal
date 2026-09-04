import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, Newspaper, UserCheck, BarChart3,
    FileText, ShoppingBag, AlertTriangle, Image as ImageIcon,
    LogOut, Menu, X, ArrowLeft, CalendarDays, FolderTree, Layers
} from 'lucide-react';

export default function AdminLayout({ children, title }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { label: 'Berita & Pengumuman', icon: Newspaper, href: '/admin/berita' },
        { label: 'Kategori', icon: FolderTree, href: '/admin/kategori' },
        { label: 'Profil & Perangkat', icon: UserCheck, href: '/admin/profil' },
        { label: 'Statistik & APBDes', icon: BarChart3, href: '/admin/statistik' },
        { label: 'Layanan Desa', icon: Layers, href: '/admin/layanan' },
        { label: 'Permohonan Surat', icon: FileText, href: '/admin/permohonan' },
        { label: 'Agenda Kegiatan', icon: CalendarDays, href: '/admin/agenda' },
        { label: 'Manajemen UMKM', icon: ShoppingBag, href: '/admin/umkm' },
        { label: 'Pengaduan Warga', icon: AlertTriangle, href: '/admin/pengaduan' },
        { label: 'Galeri Foto', icon: ImageIcon, href: '/admin/galeri' },
    ];

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* ── Sidebar Desktop ── */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:flex lg:flex-col`}
                style={{ backgroundColor: 'var(--color-primary-dark)', borderColor: 'var(--color-primary)' }}>
                <div className="h-16 flex items-center justify-between px-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <span className="font-bold text-white text-base tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                        Admin Desa
                    </span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = url === item.href || url.startsWith(item.href + '/');
                        return (
                            <Link key={item.label} href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                    isActive ? 'bg-primary-500 text-white' : 'text-white/70 hover:bg-primary-800 hover:text-white'
                                }`}>
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
                        <ArrowLeft size={16} /> Lihat Web Utama
                    </Link>
                    <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-primary-900 rounded-md text-left transition-colors">
                        <LogOut size={16} /> Keluar
                    </Link>
                </div>
            </aside>

            {/* ── Main Container ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30" style={{ borderColor: 'var(--color-border-light)' }}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden" style={{ color: 'var(--color-text-secondary)' }}>
                            <Menu size={22} />
                        </button>
                        <h1 className="font-bold text-lg" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                            {title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold leading-none" style={{ color: 'var(--color-text)' }}>{user.name}</p>
                            <p className="text-xs capitalize mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{user.role || 'Admin'}</p>
                        </div>
                        <div className="w-9 h-9 rounded-md flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Content area */}
                <main className="p-6 flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
