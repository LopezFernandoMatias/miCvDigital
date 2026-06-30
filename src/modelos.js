import "./modelos.css";

const track = document.getElementById("track");

const modelos = [
  {
    img: "https://i.postimg.cc/7Zws8Kp5/1.webp",
    link: "porfolios/porfolio1/index.html",
  },
  {
    img: "https://i.postimg.cc/g2sMYvWN/2.webp",
    link: "porfolios/porfolio2/index.html",
  },
  {
    img: "https://i.postimg.cc/1XDHbFB0/3.webp",
    link: "porfolios/porfolio3/index.html",
  },
  {
    img: "https://i.postimg.cc/PfD2LGHL/4.webp",
    link: "porfolios/porfolio4/index.html",
  },
  {
    img: "https://i.postimg.cc/VLBgRjdm/5.webp",
    link: "porfolios/porfolio5/index.html",
  },
  {
    img: "https://i.postimg.cc/vHc87vP6/6.webp",
    link: "porfolios/porfolio6/index.html",
  },
  {
    img: "https://i.postimg.cc/wjqVb7mJ/7.webp",
    link: "porfolios/porfolio7/index.html",
  },
  {
    img: "https://i.postimg.cc/k5Dyqzwg/8.webp",
    link: "porfolios/porfolio8/index.html",
  },
  {
    img: "https://i.postimg.cc/jdm8CswJ/portada.png",
    link: "porfolios/porfolio9/index.html",
  },
  {
    img: "https://i.postimg.cc/NFv88MtK/10.webp",
    link: "porfolios/porfolio10/index.html",
  },
  {
    img: "https://i.postimg.cc/GmmFxVWx/11.webp",
    link: "porfolios/porfolio11/index.html",
  },
  {
    img: "https://i.postimg.cc/q7t29nMt/12.webp",
    link: "porfolios/porfolio12/index.html",
  },
  {
    img: "https://i.postimg.cc/FzxSjVG6/13.webp",
    link: "porfolios/porfolio13/index.html",
  },
  {
    img: "https://i.postimg.cc/J4PJ0KsD/14.webp",
    link: "porfolios/porfolio14/index.html",
  },
  {
    img: "https://i.postimg.cc/MpLQbTbz/15.webp",
    link: "porfolios/porfolio15/index.html",
  },
  {
    img: "https://i.postimg.cc/9fqqxhJZ/16.webp",
    link: "porfolios/porfolio16/index.html",
  },
  {
    img: "https://i.postimg.cc/vTGgH6Mt/17.webp",
    link: "porfolios/porfolio17/index.html",
  },
  {
    img: "https://i.postimg.cc/8z7F5G89/18.webp",
    link: "porfolios/porfolio18/index.html",
  },
  {
    img: "https://i.postimg.cc/g21xL7mJ/19.webp",
    link: "porfolios/porfolio19/index.html",
  },
  {
    img: "https://i.postimg.cc/CKDzG4x4/20.webp",
    link: "porfolios/porfolio20/index.html",
  },
  {
    img: "https://i.postimg.cc/nzJM0Qsf/21.webp",
    link: "porfolios/porfolio21/index.html",
  },
  {
    img: "https://i.postimg.cc/85mc3PWJ/22.webp",
    link: "porfolios/porfolio22/index.html",
  },
  {
    img: "https://i.postimg.cc/pr0TWGsP/23.webp",
    link: "porfolios/porfolio23/index.html",
  },
  {
    img: "https://i.postimg.cc/pXTrGvdr/24.webp",
    link: "porfolios/porfolio24/index.html",
  },
];

let currentIndex = Math.floor(modelos.length / 2);

const angleStep = 22;

// =========================
// Crear tarjetas
// =========================

modelos.forEach((modelo) => {
  const card = document.createElement("div");

  card.className = "card";
  card.style.backgroundImage = `url(${modelo.img})`;

  card.dataset.link = modelo.link;

  track.appendChild(card);
});

const cards = [...document.querySelectorAll(".card")];

// =========================
// Render
// =========================

function updateCards() {
  cards.forEach((card, i) => {
    let diff = i - currentIndex;

    if (diff > modelos.length / 2) {
      diff -= modelos.length;
    }

    if (diff < -modelos.length / 2) {
      diff += modelos.length;
    }

    const isActive = i === currentIndex;

    card.style.transform = `
      rotate(${diff * angleStep}deg)
      rotateX(var(--rx, 0deg))
      rotateY(var(--ry, 0deg))
      translateZ(${isActive ? 60 : 0}px)
      scale(${isActive ? 1.15 : 0.8})
    `;

    card.classList.toggle("active", isActive);
  });
}

// =========================
// Carrusel infinito
// =========================

function move(dir) {
  currentIndex = (currentIndex + dir + modelos.length) % modelos.length;

  updateCards();
}

// =========================
// Inicializar
// =========================

updateCards();

// =========================
// Click en tarjeta activa
// =========================

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("active")) return;

    const destino = card.dataset.link;

    if (destino) {
      window.location.href = destino;
    }
  });
});

// =========================
// Mouse Wheel
// =========================

let lastScroll = 0;

window.addEventListener("wheel", (e) => {
  if (Date.now() - lastScroll < 400) return;

  lastScroll = Date.now();

  move(e.deltaY > 0 ? 1 : -1);
});

// =========================
// Botones
// =========================

document.getElementById("prevBtn")?.addEventListener("click", () => move(-1));

document.getElementById("nextBtn")?.addEventListener("click", () => move(1));

// =========================
// Swipe táctil
// =========================

let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;

  if (Math.abs(diff) > 50) {
    move(diff > 0 ? 1 : -1);
  }
});

// =========================
// Drag con mouse
// =========================

let dragging = false;
let mouseStartX = 0;

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

// =========================
// Movimiento 3D por mouse
// =========================

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const offsetX = (e.clientX - centerX) / centerX;
  const offsetY = (e.clientY - centerY) / centerY;

  cards.forEach((card) => {
    card.style.setProperty("--rx", `${offsetY * -8}deg`);

    card.style.setProperty("--ry", `${offsetX * 8}deg`);

    card.style.setProperty("--shine-x", `${50 + offsetX * 40}%`);

    card.style.setProperty("--shine-y", `${50 + offsetY * 40}%`);
  });
});

// =========================
// Movimiento por giroscopio
// =========================

if ("DeviceOrientationEvent" in window) {
  window.addEventListener("deviceorientation", (event) => {
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;

    cards.forEach((card) => {
      card.style.setProperty("--rx", `${-(beta * 0.2)}deg`);

      card.style.setProperty("--ry", `${gamma * 0.5}deg`);

      card.style.setProperty("--shine-x", `${50 + gamma}%`);

      card.style.setProperty("--shine-y", `${50 + beta * 0.5}%`);
    });
  });
}
