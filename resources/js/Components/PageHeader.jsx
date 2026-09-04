export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
    return (
        <div className="bg-white border-b border-border-light" style={{ fontFamily: 'var(--font-body)' }}>
            <div className="container-custom py-8 lg:py-10">
                {/* Breadcrumb */}
                {breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-2 text-sm text-text-muted mb-3" aria-label="Breadcrumb">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-2">
                                {i > 0 && <span className="text-border">/</span>}
                                {crumb.href ? (
                                    <a href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</a>
                                ) : (
                                    <span className="text-text font-medium">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}
                <h1 className="text-2xl lg:text-3xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {title}
                </h1>
                {subtitle && <p className="text-text-muted text-base max-w-2xl">{subtitle}</p>}
            </div>
        </div>
    );
}
