import "../css/style.css";

import Typed from "typed.js";
import ScrollReveal from "scrollreveal";

// ==========================
// MENÚ RESPONSIVE
// ==========================

function myMenuFunction() {
  const menu = document.getElementById("myNavMenu");

  if (menu) {
    menu.classList.toggle("responsive");
  }
}

// Hace la función accesible desde el HTML (onclick)
window.myMenuFunction = myMenuFunction;

// ==========================
// MODO OSCURO
// ==========================

const body = document.body;
const toggleSwitch = document.getElementById("toggle-switch");

if (toggleSwitch) {
  toggleSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
  });
}

// ==========================
// TYPED.JS
// ==========================

if (typeof Typed !== "undefined" && document.querySelector(".typedText")) {
  new Typed(".typedText", {
    strings: ["Designer", "Coder", "Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });
}

// ==========================
// SCROLLREVEAL
// ==========================

if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
  });

  sr.reveal(".featured-name", {
    delay: 100,
  });

  sr.reveal(".text-info", {
    delay: 200,
  });

  sr.reveal(".text-btn", {
    delay: 200,
  });

  sr.reveal(".socical_icons", {
    delay: 200,
  });

  sr.reveal(".featured-image", {
    delay: 320,
  });

  sr.reveal(".project-box", {
    interval: 200,
  });

  sr.reveal(".top-header");

  const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
  });

  srLeft.reveal(".about-info", {
    delay: 100,
  });

  srLeft.reveal(".contact-info", {
    delay: 100,
  });

  const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
  });

  srRight.reveal(".skill", {
    delay: 100,
  });

  srRight.reveal(".skill-box", {
    delay: 100,
  });
}

// ==========================
// LINK ACTIVO DEL MENÚ
// ==========================

const sections = document.querySelectorAll(".section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

    if (!navLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

// ==========================
// BOTÓN VOLVER
// ==========================

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    alert("No hay una página anterior.");
  }
}

window.goBack = goBack;
