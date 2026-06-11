/**
 * Progressive enhancements only — the page is fully usable without JS.
 * Each feature is an init function wired up once at the bottom.
 */
(() => {
  "use strict";

  const THEME_KEY = "theme";
  const root = document.documentElement;

  const prefersDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  /** Effective theme: explicit choice if set, otherwise the OS preference. */
  const currentTheme = () =>
    root.dataset.theme || (prefersDark() ? "dark" : "light");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  };

  function initThemeToggle() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    const saved = localStorage.getItem(THEME_KEY);
    if (saved) root.dataset.theme = saved;

    toggle.addEventListener("click", () =>
      applyTheme(currentTheme() === "dark" ? "light" : "dark")
    );
    toggle.hidden = false; // only show the toggle when JS can drive it
  }

  /** Assembles the address at runtime so plain-text scrapers miss it. */
  function initEmailLink() {
    const link = document.querySelector("[data-email]");
    if (!link) return;

    const address = ["marzuk.dev", "gmail.com"].join("@");
    link.href = `mailto:${address}`;
    link.textContent = address;
  }

  function initFooterYear() {
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  initThemeToggle();
  initEmailLink();
  initFooterYear();
})();
