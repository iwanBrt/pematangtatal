export default function Badge({ children, color = '#164A41', className = '' }) {
    const bg = color + '18';
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold ${className}`} style={{ backgroundColor: bg, color, borderRadius: 'var(--radius-sm)' }}>
            {children}
        </span>
    );
}
