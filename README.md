# RadioSats — 24/7 car satellite radio helpline

A single-page, call-driven landing site. Plain HTML + CSS + JS with Bootstrap 5.3 from a
CDN. No build step, no npm, no server code — drop the folder on any host and it works.

```
radio-support-site/
├── index.html              the whole page
├── assets/
│   ├── css/style.css       all styling; design tokens in :root at the top
│   ├── js/main.js          sticky header, scroll spy, reveal, count-up, call tracking
│   └── img/                logo.svg, logo-light.svg (footer), favicon.svg, og-cover.png
└── README.md
```

## Run it

Just double-click `index.html`. Or serve it locally:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

## Live details

These are set throughout `index.html`. To change one, find and replace every occurrence —
the counts are there so you can check nothing was missed.

| Detail | Current value | Occurrences |
| --- | --- | --- |
| Brand name | `RadioSats` | 10 in `index.html`, plus `aria-label` in the 3 SVGs |
| Helpline, displayed | `+1 (786) 454-4567` | 11 |
| Helpline, `tel:` form | `+17864544567` | 13 |
| Email | `Info@radiosats.com` | 6 |
| Domain (`canonical`, `og:url`) | `https://radiosats.com` | 5 |

The logo is an `<img>` pointing at `logo.svg` (header) and `logo-light.svg` (footer). The
wordmark lives inside those files as SVG `<text>` — two lines, `RadioSats` over `SUPPORT` —
so renaming the brand means editing the SVGs as well as `index.html`.

## Design tokens

Everything is driven by custom properties at the top of `assets/css/style.css`. The site runs
on the Miami Nights palette:

```css
--brand:      #0F4953;   /* deep teal - buttons, top strip, headings */
--brand-2:    #17707E;   /* lighter teal - gradient end              */
--on-brand:   #FFFFFF;   /* text that sits on the gradient           */
--accent:     #CBF5EF;   /* mint - tints and chips                   */
--paper-soft: #F1FAF8;   /* section background                       */
```

The coral `#F98E6E` from the palette is the highlight, not the lead — it carries the second
headline line and small accents. On white it is deepened to `#D9522B` (see the corrections
block at the end of the stylesheet) because at its original value the end of the headline
faded to unreadable. Mint, near-white `#F9FCFB` and pale pink `#FFCFD2` are background tints
only: all three are too light to put white text on.

## Design history

The site has had two looks. The current one is the original orange gradient design. A
deep-red editorial redesign also exists in the history — restore it with
`git checkout c82de2a -- index.html assets/` if you ever want it back.

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

- **`privacy.html` and `terms.html` don't exist**, but the footer links to them — both are
  dead links. Google Ads generally won't approve a support-service site without them.
- **The footer entity block is still dummy data** — `Reg. no. 000000000` and
  `123 Example Street, City, ST 00000`. Search `index.html` for `EDIT:`.
- **"Toll-free" is inaccurate.** The hero trust chips advertise the line as toll-free, but
  786 is a Miami area code, so callers pay normal rates. Either change the wording or use a
  real 800/888 number.
- Confirm `https://radiosats.com` is the final domain before going live — it's baked into
  the `canonical` and `og:url` tags.
- **`og-cover.png` doesn't match the current design.** It was drawn for the deep-red
  redesign, so link previews on WhatsApp, Facebook and X will look nothing like the page.

## Compliance note

The footer carries an independence disclaimer stating the service is not affiliated with
any satellite radio provider or vehicle manufacturer. Keep it, and keep the copy free of
any third-party brand names or logos — third-party support sites get ad accounts and
domains suspended over exactly this. Check the current advertiser rules for the platform
you plan to run traffic on.
