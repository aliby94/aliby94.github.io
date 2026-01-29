// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Header notch shrink/expand depending on whether the hero is in view
const header = document.getElementById("siteHeader");
const hero = document.getElementById("about");

// Use IntersectionObserver so it’s smooth + efficient
const obs = new IntersectionObserver(
  ([entry]) => {
    // If hero is NOT visible (we scrolled past it) -> compact header
    header.classList.toggle("is-compact", !entry.isIntersecting);
  },
  {
    // Trigger when hero is mostly out of view
    threshold: 0.15,
  }
);

obs.observe(hero);
