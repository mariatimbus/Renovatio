import { Link } from 'react-router-dom';
import { useContent } from '../content';
import { PageHero } from '../components/ui';
import RegistrationForm, { ContactMethods } from '../components/RegistrationForm';

export default function Contact() {
  const { locations } = useContent();
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={
          <>
            Hai să <em>vorbim.</em>
          </>
        }
        lead="Sună, scrie pe WhatsApp sau completează formularul de înscriere."
        bg="/images/original-underwater.webp"
      />
      <section className="contact" style={{ minHeight: 0 }}>
        <div className="contact-intro">
          <p className="eyebrow white">CONTACT & ÎNSCRIERE</p>
          <h2>
            Fă parte din
            <br />
            comunitatea <em>Renovatio.</em>
          </h2>
          <p>Completează formularul și te contactăm cât mai curând.</p>
          <ContactMethods />
          <h3 className="sub-title" style={{ color: '#fff' }}>
            Locațiile noastre
          </h3>
          <ul className="loc-mini-list">
            {locations.map((l) => (
              <li key={l.id} style={{ background: 'rgba(255,255,255,.07)', borderColor: 'rgba(255,255,255,.14)' }}>
                <strong style={{ color: '#fff' }}>{l.name}</strong>
                <span style={{ color: '#aab5b7' }}>{l.address}</span>
                <a href={l.mapsUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--green)' }}>
                  Deschide în Google Maps
                </a>
              </li>
            ))}
          </ul>
        </div>
        <RegistrationForm />
      </section>
      <section className="page-section cream-section">
        <p className="soft-note" style={{ margin: 0 }}>
          Ai nevoie de altceva? Găsești programul pe pagina <Link to="/program" style={{ color: 'var(--purple)', fontWeight: 600 }}>Program</Link> și detalii despre baze pe pagina{' '}
          <Link to="/locatii" style={{ color: 'var(--purple)', fontWeight: 600 }}>Locații</Link>.
        </p>
      </section>
    </>
  );
}
