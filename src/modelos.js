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
const angleStep = 22; // Distance between cards in degrees

// Initialize Cards
imgUrls.forEach((url, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${url})`;
  track.appendChild(card);
});

const cards = document.querySelectorAll(".card");

function updateCards() {
  cards.forEach((card, i) => {
    // Calculate the rotation for THIS card based on the current center index
    const cardRotation = (i - currentIndex) * angleStep;

    card.style.transform = `rotate(${cardRotation}deg)`;

    // Toggle active classes
    if (i === currentIndex) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

function move(dir) {
  const newIndex = currentIndex + dir;
  if (newIndex >= 0 && newIndex < imgUrls.length) {
    currentIndex = newIndex;
    updateCards();
  }
}

// Run on load
updateCards();

// Mouse Wheel
let lastScroll = 0;
window.addEventListener("wheel", (e) => {
  if (Date.now() - lastScroll < 600) return;
  lastScroll = Date.now();
  move(e.deltaY > 0 ? 1 : -1);
});

document.getElementById("prevBtn").addEventListener("click", () => move(-1));
document.getElementById("nextBtn").addEventListener("click", () => move(1));

let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;

  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      move(1); // izquierda
    } else {
      move(-1); // derecha
    }
  }
});

// =====================
// Swipe táctil
// =====================

let startX = 0;
let startY = 0;
let isDragging = false;

track.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  },
  { passive: true }
);

track.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;

    const deltaX = Math.abs(e.touches[0].clientX - startX);
    const deltaY = Math.abs(e.touches[0].clientY - startY);

    // Si el gesto es más horizontal que vertical,
    // evitamos que la página interfiera.
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  },
  { passive: false }
);

track.addEventListener(
  "touchend",
  (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    const threshold = 50; // mínimo desplazamiento

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        move(1); // swipe izquierda
      } else {
        move(-1); // swipe derecha
      }
    }

    isDragging = false;
  },
  { passive: true }
);
