import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, META, canonical, structuredData, SITE_URL, getContent } from '../.prerender/prerender.js';
const template=await readFile('dist/index.html','utf8');
const content=await getContent();
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const safeJson=value=>JSON.stringify(value).replace(/</g,'\\u003c');
for (const [path,meta] of Object.entries(META)) {
 let html=template.replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(meta.title)}</title>`);
 html=html.replace(/<meta\s+name="description"[\s\S]*?\/>/,`<meta name="description" content="${escape(meta.desc)}" />`);
 html=html.replace(/<meta\s+(?:property|name)="(?:og:(?:title|description|url)|twitter:(?:title|description))"[\s\S]*?\/>/g,'');
 html=html.replace(/<link rel="canonical"[^>]*>/g,'');
 html=html.replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/,'');
 const head=`<link rel="canonical" href="${canonical(path)}" />
<meta property="og:title" content="${escape(meta.title)}" />
<meta property="og:description" content="${escape(meta.desc)}" />
<meta property="og:url" content="${canonical(path)}" />
<meta name="twitter:title" content="${escape(meta.title)}" />
<meta name="twitter:description" content="${escape(meta.desc)}" />
<script type="application/ld+json" id="structured-data">${safeJson(structuredData(path,content))}</script>`;
 html=html.replace('</head>',head+'\n</head>').replace('<div id="root"></div>',`<div id="root">${render(path,content)}</div>
<script>window.__RENOVATIO_CONTENT__=${safeJson(content)}</script>`);
 const dir=path==='/'?'dist':`dist${path}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,html);
 console.log(`Prerendered ${path}`);
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(META).map(path=>`<url><loc>${canonical(path)}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`);
