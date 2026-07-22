import "../css/style.css";
import * as THREE from "https://esm.sh/three@0.136.0/build/three.module.js";
import { EffectComposer } from "https://esm.sh/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://esm.sh/three@0.136.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://esm.sh/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "https://esm.sh/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js";
import { FontLoader } from "https://esm.sh/three@0.136.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://esm.sh/three@0.136.0/examples/jsm/geometries/TextGeometry.js";
import Stats from "https://esm.sh/stats.js";

const stats = new Stats();
stats.showPanel(0);
stats.dom.id = "stats";
document.body.appendChild(stats.dom);
stats.dom.style.display = "none";
let statsVisible = false;

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    statsVisible = !statsVisible;
    stats.dom.style.display = statsVisible ? "block" : "none";
  }
});

// ─────────────────────────────────────────────
// THEMES (palette aléatoire)
// ─────────────────────────────────────────────
const THEMES = [
  {
    name: "Crimson Void",
    bg: 0x050508,
    accent: 0xff3333,
    secondary: 0xff8866,
    fog: 0x050508,
  },
  {
    name: "Acid Circuit",
    bg: 0x020a04,
    accent: 0x00ff88,
    secondary: 0x88ffcc,
    fog: 0x020a04,
  },
  {
    name: "Gold Ritual",
    bg: 0x080600,
    accent: 0xffd700,
    secondary: 0xff9900,
    fog: 0x080600,
  },
  {
    name: "Cyan Void",
    bg: 0x000a10,
    accent: 0x00d4ff,
    secondary: 0x0066ff,
    fog: 0x000a10,
  },
  {
    name: "Ghost White",
    bg: 0x0a0a0a,
    accent: 0xfafafa,
    secondary: 0xcccccc,
    fog: 0x0a0a0a,
  },
  {
    name: "Violet Dream",
    bg: 0x050008,
    accent: 0xcc44ff,
    secondary: 0xff44aa,
    fog: 0x050008,
  },
];

let themeIdx = Math.floor(Math.random() * THEMES.length);
let theme = THEMES[themeIdx];

const SECTION_LABELS = ["STUDIO", "WORK", "ABOUT", "CONTACT"];
const SECTION_SUBS = [
  "Creating experiences\nthat matter.",
  "Selected projects.",
  "Who we are.",
  "Let's\nbuild together.",
];
const SECTION_Z = [0, -300, -600, -900];
const SECTION_COUNT = 4;
const SECTION_Z_DIFF = 30;

// ─────────────────────────────────────────────
// SCENE SETUP
// ─────────────────────────────────────────────
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  innerWidth / innerHeight,
  0.1,
  1200,
);
camera.position.set(0, 0, SECTION_Z_DIFF);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.appendChild(renderer.domElement);

// ─────────────────────────────────────────────
// LIGHTS
// ─────────────────────────────────────────────
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight1.position.set(10, 20, 30);
scene.add(dirLight1);

const accentLight = new THREE.PointLight(theme.accent, 3, 80);
accentLight.position.set(-15, 10, 30);
scene.add(accentLight);

const secondaryLight = new THREE.PointLight(theme.secondary, 2, 80);
secondaryLight.position.set(20, -10, 20);
scene.add(secondaryLight);

// Apply initial theme now that lights exist
applyTheme();

// ─────────────────────────────────────────────
// POST-PROCESSING
// ─────────────────────────────────────────────
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  1.6,
  0.5,
  0.7,
);
bloomPass.threshold = 0.05;
bloomPass.strength = 1;
bloomPass.radius = 0.15;
composer.addPass(bloomPass);

