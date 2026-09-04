import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Login Admin Desa">
            <Head title="Log in" />

            {status && (
                <div className="mb-6 p-3 rounded-md text-sm font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        Alamat Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        className="input-field"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="admin@pematangtatal.desa.id"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        Kata Sandi
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        className="input-field"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-600 w-4 h-4"
                        />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm hover:underline"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            Lupa sandi?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-2.5 mt-2"
                    disabled={processing}
                >
                    <LogIn size={16} />
                    {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                </button>
            </form>
        </GuestLayout>
    );
}
