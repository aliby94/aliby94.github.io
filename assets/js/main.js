// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

const header = document.getElementById("siteHeader");
const hero = document.getElementById("about");

// Header notch shrink/expand
const obs = new IntersectionObserver(
  ([entry]) => header.classList.toggle("is-compact", !entry.isIntersecting),
  { threshold: 0.15 }
);
obs.observe(hero);

// ---- Scrollspy: highlight current section in nav ----
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
const byId = new Map(navLinks.map(a => [a.getAttribute("href").slice(1), a]));

const spy = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach(a => a.classList.remove("is-active"));
  const link = byId.get(visible.target.id);
  if (link) link.classList.add("is-active");
}, {
  rootMargin: "-30% 0px -55% 0px",
  threshold: [0.15, 0.25, 0.35]
});

sections.forEach(s => spy.observe(s));




(() => {
  const root = document.documentElement;
  const hero = document.getElementById("about");
  if (!hero) return;

  // Tune these:
  const GAP_MAX = 800;  // big breathing room at very top
  const GAP_MIN = 24;   // tight spacing once you scroll a bit
  const SHRINK_OVER = 200; // px of scroll needed to go from max -> min

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const update = () => {
    const r = hero.getBoundingClientRect();

    // how far you've scrolled past the hero top (in px)
    const scrolled = clamp(-r.top, 0, SHRINK_OVER);

    // 0..1
    const t = scrolled / SHRINK_OVER;

    // ease-out feel
    const ease = 1 - Math.pow(1 - t, 3);

    const gap = GAP_MAX + (GAP_MIN - GAP_MAX) * ease;
    root.style.setProperty("--hero-gap", `${gap.toFixed(0)}px`);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();