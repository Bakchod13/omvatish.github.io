// Om Vatish Portfolio Template JS
// - Mobile nav toggle
// - Scroll progress bar
// - Reveal on scroll
// - Lightbox gallery
// - Subtle parallax orbs (mouse)
// Safe for GitHub Pages (no build tools)

(function () {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Year
  const year = qs("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Nav (mobile)
  const toggle = qs(".nav-toggle");
  const links = qs(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    qsa("a", links).forEach(a => {
      a.addEventListener("click", () => {
        if (links.classList.contains("open")) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll progress
  const bar = qs(".scroll-progress span");
  const onScroll = () => {
    if (!bar) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct.toFixed(2) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll (IntersectionObserver)
  const revealEls = qsa(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Lightbox
  const dlg = qs("#lightbox");
  const img = qs("#lightboxImg");
  const cap = qs("#lightboxCap");
  const closeBtn = qs(".lightbox-close");

  const openLightbox = (src, title) => {
    if (!dlg || !img || !cap) return;
    img.src = src;
    img.alt = title || "Preview";
    cap.textContent = title || "";
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "open");
  };

  const closeLightbox = () => {
    if (!dlg) return;
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
  };

  qsa(".g-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      openLightbox(btn.dataset.img, btn.dataset.title);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (dlg) dlg.addEventListener("click", (e) => {
    const rect = dlg.getBoundingClientRect();
    const inDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                     rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
    if (!inDialog) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Subtle parallax orbs (mouse move)
  const orbs = qsa(".orb");
  if (orbs.length) {
    let rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      rx = (e.clientX / w - 0.5) * 2;
      ry = (e.clientY / h - 0.5) * 2;
    }, { passive: true });

    const tick = () => {
      orbs.forEach((o, i) => {
        const m = (i + 1) * 6;
        o.style.transform = `translate(${rx * m}px, ${ry * m}px)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();
