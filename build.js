const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ensure = p => fs.mkdirSync(p,{recursive:true});
const copyDir = (src,dst) => { ensure(dst); for(const e of fs.readdirSync(src,{withFileTypes:true})){ const a=path.join(src,e.name), b=path.join(dst,e.name); e.isDirectory()?copyDir(a,b):fs.copyFileSync(a,b); }};

fs.rmSync(dist,{recursive:true,force:true}); ensure(dist);

// Public assets are optional during build. If the folder exists, copy it.
// If GitHub/Cloudflare does not contain it, generate the required CSS/JS here
// so the build still succeeds.
const publicDir = path.join(root,'public');
if (fs.existsSync(publicDir)) {
  copyDir(publicDir, dist);
}

const assetsDir = path.join(dist,'assets');
ensure(assetsDir);

const fallbackStyles = "*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#090909;color:#f5f5f2;font-family:Arial,Helvetica,sans-serif}.site-header{position:fixed;z-index:20;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:24px 32px;mix-blend-mode:difference}.brand,.nav a{color:#fff;text-decoration:none}.brand{font-weight:700;letter-spacing:.08em}.nav{display:flex;gap:24px;font-size:13px}.hero{position:relative;min-height:100svh;display:flex;align-items:flex-end;background:#111}.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.hero:after{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.78))}.placeholder{position:absolute;inset:0;display:grid;place-items:center;color:#555;font-size:12px;letter-spacing:.1em}.hero-content{position:relative;z-index:2;padding:120px 32px 34px;width:100%}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:11px;font-weight:700;color:#aaa;margin:0 0 18px}.hero h1{white-space:pre-line;font-size:clamp(62px,10vw,150px);line-height:.83;letter-spacing:-.07em;margin:0;max-width:1050px}.hero-bottom{display:flex;justify-content:space-between;align-items:end;gap:40px;margin-top:50px}.hero-bottom p{max-width:460px;color:#ccc;line-height:1.6;margin:0}.hero-bottom a{color:white;text-decoration:none;border-bottom:1px solid #777;padding-bottom:4px}.section{padding:120px 32px}.section-head{display:flex;justify-content:space-between;align-items:end;gap:40px;margin-bottom:52px}.section h2{font-size:clamp(42px,6vw,78px);letter-spacing:-.055em;margin:0}.section-intro{max-width:430px;color:#8b8b8b;line-height:1.6}.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:54px 24px}.project-card{color:inherit;text-decoration:none;display:block}.project-card.featured{grid-column:1/-1}.project-cover{position:relative;aspect-ratio:4/3;background:#141414;overflow:hidden}.project-card.featured .project-cover{aspect-ratio:16/8}.project-cover img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.project-card:hover img{transform:scale(1.015)}.project-cover .empty{position:absolute;inset:0;display:grid;place-items:center;color:#555;font-size:12px}.project-meta{display:flex;justify-content:space-between;gap:20px;margin-top:14px}.project-meta h3{font-size:17px;margin:0}.project-meta span{color:#777;font-size:13px}.statement{padding:160px 32px;border-top:1px solid #222;border-bottom:1px solid #222}.statement p{font-size:clamp(45px,8vw,115px);line-height:.92;letter-spacing:-.065em;margin:0}.about{display:grid;grid-template-columns:1fr 2fr;gap:50px}.about-copy{max-width:850px}.about-copy p{max-width:650px;color:#aaa;font-size:20px;line-height:1.7}.contact{min-height:65vh;display:flex;flex-direction:column;justify-content:center}.contact h2{font-size:clamp(72px,13vw,175px)}.contact-links{display:flex;gap:34px;flex-wrap:wrap;margin-top:34px}.contact-links a{color:#fff;text-decoration:none;font-size:18px;border-bottom:1px solid #444;padding-bottom:5px}.footer{display:flex;justify-content:space-between;padding:28px 32px 42px;color:#666;font-size:12px}.project-page{padding:130px 32px 80px}.back{color:#fff;text-decoration:none;display:inline-block;margin-bottom:55px}.project-title{font-size:clamp(60px,10vw,140px);letter-spacing:-.065em;line-height:.9;margin:0}.project-sub{color:#888;margin:22px 0 70px}.gallery{columns:2;column-gap:18px}.gallery figure{break-inside:avoid;margin:0 0 18px;background:#141414}.gallery img{display:block;width:100%;height:auto}.empty-gallery{border:1px solid #222;padding:60px;text-align:center;color:#666}.admin-note{position:fixed;right:18px;bottom:18px;background:#fff;color:#111;border-radius:999px;padding:10px 14px;text-decoration:none;font-size:12px;font-weight:700;z-index:30;box-shadow:0 4px 30px rgba(0,0,0,.2)}\n@media(max-width:760px){.site-header{padding:19px}.nav{gap:13px}.nav a:nth-child(2){display:none}.hero-content{padding:100px 20px 24px}.hero h1{font-size:clamp(58px,20vw,100px)}.hero-bottom{display:block}.hero-bottom a{display:inline-block;margin-top:25px}.section{padding:80px 20px}.section-head{display:block}.section-intro{margin-top:22px}.project-grid{grid-template-columns:1fr}.project-card.featured{grid-column:auto}.project-cover,.project-card.featured .project-cover{aspect-ratio:4/5}.statement{padding:95px 20px}.about{grid-template-columns:1fr}.about-copy p{font-size:17px}.footer{padding:20px;flex-direction:column;gap:10px}.project-page{padding:100px 20px 50px}.gallery{columns:1}}\n";
const fallbackScript = "document.querySelectorAll('a[href^=\"#\"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));\n";

const stylesPath = path.join(assetsDir,'styles.css');
const scriptPath = path.join(assetsDir,'script.js');

if (!fs.existsSync(stylesPath)) fs.writeFileSync(stylesPath, fallbackStyles, 'utf8');
if (!fs.existsSync(scriptPath)) fs.writeFileSync(scriptPath, fallbackScript, 'utf8');

// Always make an uploads directory in the generated site.
ensure(path.join(dist,'uploads'));

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
