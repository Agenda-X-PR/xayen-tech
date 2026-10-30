(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- hero dot: pulse, then continue to the work ---------- */

  const dot = document.querySelector(".hero-dot");
  const workSection = document.getElementById("work");

  if (dot && workSection) {
    dot.addEventListener("animationend", () => dot.classList.remove("is-pulsed"));

    dot.addEventListener("click", (event) => {
      event.preventDefault();

      if (reduceMotion.matches) {
        workSection.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      if (!dot.classList.contains("is-pulsed")) {
        dot.classList.add("is-pulsed");
      }
      window.setTimeout(() => {
        workSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 430);
    });
  }

  /* ---------- overlapping panel: reveal on scroll or via control ---------- */

  const panel = document.querySelector(".panel");
  const toggle = document.querySelector(".panel-toggle");
  const toggleLabel = document.querySelector(".toggle-label");

  function setPanel(open) {
    if (!panel || !toggle) return;
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (toggleLabel) toggleLabel.textContent = open ? "Hide" : "Show";
  }

  if (panel && toggle) {
    setPanel(panel.classList.contains("is-open"));

    if (reduceMotion.matches) {
      setPanel(true);
    } else {
      let userToggled = false;
      let autoOpened = false;
      let ticking = false;

      const openWhenVisible = () => {
        if (userToggled || autoOpened) return;
        const rect = panel.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.08;
        if (inView) {
          autoOpened = true;
          window.removeEventListener("scroll", onScrollInput);
          window.removeEventListener("wheel", onScrollInput);
          window.removeEventListener("touchmove", onScrollInput);
          setPanel(true);
        }
      };

      function onScrollInput() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
          ticking = false;
          openWhenVisible();
        });
      }

      window.addEventListener("scroll", onScrollInput, { passive: true });
      window.addEventListener("wheel", onScrollInput, { passive: true });
      window.addEventListener("touchmove", onScrollInput, { passive: true });

      toggle.addEventListener("click", () => {
        userToggled = true;
        setPanel(!panel.classList.contains("is-open"));
      });
    }
  }

  /* ---------- reveal on scroll ---------- */

  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("in-view"));
  }

  /* ---------- copy email ---------- */

  const copyButton = document.querySelector(".copy-btn");
  const copyStatus = document.querySelector(".copy-status");
  const copyLabel = document.querySelector(".copy-label");
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

      if (copyStatus) {
        copyStatus.textContent = copied ? "Address copied" : "Copy failed \u2014 select the address";
      }

      if (copied && copyLabel) {
        copyLabel.textContent = "Copied";
        copyButton.classList.add("is-done");
        window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(() => {
          copyLabel.textContent = "Copy";
          copyButton.classList.remove("is-done");
          if (copyStatus) copyStatus.textContent = "";
        }, 2200);
      }
    });
  }

  /* ---------- local time (GMT+1) ---------- */

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