// ---------------
const grainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
  },
  vertexShader: `
            varying vec2 vUv;
            void main() {
                  vUv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
          `,
  fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            varying vec2 vUv;

            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                float grain = fract(sin(dot(vUv.xy, vec2(12.9898, 78.233))) * 43758.5453 + time);
                color.rgb += (grain - 0.5) * 0.05; // Ajustement du grain
                gl_FragColor = color;
            }
            `,
};

const grainPass = new ShaderPass(grainShader);
composer.addPass(grainPass);

const scanLinePass = new ShaderPass({
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
    lineHeight: { value: 4.0 },
    lineSpacing: { value: 2.0 },
    opacity: { value: 0.1 },
  },
  vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
  fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float time;
          uniform float lineHeight;
          uniform float lineSpacing;
          uniform float opacity;
          varying vec2 vUv;

          void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            float scanline = step(lineSpacing, mod(gl_FragCoord.y, lineHeight)) * opacity;
            color.rgb += scanline;
            gl_FragColor = color;
          }
        `,
  blending: THREE.AdditiveBlending,
});
composer.addPass(scanLinePass);

// ─────────────────────────────────────────────
// IRIDESCENT SHADER MATERIAL
// ─────────────────────────────────────────────
function makeIridescentMaterial(baseColor) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uBaseColor: { value: new THREE.Color(baseColor) },
      uAccent: { value: new THREE.Color(theme.accent) },
      uSecondary: { value: new THREE.Color(theme.secondary) },
      uLightPos: { value: new THREE.Vector3(10, 10, 100) },
      uTime: { value: 0 },
      uOpacity: { value: 1.0 },
    },
    transparent: true, // ⭐ indispensable
    depthWrite: false, // ⭐ évite que le texte soit masqué
    side: THREE.DoubleSide,

    vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uOpacity;

          void main(){
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = vec3(modelViewMatrix * vec4(position,1.));
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
          }
        `,
    fragmentShader: `
          varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
          uniform vec3 uBaseColor; uniform vec3 uAccent; uniform vec3 uSecondary;
          uniform vec3 uLightPos; uniform float uTime;
          void main(){
            vec3 n = normalize(vNormal);
            vec3 v = normalize(-vPosition);
            vec3 l = normalize(uLightPos - vPosition);
            vec3 h = normalize(l + v);
            float fresnel = pow(1. - max(dot(v,n),0.), 3.);
            float spec = pow(max(dot(n,h),0.), 32.);
            vec3 iri = mix(uAccent, uSecondary, sin(fresnel*3.14 + uTime*.5)*.5+.5);
            vec3 col = mix(uBaseColor, iri, fresnel*.8) + spec * .6 * uAccent;
            gl_FragColor = vec4(col, 1.);
          }
        `,
    side: THREE.DoubleSide,
  });
}
function makeIridescentMaterial2(baseColor) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uBaseColor: { value: new THREE.Color(baseColor) },
      uAccent: { value: new THREE.Color(theme.accent) },
      uSecondary: { value: new THREE.Color(theme.secondary) },
      uLightPos: { value: new THREE.Vector3(10, 10, 100) },
      uTime: { value: 0 },
      uOpacity: { value: 1.0 },
    },
    transparent: true, // ⭐ indispensable
    depthWrite: false, // ⭐ évite que le texte soit masqué
    side: THREE.DoubleSide,

    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,

    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec2 vUv;
      uniform float uOpacity;

      uniform vec3 uBaseColor;
      uniform vec3 uAccent;
      uniform vec3 uSecondary;
      uniform vec3 uLightPos;
      uniform float uTime;

      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(cameraPosition - vWorldPosition);
        vec3 L = normalize(uLightPos - vWorldPosition);
        vec3 H = normalize(L + V);

        // Fresnel
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);

        // Specular
        float spec = pow(max(dot(N, H), 0.0), 32.0);

        // Iridescence oscillant entre accent et secondary
        float shift = sin(fresnel * 3.14159 + uTime * 0.5) * 0.5 + 0.5;
        vec3 iri = mix(uAccent, uSecondary, shift);

        // Couleur finale
        vec3 col = mix(uBaseColor * 0.01, iri, fresnel * 0.8);
        col += spec * 0.6 * uAccent;

        gl_FragColor = vec4(col, uOpacity);
      }
    `,
    side: THREE.DoubleSide,
  });
}

