import { Link } from 'react-router-dom';
import { useContent } from '../content';
import { PageHero, SvgIcon } from '../components/ui';
import { CoachCard } from '../components/blocks';

export default function Team() {
  const { coaches } = useContent();
  const missingPhotos = coaches.some((c) => !c.photo);
  return (
    <>
      <PageHero
        eyebrow="ECHIPA"
        title={
          <>
            Oameni care <em>inspiră.</em>
          </>
        }
        lead="Antrenori dedicați înotului și dezvoltării fiecărui copil."
        bg="/images/about-child.webp"
      />
      <section className="team team-page cream-section">
        <div className="team-intro">
          <p className="eyebrow plum">ANTRENORII RENOVATIO</p>
          <h2>
            Pasiune, disciplină,
            <br />
            <em>rezultate.</em>
          </h2>
          <p>Fiecare membru al echipei urmărește progresul real al copilului tău.</p>
        </div>
        {missingPhotos && <p className="soft-note">Fotografiile și descrierile complete ale echipei vin în curând — pregătim un shoot profesional.</p>}
        <div className="team-grid">
          {coaches.map((c) => (
            <CoachCard key={c.nume} coach={c} full />
          ))}
        </div>
        <div className="cta-band">
          <h2>Vrei să înoți cu noi?</h2>
          <Link to="/contact" className="pill primary">
            Contactează-ne <SvgIcon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
