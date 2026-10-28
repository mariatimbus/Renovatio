import { Link } from 'react-router-dom';
import { useContent } from '../content';
import { PageHero, SvgIcon } from '../components/ui';
import { LocationCard } from '../components/blocks';

export default function Locations() {
  const { locations } = useContent();
  return (
    <>
      <PageHero
        eyebrow="LOCAȚII"
        title={
          <>
            Unde ne <em>antrenăm.</em>
          </>
        }
        lead="Două baze moderne, alese pentru confortul și siguranța copiilor."
        bg="/images/pool-otopeni.webp"
      />
      <section className="locations-page">
        <div className="location-cards">
          {locations.map((l) => (
            <LocationCard key={l.id} loc={l} full />
          ))}
        </div>
        <aside className="help-card" style={{ marginTop: 40 }}>
          <h3>Nu știi ce locație ți se potrivește?</h3>
          <p>Scrie-ne și îți recomandăm grupa potrivită, în funcție de vârstă, nivel și zonă.</p>
          <Link to="/contact" className="pill primary">
            Întreabă-ne <SvgIcon name="arrow" size={18} />
          </Link>
        </aside>
      </section>
    </>
  );
}
