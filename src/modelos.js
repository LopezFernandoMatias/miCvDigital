import "./modelos.css";

const track = document.getElementById("track");

const imgUrls = [
  "https://i.postimg.cc/7Zws8Kp5/1.webp",
  "https://i.postimg.cc/g2sMYvWN/2.webp",
  "https://i.postimg.cc/1XDHbFB0/3.webp",
  "https://i.postimg.cc/PfD2LGHL/4.webp",
  "https://i.postimg.cc/VLBgRjdm/5.webp",
  "https://i.postimg.cc/vHc87vP6/6.webp",
  "https://i.postimg.cc/wjqVb7mJ/7.webp",
  "https://i.postimg.cc/k5Dyqzwg/8.webp",
  "https://i.postimg.cc/jdm8CswJ/portada.png",
  "https://i.postimg.cc/NFv88MtK/10.webp",
  "https://i.postimg.cc/GmmFxVWx/11.webp",
  "https://i.postimg.cc/q7t29nMt/12.webp",
  "https://i.postimg.cc/FzxSjVG6/13.webp",
  "https://i.postimg.cc/J4PJ0KsD/14.webp",
  "https://i.postimg.cc/MpLQbTbz/15.webp",
  "https://i.postimg.cc/9fqqxhJZ/16.webp",
  "https://i.postimg.cc/vTGgH6Mt/17.webp",
  "https://i.postimg.cc/8z7F5G89/18.webp",
  "https://i.postimg.cc/g21xL7mJ/19.webp",
  "https://i.postimg.cc/CKDzG4x4/20.webp",
  "https://i.postimg.cc/nzJM0Qsf/21.webp",
  "https://i.postimg.cc/85mc3PWJ/22.webp",
  "https://i.postimg.cc/pr0TWGsP/23.webp",
  "https://i.postimg.cc/pXTrGvdr/24.webp",
];

let currentIndex = Math.floor(imgUrls.length / 2);
const angleStep = 22;

// =====================
// Crear tarjetas
// =====================

imgUrls.forEach((url) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${url})`;
  track.appendChild(card);
});

const cards = document.querySelectorAll(".card");

// =====================
// Render
// =====================

function updateCards() {
  cards.forEach((card, i) => {
    let diff = i - currentIndex;

    if (diff > imgUrls.length / 2) {
      diff -= imgUrls.length;
    }

    if (diff < -imgUrls.length / 2) {
      diff += imgUrls.length;
    }

    card.style.transform = `rotate(${diff * angleStep}deg)`;

    card.classList.toggle("active", i === currentIndex);
  });
}

// =====================
// Carrusel infinito
// =====================

function move(dir) {
  currentIndex = (currentIndex + dir + imgUrls.length) % imgUrls.length;

  updateCards();
}

// =====================
// Inicializar
// =====================

updateCards();

// =====================
// Mouse Wheel
// =====================

let lastScroll = 0;

window.addEventListener("wheel", (e) => {
  if (Date.now() - lastScroll < 400) return;

  lastScroll = Date.now();

  move(e.deltaY > 0 ? 1 : -1);
});

// =====================
// Botones
// =====================

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
  prevBtn.addEventListener("click", () => move(-1));
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => move(1));
}

// =====================
// Swipe táctil
// =====================

let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;

  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    move(diff > 0 ? 1 : -1);
  }
});

// =====================
// Drag con mouse
// =====================

let mouseStartX = 0;
let dragging = false;

track.addEventListener("mousedown", (e) => {
  dragging = true;
  mouseStartX = e.clientX;
});

window.addEventListener("mouseup", (e) => {
  if (!dragging) return;

  dragging = false;

  const diff = mouseStartX - e.clientX;

  if (Math.abs(diff) > 50) {
    move(diff > 0 ? 1 : -1);
  }
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;

    cards.forEach((card) => {
      const x = gamma * 0.5;
      const y = beta * 0.2;

      card.style.setProperty("--rx", `${-y}deg`);
      card.style.setProperty("--ry", `${x}deg`);
    });
  });
}
