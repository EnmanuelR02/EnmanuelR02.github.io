const translations = {
  en: {
    "nav.about": "About", "nav.experience": "Experience", "nav.skills": "Skills", "nav.contact": "Contact",
    "hero.kicker": "Full-Stack Developer · Dominican Republic", "hero.button": "More about me ↓",
    "about.label": "01 / ABOUT ME", "about.title": "Building useful", "about.titleAccent": "digital experiences.",
    "experience.label": "02 / EXPERIENCE", "skills.label": "03 / SKILLS", "skills.title": "Tools for turning",
    "skills.titleAccent": "ideas into reality.", "skills.description": "My toolkit combines frontend craft, backend architecture, databases and the habits that keep a project moving.",
    "contact.label": "04 / GET IN TOUCH", "contact.title": "Have an idea?", "contact.titleAccent": "Let’s build it.",
    "contact.description": "If you know of an opportunity, have a question, or just want to say hi, feel free to reach out.",
    message: "Passionate about building useful products with technology.",
  },
  es: {
    "nav.about": "Sobre mí", "nav.experience": "Experiencia", "nav.skills": "Habilidades", "nav.contact": "Contacto",
    "hero.kicker": "Desarrollador Full-Stack · República Dominicana", "hero.button": "Conoce más sobre mí ↓",
    "about.label": "01 / SOBRE MÍ", "about.title": "Construyendo", "about.titleAccent": "experiencias digitales.",
    "experience.label": "02 / EXPERIENCIA", "skills.label": "03 / HABILIDADES", "skills.title": "Herramientas para convertir",
    "skills.titleAccent": "ideas en realidad.", "skills.description": "Mi conjunto de herramientas combina frontend, arquitectura backend, bases de datos y hábitos que mantienen cada proyecto avanzando.",
    "contact.label": "04 / CONTACTO", "contact.title": "¿Tienes una idea?", "contact.titleAccent": "Construyámosla.",
    "contact.description": "Si conoces una oportunidad, tienes una pregunta o simplemente quieres saludar, escríbeme.",
    message: "Apasionado por crear productos útiles usando tecnología.",
  },
};
let language = "en";
let message = translations[language].message;
const typing = document.querySelector("#typing");
let index = 0;

function typeMessage() {
  if (index < message.length) {
    typing.textContent += message[index];
    index += 1;
    window.setTimeout(typeMessage, 42);
  }
}

window.setTimeout(typeMessage, 500);
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#language-toggle").addEventListener("click", () => {
  language = language === "en" ? "es" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translations[language][element.dataset.i18n];
  });
  document.querySelector("#language-toggle").textContent = language === "en" ? "ES" : "EN";
  message = translations[language].message;
  typing.textContent = "";
  index = 0;
  typeMessage();
});

document.querySelector("#theme-toggle").addEventListener("click", (event) => {
  document.body.classList.toggle("light-mode");
  const light = document.body.classList.contains("light-mode");
  event.currentTarget.textContent = light ? "☾" : "☼";
});

const canvas = document.querySelector("#particle-canvas");
const context = canvas.getContext("2d");
const particles = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createParticles() {
  particles.length = 0;
  const count = Math.min(95, Math.floor(window.innerWidth / 13));
  for (let particleIndex = 0; particleIndex < count; particleIndex += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.4 + .5,
      speed: Math.random() * .28 + .08,
      drift: (Math.random() - .5) * .18,
      color: Math.random() > .83 ? "#f0b77a" : "#8de7df",
    });
  }
}

function animateParticles() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => {
    particle.y -= particle.speed;
    particle.x += particle.drift;
    if (particle.y < -10) particle.y = window.innerHeight + 10;
    if (particle.x < -10) particle.x = window.innerWidth + 10;
    if (particle.x > window.innerWidth + 10) particle.x = -10;
    context.globalAlpha = .25 + particle.size / 4;
    context.fillStyle = particle.color;
    context.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
animateParticles();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".animate-in").forEach((element) => revealObserver.observe(element));
