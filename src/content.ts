import { createContext, useContext, useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// Renovatio Sport Club — model de conținut + loader Google Sheets
// Conținutul implicit (de rezervă) este încorporat mai jos. Dacă SHEET_ID este
// completat, datele se citesc din fișierul Google Sheets al clubului
// (taburi: Setari, Locatii, Program, Echipa) — vezi ADMINISTRARE.md.
// ---------------------------------------------------------------------------

export type Location = {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
  days: string;
  hours: string;
  status: string;
  groups: string;
  access: string;
  photo: string;
};

export type ScheduleRow = { zi: string; grupa: string; ora: string; locatieId: string };

export type Coach = { nume: string; functie: string; bio: string; experienta: string; photo: string };

export type Settings = {
  telefon: string;
  email: string;
  gaId: string;
  facebook: string;
  tagline: string;
  descriereHero: string;
  despre: string[];
  anunt: string;
};

export type Content = { settings: Settings; locations: Location[]; schedule: ScheduleRow[]; coaches: Coach[] };

// Lipește aici ID-ul fișierului Google Sheets (vezi ADMINISTRARE.md, Pasul 4).
// Lasă gol ('') ca site-ul să folosească doar conținutul încorporat de mai jos.
export const SHEET_ID = (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_GOOGLE_SHEET_ID || '1urbChSsoJjeQSM2refkmoB77Vl5X8gevRJHP5sMeXDs';

export const DEFAULT_CONTENT: Content = {
  settings: {
    telefon: '+40 733 334 444',
    email: 'Renovatiosports@gmail.com',
    gaId: '',
    facebook: 'https://www.facebook.com/RenovatioSportClub/',
    tagline: 'Înot de la mici pitici la marea performanță.',
    descriereHero:
      'Cursuri de înot și grupe de performanță pentru copii, la Complex Olimpic Otopeni și Wellness Club by Greenfield.',
    despre: [
      'Renovatio Sport Club înseamnă dezvoltare, sănătate și o comunitate unită de aceeași pasiune pentru apă. Pornim de la primii pași ai celor mici și construim, pas cu pas, înotători siguri pe ei.',
      'Metoda noastră combină disciplina, tehnica corectă și bucuria de a înota. Fiecare copil este încadrat în grupa potrivită vârstei și nivelului, cu antrenori care urmăresc progresul real, nu doar prezența la antrenament.',
      'De la grupele de inițiere până la performanță, obiectivul este același: copii sănătoși, încrezători și ambițioși, în apă și în afara ei.',
    ],
    anunt: '',
  },
  locations: [
    {
      id: 'otopeni',
      name: 'Complex Olimpic Otopeni',
      address: 'Șoseaua de Centură 22, Otopeni, Ilfov',
      mapsUrl: 'https://share.google/8JTtdgPmQtGqVXykL',
      days: 'Luni – Vineri',
      hours: '16:00 – 20:00',
      status: 'Program confirmat',
      groups: 'Cursuri · Performanță',
      access: 'Parcare în incinta complexului. Punctul de întâlnire: intrarea principală a bazinului.',
      photo: 'pool-otopeni.webp',
    },
    {
      id: 'greenfield',
      name: 'Wellness Club by Greenfield',
      address: 'Complexul Greenfield, Băneasa, București',
      mapsUrl: 'https://share.google/Jaxb4JjrE6PQUE50k',
      days: 'În curs de actualizare',
      hours: 'Intervalul va fi comunicat',
      status: 'Program în curs de confirmare',
      groups: 'Cursuri',
      access: 'Detalii despre acces și parcare se comunică la înscriere.',
      photo: 'pool-greenfield.webp',
    },
  ],
  schedule: [
    { zi: 'Luni', grupa: 'Cursuri / Performanță', ora: '16:00 – 20:00', locatieId: 'otopeni' },
    { zi: 'Marți', grupa: 'Cursuri / Performanță', ora: '16:00 – 20:00', locatieId: 'otopeni' },
    { zi: 'Miercuri', grupa: 'Cursuri / Performanță', ora: '16:00 – 20:00', locatieId: 'otopeni' },
    { zi: 'Joi', grupa: 'Cursuri / Performanță', ora: '16:00 – 20:00', locatieId: 'otopeni' },
    { zi: 'Vineri', grupa: 'Cursuri / Performanță', ora: '16:00 – 20:00', locatieId: 'otopeni' },
  ],
  coaches: [
    { nume: 'Markus Stoltz', functie: 'Antrenor', bio: '', experienta: '', photo: '' },
    { nume: 'Yvonne Stoltz', functie: 'Antrenor', bio: '', experienta: '', photo: '' },
    { nume: 'Anisia Dumitru', functie: 'Antrenor', bio: '', experienta: '', photo: '' },
    { nume: 'Denissa Stanemir', functie: 'Antrenor', bio: '', experienta: '', photo: '' },
  ],
};

// ---------------------------------------------------------------------------
// Loader Google Sheets (endpoint gviz JSON, fără cheie API)
// ---------------------------------------------------------------------------

type Row = Record<string, string>;

function gvizUrl(tab: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(tab)}`;
}

async function fetchTab(tab: string): Promise<Row[]> {
  const res = await fetch(gvizUrl(tab), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`Sheet tab ${tab}: HTTP ${res.status}`);
  const text = await res.text();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error(`Sheet tab ${tab}: răspuns neașteptat`);
  const json = JSON.parse(text.slice(start, end + 1));
  if (json.status !== 'ok' || !json.table) throw new Error(`Sheet tab ${tab}: invalid data`);
  const cols: string[] = (json.table.cols as { label?: string }[]).map((c) => (c.label || '').trim());
  return (json.table.rows as { c: ({ v?: unknown; f?: string } | null)[] }[]).map((r) => {
    const row: Row = {};
    cols.forEach((key, i) => {
      if (!key) return;
      const cell = r.c[i];
      const val = cell ? (cell.f ?? cell.v) : '';
      row[key] = val == null ? '' : String(val);
    });
    return row;
  });
}

const clean = (s: string) => (s || '').trim();

function mergeSettings(rows: Row[]): Settings {
  const d = DEFAULT_CONTENT.settings;
  const map: Record<string, string> = {};
  rows.forEach((r) => {
    const k = clean(r.Cheie);
    if (k) map[k] = clean(r.Valoare);
  });
  const despre = [map.despre1, map.despre2, map.despre3].filter(Boolean);
  return {
    telefon: map.telefon || d.telefon,
    email: map.email || d.email,
    gaId: map.gaId ?? d.gaId,
    facebook: map.facebook || d.facebook,
    tagline: map.tagline || d.tagline,
    descriereHero: map.descriereHero || d.descriereHero,
    despre: despre.length ? despre : d.despre,
    anunt: map.anunt ?? d.anunt,
  };
}

function mergeLocations(rows: Row[]): Location[] {
  const items = rows
    .map((r) => ({
      id: clean(r.Id),
      name: clean(r.Nume),
      address: clean(r.Adresa),
      mapsUrl: clean(r.LinkMaps),
      days: clean(r.Zile),
      hours: clean(r.Ore),
      status: clean(r.Status),
      groups: clean(r.Grupe),
      access: clean(r.Acces),
      photo: clean(r.Poza),
    }))
    .filter((l) => l.id && l.name);
  return items.length ? items : DEFAULT_CONTENT.locations;
}

function mergeSchedule(rows: Row[]): ScheduleRow[] {
  const items = rows
    .map((r) => ({
      zi: clean(r.Zi),
      grupa: clean(r.Grupa),
      ora: clean(r.Ora),
      locatieId: clean(r.LocatieId),
    }))
    .filter((s) => s.zi && s.grupa);
  return items.length ? items : DEFAULT_CONTENT.schedule;
}

function mergeCoaches(rows: Row[]): Coach[] {
  const items = rows
    .map((r) => ({
      nume: clean(r.Nume),
      functie: clean(r.Functie) || 'Antrenor',
      bio: clean(r.Bio),
      experienta: clean(r.Experienta),
      photo: clean(r.Poza),
    }))
    .filter((c) => c.nume);
  return items.length ? items : DEFAULT_CONTENT.coaches;
}

export async function loadContent(fallback: Content = DEFAULT_CONTENT): Promise<Content> {
  if (!SHEET_ID) return DEFAULT_CONTENT;
  try {
    const [setari, locatii, program, echipa] = await Promise.all([
      fetchTab('Setari').catch(() => [] as Row[]),
      fetchTab('Locatii').catch(() => [] as Row[]),
      fetchTab('Program').catch(() => [] as Row[]),
      fetchTab('Echipa').catch(() => [] as Row[]),
    ]);
    return {
      settings: setari.length ? mergeSettings(setari) : fallback.settings,
      locations: locatii.length ? mergeLocations(locatii) : fallback.locations,
      schedule: program.length ? mergeSchedule(program) : fallback.schedule,
      coaches: echipa.length ? mergeCoaches(echipa) : fallback.coaches,
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

// ---------------------------------------------------------------------------
// Context React
// ---------------------------------------------------------------------------

declare global { interface Window { __RENOVATIO_CONTENT__?: Content; } }

export const ContentContext = createContext<Content>(DEFAULT_CONTENT);

export function useContent(): Content {
  return useContext(ContentContext);
}

export function useContentLoader(): { content: Content; fromSheet: boolean } {
  const [content, setContent] = useState<Content>(() => typeof window !== 'undefined' ? window.__RENOVATIO_CONTENT__ ?? DEFAULT_CONTENT : DEFAULT_CONTENT);
  const [fromSheet, setFromSheet] = useState(false);
  useEffect(() => {
    let alive = true;
    let lastContent = content;
    let refreshing = false;
    const refresh = async () => {
      if (refreshing) return;
      refreshing = true;
      const c = await loadContent(lastContent);
      refreshing = false;
      if (!alive) return;
      lastContent = c;
      if (!alive) return;
      const same = JSON.stringify(c) === JSON.stringify(DEFAULT_CONTENT);
      setContent(c);
      setFromSheet(!same);
    };
    refresh();
    const timer = window.setInterval(refresh, 60000);
    return () => {
      window.clearInterval(timer);
      alive = false;
    };
  }, []);
  return { content, fromSheet };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function phoneDigits(telefon: string): string {
  const d = (telefon || '').replace(/\D/g, '');
  return d.startsWith('40') ? d : `40${d.replace(/^0/, '')}`;
}

export function waLink(telefon: string, text?: string): string {
  const base = `https://wa.me/${phoneDigits(telefon)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function resolvePhoto(photo: string): string {
  const p = clean(photo);
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;
  return `/images/${p}`;
}
