/* Smoke test: randează fiecare pagină server-side și raportează erorile. */
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { ContentContext, DEFAULT_CONTENT } from '../src/content';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppFab from '../src/components/WhatsAppFab';
import Home from '../src/pages/Home';
import Locations from '../src/pages/Locations';
import Schedule from '../src/pages/Schedule';
import Team from '../src/pages/Team';
import Contact from '../src/pages/Contact';

const routes: [string, () => JSX.Element][] = [
  ['/', Home],
  ['/locatii', Locations],
  ['/program', Schedule],
  ['/echipa', Team],
  ['/contact', Contact],
];

let failed = 0;
for (const [path, Page] of routes) {
  try {
    const html = renderToString(
      <ContentContext.Provider value={DEFAULT_CONTENT}>
        <MemoryRouter initialEntries={[path]}>
          <Header />
          <main>
            <Page />
          </main>
          <Footer />
          <WhatsAppFab />
        </MemoryRouter>
      </ContentContext.Provider>,
    );
    const size = html.length;
    if (size < 800) throw new Error('HTML suspect de mic: ' + size + ' caractere');
    console.log('OK  ', path, '(' + size + ' chars)');
  } catch (e) {
    failed++;
    console.error('FAIL', path, e);
  }
}
if (failed) {
  console.error(failed + ' pagini cu erori');
  process.exit(1);
}
console.log('Toate paginile randeaza corect.');
