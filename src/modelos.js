import "./modelos.css";

const track = document.getElementById("track");

/* =====================================
   MODELOS
===================================== */

/*Si no quiero crear una lista tan grande y tan dificil de mantener puedo crear un foreach */

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
  },/*
  {
    img: "https://i.postimg.cc/VLBgRjdm/5.webp",
    link: "porfolios/porfolio5/index.html",
  },*/
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
  },/*
  {
    img: "https://i.postimg.cc/q7t29nMt/12.webp",
    link: "porfolios/porfolio12/index.html",
  },*/
  {
    img: "https://i.postimg.cc/FzxSjVG6/13.webp",
    link: "porfolios/porfolio13/index.html",
  },
  {
    img: "https://i.postimg.cc/J4PJ0KsD/14.webp",
    link: "porfolios/porfolio14/index.html",
  },/*
  {
    img: "https://i.postimg.cc/MpLQbTbz/15.webp",
    link: "porfolios/porfolio15/index.html",
  },*//*
  {
    img: "https://i.postimg.cc/9fqqxhJZ/16.webp",
    link: "porfolios/porfolio16/index.html",
  },*/
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
  },/*
  {
    img: "https://i.postimg.cc/CKDzG4x4/20.webp",
    link: "porfolios/porfolio20/index.html",
  },*//*
  {
    img: "https://i.postimg.cc/nzJM0Qsf/21.webp",
    link: "porfolios/porfolio21/index.html",
  },*//*
  {
    img: "https://i.postimg.cc/85mc3PWJ/22.webp",
    link: "porfolios/porfolio22/index.html",
  },*//*
  {
    img: "https://i.postimg.cc/pr0TWGsP/23.webp",
    link: "porfolios/porfolio23/index.html",
  },*//*
  {
    img: "https://i.postimg.cc/pXTrGvdr/24.webp",
    link: "porfolios/porfolio24/index.html",
  },*/
];

/* =====================================
   VARIABLES
===================================== */

const angleStep = 22;
let currentIndex = Math.floor(modelos.length / 2);

/* =====================================
   CREAR TARJETAS
===================================== */

modelos.forEach((modelo) => {
  const card = document.createElement("div");

  card.className = "card";
  card.style.backgroundImage = `url(${modelo.img})`;

  card.dataset.link = modelo.link;

  track.appendChild(card);
});

const cards = [...track.querySelectorAll(".card")];

/* =====================================
   RENDER
===================================== */

function updateCards() {
  cards.forEach((card, index) => {
    let diff = index - currentIndex;

    if (diff > modelos.length / 2) diff -= modelos.length;
    if (diff < -modelos.length / 2) diff += modelos.length;

    const active = index === currentIndex;

    card.style.transform = `
        rotate(${diff * angleStep}deg)
        rotateX(var(--rx,0deg))
        rotateY(var(--ry,0deg))
        translateZ(${active ? 60 : 0}px)
        scale(${active ? 1.15 : 0.8})
    `;

    card.classList.toggle("active", active);
  });
}

/* =====================================
   MOVER
===================================== */

function move(direction) {
  currentIndex = (currentIndex + direction + modelos.length) % modelos.length;

  updateCards();
}

updateCards();

/* =====================================
   CLICK
===================================== */

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("active")) return;

    const destino = card.dataset.link;

    if (destino) {
      window.location.href = import.meta.env.BASE_URL + destino;
    }
  });
});

/* =====================================
   BOTONES
===================================== */

document.getElementById("prevBtn")?.addEventListener("click", () => move(-1));

document.getElementById("nextBtn")?.addEventListener("click", () => move(1));

/* =====================================
   RUEDA
===================================== */

let lastScroll = 0;

window.addEventListener("wheel", (e) => {
  if (Date.now() - lastScroll < 400) return;

  lastScroll = Date.now();

  move(e.deltaY > 0 ? 1 : -1);
});

/* =====================================
   SWIPE
===================================== */

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

/* =====================================
   DRAG
===================================== */

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

/* =====================================
   EFECTO 3D MOUSE
===================================== */

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;

  cards.forEach((card) => {
    card.style.setProperty("--rx", `${-y}deg`);
    card.style.setProperty("--ry", `${x}deg`);

    card.style.setProperty("--shine-x", `${50 + x * 2}%`);
    card.style.setProperty("--shine-y", `${50 + y * 2}%`);
  });
});

/* =====================================
   GIROSCOPIO
===================================== */

if (window.DeviceOrientationEvent) {
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
