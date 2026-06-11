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

## Deploying

GitHub Pages serves the `main` branch root of this repo. Deploying is just:

```bash
git push
```

(Repo Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/`.)

## Conventions

- Colors are defined once in `:root` using `light-dark()`; the theme toggle only
  flips `color-scheme`. Never duplicate a palette.
- New UI pieces reuse the existing component classes (`.card`, `.tag-list`,
  `.btn`, `.section`) before adding new CSS.
- JS stays optional — the page must remain fully usable with JS disabled.
