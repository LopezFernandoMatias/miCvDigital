import "../css/style.css";

// ===========================
// Menú Responsive
// ===========================

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    console.log(navbar.className);
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
    console.log(navbar.className);
  });
}

// ===========================
// Scroll
// ===========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(`header nav a[href*="${id}"]`);

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});

// ===========================
// Volver
// ===========================

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    alert("No hay una página anterior en el historial.");
  }
}

// Hacer la función visible desde el HTML
window.goBack = goBack;

const btnBack = document.getElementById("btnBack");

if (btnBack) {
    btnBack.addEventListener("click", goBack);
}
