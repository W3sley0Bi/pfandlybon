# pfandlybon.com

Marketing, support, privacy, and share-claim static site for the **Pfandly** app.  
Hosted on GitHub Pages at [pfandlybon.com](https://pfandlybon.com).

---

## What's in the box

| Path | Purpose |
|---|---|
| `index.html` | Landing / marketing homepage |
| `support.html` | Support page (language redirect) |
| `support-en.html` | Support page — English |
| `support-de.html` | Support page — German |
| `privacy.html` | Privacy policy |
| `404.html` | Branded 404 (served automatically by GitHub Pages) |
| `i/index.html` | **Share/claim page** — decodes a Pfand bon from the URL fragment and renders the barcode so the recipient can redeem it without the app |
| `sitemap.xml` | XML sitemap for search engines |
| `robots.txt` | Crawler rules (disallows `/i`) |
| `CNAME` | Custom domain for GitHub Pages |
| `.well-known/apple-app-site-association` | iOS universal link verification |
| `.well-known/assetlinks.json` | Android App Links verification |
| `.nojekyll` | Prevents Jekyll processing so `.well-known/` is served |
| `assets/css/styles.css` | Shared stylesheet (design contract — all pages link only this) |
| `assets/img/` | Icons, screenshots |

---

## Run locally

```bash
cd /path/to/pfandlybon
python3 -m http.server 8000
# then open http://localhost:8000
```

The share/claim page is at `http://localhost:8000/i#<base64url-payload>`.

---

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `pfandlybon`).
2. Go to **Settings → Pages → Source** and set "Deploy from a branch", branch `main`, folder `/` (root).
3. The `CNAME` file handles the custom domain `pfandlybon.com`. Add a DNS `CNAME` record pointing `pfandlybon.com` → `<your-github-user>.github.io`.
4. GitHub Pages will automatically serve `404.html` for unknown paths.

**Important:** The `.nojekyll` file at the root is required so that GitHub Pages serves `/.well-known/` files without stripping them (Jekyll ignores directories starting with `.` by default).

---

## TODO before deep links work

Universal links (iOS) and App Links (Android) require the `.well-known` files to be verified by Apple/Google. Before going live:

- **iOS — `/.well-known/apple-app-site-association`**: Replace `TEAMID` with your 10-character Apple Team ID (found in [developer.apple.com](https://developer.apple.com) → Membership). Run `eas credentials` to confirm the bundle ID.
- **Android — `/.well-known/assetlinks.json`**: Replace the `sha256_cert_fingerprints` placeholder with the actual SHA-256 fingerprint of your release signing certificate. Get it from:
  - EAS managed signing: `eas credentials` → Android → select profile → copy SHA-256
  - Or from the Play Console: **Setup → App signing → App signing key certificate**

Once both files are correct, iOS/Android will intercept `https://pfandlybon.com/i#...` links and open the Pfandly app directly instead of falling back to the web claim page.
