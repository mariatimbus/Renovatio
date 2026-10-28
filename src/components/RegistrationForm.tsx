import { useState } from 'react';
import { useContent, waLink, phoneDigits } from '../content';
import { trackEvent } from '../analytics';
import { SvgIcon } from './ui';

const LEVELS = ['Nu am mai înotat', 'Începător', 'Mediu', 'Avansat'];
const GROUPS = [
  { value: 'cursuri', label: 'Cursuri' },
  { value: 'performanta', label: 'Performanță' },
];

export default function RegistrationForm() {
  const { settings, locations } = useContent();
  const [form, setForm] = useState({
    parent: '',
    child: '',
    age: '',
    level: '',
    group: 'cursuri',
    place: locations[0]?.id ?? '',
    time: '',
    tel: '',
    message: '',
  });
  const [notice, setNotice] = useState('');

  const pick = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.parent.trim() || !form.child.trim() || !form.tel.trim() || !form.age) {
      setNotice('Completează prenumele părintelui, prenumele și vârsta copilului și telefonul.');
      return;
    }
    if (!form.level) {
      setNotice('Alege nivelul de experiență în înot (cele 4 opțiuni de mai sus).');
      return;
    }
    const loc = locations.find((l) => l.id === form.place);
    const groupLabel = GROUPS.find((g) => g.value === form.group)?.label ?? 'De stabilit';
    const lines = [
      'Bună ziua! Aș dori informații despre înscrierea la Renovatio Sport Club.',
      `Părinte: ${form.parent.trim()}`,
      `Copil: ${form.child.trim()}`,
      `Vârstă: ${form.age}`,
      `Grupă: ${groupLabel}`,
      `Nivel: ${form.level}`,
      `Locație: ${loc?.name ?? 'De stabilit'}`,
      `Interval preferat: ${form.time.trim() || 'De stabilit'}`,
      `Telefon: ${form.tel.trim()}`,
      `Mesaj: ${form.message.trim() || '—'}`,
    ];
    trackEvent('inscriere_whatsapp', { locatie: loc?.id ?? '', grupa: form.group });
    setNotice('Se deschide WhatsApp cu solicitarea pregătită. Mesajul nu este trimis automat.');
    window.open(waLink(settings.telefon, lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="registration-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Prenume părinte *
          <input value={form.parent} placeholder="Ex: Maria" autoComplete="given-name" onChange={(e) => pick('parent', e.target.value)} />
        </label>
        <label>
          Prenume copil *
          <input value={form.child} placeholder="Ex: Andrei" onChange={(e) => pick('child', e.target.value)} />
        </label>
        <label>
          Vârsta copilului *
          <input value={form.age} placeholder="Ex: 7" inputMode="numeric" min={2} max={18} onChange={(e) => pick('age', e.target.value.replace(/\D/g, ''))} />
        </label>
        <label>
          Telefon *
          <input value={form.tel} placeholder="07XX XXX XXX" inputMode="tel" autoComplete="tel" onChange={(e) => pick('tel', e.target.value)} />
        </label>
        <label>
          Locație preferată
          <select value={form.place} onChange={(e) => pick('place', e.target.value)}>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Interval orar preferat
          <input value={form.time} placeholder="Ex: După 17:00" onChange={(e) => pick('time', e.target.value)} />
        </label>

        <fieldset className="chip-field">
          <legend>Grupă</legend>
          <div className="chips">
            {GROUPS.map((g) => (
              <button key={g.value} type="button" className={'chip' + (form.group === g.value ? ' picked' : '')} onClick={() => pick('group', g.value)}>
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="chip-field">
          <legend>Experiență în înot *</legend>
          <div className="chips">
            {LEVELS.map((l) => (
              <button key={l} type="button" className={'chip' + (form.level === l ? ' picked' : '')} onClick={() => pick('level', l)}>
                {l}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="wide">
          Mesaj (opțional)
          <textarea rows={3} value={form.message} placeholder="Detalii despre program, nivel, întrebări..." onChange={(e) => pick('message', e.target.value)} />
        </label>
      </div>

      <button className="pill primary submit-btn" type="submit">
        Pregătește solicitarea <SvgIcon name="arrow" size={18} />
      </button>
      <p className="form-note">Solicitarea se deschide în WhatsApp cu mesajul completat. Nu este trimisă automat.</p>
      {notice && (
        <p className="form-alert" role="status">
          {notice}
        </p>
      )}
    </form>
  );
}

export function ContactMethods() {
  const { settings } = useContent();
  return (
    <div className="contact-methods">
      <a href={'tel:+' + phoneDigits(settings.telefon)} onClick={() => trackEvent('telefon_click', { locatie: 'metode_contact' })}>
        <SvgIcon name="phone" size={29} />
        <strong>{settings.telefon}</strong>
        <small>Sună-ne</small>
      </a>
      <a
        href={waLink(settings.telefon, 'Bună ziua! Aș dori informații despre înscrierea la Renovatio Sport Club.')}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent('whatsapp_click', { locatie: 'metode_contact' })}
      >
        <SvgIcon name="wave" size={29} />
        <strong>WhatsApp</strong>
        <small>Contact rapid</small>
      </a>
      <a href={'mailto:' + settings.email}>
        <SvgIcon name="mail" size={29} />
        <strong>{settings.email}</strong>
        <small>Email</small>
      </a>
    </div>
  );
}
