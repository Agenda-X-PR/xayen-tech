(() => {
  "use strict";

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

  /* ============================================================
     Hero network: drifting nodes + links, pointer-reactive.
     ============================================================ */

  function initNetwork() {
    const canvas = q(".hero-net");
    const host = q(".hero-card");
    if (!canvas || !host || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const LINK_DIST = 118;
    const ptr = { x: -1e4, y: -1e4 };
    let w = 0;
    let h = 0;
    let nodes = [];
    let raf = 0;
    let running = false;
    let inView = true;

    function seed() {
      const count = Math.max(22, Math.min(84, Math.round((w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        hot: Math.random() < 0.08,
      }));
    }

    function size() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function drawLinks() {
      const white = new Path2D();
      const amber = new Path2D();
      let hasWhite = false;
      let hasAmber = false;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK_DIST || Math.abs(dy) > LINK_DIST) continue;
          const d = Math.hypot(dx, dy);
          if (d >= LINK_DIST) continue;
          const strength = 1 - d / LINK_DIST;
          const path = a.hot || b.hot ? amber : white;
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
          if (a.hot || b.hot) hasAmber = true;
          else hasWhite = true;
          void strength;
        }
      }

      // links to hot nodes render in amber, the rest in cool white
      if (hasWhite) {
        ctx.strokeStyle = "rgba(196, 205, 220, 0.13)";
        ctx.stroke(white);
      }
      if (hasAmber) {
        ctx.strokeStyle = "rgba(255, 212, 58, 0.22)";
        ctx.stroke(amber);
      }
    }

    function drawNodes() {
      for (const n of nodes) {
        if (n.hot) {
          ctx.fillStyle = "rgba(255, 212, 58, 0.16)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 5.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255, 212, 58, 0.9)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(224, 230, 240, 0.38)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawPointer() {
      if (ptr.x < -1e3) return;
      ctx.strokeStyle = "rgba(255, 212, 58, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ptr.x - 9, ptr.y);
      ctx.lineTo(ptr.x - 3, ptr.y);
      ctx.moveTo(ptr.x + 3, ptr.y);
      ctx.lineTo(ptr.x + 9, ptr.y);
      ctx.moveTo(ptr.x, ptr.y - 9);
      ctx.lineTo(ptr.x, ptr.y - 3);
      ctx.moveTo(ptr.x, ptr.y + 3);
      ctx.lineTo(ptr.x, ptr.y + 9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ptr.x, ptr.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 212, 58, 0.18)";
      ctx.stroke();
    }

    function frame() {
      if (!running) return;

      for (const n of nodes) {
        n.vx += (Math.random() - 0.5) * 0.03;
        n.vy += (Math.random() - 0.5) * 0.03;
        n.vx *= 0.994;
        n.vy *= 0.994;
        n.vx = Math.max(-0.5, Math.min(0.5, n.vx));
        n.vy = Math.max(-0.5, Math.min(0.5, n.vy));
        n.x += n.vx;
        n.y += n.vy;

        const dx = n.x - ptr.x;
        const dy = n.y - ptr.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / 130) * 0.07;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }

        if (n.x < -14) n.x = w + 14;
        else if (n.x > w + 14) n.x = -14;
        if (n.y < -14) n.y = h + 14;
        else if (n.y > h + 14) n.y = -14;
      }

      ctx.clearRect(0, 0, w, h);
      drawLinks();
      drawNodes();
      drawPointer();
      raf = window.requestAnimationFrame(frame);
    }

    function play() {
      if (running || reduceMotion.matches || !inView || document.hidden) return;
      running = true;
      raf = window.requestAnimationFrame(frame);
    }

    function pause() {
      running = false;
      window.cancelAnimationFrame(raf);
    }

    function renderStatic() {
      ctx.clearRect(0, 0, w, h);
      drawLinks();
      drawNodes();
    }

    size();

    if (reduceMotion.matches) {
      renderStatic();
      window.addEventListener("resize", () => {
        size();
        renderStatic();
      }, { passive: true });
      return;
    }

    function refreshVisibility() {
      if (inView && !document.hidden) play();
      else pause();
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        refreshVisibility();
      }).observe(host);
    }

    document.addEventListener("visibilitychange", refreshVisibility);

    let resizeTicking = false;
    window.addEventListener("resize", () => {
      if (resizeTicking) return;
      resizeTicking = true;
      window.requestAnimationFrame(() => {
        resizeTicking = false;
        size();
        if (!running) renderStatic();
      });
    }, { passive: true });

    host.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      ptr.x = event.clientX - rect.left;
      ptr.y = event.clientY - rect.top;
    });

    host.addEventListener("pointerleave", () => {
      ptr.x = -1e4;
      ptr.y = -1e4;
    });

    play();
  }

  /* ============================================================
     Card torch + tilt: pointer-tracked highlight and 3D lean.
     ============================================================ */

  function initTilt() {
    const cards = qa(".work-card, .contact-card");
    if (!cards.length) return;

    const states = cards.map((el) => ({
      el,
      maxRot: el.classList.contains("contact-card") ? 1.4 : 2.6,
      rx: 0,
      ry: 0,
      lift: 0,
      trx: 0,
      tryy: 0,
      tlift: 0,
    }));

    let tiltRaf = 0;

    function tiltFrame() {
      tiltRaf = 0;
      let pending = false;

      for (const s of states) {
        s.rx += (s.trx - s.rx) * 0.14;
        s.ry += (s.tryy - s.ry) * 0.14;
        s.lift += (s.tlift - s.lift) * 0.14;

        const settled =
          Math.abs(s.trx - s.rx) < 0.04 &&
          Math.abs(s.tryy - s.ry) < 0.04 &&
          Math.abs(s.tlift - s.lift) < 0.04;

        if (settled) {
          s.rx = s.trx;
          s.ry = s.tryy;
          s.lift = s.tlift;
          if (s.rx === 0 && s.ry === 0 && s.lift === 0) {
            s.el.style.transform = "";
            continue;
          }
        } else {
          pending = true;
        }

        s.el.style.transform =
          `perspective(900px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) translateY(${s.lift.toFixed(2)}px)`;
      }

      if (pending) tiltRaf = window.requestAnimationFrame(tiltFrame);
    }

    function wake() {
      if (!tiltRaf) tiltRaf = window.requestAnimationFrame(tiltFrame);
    }

    for (const s of states) {
      s.el.addEventListener("pointermove", (event) => {
        if (reduceMotion.matches) return;
        const rect = s.el.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;

        s.el.style.setProperty("--mx", `${px.toFixed(1)}px`);
        s.el.style.setProperty("--my", `${py.toFixed(1)}px`);

        s.tryy = (px / rect.width * 2 - 1) * s.maxRot;
        s.trx = -(py / rect.height * 2 - 1) * s.maxRot;
        s.tlift = -4;
        wake();
      }, { passive: true });

      s.el.addEventListener("pointerleave", () => {
        s.tryy = 0;
        s.trx = 0;
        s.tlift = 0;
        wake();
      });
    }
  }

  /* ============================================================
     Magnetic hero buttons.
     ============================================================ */

  function initMagnet() {
    const buttons = qa(".star-btn");
    if (!buttons.length) return;

    const states = buttons.map((el) => ({
      el,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
    }));

    let magnetRaf = 0;

    function magnetFrame() {
      magnetRaf = 0;
      let pending = false;

      for (const s of states) {
        s.x += (s.tx - s.x) * 0.16;
        s.y += (s.ty - s.y) * 0.16;

        const settled = Math.abs(s.tx - s.x) < 0.05 && Math.abs(s.ty - s.y) < 0.05;

        if (settled) {
          s.x = s.tx;
          s.y = s.ty;
          if (s.tx === 0 && s.ty === 0) {
            s.el.style.transform = "";
            continue;
          }
        } else {
          pending = true;
        }

        s.el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
      }

      if (pending) magnetRaf = window.requestAnimationFrame(magnetFrame);
    }

    function wake() {
      if (!magnetRaf) magnetRaf = window.requestAnimationFrame(magnetFrame);
    }

    for (const s of states) {
      s.el.addEventListener("pointermove", (event) => {
        if (reduceMotion.matches) return;
        const rect = s.el.getBoundingClientRect();
        const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        s.tx = relX * 4.5;
        s.ty = relY * 3.5;
        wake();
      }, { passive: true });

      s.el.addEventListener("pointerleave", () => {
        s.tx = 0;
        s.ty = 0;
        wake();
      });
    }
  }

  /* ============================================================
     Count-ups: strip score on load, panel stats on first open.
     ============================================================ */

  function runCount(el, { duration = 950 } = {}) {
    const target = parseFloat(el.dataset.count);
    if (!isFinite(target)) return;

    const pad = parseInt(el.dataset.pad || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const fmt = (v) =>
      prefix + String(Math.max(0, Math.round(v))).padStart(pad, "0") + suffix;

    if (reduceMotion.matches) {
      el.textContent = fmt(target);
      return;
    }

    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = fmt(EASE_OUT(p) * target);
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  function initStrips() {
    const score = q(".strip-score b");
    if (!score) return;
    const value = parseInt(score.textContent.replace(/\D/g, ""), 10);
    if (isFinite(value)) {
      score.dataset.count = String(value);
      if (reduceMotion.matches) return; // leave static
      score.textContent = "0";
      window.setTimeout(() => runCount(score), 350);
    }
  }

  function runPanelCounts() {
    qa(".panel .count").forEach((el) => runCount(el));
  }

  /* ============================================================
     Terminal status line: cycles with a scramble effect.
     ============================================================ */

  function initStatus() {
    const line = q(".strip-status .ss-line");
    if (!line) return;

    const messages = [
      "> scanning nairaland.com",
      "> ingesting reddit batch 04",
      "> scoring tracked banks",
      "> drafting holding statement",
      "> baseline drift delta 0.02",
      "> buffer flush - 0 dropped",
    ];
    const GLYPHS = "01<>/\\|=+-_#";
    let index = 0;

    function scrambleTo(final) {
      let frame = 0;
      const total = 6;
      const timer = window.setInterval(() => {
        frame += 1;
        if (frame >= total) {
          window.clearInterval(timer);
          line.dataset.line = final;
          return;
        }
        line.dataset.line = final
          .split("")
          .map((ch) =>
            ch === " " || Math.random() > 0.45
              ? ch
              : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("");
      }, 42);
    }

    let timer = 0;
    if (reduceMotion.matches) return; // static first line

    timer = window.setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % messages.length;
      scrambleTo(messages[index]);
    }, 2300);
  }

  /* ============================================================
     Uptime chip + footer clock + year.
     ============================================================ */

  function initUptime() {
    const el = q("#hud-uptime");
    if (!el) return;

    const t0 = Date.now();
    const fmt = () => {
      let s = Math.floor((Date.now() - t0) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    };

    el.textContent = fmt();
    if (!reduceMotion.matches) {
      window.setInterval(() => {
        if (!document.hidden) el.textContent = fmt();
      }, 1000);
    }
  }

  /* ============================================================
     Live risk sparkline (synthetic feed).
     ============================================================ */

  function initSpark() {
    const canvas = q(".spark-canvas");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const N = 44;
    const LOW = 56;
    const HIGH = 96;
    let w = 0;
    let h = 0;
    let vals = [];
    let lastShift = 0;
    let raf = 0;
    let running = false;
    let inView = true;

    function seed() {
      let v = 76;
      vals = [];
      for (let i = 0; i < N; i++) {
        v = Math.max(LOW, Math.min(HIGH, v + (Math.random() * 8 - 4)));
        vals.push(v);
      }
    }

    function size() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(ts) {
      ctx.clearRect(0, 0, w, h);

      // faint guide rails
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (const f of [0.28, 0.62]) {
        const y = Math.round(h * f) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const padX = 8;
      const padY = 8;
      const xAt = (i) => padX + (i / (N - 1)) * (w - padX * 2);
      const yAt = (v) => h - padY - ((v - LOW) / (HIGH - LOW)) * (h - padY * 2);

      // area fill
      const fill = ctx.createLinearGradient(0, 0, 0, h);
      fill.addColorStop(0, "rgba(255, 212, 58, 0.16)");
      fill.addColorStop(1, "rgba(255, 212, 58, 0)");
      ctx.beginPath();
      ctx.moveTo(xAt(0), yAt(vals[0]));
      for (let i = 1; i < N; i++) ctx.lineTo(xAt(i), yAt(vals[i]));
      ctx.lineTo(xAt(N - 1), h);
      ctx.lineTo(xAt(0), h);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();

      // line
      ctx.beginPath();
      ctx.moveTo(xAt(0), yAt(vals[0]));
      for (let i = 1; i < N; i++) ctx.lineTo(xAt(i), yAt(vals[i]));
      ctx.strokeStyle = "rgba(255, 212, 58, 0.85)";
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.stroke();

      // leading dot with pulsing halo
      const lx = xAt(N - 1);
      const ly = yAt(vals[N - 1]);
      const pulse = reduceMotion.matches ? 0 : Math.sin(ts / 260) * 1.6;
      ctx.beginPath();
      ctx.arc(lx, ly, 5 + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 212, 58, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(lx, ly, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 226, 122, 1)";
      ctx.fill();
    }

    function frame(ts) {
      if (!running) return;
      if (ts - lastShift > 1500) {
        lastShift = ts;
        const last = vals[N - 1];
        vals.push(Math.max(LOW, Math.min(HIGH, last + (Math.random() * 8 - 4))));
        vals.shift();
      }
      draw(ts);
      raf = window.requestAnimationFrame(frame);
    }

    function play() {
      if (running || reduceMotion.matches || !inView || document.hidden) return;
      running = true;
      raf = window.requestAnimationFrame(frame);
    }

    function pause() {
      running = false;
      window.cancelAnimationFrame(raf);
    }

    seed();
    size();

    if (reduceMotion.matches) {
      draw(400);
      window.addEventListener("resize", () => {
        size();
        draw(400);
      }, { passive: true });
      return;
    }

    function refresh() {
      if (inView && !document.hidden) play();
      else pause();
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        refresh();
      }).observe(canvas);
    }

    document.addEventListener("visibilitychange", refresh);

    window.addEventListener("resize", () => {
      size();
      if (!running) draw(400);
    }, { passive: true });

    play();
  }

  /* ============================================================
     Hero dot: pulse, then continue to the work.
     ============================================================ */

  const dot = q(".hero-star");
  const workSection = q("#work");

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

  /* ============================================================
     Overlapping panel: reveal on scroll or via control.
     ============================================================ */

  const panel = q(".panel");
  const toggle = q(".panel-toggle");
  const toggleLabel = q(".toggle-label");
  let countsDone = false;

  function setPanel(open) {
    if (!panel || !toggle) return;
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (toggleLabel) toggleLabel.textContent = open ? "Hide" : "Show";

    if (open && !countsDone) {
      countsDone = true;
      runPanelCounts();
    }
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
        const inView =
          rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.08;
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

  /* ============================================================
     Reveal on scroll.
     ============================================================ */

  const revealItems = qa("[data-reveal]");

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

  /* ============================================================
     Scroll progress readout.
     ============================================================ */

  const progressBar = q(".scroll-progress i");

  if (progressBar) {
    let progressTicking = false;

    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      progressBar.style.transform = `scaleX(${p.toFixed(4)})`;
    }

    function onProgressScroll() {
      if (progressTicking) return;
      progressTicking = true;
      window.requestAnimationFrame(() => {
        progressTicking = false;
        updateProgress();
      });
    }

    window.addEventListener("scroll", onProgressScroll, { passive: true });
    window.addEventListener("resize", onProgressScroll, { passive: true });
    updateProgress();
  }

  /* ============================================================
     Copy email.
     ============================================================ */

  const copyButton = q(".copy-btn");
  const copyStatus = q(".copy-status");
  const copyLabel = q(".copy-label");
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
        copyStatus.textContent = copied
          ? "Address copied"
          : "Copy failed \u2014 select the address";
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

  /* ============================================================
     Local time (GMT+1) + footer year.
     ============================================================ */

  const clocks = qa("[data-clock]");
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  function updateTime() {
    if (!clocks.length) return;
    const now = `${formatter.format(new Date())} GMT+1`;
    clocks.forEach((el) => {
      el.textContent = now;
    });
  }

  updateTime();
  window.setInterval(updateTime, 30000);

  const year = q("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ============================================================
     Page-wide star map: fixed canvas, three parallax layers of
     drifting, twinkling stars behind everything, a few amber
     "hot" stars marked with cross sparkles.
     ============================================================ */

  function initStarfield() {
    const canvas = q(".starmap");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const PARALLAX = [0.05, 0.11, 0.2];
    const COUNTS = [46, 54, 30];
    const BAND = 260;
    let stars = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const pointer = { x: 0 };

    function seed() {
      stars = [];
      for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < COUNTS[layer]; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * (h + BAND) - BAND / 2,
            layer,
            r: 0.55 + Math.random() * (layer === 2 ? 1.5 : 0.9),
            ph: Math.random() * Math.PI * 2,
            tw: 0.5 + Math.random() * 2,
            hot: Math.random() < (layer === 2 ? 0.14 : 0.05),
            sway: 4 + Math.random() * 10,
          });
        }
      }
    }

    function size() {
      const prevW = w || window.innerWidth;
      const prevH = h || window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (stars.length) {
        const sx = w / prevW;
        const sy = (h + BAND) / (prevH + BAND);
        for (const s of stars) {
          s.x *= sx;
          s.y = (s.y + BAND / 2) * sy - BAND / 2;
        }
      } else {
        seed();
      }
    }

    function draw(ts, animate) {
      ctx.clearRect(0, 0, w, h);
      const span = h + BAND;
      const half = BAND / 2;
      const scroll = window.scrollY || window.pageYOffset;

      for (const s of stars) {
        let y = (s.y - scroll * PARALLAX[s.layer]) % span;
        if (y < -half) y += span;

        let x = s.x;
        const wave = animate
          ? 0.5 + 0.5 * Math.sin(ts * 0.0012 * s.tw + s.ph)
          : 0.5;
        if (animate) {
          x += Math.sin(ts * 0.00022 + s.ph) * s.sway * 0.2;
          x += (pointer.x - w / 2) * 0.014 * (s.layer + 1);
        }

        if (s.hot) {
          ctx.strokeStyle = `rgba(255, 196, 60, ${(0.1 + 0.3 * wave).toFixed(3)})`;
          ctx.lineWidth = 1;
          const arm = s.r * 2.8 + 2;
          ctx.beginPath();
          ctx.moveTo(x - arm, y);
          ctx.lineTo(x + arm, y);
          ctx.moveTo(x, y - arm);
          ctx.lineTo(x, y + arm);
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 212, 58, ${(0.5 + 0.4 * wave).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r + 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(216, 224, 238, ${(0.16 + 0.4 * wave).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    /* occasional meteors: a warm-headed streak with a pale tail
       that flashes across the chart every few seconds */

    const meteors = [];
    let meteorWait = 140;

    function spawnMeteor() {
      const fromLeft = Math.random() < 0.5;
      meteors.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.45,
        vx: (fromLeft ? 1 : -1) * (3.2 + Math.random() * 3.2),
        vy: 1.3 + Math.random() * 1.7,
        len: 70 + Math.random() * 130,
        life: 1,
      });
    }

    function drawMeteors() {
      meteorWait -= 1;
      if (meteorWait <= 0) {
        spawnMeteor();
        meteorWait = 240 + Math.random() * 480;
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.012;
        if (
          m.life <= 0 ||
          m.x < -m.len - 60 ||
          m.x > w + m.len + 60 ||
          m.y > h + 60
        ) {
          meteors.splice(i, 1);
          continue;
        }
        const speed = Math.hypot(m.vx, m.vy);
        const ux = m.vx / speed;
        const uy = m.vy / speed;
        const tailX = m.x - ux * m.len;
        const tailY = m.y - uy * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 212, 58, ${(0.8 * m.life).toFixed(3)})`);
        grad.addColorStop(0.3, `rgba(216, 224, 238, ${(0.34 * m.life).toFixed(3)})`);
        grad.addColorStop(1, "rgba(216, 224, 238, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 232, 170, ${(0.9 * m.life).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(ts) {
      if (!running) return;
      draw(ts, true);
      drawMeteors();
      raf = window.requestAnimationFrame(frame);
    }

    function play() {
      if (running || reduceMotion.matches || document.hidden) return;
      running = true;
      raf = window.requestAnimationFrame(frame);
    }

    function pause() {
      running = false;
      window.cancelAnimationFrame(raf);
    }

    size();

    if (reduceMotion.matches) {
      draw(0, false);
      window.addEventListener("resize", () => {
        size();
        draw(0, false);
      }, { passive: true });
      return;
    }

    function refresh() {
      if (document.hidden) pause();
      else play();
    }

    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
    }, { passive: true });
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("resize", () => {
      size();
      if (!running) draw(0, false);
    }, { passive: true });
    play();
  }

  /* ============================================================
     Click sparks: every press lays a small four-point star at the
     cursor that lifts, spins and fades. Pure decoration.
     ============================================================ */

  function initSparks() {
    if (reduceMotion.matches) return;

    const layer = document.createElement("div");
    layer.className = "spark-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    let live = 0;

    document.addEventListener("pointerdown", (event) => {
      if (live > 14) return;
      const spark = document.createElement("span");
      spark.className = "spark";
      const size = 10 + Math.random() * 16;
      spark.style.cssText =
        `left:${event.clientX.toFixed(0)}px;` +
        `top:${event.clientY.toFixed(0)}px;` +
        `width:${size.toFixed(0)}px;` +
        `height:${size.toFixed(0)}px;` +
        `--tw:${(Math.random() * 1.3 - 0.65).toFixed(2)}turn;`;
      layer.appendChild(spark);
      live += 1;
      spark.addEventListener(
        "animationend",
        () => {
          spark.remove();
          live -= 1;
        },
        { once: true }
      );
    }, { passive: true });
  }

  /* ============================================================
     Section map rail: fixed stars on the right edge that track
     the section currently in the reading zone.
     ============================================================ */

  function initRail() {
    const rail = q(".map-rail");
    if (!rail) return;

    const links = qa("a", rail);
    const stars = qa(".rail-star", rail);
    const line = q(".rail-line", rail);
    const tip = q(".rail-tip", rail);
    const sections = links
      .map((a) => q(a.getAttribute("href")))
      .filter(Boolean);
    if (!links.length || !sections.length) return;

    /* gentle side-to-side offsets so the constellation reads as a
       figure, not a straight ruler */
    const ZIG = [-7, 6, -5, 8, -6, 7];
    let pts = [];
    let seg = 0;

    function railProgress(mid) {
      const first = sections[0].offsetTop;
      const last = sections[sections.length - 1].offsetTop;
      if (mid <= first) return 0;
      if (mid >= last) return 1;
      let i = 0;
      while (i < sections.length - 1 && sections[i + 1].offsetTop <= mid) i += 1;
      const span = sections[i + 1].offsetTop - sections[i].offsetTop;
      const t = span > 0 ? (mid - sections[i].offsetTop) / span : 1;
      return (i + t) / (sections.length - 1);
    }

    function layout() {
      if (!line) return;
      stars.forEach((el, i) => {
        el.style.transform = `translateX(${ZIG[i % ZIG.length]}px)`;
      });
      const box = rail.getBoundingClientRect();
      pts = stars.slice(0, sections.length).map((el) => {
        const b = el.getBoundingClientRect();
        return {
          x: (b.left + b.right) / 2 - box.left,
          y: (b.top + b.bottom) / 2 - box.top,
        };
      });
      if (pts.length < 2) return;
      line.setAttribute(
        "points",
        pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
      );
      seg = line.getTotalLength();
      line.style.strokeDasharray = `${seg}`;
      updateProgress();
    }

    function tick() {
      const mid = window.scrollY + window.innerHeight * 0.42;
      let active = -1;
      sections.forEach((section, i) => {
        if (section.offsetTop <= mid) active = i;
      });
      links.forEach((link, i) => {
        link.classList.toggle("is-active", i === active);
      });
      updateProgress();
    }

    function updateProgress() {
      if (!line || pts.length < 2) return;
      const mid = window.scrollY + window.innerHeight * 0.42;
      const frac = railProgress(mid);
      line.style.strokeDashoffset = `${seg * (1 - frac)}`;
      if (!tip) return;
      const scaled = frac * (pts.length - 1);
      const i = Math.min(Math.floor(scaled), pts.length - 2);
      const t = Math.min(Math.max(scaled - i, 0), 1);
      const a = pts[i];
      const b = pts[i + 1];
      tip.setAttribute("cx", `${(a.x + (b.x - a.x) * t).toFixed(1)}`);
      tip.setAttribute("cy", `${(a.y + (b.y - a.y) * t).toFixed(1)}`);
    }

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        tick();
      });
    }

    function onResize() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        layout();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((other) => other.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layout);
    }
    layout();
    tick();
  }

  /* ============================================================
     Boot the scene.
     ============================================================ */

  initNetwork();
  initSpark();
  initTilt();
  initMagnet();
  initStrips();
  initStatus();
  initUptime();
  initStarfield();
  initRail();
  initSparks();
})();
