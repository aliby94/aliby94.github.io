// 1. Smooth Scroll for Nav Links
// 1. Smooth Scroll for Nav Links (Cleaned)
document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // We don't need math here anymore. 
      // The 'scroll-padding-top' in CSS will handle the offset automatically.
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

// 2. Scrollspy: Highlight Active Project Tab
const projectSections = document.querySelectorAll('.project-container');
const projectNavLinks = document.querySelectorAll('.nav a[href^="#"]');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of screen
  threshold: 0
};

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      
      projectNavLinks.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('is-active');
        }
      });
    }
  });
}, observerOptions);

projectSections.forEach(section => projectObserver.observe(section));

// 3. Slider Logic (Keeping your existing functionality)
let currentSlides = { 1: 0, 2: 0, 3: 0, 4: 0 };

function changeSlide(direction, projNum) {
  const track = document.getElementById(`track${projNum}`);
  if (!track) return;
  const totalSlides = track.querySelectorAll('.slide').length;
  let newIndex = currentSlides[projNum] + direction;
  if (newIndex >= totalSlides) newIndex = 0;
  if (newIndex < 0) newIndex = totalSlides - 1;
  moveSlide(newIndex, projNum);
}

function moveSlide(index, projNum) {
  const track = document.getElementById(`track${projNum}`);
  const dots = document.querySelectorAll(`#dots${projNum} .dot`);
  if (!track || !dots.length) return;

  currentSlides[projNum] = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// 4. Handle deep linking on initial load
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      // Still use a small timeout to let the page layout settle
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }, 250);
    }
  }
});