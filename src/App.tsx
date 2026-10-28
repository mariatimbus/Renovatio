import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ContentContext, useContentLoader, useContent } from './content';
import { initGA, trackEvent } from './analytics';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import Contact from './pages/Contact';
import { updateSeo } from './seo';

function PageEffects({ anunt }: { anunt: string }) {
  const { pathname } = useLocation();
  const content = useContent();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent('page_view', { page_path: pathname });
  }, [pathname]);
  useEffect(() => { updateSeo(pathname, content); }, [pathname, content]);
  return anunt ? (
    <div className="announce" role="status">
      {anunt}
    </div>
  ) : null;
}

export default function App() {
  const { content } = useContentLoader();

  useEffect(() => {
    initGA(content.settings.gaId);
  }, [content.settings.gaId]);

  return (
    <ContentContext.Provider value={content}>
      <BrowserRouter>
        <SiteContent />
      </BrowserRouter>
    </ContentContext.Provider>
  );
}

export function SiteContent() {
  const content = useContent();
  return <>
        <PageEffects anunt={content.settings.anunt} />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locatii" element={<Locations />} />
            <Route path="/program" element={<Schedule />} />
            <Route path="/echipa" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFab />
  </>;
}
