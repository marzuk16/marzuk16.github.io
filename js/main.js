(() => {
  "use strict";

  const THEME_KEY = "theme";
  const root = document.documentElement;

  function initThemeToggle() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    const saved = localStorage.getItem(THEME_KEY);
    root.dataset.theme = saved || "dark";

    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem(THEME_KEY, next);
    });

    toggle.hidden = false;
  }

  /** Assembles the address at runtime so plain-text scrapers miss it. */
  function initEmailLink() {
    const link = document.querySelector("[data-email]");
    if (!link) return;
    const address = ["marzuk.dev", "gmail.com"].join("@");
    link.href = `mailto:${address}`;
    const handle = link.querySelector(".contact-handle");
    if (handle) handle.textContent = address;
    else link.textContent = address;
  }

  function initFooterYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  function initFadeIn() {
    const els = document.querySelectorAll(".fade-in");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
  }

  function initScrollProgress() {
    const progress = document.querySelector(".reading-progress-bar");
    if (!progress) return;

    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const percent = scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;

      progress.style.width = scrollTop <= 1 ? "0%" : `${percent}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  function initScrollToTop() {
    const button = document.querySelector(".scroll-to-top");
    if (!button) return;

    const toggleVisibility = () => {
      button.classList.toggle("visible", window.scrollY > 400);
    };

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
  }

  initThemeToggle();
  initEmailLink();
  initFooterYear();
  initFadeIn();
  initScrollProgress();
  initScrollToTop();
})();
