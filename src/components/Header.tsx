import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SvgIcon } from './ui';

const LINKS: [string, string][] = [
  ['Acasă', '/'],
  ['Locații', '/locatii'],
  ['Program', '/program'],
  ['Contact', '/contact'],
  ['Echipa', '/echipa'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <Link to="/" className="brand" aria-label="Renovatio Sport Club — Acasă" onClick={close}>
        <img src="/images/logo.png" alt="Renovatio Sport Club" />
      </Link>
      <nav className={'nav' + (open ? ' nav-open' : '')} aria-label="Navigație principală">
        {LINKS.map(([text, to]) => (
          <NavLink key={to} to={to} onClick={close} className={({ isActive }) => (isActive ? 'active' : '')}>
            {text}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" className="pill primary header-cta" onClick={close}>
        Înscriere <SvgIcon name="arrow" size={18} />
      </Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Închide meniul' : 'Deschide meniul'}>
        <SvgIcon name={open ? 'close' : 'menu'} size={25} />
      </button>
    </header>
  );
}
