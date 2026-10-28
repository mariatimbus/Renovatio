import { Location, Coach, ScheduleRow, resolvePhoto } from '../content';
import { SvgIcon } from './ui';

export function locationName(locations: Location[], id: string): string {
  return locations.find((l) => l.id === id)?.name ?? id;
}

export function ScheduleTable({ rows, locations }: { rows: ScheduleRow[]; locations: Location[] }) {
  if (!rows.length) return <p className="sched-empty">Programul va fi publicat în curând.</p>;
  return (
    <div className="sched" role="table" aria-label="Programul antrenamentelor">
      <div className="sched-row sched-head" role="row">
        <span role="columnheader">Zi</span>
        <span role="columnheader">Grupă</span>
        <span role="columnheader">Oră</span>
        <span role="columnheader">Locație</span>
      </div>
      {rows.map((r, i) => (
        <div className="sched-row" role="row" key={i}>
          <span role="cell" data-label="Zi">
            {r.zi}
          </span>
          <span role="cell" data-label="Grupă">
            {r.grupa}
          </span>
          <span role="cell" data-label="Oră">
            {r.ora}
          </span>
          <span role="cell" data-label="Locație">
            {locationName(locations, r.locatieId)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LocationCard({ loc, full = false }: { loc: Location; full?: boolean }) {
  const photo = resolvePhoto(loc.photo);
  const waze = `https://waze.com/ul?q=${encodeURIComponent(loc.name)}&navigate=yes`;
  const pending = loc.status.toLowerCase().includes('confirmare');
  return (
    <article
      className="location-tile"
      style={
        photo
          ? { backgroundImage: `linear-gradient(180deg,rgba(3,22,30,.08) 40%,rgba(3,22,30,.9) 100%),url('${photo}')` }
          : undefined
      }
    >
      <span className={'status-badge ' + (pending ? 'pending' : 'ok')}>{loc.status}</span>
      <div className="tile-body">
        <h3>{loc.name}</h3>
        <div className="tile-lines">
          <p>
            <SvgIcon name="pin" size={15} /> {loc.address}
          </p>
          <p>
            <SvgIcon name="clock" size={15} /> {loc.days} · <strong>{loc.hours}</strong>
          </p>
          <p>
            <SvgIcon name="wave" size={15} /> Grupe: <strong>{loc.groups}</strong>
          </p>
        </div>
        {full && loc.access && <p className="tile-access">{loc.access}</p>}
        <div className="tile-actions">
          <a className="pill small primary" href={loc.mapsUrl} target="_blank" rel="noreferrer">
            <SvgIcon name="pin" size={15} /> Google Maps
          </a>
          <a className="text-arrow text-arrow-light" href={waze} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
            Waze <SvgIcon name="arrow" size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CoachCard({ coach, full = false }: { coach: Coach; full?: boolean }) {
  const photo = resolvePhoto(coach.photo);
  const [first, ...rest] = coach.nume.split(' ');
  return (
    <article className="team-member">
      <div className="team-image">{photo ? <img src={photo} alt={'Antrenor — ' + coach.nume} loading="lazy" /> : <span className="monogram">{coach.nume.trim().slice(0, 1).toUpperCase()}</span>}</div>
      <h3>
        {first}
        {rest.length > 0 && (
          <>
            <br />
            {rest.join(' ')}
          </>
        )}
      </h3>
      <p>{coach.functie}</p>
      {!photo && <span className="coach-photo-note">Foto oficială în curând</span>}
      {full && coach.bio && <p className="coach-bio">{coach.bio}</p>}
      {full && coach.experienta && (
        <p className="coach-exp">
          <strong>Experiență:</strong> {coach.experienta}
        </p>
      )}
    </article>
  );
}
