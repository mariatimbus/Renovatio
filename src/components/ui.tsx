import React from 'react';

export const SvgIcon = ({ name, size = 22 }: { name: string; size?: number }) => {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  let body: React.ReactNode;
  switch (name) {
    case 'pin':
      body = (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.7" />
        </>
      );
      break;
    case 'clock':
      body = (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6l4 2" />
        </>
      );
      break;
    case 'phone':
      body = <path d="M5 3.8 9 3l2.2 4.2-2.3 2.1c1.3 2.5 3.4 4.6 6 5.8l2.1-2.4 4.3 2.2-.9 4c-.2 1-1 1.5-2 1.5A16.9 16.9 0 0 1 3.5 5.9c0-1 .6-1.8 1.5-2.1Z" />;
      break;
    case 'mail':
      body = (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 7 9-7" />
        </>
      );
      break;
    case 'arrow':
      body = <path d="M4 12h16m-7-7 7 7-7 7" />;
      break;
    case 'menu':
      body = <path d="M3 7h18M3 12h18M3 17h18" />;
      break;
    case 'close':
      body = <path d="M5 5 19 19M19 5 5 19" />;
      break;
    case 'wave':
      body = (
        <>
          <path d="M2 8c3-4 5 4 8 0s5 4 8 0 4 0 4 0M2 15c3-4 5 4 8 0s5 4 8 0 4 0 4 0" />
        </>
      );
      break;
    case 'calendar':
      body = (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v5m10-5v5M3 10h18" />
        </>
      );
      break;
    case 'users':
      body = (
        <>
          <circle cx="9" cy="8" r="3.4" />
          <path d="M2.8 20c.8-3.6 3.2-5.4 6.2-5.4s5.4 1.8 6.2 5.4" />
          <circle cx="17" cy="9" r="2.6" />
          <path d="M15.6 14.7c2.9.2 5 1.9 5.7 5" />
        </>
      );
      break;
    case 'check':
      body = <path d="m4.5 12.5 5 5L19.5 7" />;
      break;
    default:
      body = <circle cx="12" cy="12" r="9" />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {body}
    </svg>
  );
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className={'section-head' + (dark ? ' on-dark' : '')}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, bg }: { eyebrow: string; title: React.ReactNode; lead?: string; bg?: string }) {
  return (
    <section className="page-hero">
      {bg && <div className="page-hero-bg" style={{ backgroundImage: `url('${bg}')` }} />}
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
      </div>
    </section>
  );
}

export function Monogram({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('');
  return (
    <span className="monogram" aria-hidden="true">
      {initials}
    </span>
  );
}
