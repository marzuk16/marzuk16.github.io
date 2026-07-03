# marzuk16.github.io

Personal portfolio — plain HTML, CSS, and JS. No build step, no dependencies.

Live at: <https://marzuk16.github.io>

## Structure

```
index.html      # all page content
css/style.css   # design tokens (light/dark via light-dark()) + components
js/main.js      # progressive enhancements: theme toggle, email link, footer year
assets/         # resume.pdf and any project images
favicon.svg
```

## Before going live — content checklist

- [ ] Replace `assets/resume.pdf` — the current file is the **2021 student-era CV**
      copied from the old portfolio repo; export an updated one.
- [ ] Verify the IPEMIS tech-tag list in `index.html` (search for `TODO`).
- [ ] Confirm employment/NDA terms allow naming EIMS/LGED and IPEMIS/DPE publicly;
      soften the case-study wording if not.
- [ ] Optional: update GitHub profile (`marzuk16/marzuk16` README still says
      "Assistant Software Engineer", Spring Boot era) and point its blog link here
      instead of the old `/portfolio` site.

## Two designs, one active at a time

The site ships two designs — **ink** (ink & wash) and **tech** (glassmorphism) —
that share a single `index.html`. They differ only in CSS, gated by the
`data-design` attribute, so all content is written once and appears in whichever
design is live. Never fork content per design.

- **Content** → edit the shared `index.html`.
- **Look of a design** → edit its rules in `css/style.css` (`[data-design="ink"]`
  / `[data-design="tech"]`).

### Which design is live

Controlled by the `ACTIVE_DESIGN` **repository variable** (Settings → Secrets and
variables → Actions → **Variables**). Valid values: `ink` or `tech`. The deploy
workflow reads it and bakes it into `index.html` at publish time.

To switch the live design:

1. Change `ACTIVE_DESIGN` to `ink` or `tech`.
2. Actions tab → **Deploy portfolio to GitHub Pages** → **Run workflow**
   (changing the variable does not auto-deploy).

### Preview the other design without publishing

Append `?design=tech` (or `?design=ink`) to any URL — locally or on the live site
— to render that design just for you. Visitors without the param always see the
active one; there is no visitor-facing switch.

## Deploying

GitHub Pages deploys via **GitHub Actions** (`.github/workflows/deploy.yml`) on
every push to `main`. A normal content change is just:

```bash
git push
```

One-time setup (already done if the site is live via Actions):

- Repo Settings → Pages → Source: **GitHub Actions** (not "Deploy from a branch").
- Create the `ACTIVE_DESIGN` repository variable (defaults to `ink` if unset).

## Conventions

- Colors are defined once in `:root` using `light-dark()`; the theme toggle only
  flips `color-scheme`. Never duplicate a palette.
- New UI pieces reuse the existing component classes (`.card`, `.tag-list`,
  `.btn`, `.section`) before adding new CSS.
- JS stays optional — the page must remain fully usable with JS disabled.
