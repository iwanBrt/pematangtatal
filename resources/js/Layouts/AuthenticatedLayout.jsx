import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import {
    LayoutDashboard, Newspaper, Users, Info, Box, AlertTriangle, FileText,
    Image as ImageIcon, Menu, X, Settings, LogOut, ExternalLink, Activity
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: 'Berita', href: '#', icon: Newspaper },
        { name: 'Profil Desa', href: '#', icon: Info },
        { name: 'Perangkat Desa', href: '#', icon: Users },
        { name: 'Statistik', href: '#', icon: Activity },
        { name: 'UMKM', href: '#', icon: Box },
        { name: 'Pengaduan', href: '#', icon: AlertTriangle },
        { name: 'Layanan Surat', href: '#', icon: FileText },
        { name: 'Galeri', href: '#', icon: ImageIcon },
    ];

    const isActive = (href) => url.startsWith(new URL(href).pathname);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-primary-700 flex items-center justify-center text-white text-sm font-bold">
                            PT
                        </div>
                        <span className="font-bold text-gray-900 font-heading text-lg">Admin Panel</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                        Menu Utama
                    </div>
                    <nav className="space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                    isActive(item.href) && item.href !== '#'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <item.icon size={18} className={isActive(item.href) && item.href !== '#' ? 'text-primary-700' : 'text-gray-400'} />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                            Pengaturan
                        </div>
                        <Link
                            href={route('admin.profile.edit')}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <Settings size={18} className="text-gray-400" />
                            Profil Saya
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <Menu size={24} />
                        </button>
                        <a href="/" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                            <ExternalLink size={16} /> Lihat Website
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="hidden sm:inline-block">{user.name}</span>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right">
                                <Dropdown.Link href={route('admin.profile.edit')} className="flex items-center gap-2">
                                    <Settings size={16} /> Pengaturan Profil
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-red-600">
                                    <LogOut size={16} /> Logout
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    {header && (
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 font-heading">{header}</h1>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
