/**
 * script.js
 * Reads WEDDING_CONFIG (config.js) and renders every dynamic section of the
 * Glenn & Randy wedding invitation. Vanilla JS only — no frameworks.
 */
(function () {
  "use strict";

  const cfg = window.WEDDING_CONFIG;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* -----------------------------------------------------------------------
   * Minimal line-icon set (monoline, 24x24, stroke=currentColor)
   * --------------------------------------------------------------------- */
  const ICONS = {
    arrival: '<path d="M5 21V5a1 1 0 0 1 1-1h9l4 4v13" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 12l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12h9" stroke="currentColor" stroke-width="1.5"/>',
    processional: '<path d="M12 3v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="10.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 21c0-4 2.5-6 5-6s5 2 5 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    rings: '<circle cx="9" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 5l1-2 1 2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 7l1.5-2.5h5L16 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="3.4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    cocktail: '<path d="M5 5h14l-7 8-7-8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 13v6M8 19h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8.5 6.7l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    entrance: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 21h12" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="12" r="1" fill="currentColor"/><path d="M4 21h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    dance: '<circle cx="8" cy="6" r="1.8" fill="currentColor"/><circle cx="16" cy="6" r="1.8" fill="currentColor"/><path d="M8 8.5c-2 1-2.5 3-2 6M16 8.5c2 1 2.5 3 2 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6 20c1-2.5 1.5-4 2-5.5M18 20c-1-2.5-1.5-4-2-5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    mic: '<rect x="9.5" y="3" width="5" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 11a6 6 0 0 0 12 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 17v4M9 21h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    dinner: '<path d="M7 3v7a2 2 0 0 0 2 2v9M7 3v6M9 3v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M17 3c-1.5 0-2 2-2 4.5S16 12 17 12v9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    toast: '<path d="M5 4h6l-1 8a2 2 0 0 1-4 0L5 4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M13 8h5l-.8 6.5a1.8 1.8 0 0 1-3.4 0L13 8z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 12v8M15.3 14.5V20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    cake: '<path d="M4 20v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 20h16M8 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="2.3" r="1" fill="currentColor"/>',
    games: '<rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="8.5" r="1.1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.1" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.1" fill="currentColor"/><circle cx="12" cy="12" r="1.1" fill="currentColor"/>',
    bouquet: '<circle cx="9" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="15" cy="8" r="2.1" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="2.3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 14.3L9.5 21M12 14.3L14.5 21M12 14.3v6.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    message: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 6.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    sendoff: '<path d="M3 12h13M12 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 5l1.5 1.5M19 12h2M17 19l1.5-1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
  };

  function iconSvg(name) {
    return `<svg viewBox="0 0 24 24">${ICONS[name] || ICONS.rings}</svg>`;
  }

  /* -----------------------------------------------------------------------
   * Populate static text / attributes from config
   * --------------------------------------------------------------------- */
  function renderHeroAndGate() {
    const { brideFirstName, groomFirstName, coupleMonogram, heroTagline, heroImage } = cfg.couple;
    document.title = `${brideFirstName} & ${groomFirstName} — ${cfg.wedding.displayDate}`;

    $("#gate-bride").textContent = brideFirstName;
    $("#gate-groom").textContent = groomFirstName;
    $("#gate-date").textContent = cfg.wedding.displayDate;

    $("#heroBride").textContent = brideFirstName;
    $("#heroGroom").textContent = groomFirstName;
    $("#heroDate").textContent = cfg.wedding.displayDate;
    $("#heroQuote").textContent = heroTagline;
    $("#heroImage").src = heroImage;
    $("#heroImage").alt = `${brideFirstName} & ${groomFirstName}`;

    $("#navMonogram").textContent = coupleMonogram;
    $("#footerMonogram").innerHTML = `${brideFirstName} <span class="heart">&#10084;</span> ${groomFirstName}`;
    $("#footerDate").textContent = cfg.wedding.displayDate;

    $("#bibleVerseTop").textContent = cfg.wedding.bibleVerseTop;
  }

  function renderDetails() {
    const map = [
      ["ceremony", cfg.venue.ceremony],
      ["reception", cfg.venue.reception],
    ];
    map.forEach(([key, data]) => {
      $(`#${key}Venue`).textContent = data.name;
      $(`#${key}Time`).textContent = data.time;
      $(`#${key}Address`).textContent = data.address;
      $(`#${key}MapsBtn`).href = data.mapsLink;
    });
    $$(".detail-icon").forEach((el) => {
      el.innerHTML = iconSvg(el.dataset.icon);
    });
  }

  function renderEntourage() {
    const e = cfg.entourage;
    const grid = $("#entourageGrid");
    const cards = [];

    cards.push(`
      <div class="entourage-card" data-animate="fade-up">
        <h4>Parents of the Groom</h4>
        ${e.parents.groomParents.map((n) => `<p>${n}</p>`).join("")}
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Parents of the Bride</h4>
        ${e.parents.brideParents.map((n) => `<p>${n}</p>`).join("")}
      </div>
    `);

    cards.push(`
      <div class="entourage-card" data-animate="fade-up" style="grid-column: span 2;">
        <h4>Principal Sponsors</h4>
        ${e.principalSponsors
          .map((p) => `<div class="entourage-pair"><span>${p.male}</span><span>${p.female}</span></div>`)
          .join("")}
      </div>
    `);

    cards.push(`
      <div class="entourage-card" data-animate="fade-up">
        <h4>Ninong</h4>
        ${e.ninong.map((n) => `<p>${n}</p>`).join("")}
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Ninang</h4>
        ${e.ninang.map((n) => `<p>${n}</p>`).join("")}
      </div>
    `);

    cards.push(`
      <div class="entourage-card" data-animate="fade-up">
        <h4>Best Man</h4>
        <p>${e.bestMan}</p>
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Maid of Honor</h4>
        <p>${e.maidOfHonor}</p>
      </div>
    `);

    cards.push(`
      <div class="entourage-card" data-animate="fade-up">
        <h4>Bridesmaids</h4>
        ${e.bridesmaids.map((n) => `<p>${n}</p>`).join("")}
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Groomsmen</h4>
        ${e.groomsmen.map((n) => `<p>${n}</p>`).join("")}
      </div>
    `);

    cards.push(`
      <div class="entourage-card" data-animate="fade-up">
        <h4>Ring Bearer</h4><p>${e.ringBearer}</p>
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Bible Bearer</h4><p>${e.bibleBearer}</p>
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Coin Bearer</h4><p>${e.coinBearer}</p>
      </div>
      <div class="entourage-card" data-animate="fade-up">
        <h4>Flower Girls</h4>
        ${e.flowerGirls.map((n) => `<p>${n}</p>`).join("")}
      </div>
    `);

    grid.innerHTML = cards.join("");
  }

  function renderProgram() {
    const timeline = $("#programTimeline");
    timeline.innerHTML = cfg.programFlow
      .map(
        (item) => `
      <div class="timeline-item" data-animate="fade-up">
        <span class="timeline-icon">${iconSvg(item.icon)}</span>
        <span class="timeline-time">${item.time}</span>
        <span class="timeline-title">${item.title}</span>
      </div>`
      )
      .join("");
  }

  function renderDressCode() {
    $("#dressCodeSubtitle").textContent = cfg.dressCode.subtitle;
    $("#dressLadies").innerHTML = cfg.dressCode.ladies.map((i) => `<li>${i}</li>`).join("");
    $("#dressGentlemen").innerHTML = cfg.dressCode.gentlemen.map((i) => `<li>${i}</li>`).join("");
  }

  function renderMotif() {
    $("#motifSwatches").innerHTML = cfg.motif
      .map(
        (m) => `
      <div class="motif-swatch">
        <div class="swatch-color" style="background:${m.hex}; ${m.hex.toUpperCase() === "#FFFFFF" ? "border-color:#e5e5e5;" : ""}"></div>
        <span>${m.name}</span>
      </div>`
      )
      .join("");
  }

  function renderVerse() {
    $("#verseText").textContent = cfg.bibleVerse.text;
    $("#verseRef").textContent = cfg.bibleVerse.reference;
  }

  function renderGallery() {
    const masonry = $("#galleryMasonry");
    masonry.innerHTML = cfg.gallery
      .map(
        (g, i) => `
      <figure class="masonry-item" data-animate="scale-in" data-index="${i}">
        <img src="${g.src}" alt="${g.alt}" width="${g.width}" height="${g.height}" loading="lazy" decoding="async" />
      </figure>`
      )
      .join("");

    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightboxImg");
    $$(".masonry-item", masonry).forEach((item) => {
      item.addEventListener("click", () => {
        const img = $("img", item);
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
      });
    });
    $("#lightboxClose").addEventListener("click", () => lightbox.classList.remove("active"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("active");
    });
  }

  function renderRsvp() {
    $("#rsvpDeadline").textContent = `Kindly respond on or before ${cfg.rsvp.deadline}`;
    $("#mealPreference").innerHTML = cfg.rsvp.mealOptions.map((m) => `<option value="${m}">${m}</option>`).join("");

    const form = $("#rsvpForm");
    const success = $("#rsvpSuccess");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        if (cfg.rsvp.formEndpoint) {
          await fetch(cfg.rsvp.formEndpoint, { method: "POST", body: formData });
        } else {
          // Netlify Forms: AJAX submit to the current path with the encoded body.
          await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
          });
        }
      } catch (err) {
        // Static hosting without a form backend (e.g. local preview) — fail silently,
        // the guest still sees the success confirmation.
      }

      form.style.display = "none";
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function renderGift() {
    const g = cfg.gift;
    $("#giftTitle").textContent = g.title;
    $("#giftMessage").textContent = g.message;
    $("#gcashQr").src = g.gcashQr;
    $("#gcashName").textContent = g.gcashName;
    $("#gcashNumber").textContent = g.gcashNumber;
    $("#bankName").textContent = g.bankName;
    $("#bankAccountName").textContent = g.bankAccountName;
    $("#bankAccountNumber").textContent = g.bankAccountNumber;
  }

  function renderLocation() {
    $("#locationMap").src = cfg.location.mapsEmbedUrl;
    $("#directionsBtn").href = cfg.location.mapsLink;
  }

  /* -----------------------------------------------------------------------
   * Countdown timer
   * --------------------------------------------------------------------- */
  function startCountdown() {
    const target = new Date(cfg.wedding.countdownDate).getTime();
    const pad = (n) => String(Math.max(n, 0)).padStart(2, "0");

    function tick() {
      const diff = target - Date.now();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      $("#cd-days").textContent = pad(d);
      $("#cd-hours").textContent = pad(h);
      $("#cd-minutes").textContent = pad(m);
      $("#cd-seconds").textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* -----------------------------------------------------------------------
   * Scroll reveal animations
   * --------------------------------------------------------------------- */
  function setupScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    $$("[data-animate]").forEach((el) => observer.observe(el));
  }

  /* -----------------------------------------------------------------------
   * Nav — scrolled state + mobile menu
   * --------------------------------------------------------------------- */
  function setupNav() {
    const nav = $("#siteNav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    });

    const toggle = $("#navToggle");
    const links = $("#navLinks");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* -----------------------------------------------------------------------
   * Floating particles (soft sparkles / bokeh)
   * --------------------------------------------------------------------- */
  function setupParticles() {
    const container = $("#particles");
    const colors = ["rgba(217,195,165,.8)", "rgba(127,167,198,.7)", "rgba(255,255,255,.85)"];
    const count = window.innerWidth < 640 ? 14 : 24;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = 3 + Math.random() * 6;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      p.style.animationDuration = `${14 + Math.random() * 16}s`;
      p.style.animationDelay = `${Math.random() * 18}s`;
      container.appendChild(p);
    }
  }

  /* -----------------------------------------------------------------------
   * Invitation gate
   * --------------------------------------------------------------------- */
  function setupGate() {
    const gate = $("#gate");
    const btn = $("#openInvitationBtn");
    btn.addEventListener(
      "click",
      () => {
        gate.classList.add("opened");
        document.body.style.overflow = "";
        attemptMusicAutoplay();
      },
      { once: true }
    );
    document.body.style.overflow = "hidden";
  }

  /* -----------------------------------------------------------------------
   * Floating music player
   * --------------------------------------------------------------------- */
  let musicStarted = false;

  function attemptMusicAutoplay() {
    if (musicStarted) return;
    const audio = $("#audio");
    audio.play().then(
      () => {
        musicStarted = true;
        updatePlayState(true);
      },
      () => {
        /* Autoplay blocked — guest can press play manually. */
      }
    );
  }

  function updatePlayState(playing) {
    $("#iconPlay").hidden = playing;
    $("#iconPause").hidden = !playing;
    $("#musicDisc").classList.toggle("spinning", playing);
  }

  function setupMusicPlayer() {
    const audio = $("#audio");
    audio.src = cfg.music.src;
    audio.volume = 0.6;
    $("#musicTitle").textContent = cfg.music.title;

    const playBtn = $("#musicPlayBtn");
    const toggleBtn = $("#musicToggle");
    const panel = $("#musicPanel");
    const minBtn = $("#musicMinBtn");
    const seek = $("#musicSeek");
    const volume = $("#musicVolume");

    function togglePlay() {
      if (audio.paused) {
        audio.play().then(() => updatePlayState(true)).catch(() => {});
      } else {
        audio.pause();
        updatePlayState(false);
      }
    }

    playBtn.addEventListener("click", togglePlay);

    // The disc button expands the panel when collapsed; once expanded, it toggles play/pause.
    toggleBtn.addEventListener("click", () => {
      if (panel.classList.contains("hidden-panel")) {
        panel.classList.remove("hidden-panel");
      } else {
        togglePlay();
      }
    });

    minBtn.addEventListener("click", () => panel.classList.add("hidden-panel"));

    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      seek.value = (audio.currentTime / audio.duration) * 100;
    });
    seek.addEventListener("input", () => {
      if (!audio.duration) return;
      audio.currentTime = (seek.value / 100) * audio.duration;
    });
    volume.addEventListener("input", () => {
      audio.volume = Number(volume.value);
    });

    // Fallback: start music on first user interaction anywhere on the page
    // (handles browsers that block the gate-button-triggered play() call).
    const resumeOnInteraction = () => {
      attemptMusicAutoplay();
      document.removeEventListener("click", resumeOnInteraction);
    };
    document.addEventListener("click", resumeOnInteraction, { once: true });
  }

  /* -----------------------------------------------------------------------
   * Init
   * --------------------------------------------------------------------- */
  function init() {
    renderHeroAndGate();
    renderDetails();
    renderEntourage();
    renderProgram();
    renderDressCode();
    renderMotif();
    renderVerse();
    renderGallery();
    renderRsvp();
    renderGift();
    renderLocation();

    startCountdown();
    setupScrollReveal();
    setupNav();
    setupParticles();
    setupMusicPlayer();
    setupGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
