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

  function initDesignToggle() {
    const toggle = document.querySelector("[data-design-toggle]");
    if (!toggle) return;

    const saved = localStorage.getItem("design");
    root.dataset.design = saved || "ink";

    toggle.addEventListener("click", () => {
      const next = root.dataset.design === "ink" ? "tech" : "ink";
      root.dataset.design = next;
      localStorage.setItem("design", next);
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

  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionIds = ['about', 'projects', 'skills', 'education', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!navLinks.length || !sections.length) return;

    const updateActive = () => {
      const offset = Math.min(window.innerHeight * 0.35, 120);
      const scrollPosition = window.scrollY + offset;
      let currentId = sections[0].id;

      sections.forEach((section, index) => {
        const nextSection = sections[index + 1];
        const isInSection = !nextSection
          ? scrollPosition >= section.offsetTop
          : scrollPosition >= section.offsetTop && scrollPosition < nextSection.offsetTop;

        if (isInSection) {
          currentId = section.id;
        }
      });

      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
      if (atBottom) currentId = sections[sections.length - 1].id;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
      });
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();
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

  function initStatCountUp() {
    const stats = document.querySelectorAll(".stat[data-count]");
    if (!stats.length) return;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animateStat = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const format = el.dataset.format === "comma";
      const valueEl = el.querySelector(".stat-value");
      if (!valueEl) return;

      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOut(progress) * target);
        const display = format ? current.toLocaleString() : current;
        valueEl.textContent = display + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((el) => observer.observe(el));
  }

  function initLocalTime() {
    const el = document.querySelector("[data-local-time]");
    if (!el) return;

    const update = () => {
      el.textContent = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    update();
    setInterval(update, 60000);
  }

  initThemeToggle();
  initDesignToggle();
  initEmailLink();
  initFooterYear();
  initFadeIn();
  initActiveNav();
  initScrollProgress();
  initScrollToTop();
  initLocalTime();
  initStatCountUp();
})();
