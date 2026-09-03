# RadioSat Support — landing page

A single-page, call-driven landing site. Plain HTML + CSS + JS with Bootstrap 5.3 from a
CDN. No build step, no npm, no server code — drop the folder on any host and it works.

```
radio-support-site/
├── index.html              the whole page
├── assets/
│   ├── css/style.css       all styling; brand colours in :root at the top
│   ├── js/main.js          sticky header, scroll spy, reveal, count-up, call tracking
│   └── img/                logo.svg, logo-light.svg (footer), favicon.svg
└── README.md
```

## Run it

Just double-click `index.html`. Or serve it locally:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

## Make it yours — 6 find/replace passes

Open `index.html` and replace every occurrence:

| Find | Replace with |
| --- | --- |
| `RadioSat Support` | your brand name |
| `+1 (000) 000-0000` | your phone, as you want it *displayed* |
| `+10000000000` | your phone in `tel:` format (digits only, leading `+`) |
| `support@example.com` | your email |
| `https://example.com` | your live domain |
| the `<!-- ==== EDIT: your real registered entity details ==== -->` block in the footer | your registered company name, number and address |

Then swap the wordmark text inside `assets/img/logo.svg` and `logo-light.svg`
(they're plain SVG — the text is editable in any text editor).

## Brand colours

Everything is driven by custom properties at the top of `assets/css/style.css`:

```css
--brand:      #ff6a00;   /* primary       */
--brand-2:    #ffb703;   /* gradient end  */
--brand-deep: #e04e00;   /* hover/pressed */
--ink:        #10233d;   /* headings      */
```

Change those four and the header, buttons, icons, gradients, stats band and mobile call
bar all follow.

## Page sections

1. **Topbar** — 24/7 line + helpline number
2. **Sticky header** — logo, anchor nav, Call now button
3. **Hero** — live-status pill, headline, big tap-to-call number, trust chips, live status card
4. **Feature cards** — radio / signal / channels / subscription
5. **Stats band** — animated count-up on scroll
6. **Notice** — self-service tools offline, call instead
7. **Services** — six detailed service items
8. **How it works** — three steps
9. **Why us** — checklist + hours card
10. **FAQ** — Bootstrap accordion (also good for SEO)
11. **Contact** — gradient-framed CTA card
12. **Footer** — links, legal entity, independence disclaimer
13. **Mobile call bar** — fixed bottom, appears under 992px

## Call tracking

Every phone link carries `data-call`. `main.js` has one handler for all of them —
uncomment the `gtag` block at the bottom of the file and paste your conversion ID:

```js
gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/YYYYYYYYYYYY' });
```

If you add Google Ads call reporting, put the `gtag.js` snippet in `<head>` of
`index.html` above `main.js`.

## Still to do

- `privacy.html` and `terms.html` — the footer links to them but the files don't exist yet.
  Google Ads generally won't approve a support-service site without them.
- `assets/img/og-cover.png` — 1200×630 social share image referenced in the meta tags.
- Point the `canonical` and `og:url` tags at the real domain before going live.

## Compliance note

The footer carries an independence disclaimer stating the service is not affiliated with
any satellite radio provider or vehicle manufacturer. Keep it, and keep the copy free of
any third-party brand names or logos — third-party support sites get ad accounts and
domains suspended over exactly this. Check the current advertiser rules for the platform
you plan to run traffic on.
