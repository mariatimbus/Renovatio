import { useContent, waLink } from '../content';
import { trackEvent } from '../analytics';
import { SvgIcon } from './ui';

export default function WhatsAppFab() {
  const { settings } = useContent();
  return (
    <a
      href={waLink(settings.telefon, 'Bună ziua! Aș dori informații despre înscrierea la Renovatio Sport Club.')}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      aria-label="Scrie-ne pe WhatsApp"
      onClick={() => trackEvent('whatsapp_click', { locatie: 'buton_flotant' })}
    >
      <SvgIcon name="wave" size={19} /> WhatsApp
    </a>
  );
}
