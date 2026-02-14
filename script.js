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

const supportCountEl = document.getElementById('support-click-count');
const hireMeBtn = document.getElementById('hire-me-btn');
const portfolioBtn = document.getElementById('portfolio-btn');
const supportCountKey = 'srinivasa_support_clicks';

let supportCount = Number(localStorage.getItem(supportCountKey) || '0');
if (supportCountEl) supportCountEl.textContent = String(supportCount);

const incrementSupportCount = () => {
  supportCount += 1;
  localStorage.setItem(supportCountKey, String(supportCount));
  if (supportCountEl) supportCountEl.textContent = String(supportCount);
};

if (hireMeBtn) hireMeBtn.addEventListener('click', incrementSupportCount);
if (portfolioBtn) portfolioBtn.addEventListener('click', incrementSupportCount);

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

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursorDot && cursorRing && canUseCustomCursor) {
  document.body.classList.add('custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const interactiveElements = [
    ...document.querySelectorAll('a, button, .btn, .card, .chips span, .mobile-dock a')
  ];

  const setHoverOn = () => document.body.classList.add('cursor-hover');
  const setHoverOff = () => document.body.classList.remove('cursor-hover');

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', setHoverOn);
    el.addEventListener('mouseleave', setHoverOff);
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });

  animateCursor();
}
