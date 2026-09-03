# Hossein Padash — Portfolio (GitHub Pages + Cloudflare ready)

Static single-page site. No build step. Just push to GitHub.

## 1) Push to GitHub
1. Create a new repo, e.g. `hossein-portfolio`
2. Upload these files to the repo root: `index.html`, `styles.css`, `script.js`, `.nojekyll`, `CNAME` (after edit)
3. Go to repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save
4. Wait ~1 min. Your temp URL: `https://USERNAME.github.io/hossein-portfolio/`

> Paths are relative (`./styles.css`) so it works both on `username.github.io` and `username.github.io/repo-name/` and on your custom domain.

## 2) Connect Cloudflare to your domain
You have 2 clean options. Recommended: **Option A (CNAME)**.

### Option A — keep GitHub Pages, point domain via Cloudflare (recommended)
1. In Cloudflare → your domain → **DNS → Records**:
   - `CNAME | @ (or www) | USERNAME.github.io | Proxied (orange cloud ON)`
   - If using apex (`example.com`), Cloudflare CNAME flattening handles it. Alternatively add:
     - `A | @ | 185.199.108.153` ( + .109, .110, .111 ) — GitHub Pages IPs, Proxied ON
2. In this folder, edit file `CNAME` — put only your domain, e.g.:
   ```
   www.hosseinpadash.ir
   ```
   Commit + push.
3. Repo → **Settings → Pages → Custom domain** → enter your domain → Save. Wait for **DNS check successful**.
4. Cloudflare → **SSL/TLS → Overview → Full (strict)**. Then **Edge Certificates → Always Use HTTPS: ON**.
5. Done. URL: `https://yourdomain.com`

### Option B — Cloudflare Pages (alternative)
1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git** → select repo
2. Build settings: Framework: `None`, Build command: empty, Output dir: `/`
3. Add custom domain under Pages → Custom domains. Cloudflare sets DNS automatically.

## 3) Edit content
- Texts: `index.html` — every text has `data-en` / `data-fa` for bilingual toggle. Edit both.
- Video links: find `<a class="card" href="#">` in `index.html`, replace `#` with YouTube/Vimeo/Aparat URL.
- Thumbnails: replace `.card-thumb` divs with `<img src="./images/xxx.jpg">` (create `images/` folder, use relative paths).
- Domain: `CNAME` file — one line, no `https://`.

## Files
- `index.html` — all content
- `styles.css` — cinematic dark theme, responsive + RTL
- `script.js` — language toggle (EN/FA), mobile menu, reveal animation
- `.nojekyll` — tells GitHub Pages to serve files as-is
- `CNAME` — your custom domain (edit me)

## Notes / limits (important for GitHub Pages)
- ✅ Static HTML/CSS/JS only — no PHP, no Node backend, no database. Contact links use `mailto:` (no server form).
- ✅ HTTPS free via Cloudflare (or GitHub's `Enforce HTTPS`).
- If you later want a contact form with sending: use Formspree / Web3Forms (external service, still static-compatible).
