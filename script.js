const roles = [
  'Full-Stack Development',
  'Backend Engineering',
  'Applied Machine Learning'
];

const typedRole = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = roles[roleIndex];

  if (!deleting) {
    charIndex++;
  } else {
    charIndex--;
  }

  typedRole.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1150);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

if (typedRole) typeLoop();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('section, .footer, .hero-grid')];
const navLinks = [...document.querySelectorAll('.nav-links a, .mobile-dock a')];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });

sections.forEach((sec) => revealObserver.observe(sec));

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const id = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

[...document.querySelectorAll('section[id], footer[id]')].forEach((sec) => activeObserver.observe(sec));
