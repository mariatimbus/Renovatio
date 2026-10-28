import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content';
import { PageHero, SvgIcon } from '../components/ui';
import { ScheduleTable } from '../components/blocks';

export default function Schedule() {
  const { locations, schedule } = useContent();
  const [filter, setFilter] = useState('toate');
  const pending = locations.filter((l) => l.status.toLowerCase().includes('confirmare'));

  const rows = useMemo(() => (filter === 'toate' ? schedule : schedule.filter((r) => r.locatieId === filter)), [filter, schedule]);

  return (
    <>
      <PageHero
        eyebrow="PROGRAM"
        title={
          <>
            Programul <em>antrenamentelor.</em>
          </>
        }
        lead="Zile, ore, grupe și locații — actualizat direct de club, mereu vizibil aici."
        bg="/images/program-water.webp"
      />
      <section className="program" style={{ minHeight: 0 }}>
        <div
          className="program-bg"
          style={{ backgroundImage: "linear-gradient(90deg,rgba(2,25,35,.82),rgba(3,28,38,.9)),url('/images/program-water.webp')" }}
        ></div>
        <div className="program-intro">
          <p className="eyebrow white">PROGRAM COMPLET</p>
          <h2>Zi · Grupă · Oră · Locație</h2>
          <p>Filtrează după locație și verifică intervalul potrivit pentru copilul tău.</p>
          <Link to="/contact" className="pill primary">
            Solicită loc în grupă <SvgIcon name="arrow" size={18} />
          </Link>
        </div>
        <div className="schedule-panel">
          <div className="filter-chips" role="tablist" aria-label="Filtrează după locație">
            <button className={'chip' + (filter === 'toate' ? ' picked' : '')} onClick={() => setFilter('toate')}>
              Toate
            </button>
            {locations.map((l) => (
              <button key={l.id} className={'chip' + (filter === l.id ? ' picked' : '')} onClick={() => setFilter(l.id)}>
                {l.name}
              </button>
            ))}
          </div>
          <ScheduleTable rows={rows} locations={locations} />
          {pending.length > 0 && (
            <p className="soft-note" style={{ marginTop: 14 }}>
              {pending.map((l) => l.name).join(' · ')}: program în curs de confirmare — întreabă disponibilitatea pe WhatsApp.
            </p>
          )}
          <p className="table-note">Încadrarea în grupe și intervalele exacte se confirmă la înscriere.</p>
        </div>
      </section>
    </>
  );
}