// ─────────────────────────────────────────────
// GEOMETRY BUILDERS
// ─────────────────────────────────────────────
const GEOM_FACTORIES = [
  () => new THREE.BoxGeometry(1, 1, 1),
  () => new THREE.SphereGeometry(0.6, 16, 16),
  () => new THREE.ConeGeometry(0.6, 1.4, 4),
  () => new THREE.CylinderGeometry(0.4, 0.6, 1.2, 6),
  () => new THREE.TorusGeometry(0.6, 0.2, 12, 32),
  () => new THREE.OctahedronGeometry(0.8),
  () => new THREE.TetrahedronGeometry(0.9),
  () => new THREE.IcosahedronGeometry(0.7),
];

function randomGeom() {
  return GEOM_FACTORIES[Math.floor(Math.random() * GEOM_FACTORIES.length)]();
}

function randomMaterial(forceWireframe) {
  const c = new THREE.Color(theme.accent).lerp(
    new THREE.Color(theme.secondary),
    Math.random(),
  );
  const wf =
    forceWireframe !== undefined ? forceWireframe : Math.random() > 0.55;
  const mats = [
    new THREE.MeshPhongMaterial({ color: c, shininess: 120, wireframe: wf }),
    new THREE.MeshStandardMaterial({
      color: c,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: wf,
    }),
    new THREE.MeshPhysicalMaterial({
      color: c,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      wireframe: wf,
    }),
    new THREE.MeshToonMaterial({ color: c, wireframe: wf }),
  ];
  return mats[Math.floor(Math.random() * mats.length)];
}

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let currentSection = 0;
let targetZ = camera.position.z;
let targetY = camera.position.y;
let isAnimating = false;
const sectionObjects = [[], [], [], []]; // objects per section
const iridMaterials = [];
let font = null;
let textMeshes = [];
let orbitalGroups = [];
let particles = null;
let boxes = [];

// ─────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────
function buildParticles() {
  if (particles) {
    scene.remove(particles);
    particles.geometry.dispose();
  }
  const geo = new THREE.BufferGeometry();
  const N = 600;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 300;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 300;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 400 - 150;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: theme.accent,
    size: 0.2,
    transparent: true,
    opacity: 0.7,
  });
  particles = new THREE.Points(geo, mat);
  scene.add(particles);
}

// ─────────────────────────────────────────────
// RANDOM BOXES
// ─────────────────────────────────────────────
function buildBoxes() {
  boxes.forEach((b) => scene.remove(b));
  boxes = [];
  for (let i = 0; i < 180; i++) {
    const g = new THREE.BoxGeometry(
      Math.random() * 8 - 1,
      Math.random() * 0.6 + 0.1,
      Math.random() * 2,
    );
    const m = new THREE.MeshStandardMaterial({
      color: theme.accent,
      wireframe: true,
      opacity: 0.5,
      transparent: true,
    });
    const b = new THREE.Mesh(g, m);
    b.position.set(
      (Math.random() - 0.5) * 260,
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 400 - 150,
    );
    b.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    );
    scene.add(b);
    boxes.push(b);
  }
}

// ─────────────────────────────────────────────
// ORBITAL OBJECTS per section
// ─────────────────────────────────────────────
function buildOrbitalGroup(sectionIndex) {
  const group = new THREE.Group();
  const z = SECTION_Z[sectionIndex];
  group.position.set(0, 0, z);

  const count = 5 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const geom = randomGeom();
    let mat;
    if (i === 0) {
      mat = makeIridescentMaterial(theme.bg);
      iridMaterials.push(mat);
    } else {
      mat = randomMaterial();
    }
    const mesh = new THREE.Mesh(geom, mat);
    const angle = (i / count) * Math.PI * 2;
    const radius = 15 + Math.random() * 8;
    mesh.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5 + (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
    );
    const s = 0.6 + Math.random() * 1.6;
    mesh.scale.setScalar(s);
    mesh.userData.orbitAngle = angle;
    mesh.userData.orbitR = radius;
    mesh.userData.orbitSpeed =
      (0.003 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1);
    mesh.userData.rotSpeed = new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02,
    );
    group.add(mesh);
    sectionObjects[sectionIndex].push(mesh);
  }

  // Central iridescent object
  const centGeom = randomGeom();
  centGeom.scale(12, 12, 12);
  const centMat = makeIridescentMaterial(0x000000);
  centMat.uniforms.uOpacity.value = 0.1;
  centMat.wireframe = true;

  iridMaterials.push(centMat);
  const center = new THREE.Mesh(centGeom, centMat);
  center.position.set(0, 0, -12);
  center.userData.rotSpeed = new THREE.Vector3(0.003, 0.005, 0.002);
  group.add(center);

  // Wide torus (ring)
  const radius = 10 + Math.random() * 6; // 10 → 16
  const tube = 0.025 + Math.random() * 0.035; // 0.25 → 0.60

  const radialSegments = 24 + Math.floor(Math.random() * 16); // 24 → 40
  const tubularSegments = 96 + Math.floor(Math.random() * 64); // 96 → 160

  const torusGeom = new THREE.TorusGeometry(
    radius,
    tube,
    radialSegments,
    tubularSegments,
  );

  // Matériau iridescent
  const torusMat = makeIridescentMaterial(theme.bg);
  iridMaterials.push(torusMat);

  const torus = new THREE.Mesh(torusGeom, torusMat);

  // Position relative au centre
  torus.position.set(0, 0, 0);
  torus.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
  );

  // Rotation lente
  torus.userData.rotSpeed = new THREE.Vector3(0, 0.004, 0.004);
  // Ajout au groupe
  group.add(torus);
  sectionObjects[sectionIndex].push(torus);

  sectionObjects[sectionIndex].push(center);

  scene.add(group);
  orbitalGroups.push(group);
}

