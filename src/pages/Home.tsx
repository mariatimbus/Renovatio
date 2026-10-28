import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent, phoneDigits, waLink } from '../content';
import { SvgIcon } from '../components/ui';
import { LocationCard, CoachCard, ScheduleTable } from '../components/blocks';
import RegistrationForm, { ContactMethods } from '../components/RegistrationForm';

const SLIDES = [
  {
    title: (
      <>
        În apă
        <br />
        începe
        <br />
        <em>totul.</em>
      </>
    ),
    img: '/images/hero-swimmer.webp',
  },
  {
    title: (
      <>
        Curajul
        <br />
        se învață
        <br />
        <em>în apă.</em>
      </>
    ),
    img: '/images/original-hero.webp',
  },
  {
    title: (
      <>
        De la primii pași
        <br />
        la noi
        <br />
        <em>recorduri.</em>
      </>
    ),
    img: '/images/original-underwater.webp',
  },
];

export default function Home() {
  const { settings, locations, schedule, coaches } = useContent();
  const [heroIndex, setHeroIndex] = useState(0);
  const hero = SLIDES[heroIndex];
  const pending = locations.filter((l) => l.status.toLowerCase().includes('confirmare'));

  return (
    <>
      <section className="hero" aria-label="Renovatio Sport Club">
        <div className="hero-photo" key={heroIndex} style={{ backgroundImage: `url('${hero.img}')` }}></div>
        <div className="hero-wash"></div>
        <div className="hero-copy">
          <p className="eyebrow white eyebrow-spaced">RENOVATIO SPORT CLUB</p>
          <h1>{hero.title}</h1>
          <p className="hero-lead">{settings.tagline}</p>
          <div className="hero-actions">
            <Link to="/program" className="pill primary">
              Vezi programul <SvgIcon name="arrow" size={18} />
            </Link>
            <Link to="/contact" className="text-arrow text-arrow-light">
              Contactează-ne <SvgIcon name="arrow" size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-values" aria-hidden="true">
          DISCIPLINĂ
          <br />
          DEZVOLTARE
          <br />
          PERFORMANȚĂ
          <br />
          COMUNITATE
        </div>
        <div className="hero-navigation">
          <span>0{heroIndex + 1} / 03</span>
          <button onClick={() => setHeroIndex((heroIndex + 2) % 3)} aria-label="Imaginea anterioară">
            ‹
          </button>
          <button onClick={() => setHeroIndex((heroIndex + 1) % 3)} aria-label="Imaginea următoare">
            ›
          </button>
        </div>
      </section>

      <section className="quick-info" aria-label="Informații rapide">
        <p className="eyebrow greenlight">INFORMAȚII RAPIDE</p>
        <div className="quick-info-grid">
          <div className="quick-col">
            <p className="quick-label">Locație</p>
            {locations.map((l) => (
              <div className="quick-item" key={l.id}>
                <strong>{l.name}</strong>
                <span>{l.address}</span>
                <a className="quick-link" href={l.mapsUrl} target="_blank" rel="noreferrer">
                  Google Maps <SvgIcon name="arrow" size={14} />
                </a>
              </div>
            ))}
            <Link to="/locatii" className="quick-link">
              Toate locațiile <SvgIcon name="arrow" size={14} />
            </Link>
          </div>

          <div className="quick-col">
            <p className="quick-label">Program</p>
            {locations[0] && (
              <div className="quick-item">
                <span className="quick-days">{locations[0].days}</span>
                <p className="quick-time">{locations[0].hours}</p>
                <span>{locations[0].name}</span>
              </div>
            )}
            {pending.map((l) => (
              <p className="pending-note" key={l.id}>
                {l.name}: program în curs de confirmare.
              </p>
            ))}
            <Link to="/program" className="quick-link">
              Program complet <SvgIcon name="arrow" size={14} />
            </Link>
          </div>

          <div className="quick-col">
            <p className="quick-label">Contact</p>
            <div className="quick-item">
              <strong>
                <a href={'tel:+' + phoneDigits(settings.telefon)}>{settings.telefon}</a>
              </strong>
              <span>Sună-ne</span>
            </div>
            <div className="quick-item">
              <strong>
                <a href={waLink(settings.telefon)} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </strong>
              <span>Răspuns rapid</span>
            </div>
            <div className="quick-item">
              <strong>
                <a href={'mailto:' + settings.email}>{settings.email}</a>
              </strong>
              <span>Email</span>
            </div>
            <Link to="/contact" className="quick-link">
              Contact & înscriere <SvgIcon name="arrow" size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-panel" id="despre">
        <div className="about-photo" style={{ backgroundImage: "url('/images/about-child.webp')" }} aria-label="Copil la marginea piscinei" role="img"></div>
        <div className="about-copy">
          <p className="eyebrow plum">MAI MULT DECÂT ÎNOT</p>
          {settings.despre.slice(0, 2).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <Link to="/locatii" className="text-arrow">
            Vezi locațiile și programul <SvgIcon name="arrow" size={16} />
          </Link>
        </div>
        <div className="about-water" style={{ backgroundImage: "url('/images/about-wave.webp')" }}></div>
      </section>

      <section className="locations" id="locatii">
        <div className="location-tools">
          <p className="eyebrow olive">LOCAȚII</p>
          <Link to="/locatii" className="text-arrow">
            Detalii locații <SvgIcon name="arrow" size={16} />
          </Link>
        </div>
        <div className="location-cards">
          {locations.map((l) => (
            <LocationCard key={l.id} loc={l} />
          ))}
        </div>
      </section>

      <section className="program" id="program">
        <div className="program-bg" style={{ backgroundImage: "linear-gradient(90deg,rgba(2,25,35,.75),rgba(3,28,38,.84)),url('/images/program-water.webp')" }}></div>
        <div className="program-intro">
          <p className="eyebrow white">PROGRAM</p>
          <h2>Programul antrenamentelor</h2>
          <p>Grupe de inițiere, cursuri și grupe de performanță, organizate pe zile, locații și nivel.</p>
          <Link to="/contact" className="pill primary">
            Solicită loc în grupă <SvgIcon name="arrow" size={18} />
          </Link>
        </div>
        <div className="schedule-panel">
          <ScheduleTable rows={schedule} locations={locations} />
          <p className="table-note">Încadrarea în grupe și intervalele exacte se confirmă la înscriere.</p>
          <Link to="/program" className="text-arrow" style={{ marginTop: 12, fontSize: 12 }}>
            Program complet <SvgIcon name="arrow" size={15} />
          </Link>
        </div>
      </section>

      <section className="team cream-section" id="echipa">
        <div className="team-intro">
          <p className="eyebrow plum">ECHIPA</p>
          <h2>
            Oameni care
            <br />
            <em>inspiră.</em>
          </h2>
          <p>Oameni dedicați înotului și dezvoltării fiecărui copil.</p>
          <Link to="/echipa" className="text-arrow">
            Cunoaște echipa <SvgIcon name="arrow" size={16} />
          </Link>
        </div>
        <div className="team-grid">
          {coaches.map((c) => (
            <CoachCard key={c.nume} coach={c} />
          ))}
        </div>
      </section>

      <section className="contact" id="inscriere">
        <div className="contact-intro">
          <p className="eyebrow white">CONTACT & ÎNSCRIERE</p>
          <h2>
            Fă parte din
            <br />
            comunitatea <em>Renovatio.</em>
          </h2>
          <p>Completează formularul și te contactăm cât mai curând.</p>
          <ContactMethods />
        </div>
        <RegistrationForm />
      </section>
    </>
  );
}
