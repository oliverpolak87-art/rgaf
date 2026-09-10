const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ensure = p => fs.mkdirSync(p,{recursive:true});
const copyDir = (src,dst) => { ensure(dst); for(const e of fs.readdirSync(src,{withFileTypes:true})){ const a=path.join(src,e.name), b=path.join(dst,e.name); e.isDirectory()?copyDir(a,b):fs.copyFileSync(a,b); }};

fs.rmSync(dist,{recursive:true,force:true}); ensure(dist);
copyDir(path.join(root,'public'),dist);
const site = JSON.parse(fs.readFileSync(path.join(root,'content/site.json'),'utf8'));
const projDir = path.join(root,'content/projects');
let projects = fs.readdirSync(projDir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(projDir,f),'utf8')));
projects.sort((a,b)=>(b.year||'').localeCompare(a.year||'') || (a.title||'').localeCompare(b.title||''));

const img = (src,alt,cls='') => src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : '';
const cards = projects.map((p,i)=>`<a class="project-card ${p.featured?'featured':''}" href="/projects/${esc(p.slug)}/"><div class="project-cover">${p.cover?img(p.cover,p.title):'<div class="empty">NAHRAJ NÁHLEDOVOU FOTKU V CMS</div>'}</div><div class="project-meta"><h3>${esc(p.title)}</h3><span>${esc(p.category||'')} · ${esc(p.year||'')}</span></div></a>`).join('\n');
const heroMedia = site.heroImage ? `<img src="${esc(site.heroImage)}" alt="${esc(site.name)}">` : '<div class="placeholder">NAHRAJ HLAVNÍ FOTKU V CMS</div>';
const heroTitle = esc(site.heroTitle).replace(/\.\s+/g,'.<br>');
const index = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(site.name)} — ${esc(site.role)}</title><meta name="description" content="${esc(site.heroText)}"><link rel="stylesheet" href="/assets/styles.css"></head><body><header class="site-header"><a class="brand" href="/">${esc(site.name).toUpperCase()}</a><nav class="nav"><a href="#work">Portfolio</a><a href="#about">About</a><a href="#contact">Contact</a></nav></header><main><section class="hero">${heroMedia}<div class="hero-content"><p class="eyebrow">${esc(site.role)}</p><h1>${heroTitle}</h1><div class="hero-bottom"><p>${esc(site.heroText)}</p><a href="#work">View selected work ↓</a></div></div></section><section id="work" class="section"><div class="section-head"><div><p class="eyebrow">Selected work</p><h2>Racing stories</h2></div><p class="section-intro">Vybrané série ze závodů. Každý projekt má vlastní galerii.</p></div><div class="project-grid">${cards}</div></section><section class="statement"><p>Cars move fast.<br>I try to make the moment stay.</p></section><section id="about" class="section about"><div><p class="eyebrow">About</p></div><div class="about-copy"><h2>${esc(site.aboutTitle)}</h2><p>${esc(site.aboutText)}</p></div></section><section id="contact" class="section contact"><p class="eyebrow">Contact</p><h2>Let's shoot.</h2><div class="contact-links"><a href="mailto:${esc(site.email)}">${esc(site.email)}</a><a href="${esc(site.instagram)}" target="_blank" rel="noopener">Instagram ↗</a></div></section></main><footer class="footer"><span>${esc(site.footer)}</span><span>${esc(site.role)}</span></footer><script src="/assets/script.js"></script></body></html>`;
fs.writeFileSync(path.join(dist,'index.html'),index);

for(const p of projects){
  const d = path.join(dist,'projects',p.slug); ensure(d);
  const gallery = Array.isArray(p.gallery)&&p.gallery.length ? p.gallery.map((g,i)=>`<figure><img src="${esc(g)}" alt="${esc(p.title)} — ${i+1}" loading="lazy"></figure>`).join('') : '<div class="empty-gallery">Do této galerie zatím nejsou nahrané fotky.</div>';
  const page = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)} — ${esc(site.name)}</title><meta name="description" content="${esc(p.description)}"><link rel="stylesheet" href="/assets/styles.css"></head><body><main class="project-page"><a class="back" href="/">← Portfolio</a><p class="eyebrow">${esc(p.category||'Project')} / ${esc(p.year||'')}</p><h1 class="project-title">${esc(p.title)}</h1><p class="project-sub">${esc(p.description||'')}</p><div class="gallery">${gallery}</div></main></body></html>`;
  fs.writeFileSync(path.join(d,'index.html'),page);
}
console.log(`Built ${projects.length} projects into dist/`);
