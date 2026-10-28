import type { Content } from './content';
export const SITE_URL = 'https://renovatio-sport-club.vercel.app';
export const META: Record<string, { title: string; desc: string; label: string }> = {
 '/': {title:'Cursuri de înot copii Otopeni și Greenfield | Renovatio Sport Club',desc:'Cursuri de înot pentru copii și grupe de performanță la Complex Olimpic Otopeni și Wellness Club by Greenfield. Descoperă programul și înscrie-ți copilul.',label:'Acasă'},
 '/locatii': {title:'Locații cursuri înot: Otopeni și Greenfield | Renovatio',desc:'Descoperă bazinele unde se antrenează Renovatio Sport Club: Complex Olimpic Otopeni și Wellness Club by Greenfield, Băneasa. Adrese, acces și program.',label:'Locații'},
 '/program': {title:'Program cursuri de înot pentru copii | Renovatio Sport Club',desc:'Vezi zilele, orele și grupele de înot Renovatio Sport Club. Filtrează programul după locație și contactează clubul pentru disponibilitate și înscriere.',label:'Program'},
 '/echipa': {title:'Antrenori de înot pentru copii | Renovatio Sport Club',desc:'Cunoaște echipa de antrenori Renovatio Sport Club și află cine îi îndrumă pe copii de la primele lecții de înot la grupele de performanță.',label:'Echipa'},
 '/contact': {title:'Contact și înscrieri cursuri de înot | Renovatio Sport Club',desc:'Înscrie-ți copilul la înot cu Renovatio Sport Club, în Otopeni sau Greenfield. Contactează-ne prin telefon, WhatsApp sau formularul de înscriere.',label:'Contact'},
};
export function canonical(path: string) { return SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, '')); }
export function structuredData(path: string, content: Content) {
 const clubId = SITE_URL + '/#club';
 const meta = META[path] ?? META['/'];
 const pageId = canonical(path);
 return {'@context':'https://schema.org','@graph':[
  {'@type':'SportsOrganization','@id':clubId,name:'Renovatio Sport Club',url:SITE_URL+'/',sport:'Swimming',logo:SITE_URL+'/images/logo.png',image:SITE_URL+'/images/hero-swimmer.webp',telephone:content.settings.telefon,email:content.settings.email,...(content.settings.facebook ? {sameAs:[content.settings.facebook]} : {}),location:content.locations.map(l=>({'@type':'Place',name:l.name,address:l.address,hasMap:l.mapsUrl}))},
  {'@type':'WebSite','@id':SITE_URL+'/#website',url:SITE_URL+'/',name:'Renovatio Sport Club',inLanguage:'ro-RO',publisher:{'@id':clubId}},
  {'@type':path==='/contact'?'ContactPage':path==='/echipa'?'AboutPage':'WebPage','@id':pageId,url:pageId,name:meta.title,description:meta.desc,inLanguage:'ro-RO',isPartOf:{'@id':SITE_URL+'/#website'},about:{'@id':clubId},...(path!=='/'?{breadcrumb:{'@id':pageId+'#breadcrumb'}}:{})},
  ...(path!=='/'?[{'@type':'BreadcrumbList','@id':pageId+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Acasă',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:meta.label,item:pageId}]}]:[])
 ]};
}
export function updateSeo(path: string, content: Content) {
 const meta=META[path]??META['/'];
 document.title=meta.title;
 const set=(selector:string,value:string)=>document.querySelector(selector)?.setAttribute('content',value);
 set('meta[name="description"]',meta.desc);
 for(const prefix of ['og','twitter']) {set(`meta[property="${prefix}:title"],meta[name="${prefix}:title"]`,meta.title);set(`meta[property="${prefix}:description"],meta[name="${prefix}:description"]`,meta.desc);}
 set('meta[property="og:url"]',canonical(path));
 document.querySelector('link[rel="canonical"]')?.setAttribute('href',canonical(path));
 const ld=document.querySelector('#structured-data');if(ld)ld.textContent=JSON.stringify(structuredData(path,content));
}
