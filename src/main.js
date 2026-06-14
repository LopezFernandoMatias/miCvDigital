import "./style.css";

const cursor = document.getElementById("cursor");
let hasMouse = false;

window.addEventListener(
  "mousemove",
  () => {
    if (!hasMouse) {
      hasMouse = true;
      cursor.classList.add("visible");
      document.body.style.cursor = "none";
    }
  },
  { once: false },
);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document
  .querySelectorAll("a, button, .shake-card, .ing-card, .hero-pill")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });

/* ======================================================
     SLIDER
     ====================================================== */
const track = document.getElementById("sliderTrack");
const viewport = document.getElementById("sliderViewport");
const cards = Array.from(track.querySelectorAll(".shake-card"));
const total = cards.length;
const dotsWrap = document.getElementById("sliderDots");
let current = 0;
let isDragging = false;
let dragStartX = 0;
let dragCurrentX = 0;
let baseOffset = 0;

cards.forEach((_, i) => {
  const d = document.createElement("div");
  d.className = "slider-dot" + (i === 0 ? " active" : "");
  d.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(d);
});

function cardWidth() {
  return cards[0].getBoundingClientRect().width + 24;
}

function applyTranslate(px, animate) {
  track.style.transition = animate
    ? "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)"
    : "none";
  track.style.transform = `translateX(${px}px)`;
}

function goTo(index) {
  current = Math.max(0, Math.min(total - 1, index));
  baseOffset = -(current * cardWidth());
  applyTranslate(baseOffset, true);
  dotsWrap
    .querySelectorAll(".slider-dot")
    .forEach((d, i) => d.classList.toggle("active", i === current));
}

function onDragStart(e) {
  isDragging = true;
  dragStartX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
  dragCurrentX = dragStartX;
  track.classList.add("dragging");
  if (e.type === "mousedown") e.preventDefault();
}

function onDragMove(e) {
  if (!isDragging) return;
  dragCurrentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
  const diff = dragCurrentX - dragStartX;
  applyTranslate(baseOffset + diff, false);
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove("dragging");
  const diff = dragCurrentX - dragStartX;
  if (diff < -60) goTo(current + 1);
  else if (diff > 60) goTo(current - 1);
  else goTo(current);
}

track.addEventListener("mousedown", onDragStart);
window.addEventListener("mousemove", onDragMove);
window.addEventListener("mouseup", onDragEnd);
track.addEventListener("touchstart", onDragStart, { passive: true });
track.addEventListener("touchmove", onDragMove, { passive: true });
track.addEventListener("touchend", onDragEnd);

track.addEventListener(
  "click",
  (e) => {
    if (Math.abs(dragCurrentX - dragStartX) > 5) e.preventDefault();
  },
  true,
);

document
  .getElementById("nextBtn")
  .addEventListener("click", () => goTo(current + 1));
document
  .getElementById("prevBtn")
  .addEventListener("click", () => goTo(current - 1));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goTo(current + 1);
  if (e.key === "ArrowLeft") goTo(current - 1);
});

window.addEventListener("resize", () => goTo(current));

/* ======================================================
     HERO FLAVOR SWITCHER
     ====================================================== */
const heroImg = document.getElementById("heroShakeImg");
const pills = document.querySelectorAll(".hero-pill");
const shakeImgs = [
  "https://rassweiler-it.de/images/codepen/codepen_shake_strawberry.png",
  "https://rassweiler-it.de/images/codepen/codepen_shake_1.png",
  "https://rassweiler-it.de/images/codepen/codepen_shake_2.png",
  "https://rassweiler-it.de/images/codepen/codepen_shake_3.png",
  "https://rassweiler-it.de/images/codepen/codepen_shake_4.png",
];
let heroIdx = 0;

function switchFlavor(idx) {
  heroIdx = idx;
  heroImg.style.opacity = "0";
  setTimeout(() => {
    heroImg.src = shakeImgs[heroIdx];
    heroImg.style.opacity = "1";
  }, 220);
  pills.forEach((p, i) => p.classList.toggle("active", i === heroIdx));
}

heroImg.addEventListener("click", () =>
  switchFlavor((heroIdx + 1) % shakeImgs.length),
);
pills.forEach((pill, i) =>
  pill.addEventListener("click", () => switchFlavor(i)),
);