// ─────────────────────────────────────────────
// TEXT GEOMETRY
// ─────────────────────────────────────────────

function getResponsiveTitleSize() {
  const w = window.innerWidth;

  if (w > 1600) return 4.5; // desktop large
  if (w > 1200) return 3.8; // laptop
  if (w > 900) return 3.2; // tablette landscape
  if (w > 600) return 2.6; // tablette portrait
  return 3.0; // mobile
}

function buildTexts() {
  textMeshes.forEach((m) => {
    m.parent && m.parent.remove(m);
    m.geometry.dispose();
  });
  textMeshes = [];

  if (!font) return;

  SECTION_LABELS.forEach((label, i) => {
    const z = SECTION_Z[i];

    // Main title
    const titleSize = getResponsiveTitleSize();

    const tg = new TextGeometry(label, {
      font,
      size: titleSize,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.0,
      bevelSize: 0.25,
      bevelSegments: 2,
    });

    tg.center();
    const mat = makeIridescentMaterial2(theme.bg);
    iridMaterials.push(mat);
    const mesh = new THREE.Mesh(tg, mat);
    mesh.position.set(0, 3, z + 2);
    scene.add(mesh);
    textMeshes.push(mesh);

    // Sub text (line 1)
    const sub = SECTION_SUBS[i].split("\n");
    sub.forEach((line, li) => {
      const sg = new TextGeometry(line, {
        font,
        size: 0.7,
        height: 0.15,
        curveSegments: 4,
        bevelEnabled: false,
      });
      sg.center();
      const sm = new THREE.MeshBasicMaterial({
        color: theme.secondary,
        transparent: true,
        opacity: 0.7,
      });
      const smesh = new THREE.Mesh(sg, sm);
      smesh.position.set(0, -2.5 - li * 1.1, z + 2);
      scene.add(smesh);
      textMeshes.push(smesh);
    });
  });
}
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  buildTexts();
});

// ─────────────────────────────────────────────
// APPLY THEME
// ─────────────────────────────────────────────
function applyTheme() {
  scene.background = new THREE.Color(theme.bg);
  scene.fog = new THREE.FogExp2(theme.fog, 0.0025);
  document.documentElement.style.setProperty(
    "--accent",
    "#" + new THREE.Color(theme.accent).getHexString(),
  );
  if (accentLight) accentLight.color.set(theme.accent);
  if (secondaryLight) secondaryLight.color.set(theme.secondary);
}

