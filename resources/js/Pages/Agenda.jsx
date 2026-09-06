import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { CalendarDays, Clock3, MapPin, Users } from 'lucide-react';

const formatDate = (value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Agenda({ agendas }) {
    return <PublicLayout>
        <Head title="Agenda Kegiatan" />
        <PageHeader title="Agenda Kegiatan" subtitle="Jadwal kegiatan dan program yang akan datang di Desa Pematang Tatal" breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Agenda' }]} />
        <main className="section-padding bg-background"><div className="container-custom max-w-4xl">
            <div className="mb-7 flex items-center gap-3 border-b-2 border-charcoal pb-3"><CalendarDays className="text-primary" /><h1 className="text-xl font-extrabold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>Agenda Mendatang</h1></div>
            {agendas.data.length ? <div className="space-y-4">{agendas.data.map((agenda) => <article key={agenda.id} className="flex gap-4 rounded-lg border border-border-light bg-white p-5 sm:gap-6"><div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary-bg text-primary"><span className="text-xl font-extrabold leading-none">{new Date(agenda.tanggal_mulai).getDate()}</span><span className="mt-1 text-[10px] font-bold uppercase">{new Date(agenda.tanggal_mulai).toLocaleDateString('id-ID', { month: 'short' })}</span></div><div className="min-w-0 flex-1"><h2 className="font-extrabold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>{agenda.judul}</h2>{agenda.deskripsi && <p className="mt-1 text-sm text-text-secondary">{agenda.deskripsi}</p>}<div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-muted"><span className="flex items-center gap-1"><CalendarDays size={13} />{formatDate(agenda.tanggal_mulai)}{agenda.tanggal_selesai && ` – ${formatDate(agenda.tanggal_selesai)}`}</span>{agenda.waktu && <span className="flex items-center gap-1"><Clock3 size={13} />{agenda.waktu}</span>}{agenda.lokasi && <span className="flex items-center gap-1"><MapPin size={13} />{agenda.lokasi}</span>}{agenda.penyelenggara && <span className="flex items-center gap-1"><Users size={13} />{agenda.penyelenggara}</span>}</div></div></article>)}</div> : <div className="rounded-lg bg-white py-16 text-center text-text-muted">Belum ada agenda kegiatan yang akan datang.</div>}
        </div></main>
    </PublicLayout>;
}
