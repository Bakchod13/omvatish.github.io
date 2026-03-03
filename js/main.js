/* ─── CURSOR ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

if (cursor) {
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smoothly lerp the trail
  const animateCursor = () => {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
}

/* ─── NAV SCROLL ─────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ─── MOBILE NAV ─────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* ─── SCROLL REVEAL ──────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.07}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ─── HERO NAME GLITCH ───────────────────────────────── */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const glitchChars = '!@#$%^&*<>/\\[]{}|?~';
  let glitchInterval;

  heroName.addEventListener('mouseenter', () => {
    const strokes = heroName.querySelectorAll('.accent-stroke');
    strokes.forEach(el => {
      let count = 0;
      const orig = el.textContent;
      glitchInterval = setInterval(() => {
        if (count < 8) {
          el.textContent = orig.split('').map(c =>
            Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c
          ).join('');
          count++;
        } else {
          el.textContent = orig;
          clearInterval(glitchInterval);
        }
      }, 60);
    });
  });
}

/* ─── SMOOTH PARALLAX ON HERO GLOWS ─────────────────── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (glow1) glow1.style.transform = `translateY(${scrolled * 0.3}px)`;
  if (glow2) glow2.style.transform = `translateY(${-scrolled * 0.2}px)`;
});

/* ─── ACTIVE NAV LINK HIGHLIGHTING ──────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.style.color = '');
      const id = entry.target.id;
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.style.color = 'var(--text)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── GALLERY LIGHTBOX (simple) ─────────────────────── */
// Uncomment & upgrade when you add real images
// document.querySelectorAll('.gallery-item').forEach(item => {
//   item.addEventListener('click', () => {
//     const img = item.querySelector('img');
//     if (!img) return;
//     const overlay = document.createElement('div');
//     overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out';
//     const bigImg = img.cloneNode();
//     bigImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px';
//     overlay.appendChild(bigImg);
//     overlay.addEventListener('click', () => overlay.remove());
//     document.body.appendChild(overlay);
//   });
// });

/* ─── PAGE LOAD ANIMATION ────────────────────────────── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Trigger hero reveals with slight delay
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => {
        el.style.transitionDelay = '0s';
        el.classList.add('visible');
      }, i * 120);
    });
  }, 200);
});
