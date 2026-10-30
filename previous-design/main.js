(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- header + scroll progress ---------- */

  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[data-section]"));
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", y > 16);
    }

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }

    if (sections.length) {
      const marker = y + window.innerHeight * 0.32;
      let active = "";
      for (const section of sections) {
        if (section.offsetTop <= marker) active = section.id;
      }
      for (const link of navLinks) {
        if (link.dataset.section === active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile navigation ---------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const mobileQuery = window.matchMedia("(max-width: 980px)");

  function setMenu(open) {
    if (!menuToggle || !nav) return;
    menuToggle.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Toggle navigation menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open && mobileQuery.matches);
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuToggle.focus({ preventScroll: true });
      }
    });

    mobileQuery.addEventListener("change", (event) => {
      if (!event.matches) setMenu(false);
    });
  }

  /* ---------- hero widget ---------- */

  const widget = document.querySelector(".hero-widget");
  const score = document.querySelector(".risk-score-number");
  let widgetPlayed = false;

  function animateScore(target, duration) {
    if (!score) return;
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      score.textContent = String(Math.round(easeOutCubic(p) * target));
      if (p < 1) window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  function playWidget() {
    if (widgetPlayed) return;
    widgetPlayed = true;
    if (!score) return;

    const target = Number(score.dataset.score || 87);
    if (reduceMotion.matches) {
      score.textContent = String(target);
      return;
    }
    animateScore(target, 1500);
  }

  if (score && !reduceMotion.matches) {
    score.textContent = "0";
  }

  /* ---------- reveal + widget trigger ---------- */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          if (entry.target === widget) playWidget();
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    playWidget();
  }

  // Safety net for restored scroll positions and unusual viewports.
  window.setTimeout(() => {
    if (widget && widget.getBoundingClientRect().top < window.innerHeight) {
      widget.classList.add("is-visible");
      playWidget();
    }
  }, 500);

  /* ---------- pointer glow ---------- */

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-glow]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ---------- copy email ---------- */

  const copyButton = document.querySelector(".copy-btn");
  const copyStatus = document.querySelector(".copy-status");
  let copyTimer = 0;

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      field.remove();
      return copied;
    }
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const value = copyButton.dataset.copy || "";
      const copied = await copyText(value);
      const label = copyButton.querySelector("span");

      if (copyStatus) {
        copyStatus.textContent = copied ? "Copied to clipboard" : "Copy failed — select the address";
      }

      if (copied && label) {
        label.textContent = "Copied";
        window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(() => {
          label.textContent = "Copy Address";
          if (copyStatus) copyStatus.textContent = "";
        }, 2200);
      }
    });
  }

  /* ---------- local time ---------- */

  const localTime = document.getElementById("local-time");
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  function updateTime() {
    if (!localTime) return;
    localTime.textContent = `${formatter.format(new Date())} GMT+1`;
  }

  updateTime();
  window.setInterval(updateTime, 30000);

  /* ---------- footer year ---------- */

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