// ─────────────────────────────────────────────
// RANDOMIZE (double-click)
// ─────────────────────────────────────────────
function randomize() {
  themeIdx = (themeIdx + 1) % THEMES.length;
  theme = THEMES[themeIdx];
  applyTheme();

  // Rebuild environment
  buildParticles();
  buildBoxes();

  // Rebuild orbital objects
  orbitalGroups.forEach((g) => scene.remove(g));
  orbitalGroups = [];
  sectionObjects.forEach((arr, i) => {
    sectionObjects[i] = [];
  });
  iridMaterials.length = 0;
  for (let i = 0; i < SECTION_COUNT; i++) buildOrbitalGroup(i);

  // Rebuild texts
  buildTexts();

  document.getElementById("c-tr").textContent = "Theme: " + theme.name;
}

// ─────────────────────────────────────────────
// GSAP-LIKE CAMERA TWEEN (vanilla)
// ─────────────────────────────────────────────
function tweenCamera(toZ, toY, cb) {
  if (isAnimating) return;
  isAnimating = true;

  const startZ = camera.position.z;
  const startY = camera.position.y;

  // Phase 1: zoom out
  const midZ = startZ + (startZ < toZ ? -15 : 15);
  const dur1 = 500;
  const dur2 = 900;
  const dur3 = 500;

  let t0 = null;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeOutBack(t) {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function phase1(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur1, 1);
    camera.position.z = startZ + (midZ - startZ) * easeInOut(p);
    if (p < 1) {
      requestAnimationFrame(phase1);
    } else {
      t0 = null;
      requestAnimationFrame(phase2);
    }
  }

  function phase2(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur2, 1);
    camera.position.z = midZ + (toZ + 50 - midZ) * easeInOut(p);
    camera.position.y = startY + (toY - startY) * easeOut(p);
    if (p < 1) {
      requestAnimationFrame(phase2);
    } else {
      t0 = null;
      requestAnimationFrame(phase3);
    }
  }

  function phase3(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur3, 1);
    camera.position.z = toZ + 50 + (toZ - (toZ + 50)) * easeOutBack(p);
    if (p < 1) {
      requestAnimationFrame(phase3);
    } else {
      isAnimating = false;
      if (cb) cb();
    }
  }

  requestAnimationFrame(phase1);
}

// ─────────────────────────────────────────────
// NAVIGATE TO SECTION
// ─────────────────────────────────────────────
function gotoSection(idx) {
  if (idx === currentSection || isAnimating) return;
  currentSection = idx;
  updateNav();
  updateCounter();

  const targetCamZ = SECTION_Z[idx] + SECTION_Z_DIFF;

  tweenCamera(targetCamZ, 0);

  if (idx > 0) {
    document.getElementById("scroll-hint").style.opacity = "0";
  }
}

function updateNav() {
  document.querySelectorAll(".nav-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentSection);
  });
}

function updateCounter() {
  const n = currentSection + 1;
  document.getElementById("section-counter").textContent =
    String(n).padStart(2, "0") + " / " + String(SECTION_COUNT).padStart(2, "0");
}

// ─────────────────────────────────────────────
// MOUSE & CURSOR
// ─────────────────────────────────────────────
const mouse2D = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const cursorEl = document.getElementById("cursor");
const cursorRingO = cursorEl.querySelector(".ring.outer");
const cursorRingI = cursorEl.querySelector(".ring.inner");
const cursorDot = cursorEl.querySelector(".dot");
let curX = 0,
  curY = 0;
let curRX = 0,
  curRY = 0;

window.addEventListener("mousemove", (e) => {
  curX = e.clientX;
  curY = e.clientY;
  mouse2D.x = (e.clientX / innerWidth) * 2 - 1;
  mouse2D.y = (e.clientY / innerHeight) * -2 + 1;

  // gentle camera tilt
  camera.rotation.y = mouse2D.x * 0.03;
  camera.rotation.x = mouse2D.y * 0.012;
});

function updateCursor() {
  curRX += (curX - curRX) * 0.18;
  curRY += (curY - curRY) * 0.18;
  cursorEl.style.left = curRX + "px";
  cursorEl.style.top = curRY + "px";

  // Raycast
  raycaster.setFromCamera(mouse2D, camera);
  const allMeshes = [];
  orbitalGroups.forEach((g) =>
    g.traverse((c) => {
      if (c.isMesh) allMeshes.push(c);
    }),
  );
  const hits = raycaster.intersectObjects(allMeshes);
  document.body.classList.toggle("hover-3d", hits.length > 0);
}

