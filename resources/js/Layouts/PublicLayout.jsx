import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import PageTransition from '@/Components/PageTransition';

export default function PublicLayout({ children, transparentNav = false }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar transparent={transparentNav} />
            <main className="flex-1">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
            <Footer />
        </div>
    );
}
