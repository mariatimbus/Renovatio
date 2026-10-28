# SEO — Renovatio Sport Club

## Configurat în site

- HTML generat pentru toate cele cinci pagini, cu text și linkuri accesibile fără JavaScript.
- Titlu și descriere distincte pentru fiecare pagină, adresă canonical și metadate Open Graph/Twitter.
- Date structurate SportsOrganization, WebSite, WebPage și BreadcrumbList, bazate pe conținutul public. Nu sunt inventate recenzii, ratinguri sau adrese.
- Sitemap și robots.txt cu adresa https://renovatio-sport-club.vercel.app.
- Paginile inexistente răspund cu 404; nu sunt duplicate ale paginii principale.
- Layout verificat pe mobil.

## Pași necesari în conturile clubului

1. În https://search.google.com/search-console adaugă o proprietate de tip **Prefix URL** pentru `https://renovatio-sport-club.vercel.app/`. Alege verificarea prin etichetă HTML și trimite dezvoltatorului valoarea `content` din eticheta `google-site-verification`. Nu trimite parola contului.
2. După publicarea etichetei și verificarea proprietății, trimite `sitemap.xml` în secțiunea **Sitemaps**. În **Inspectare URL**, verifică pagina principală, locațiile și programul și cere indexarea. Asta nu garantează indexarea sau poziția.
3. Revendică/verifică profilul Google Business al clubului. Completează numele real, categoria potrivită, telefonul, adresa eligibilă, website-ul și programul. Nu crea profiluri pentru bazine care nu reprezintă locații eligibile ale clubului.
4. Confirmă adresele și datele de contact din site și Google Business; folosește aceleași informații peste tot.
5. Adaugă fotografii reale și cere recenzii sincere părinților. Fără recenzii cumpărate sau recompense. Publică linkul site-ului pe pagina oficială Facebook și cere partenerilor relevanți să îl includă unde este util.
6. Dacă există un domeniu propriu, conectează-l în Vercel, apoi actualizează `SITE_URL` din `src/seo.ts`, metadatele de imagine din `index.html` și referințele publice. Redirecționează permanent vechea adresă spre cea finală și verifică proprietatea în Search Console.
7. Urmărește indexarea, erorile și căutările reale din Search Console după publicare; îmbunătățește conținutul pentru întrebările părinților, fără promisiuni sau prețuri inventate.

Google stabilește poziția în funcție de relevanță, distanță și notorietate, printre alți factori. Nu se poate garanta primul loc sau un termen fix pentru apariția în rezultate.

Surse oficiale:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://support.google.com/business/answer/7091
