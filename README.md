# Renovatio Sport Club — Site web

Site multi-pagină (React 18 + TypeScript + Vite), mobile-first, pentru clubul de înot Renovatio Sport Club.
Conținutul (locații, program, echipă, texte, contact) se editează din **Google Sheets**, fără developer — vezi `ADMINISTRARE.md`.

## Pagini

| Rută | Pagina |
|---|---|
| `/` | Acasă: hero, carduri informații rapide (Locație / Program / Contact), Despre, Locații + Program, Echipă, formular de înscriere |
| `/locatii` | Locații: bazin, adresă, hartă (Google Maps + Waze), program, grupe, acces |
| `/program` | Program complet: zi, grupă, oră, locație + filtru pe locație |
| `/echipa` | Echipa de antrenori |
| `/contact` | Contact: telefon / WhatsApp / email, formular de înscriere, locații |

## Development

Necesită Node.js 18+:

```bash
npm install
npm run dev        # development
npm run build      # build de producție în dist/
npm run preview    # previzualizează build-ul
```

## Conținut și CMS

- `src/content.ts` — conținutul implicit + constanta `SHEET_ID` + loaderul Google Sheets (taburi: `Setari`, `Locatii`, `Program`, `Echipa`). Site-ul funcționează și fără fișier, cu conținutul încorporat.
- `ADMINISTRARE.md` — ghidul complet pentru club (creare fișier, coloane, publicare, conectare).

## Imagini

- Logo-ul și pozele celor două locații sunt cele reale ale clubului (`logo.png`, `pool-otopeni.webp`, `pool-greenfield.webp`), sursele fiind în `assets-surse/`.
- Restul fotografiilor sunt stock high-resolution de pe Pexels (licență gratuită). Imaginile nefolosite și mockup-urile originale sunt în `image-backup-originals/`.
- Portretele antrenorilor sunt placeholder-e cu inițiale până la ședința foto.

## Publicare (Netlify)

- `public/_redirects` — fallback SPA pentru rutele curate.
- `netlify.toml` — build, publish `dist/` și headere de cache.
- Înainte de lansare: înlocuiește domeniul din `sitemap.xml`, `robots.txt`, `index.html` (og:url, og:image, JSON-LD) cu domeniul real.

## Note

- Formularul de înscriere deschide WhatsApp cu mesajul completat; nu trimite date către un server.
- Google Analytics 4 se activează punând ID-ul (`G-...`) în fișierul Google Sheets (Setari → `gaId`).
- Program confirmat: Complex Olimpic Otopeni, Luni–Vineri 16:00–20:00. Greenfield: în curs de confirmare.
- Adresele din conținut trebuie confirmate de club (se editează din Google Sheets).
