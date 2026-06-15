/* ════════════════════════════════════════════════
   Davron Rustamov — Portfolio · jonli animatsiyalar
   ════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. SCROLL REVEAL — elementlar ko'rinishda paydo bo'ladi
   ───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────────────────────
   2. RAQAMLAR SANOG'I — statistika animatsiyasi
   ───────────────────────────────────────────── */
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const raw = el.textContent.trim();            // masalan "20+"
    const target = parseInt(raw, 10) || 0;
    const suffix = raw.replace(/[0-9]/g, '');      // "+" yoki ""
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);        // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach((el) => countObserver.observe(el));

/* ─────────────────────────────────────────────
   3. SKILL-BARLAR — ko'rinishda to'lib chiqadi
   ───────────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const fill = e.target;
    const target = fill.dataset.width || fill.style.width;
    fill.style.width = '0%';
    requestAnimationFrame(() => { fill.style.width = target; });
    skillObserver.unobserve(fill);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-fill').forEach((fill) => {
  fill.dataset.width = fill.style.width;   // asl qiymatni saqlab qo'yamiz
  fill.style.width = '0%';
  skillObserver.observe(fill);
});

/* ─────────────────────────────────────────────
   4. NAV — scroll paytida zichroq bo'ladi
   ───────────────────────────────────────────── */
const nav = document.querySelector('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ─────────────────────────────────────────────
   5. FAOL NAV HAVOLA — qaysi bo'limdaligini belgilaydi
   ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach((s) => sectionObserver.observe(s));

/* ─────────────────────────────────────────────
   6. KURSOR YORUG'LIGI — sichqonchaga ergashuvchi glow
   ───────────────────────────────────────────── */
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
let curX = glowX, curY = glowY;

window.addEventListener('pointermove', (e) => {
  glowX = e.clientX;
  glowY = e.clientY;
});

function animateGlow() {
  curX += (glowX - curX) * 0.12;
  curY += (glowY - curY) * 0.12;
  glow.style.transform = `translate(${curX}px, ${curY}px)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ─────────────────────────────────────────────
   7. KARTOCHKA 3D TILT — sichqoncha ostida egiladi
   ───────────────────────────────────────────── */
const tiltCards = document.querySelectorAll('.card, .project-card');

tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

/* ─────────────────────────────────────────────
   8. ZARRACHALI FON — canvas konstellatsiya
   ───────────────────────────────────────────── */
(function particles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dots;

  const COUNT = window.innerWidth < 768 ? 36 : 70;
  const LINK_DIST = 130;
  const COLOR = 'rgba(108, 99, 255,';

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeDots() {
    dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = COLOR + '0.6)';
      ctx.fill();
    }

    // zarrachalar orasidagi chiziqlar
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = COLOR + (0.14 * (1 - dist / LINK_DIST)) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  resize();
  makeDots();
  frame();
  window.addEventListener('resize', () => { resize(); makeDots(); }, { passive: true });
})();
