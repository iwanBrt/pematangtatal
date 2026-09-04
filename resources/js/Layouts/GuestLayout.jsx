import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function GuestLayout({ children, title }) {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: 'var(--color-bg)' }}>
            
            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm hover:underline transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
                <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>

            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
                        style={{ backgroundColor: 'var(--color-primary-dark)' }}>
                        PT
                    </div>
                    <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                        {title || 'Sistem Informasi Desa'}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Desa Pematang Tatal, Kab. Batubara
                    </p>
                </div>

                <div className="card p-8">
                    {children}
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        © {new Date().getFullYear()} Pemerintah Desa Pematang Tatal.
                    </p>
                </div>
            </div>
        </div>
    );
}
