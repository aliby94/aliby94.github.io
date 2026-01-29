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
