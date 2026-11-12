const message = "Passionate about building useful products with technology.";
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
