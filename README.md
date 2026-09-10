# Foto portfolio — Cloudflare Pages + Pages CMS

Tahle verze už má administraci bez editace HTML.

## Jak to funguje
- GitHub = uložené soubory webu a fotky
- Pages CMS = administrační rozhraní
- Cloudflare Pages = hosting a automatické publikování

## 1. Nahraj projekt na GitHub
Vytvoř nový repository a nahraj do něj celý obsah této složky.

## 2. Připoj GitHub k Cloudflare Pages
V Cloudflare: Workers & Pages → Create → Pages → Connect to Git.

Nastavení buildu:
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: nechat prázdné

Potom přidej svou doménu v Custom domains.

## 3. Zapni administraci
Otevři https://app.pagescms.org
- Přihlas se přes GitHub
- Nainstaluj Pages CMS GitHub App pro repository s webem
- Vyber repository
- Pages CMS automaticky načte `.pages.yml`

V administraci uvidíš:
- `Nastavení webu` — jméno, hero, About, e-mail, Instagram
- `Galerie / projekty` — vytváření, úprava a mazání galerií
- správce médií — nahrávání fotek

## Jak přidáš nový závod
1. Galerie / projekty
2. New entry
3. Název například `GT Cup Most`
4. Adresa `gt-cup-most-2026`
5. Vyber rok a kategorii
6. Nahraj náhledovou fotku
7. Do `Fotky v galerii` nahraj všechny fotografie
8. Save

Pages CMS uloží změnu do GitHubu. Cloudflare Pages změnu zachytí a automaticky znovu sestaví web.

## Lokální test
Pokud máš Node.js:
```
npm run build
```
Pak otevři `dist/index.html` přes lokální webserver.

## Poznámka k fotkám
Fotografie se ukládají do `public/uploads`. Pro velké galerie doporučuji exportovat fotografie do WebP/JPEG v rozumném rozlišení, protože GitHub repository není ideální jako úložiště tisíců originálních RAW/JPEG souborů.
