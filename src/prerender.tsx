import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ContentContext, loadContent, DEFAULT_CONTENT } from './content';
import { SiteContent } from './App';
export { META, canonical, structuredData, SITE_URL } from './seo';
export { DEFAULT_CONTENT };
export const getContent = loadContent;
export function render(path: string, content = DEFAULT_CONTENT) {
 return renderToString(<ContentContext.Provider value={content}><StaticRouter location={path}><SiteContent /></StaticRouter></ContentContext.Provider>);
}