// ─────────────────────────────────────────────
// SCROLL NAVIGATION
// ─────────────────────────────────────────────
let wheelCooldown = false;
window.addEventListener("wheel", (e) => {
  if (wheelCooldown || isAnimating) return;
  wheelCooldown = true;
  setTimeout(() => {
    wheelCooldown = false;
  }, 1200);
  if (e.deltaY > 0)
    gotoSection(Math.min(currentSection + 1, SECTION_COUNT - 1));
  else gotoSection(Math.max(currentSection - 1, 0));
});

// Touch
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener("touchend", (e) => {
  const dy = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 40) {
    if (dy > 0) gotoSection(Math.min(currentSection + 1, SECTION_COUNT - 1));
    else gotoSection(Math.max(currentSection - 1, 0));
  }
});

// ─────────────────────────────────────────────
// NAV BUTTONS
// ─────────────────────────────────────────────
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => gotoSection(Number(btn.dataset.section)));
});

// ─────────────────────────────────────────────
// DOUBLE CLICK → RANDOMIZE
// ─────────────────────────────────────────────
window.addEventListener("dblclick", randomize);

// ─────────────────────────────────────────────
// FULLSCREEN
// ─────────────────────────────────────────────
const fsBtn = document.getElementById("c-br");
fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fsBtn.textContent = "Fullscreen ✕";
  } else {
    document.exitFullscreen();
    fsBtn.textContent = "Fullscreen ↗";
  }
});

// ─────────────────────────────────────────────
// RESIZE
// ─────────────────────────────────────────────
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});

// ─────────────────────────────────────────────
// ANIMATE
// ─────────────────────────────────────────────
let clock = new THREE.Clock();

function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Noise time
  // noisePass.uniforms.time.value = t * 1.3;

  // Particles slow drift
  if (particles) {
    particles.rotation.x = t * 0.00008;
    particles.rotation.y = t * 0.00015;
  }

  // Boxes slow drift
  boxes.forEach((b, i) => {
    b.rotation.y += 0.001;
    b.rotation.z += 0.0005;
  });

  // Orbital objects
  orbitalGroups.forEach((group, gi) => {
    group.children.forEach((mesh) => {
      if (mesh.userData.orbitSpeed !== undefined) {
        mesh.userData.orbitAngle += mesh.userData.orbitSpeed;
        mesh.position.x =
          Math.cos(mesh.userData.orbitAngle) * mesh.userData.orbitR;
        mesh.position.y =
          Math.sin(mesh.userData.orbitAngle) * mesh.userData.orbitR * 0.45;
      }
      if (mesh.userData.rotSpeed) {
        mesh.rotation.x += mesh.userData.rotSpeed.x;
        mesh.rotation.y += mesh.userData.rotSpeed.y;
        mesh.rotation.z += mesh.userData.rotSpeed.z;
      }
    });
  });

  // Text subtle pulse
  textMeshes.forEach((m, i) => {
    if (m.material && m.material.uniforms && m.material.uniforms.uTime) {
      m.material.uniforms.uTime.value = t;
    }
  });

  // Iridescent uniforms
  iridMaterials.forEach((mat) => {
    if (mat.uniforms) mat.uniforms.uTime.value = t;
  });

  // Accent light gentle orbit
  accentLight.position.x = Math.sin(t * 0.4) * 20;
  accentLight.position.y = Math.cos(t * 0.3) * 15;
  secondaryLight.position.x = Math.cos(t * 0.35) * 18;
  secondaryLight.position.z = 15 + Math.sin(t * 0.5) * 10;

  updateCursor();
  composer.render();
  stats.end();
}

// ─────────────────────────────────────────────
// INIT SEQUENCE
// ─────────────────────────────────────────────
buildParticles();
buildBoxes();
for (let i = 0; i < SECTION_COUNT; i++) buildOrbitalGroup(i);
updateNav();
updateCounter();
document.getElementById("c-tr").textContent = "Theme: " + theme.name;

const fontLoader = new FontLoader();
fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (f) => {
    font = f;
    buildTexts();
  },
);

animate();
