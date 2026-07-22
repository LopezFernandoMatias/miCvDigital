import "./style.css";

import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

let eighty;

const LINES = [...document.querySelectorAll("#headline span")].map((span) =>
  span.textContent.trim().toUpperCase(),
);

const BG = "#ffffff";
const INK = "#111111";
const CAMERA_Z = 6;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const canvas = document.getElementById("scene");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(BG);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = CAMERA_Z;

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const textCanvas = document.createElement("canvas");
const textCtx = textCanvas.getContext("2d");
let textTexture = null;

const textPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({
    toneMapped: false,
  }),
);

scene.add(textPlane);

//==========================
// MATERIAL DEL 80
//==========================

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  thickness: 0.7,
  ior: 1.45,
  dispersion: 4,
  envMapIntensity: 1,
  toneMapped: false,
});

//==========================
// CARGA DE LA FUENTE
//==========================

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const geometry = new TextGeometry("80%", {
    font,

    size: 2.8,
    depth: 0.55,

    curveSegments: 32,

    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 12,
  });

  geometry.center();

  eighty = new THREE.Mesh(geometry, glassMaterial);

  eighty.position.z = 2.2;

  scene.add(eighty);

  resize();
});

//==========================
// TEXTO DE FONDO
//==========================

function drawText(width, height) {
  const dpr = Math.min(window.devicePixelRatio, 2);

  textCanvas.width = Math.round(width * dpr);
  textCanvas.height = Math.round(height * dpr);

  textCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  textCtx.fillStyle = BG;
  textCtx.fillRect(0, 0, width, height);

  textCtx.fillStyle = INK;
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";

  const maxWidth = width * 0.92;
  const maxHeight = height * 0.78;

  const baseSize = 100;
  const lineGap = 0.98;

  textCtx.font = `900 ${baseSize}px "Inter Tight", sans-serif`;

  const sizes = LINES.map(
    (line) => baseSize * (maxWidth / textCtx.measureText(line).width),
  );

  const totalHeight = sizes.reduce((sum, size) => sum + size * lineGap, 0);

  const fit = Math.min(1, maxHeight / totalHeight);

  let y = height / 2 - (totalHeight * fit) / 2;

  LINES.forEach((line, i) => {
    const size = sizes[i] * fit;

    textCtx.font = `900 ${size}px "Inter Tight", sans-serif`;

    y += (size * lineGap) / 2;

    textCtx.fillText(line, width / 2, y);

    y += (size * lineGap) / 2;
  });

  if (textTexture) textTexture.dispose();

  textTexture = new THREE.CanvasTexture(textCanvas);

  textTexture.colorSpace = THREE.SRGBColorSpace;

  textTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  textPlane.material.map = textTexture;
  textPlane.material.needsUpdate = true;
}

//==========================
// RESIZE
//==========================

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const visibleHeight =
    2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

  const visibleWidth = visibleHeight * camera.aspect;

  textPlane.scale.set(visibleWidth, visibleHeight, 1);

  if (eighty) {
    const scale = Math.min(visibleWidth, visibleHeight) * 0.09;

    eighty.scale.setScalar(scale);
  }

  drawText(width, height);
}

//==========================
// MOUSE
//==========================

const pointer = new THREE.Vector2();

window.addEventListener("pointermove", (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
});

//==========================
// ANIMACIÓN
//==========================

const clock = new THREE.Clock();

function render() {
  const t = clock.getElapsedTime();

  if (eighty) {
    if (!reducedMotion) {
      eighty.rotation.x = t * 0.35 + pointer.y * 0.15;
      eighty.rotation.y = t * 0.5 + pointer.x * 0.2;
    } else {
      eighty.rotation.set(0.6, 0.4, 0);
    }
  }

  renderer.render(scene, camera);
}

//==========================
// DEBOUNCE
//==========================

function debounce(fn, delay) {
  let timeoutId;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
}

const debouncedResize = debounce(resize, 150);

window.addEventListener("resize", () => {
  debouncedResize();
});

//==========================
// INICIO
//==========================

document.fonts.ready.then(() => {
  resize();

  if (reducedMotion) {
    render();
  } else {
    renderer.setAnimationLoop(render);
  }
});
