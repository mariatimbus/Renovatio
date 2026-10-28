# Administrare Renovatio Sport Club

## Conectare inițială — o singură dată

Fișierul conectat este https://docs.google.com/spreadsheets/d/1urbChSsoJjeQSM2refkmoB77Vl5X8gevRJHP5sMeXDs/edit

1. Descarcă șablonul de la https://renovatio-sport-club.vercel.app/administrare-renovatio.xlsx
2. Deschide fișierul Google Sheets de mai sus. Alege **Fișier → Importă → Încarcă** și selectează șablonul.
3. Alege **Inserează foi noi**. Fișierul este momentan gol. Cele patru file trebuie să se numească exact **Setari**, **Locatii**, **Program**, **Echipa**. Dacă există deja file cu aceste nume, verifică datele și evită duplicatele.
4. Păstrează accesul general **Oricine are linkul → Vizualizator**. Numai persoanele invitate explicit ca **Editor** pot modifica datele.
5. Deschide site-ul și verifică programul. Nu trebuie republicat site-ul.

## Schimbarea programului — fără programator

Deschide fila **Program**. Fiecare rând este un antrenament:

| Zi | Grupa | Ora | LocatieId |
| --- | --- | --- | --- |
| Luni | Începători | 17:00 – 18:00 | otopeni |

- Modifică ziua, grupa sau intervalul orar direct în celulă.
- Pentru o grupă nouă, adaugă un rând. Pentru a elimina un antrenament, șterge rândul lui.
- La `LocatieId` folosește exact `otopeni` sau `greenfield`, corespunzător coloanei `Id` din **Locatii**.
- Păstrează primul rând și numele coloanelor exact ca în șablon. Completează toate cele patru coloane.
- În **Locatii**, actualizează și rezumatul `Zile`, `Ore`, `Status` când se schimbă intervalul general. Acesta este afișat în cardurile de pe prima pagină. Programul detaliat este în **Program**.
- Folosește aplicația Google Sheets de pe telefon sau browserul de pe calculator.

Site-ul verifică datele la deschidere și apoi la fiecare 60 de secunde. Google poate păstra temporar răspunsurile în cache, deci modificările pot apărea cu întârziere. Poți reîncărca pagina pentru o verificare imediată. Nu este necesară o nouă publicare pe Vercel.

Dacă foaia nu este accesibilă, site-ul păstrează ultimele date încărcate în pagina curentă. La o vizită nouă pornește cu datele incluse la ultima publicare. O filă goală sau fără rânduri valide folosește datele de rezervă; pentru anulări complete folosește și `anunt` din Setari și contactează administratorul tehnic pentru golirea programului de rezervă.

## Alte modificări

- **Setari**: telefon, email, facebook, tagline, descriereHero, despre1–3, anunt. `gaId` rămâne gol până când măsurarea traficului este configurată.
- **Locatii**: adresele exacte, hărțile, rezumatul programului, statutul și informațiile de acces. Confirmă aceste date cu clubul.
- **Echipa**: Nume, Functie, Bio, Experienta, Poza. Pozele pot fi nume de fișiere deja existente în `/images/` sau linkuri HTTPS directe către imagini.

Acest fișier este o sursă publică de conținut pentru site. Nu introduce liste de copii, telefoane ale părinților sau alte informații private.

## SEO și program

Vizitatorii și Google pot citi programul actualizat prin JavaScript. Fiecare publicare include și o copie HTML a datelor pentru acces fără JavaScript. Copia HTML se actualizează la o nouă publicare; modificarea unei celule nu declanșează automat un deploy. Google își actualizează rezultatele în ritmul propriu.
