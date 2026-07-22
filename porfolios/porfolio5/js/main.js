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

// ═══════════════════════════════════════════════════════════════
// TOUCH / MOBILE DETECTION
// ═══════════════════════════════════════════════════════════════
const isTouchDevice =
  window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

// Ocultar cursor en dispositivos táctiles
if (isTouchDevice) {
  const cursorEl = document.getElementById("cursor");
  if (cursorEl) cursorEl.style.display = "none";
}

// ═══════════════════════════════════════════════════════════════
// PORTFOLIO DATA — 20 entries with real Unsplash images
// ═══════════════════════════════════════════════════════════════
const PORTFOLIO_DATA = {
  // ═══════ SECTION 0: STUDIO ═══════
  0: [
    {
      tag: "IDENTITÉ",
      title: "Studio Néon",
      year: "2025",
      category: "Branding",
      client: "Projet personnel",
      duration: "2 mois",
      team: "1 pers.",
      tech: "Three.js",
      description:
        "Identité visuelle complète pour un studio créatif spécialisé dans les expériences 3D interactives. Le logo dynamique réagit au mouvement de la souris avec des shaders GLSL personnalisés, créant une signature visuelle unique et mémorable. Le système de couleurs s'adapte automatiquement à l'heure du jour.",
      tags: ["Three.js", "GLSL", "Motion Design", "Branding"],
      link: "https://studio-neon.fr",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    },
    {
      tag: "PHILOSOPHIE",
      title: "Design Émotionnel",
      year: "2024",
      category: "Recherche",
      client: "Publication ACM",
      duration: "6 mois",
      team: "3 pers.",
      tech: "React + Three",
      description:
        "Étude approfondie sur l'impact émotionnel des interfaces 3D dans le web contemporain. Comment la profondeur spatiale, la lumière dynamique et les interactions tactiles modifient la perception utilisateur et augmentent l'engagement de 340% selon nos benchmarks internes.",
      tags: ["UX Research", "WebGL", "Psychologie", "Data"],
      link: "https://acm.org/design-emotionnel",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    },
    {
      tag: "MANIFESTE",
      title: "L'Art du Pixel",
      year: "2024",
      category: "Direction Artistique",
      client: "Conférence SIGGRAPH",
      duration: "1 mois",
      team: "2 pers.",
      tech: "WebGL",
      description:
        "Direction artistique pour une conférence internationale sur les arts numériques. Création d'un univers visuel immersif combinant esthétique rétro-futuriste et technologies WebGL de pointe pour 2,500 participants. L'identité visuelle a été saluée par le jury comme « révolutionnaire ».",
      tags: ["Direction Artistique", "WebGL", "Événement", "3D"],
      link: "https://siggraph.org/art-pixel",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    },
    {
      tag: "LABORATOIRE",
      title: "Shader Experiments",
      year: "2025",
      category: "R&D",
      client: "Interne",
      duration: "4 mois",
      team: "1 pers.",
      tech: "GLSL",
      description:
        "Collection de 24 expérimentations shader explorant les limites du rendu temps réel dans le navigateur. De la simulation de fluides aux fractales 3D, chaque expérience pousse les frontières de ce qui est possible sans plugin. Le projet a recueilli 3,200 stars sur GitHub.",
      tags: ["Shaders", "GLSL", "R&D", "Temps Réel"],
      link: "https://github.com/studio-neon/shaders",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    },
    {
      tag: "AWARDS",
      title: "Awwwards SOTD — Chronos",
      year: "2024",
      category: "Reconnaissance",
      client: "Awwwards",
      duration: "—",
      team: "5 pers.",
      tech: "Three.js",
      description:
        "Site du jour Awwwards pour notre projet ‘Chronos’, une expérience temporelle interactive utilisant Three.js et des shaders personnalisés. Le jury a salué l'innovation technique et la cohérence artistique exceptionnelle. Mention spéciale pour l'accessibilité.",
      tags: ["Awwwards", "Three.js", "Award", "Excellence"],
      link: "https://awwwards.com/chronos",
      image:
        "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
    },
  ],
  // ═══════ SECTION 1: WORK ═══════
  1: [
    {
      tag: "PROJET",
      title: "Chronos Temporal",
      year: "2024",
      category: "Expérience Web",
      client: "Musée du Temps — Besançon",
      duration: "8 mois",
      team: "6 pers.",
      tech: "Three.js + Vue",
      description:
        "Expérience web immersive pour le Musée du Temps de Besançon. Les visiteurs naviguent à travers 500 ans d'histoire horlogère dans un univers 3D temps réel, avec des modèles photoréalistes de 47 montres historiques et des animations procédurales générées en GLSL.",
      tags: ["Three.js", "Vue.js", "Musée", "3D"],
      link: "https://chronos.musee-du-temps.fr",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    },
    {
      tag: "PROJET",
      title: "Nébula E-Commerce",
      year: "2024",
      category: "E-Commerce 3D",
      client: "Nébula Watches",
      duration: "5 mois",
      team: "4 pers.",
      tech: "React Three Fiber",
      description:
        "Plateforme e-commerce révolutionnaire permettant aux clients de configurer et visualiser leurs montres en 3D temps réel. Le configurateur offre 12,000 combinaisons possibles avec rendu PBR photoréaliste directement dans le navigateur. Taux de conversion augmenté de 180%.",
      tags: ["R3F", "E-Commerce", "PBR", "Configurateur"],
      link: "https://nebula-watches.com",
      image:
        "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80",
    },
    {
      tag: "PROJET",
      title: "Synapse DataViz",
      year: "2023",
      category: "Data Visualization",
      client: "Synapse AI — Paris",
      duration: "4 mois",
      team: "3 pers.",
      tech: "D3.js + Three.js",
      description:
        "Visualisation 3D interactive des réseaux neuronaux d'une IA. Les utilisateurs peuvent explorer 50,000 connexions synaptiques en temps réel, zoomer sur des clusters spécifiques et observer l'apprentissage en direct avec des animations fluides maintenues à 60fps.",
      tags: ["DataViz", "Three.js", "IA", "Réseaux"],
      link: "https://synapse.ai/demo",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
    },
    {
      tag: "PROJET",
      title: "Aurora Festival",
      year: "2023",
      category: "Site Événementiel",
      client: "Aurora Festival — Berlin",
      duration: "3 mois",
      team: "5 pers.",
      tech: "Three.js + GSAP",
      description:
        "Site immersif pour un festival de musique électronique. L'univers visuel évolue selon le BPM des morceaux, avec des particules réactives au son, des transitions cinématographiques et une billetterie intégrée dans l'expérience 3D. 85,000 billets vendus via la plateforme.",
      tags: ["Three.js", "GSAP", "Audio", "Festival"],
      link: "https://aurora-festival.de",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
    {
      tag: "PROJET",
      title: "Kinetic Typography",
      year: "2024",
      category: "Typographie 3D",
      client: "TypeWknd — Amsterdam",
      duration: "2 mois",
      team: "2 pers.",
      tech: "Three.js + Shaders",
      description:
        "Système de typographie cinétique 3D réactif au son et au mouvement. Chaque lettre est un maillage 3D déformable par des shaders vertex, créant des compositions typographiques vivantes qui respirent et dansent avec l'utilisateur. Présenté lors de TypeWknd 2024.",
      tags: ["Typographie", "Shaders", "Motion", "3D"],
      link: "https://typewknd.nl/kinetic",
      image:
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    },
  ],
  // ═══════ SECTION 2: ABOUT ═══════
  2: [
    {
      tag: "COMPÉTENCE",
      title: "Three.js & WebGL",
      year: "2019—2025",
      category: "Expertise",
      client: "—",
      duration: "6 ans",
      team: "—",
      tech: "WebGL / GLSL",
      description:
        "Maîtrise avancée de Three.js depuis la v0.100. Expertise en shaders GLSL, post-processing, PBR rendering, instanced rendering et optimisation de scènes complexes. Capacité à maintenir 60fps sur mobile avec 100,000+ objets instanciés. Speaker régulier aux conférences Three.js.",
      tags: ["Three.js", "WebGL", "GLSL", "Performance"],
      link: "https://threejs-journey.com",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    },
    {
      tag: "COMPÉTENCE",
      title: "React & Écosystème",
      year: "2018—2025",
      category: "Frontend",
      client: "—",
      duration: "7 ans",
      team: "—",
      tech: "React / Next.js",
      description:
        "Développement frontend moderne avec React, Next.js et TypeScript. Architecture d'applications complexes, state management, SSR/SSG, et intégration fluide de Three.js via React Three Fiber pour des expériences 3D déclaratives. Contributeur actif à l'écosystème R3F.",
      tags: ["React", "Next.js", "TypeScript", "R3F"],
      link: "https://react.dev",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    },
    {
      tag: "ÉQUIPE",
      title: "Alexandre Chen",
      year: "2022",
      category: "Lead Developer",
      client: "Studio Néon",
      duration: "3 ans",
      team: "—",
      tech: "Full Stack",
      description:
        "Lead developer et architecte 3D. Ancien ingénieur chez Ubisoft Montréal, Alexandre apporte 8 ans d'expérience en graphisme temps réel. Spécialiste des shaders et de l'optimisation GPU, il dirige la R&D technique du studio et encadre l'équipe de développement.",
      tags: ["Lead", "Shaders", "Architecture", "Mentor"],
      link: "https://linkedin.com/in/alexandre-chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    },
    {
      tag: "ÉQUIPE",
      title: "Marie Lefort",
      year: "2023",
      category: "Creative Director",
      client: "Studio Néon",
      duration: "2 ans",
      team: "—",
      tech: "Design / Motion",
      description:
        "Directrice artistique et motion designer. Diplômée des Gobelins, Marie allie sensibilité artistique et maîtrise technique. Elle conçoit les univers visuels et supervise l'intégration design-développement pour garantir la cohérence créative de chaque projet.",
      tags: ["Direction Artistique", "Motion", "UX", "Branding"],
      link: "https://linkedin.com/in/marie-lefort",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    },
    {
      tag: "OUTILS",
      title: "Pipeline Créatif",
      year: "2024",
      category: "Workflow",
      client: "Interne",
      duration: "—",
      team: "—",
      tech: "Multi-outils",
      description:
        "Pipeline optimisé : Blender → glTF → Three.js. Utilisation de Figma pour le design system, GitHub Actions pour le CI/CD, Vercel pour le déploiement, et Notion pour la gestion de projet. Workflow agile avec sprints de 2 semaines et revues hebdomadaires.",
      tags: ["Blender", "glTF", "CI/CD", "Agile"],
      link: "https://notion.so/studio-neon",
      image:
        "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80",
    },
  ],
  // ═══════ SECTION 3: CONTACT ═══════
  3: [
    {
      tag: "SERVICE",
      title: "Expériences 3D Web",
      year: "2025",
      category: "Offre",
      client: "Sur mesure",
      duration: "2—8 mois",
      team: "2—6 pers.",
      tech: "Three.js / R3F",
      description:
        "Création d'expériences web 3D immersives sur mesure. De la landing page interactive aux applications complexes, nous concevons des univers 3D qui captivent et convertissent. Budgets à partir de 25,000€. Premier rendez-vous de découverte gratuit et sans engagement.",
      tags: ["Three.js", "Sur Mesure", "Immersif", "Conversion"],
      link: "https://studio-neon.fr/services/3d",
      image:
        "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    },
    {
      tag: "SERVICE",
      title: "Direction Artistique",
      year: "2025",
      category: "Offre",
      client: "Sur mesure",
      duration: "1—3 mois",
      team: "1—3 pers.",
      tech: "Figma / Blender",
      description:
        "Direction artistique complète pour projets digitaux. Identité visuelle, design system, maquettes interactives et supervision de l'intégration. Nous créons des univers visuels cohérents et mémorables qui racontent votre histoire avec authenticité et impact.",
      tags: ["Branding", "Design System", "UI/UX", "Supervision"],
      link: "https://studio-neon.fr/services/da",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    },
    {
      tag: "CONTACT",
      title: "hello@studio-neon.fr",
      year: "—",
      category: "Email",
      client: "—",
      duration: "—",
      team: "—",
      tech: "—",
      description:
        "Vous avez un projet en tête ? Parlons-en. Nous répondons sous 24h ouvrées. Que ce soit pour une expérience 3D, un rebranding ou une collaboration créative, nous serons ravis d'échanger avec vous sur vos idées et ambitions. Disponibles en français, anglais et espagnol.",
      tags: ["Contact", "Projet", "Collaboration", "Devis"],
      link: "mailto:hello@studio-neon.fr",
      image:
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80",
    },
    {
      tag: "RÉSEAU",
      title: "@studio_neon",
      year: "—",
      category: "Instagram",
      client: "—",
      duration: "—",
      team: "—",
      tech: "—",
      description:
        "Suivez notre travail au quotidien. Behind-the-scenes de nos projets, expérimentations shaders, process créatif et annonces. 12,000 abonnés et une communauté active de créatifs 3D partageant la même passion pour le web immersif et les technologies émergentes.",
      tags: ["Instagram", "Behind the Scenes", "Communauté", "Daily"],
      link: "https://instagram.com/studio_neon",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    },
    {
      tag: "RÉSEAU",
      title: "GitHub /studio-neon",
      year: "—",
      category: "Open Source",
      client: "—",
      duration: "—",
      team: "—",
      tech: "—",
      description:
        "Nous croyons en l'open source. Découvrez nos librairies, composants React Three Fiber réutilisables et shaders GLSL documentés. 2,400 stars et contributions actives à la communauté Three.js francophone. Pull requests bienvenues !",
      tags: ["Open Source", "GitHub", "R3F", "Communauté"],
      link: "https://github.com/studio-neon",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════════════════════════
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
  "Creating experiences\\nthat matter.",
  "Selected projects.",
  "Who we are.",
  "Let\\'s\\nbuild together.",
];
const SECTION_Z = [0, -300, -600, -900];
const SECTION_COUNT = 4;
const SECTION_Z_DIFF = 30;

// ═══════════════════════════════════════════════════════════════
// SCENE SETUP
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// LIGHTS
// ═══════════════════════════════════════════════════════════════
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

applyTheme();

// ═══════════════════════════════════════════════════════════════
// POST-PROCESSING
// ═══════════════════════════════════════════════════════════════
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

const grainShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0.0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    void main(){
      vec4 color = texture2D(tDiffuse, vUv);
      float grain = fract(sin(dot(vUv.xy, vec2(12.9898,78.233))) * 43758.5453 + time);
      color.rgb += (grain - 0.5) * 0.05;
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
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time;
    uniform float lineHeight, lineSpacing, opacity;
    varying vec2 vUv;
    void main(){
      vec4 color = texture2D(tDiffuse, vUv);
      float scanline = step(lineSpacing, mod(gl_FragCoord.y, lineHeight)) * opacity;
      color.rgb += scanline;
      gl_FragColor = color;
    }
  `,
  blending: THREE.AdditiveBlending,
});
composer.addPass(scanLinePass);

// ═══════════════════════════════════════════════════════════════
// IRIDESCENT SHADER MATERIAL
// ═══════════════════════════════════════════════════════════════
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
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
      void main(){
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = vec3(modelViewMatrix * vec4(position,1.));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
      uniform vec3 uBaseColor, uAccent, uSecondary, uLightPos; uniform float uTime;
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
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vNormal; varying vec3 vWorldPosition; varying vec2 vUv;
      void main(){
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal; varying vec3 vWorldPosition; varying vec2 vUv;
      uniform float uOpacity;
      uniform vec3 uBaseColor, uAccent, uSecondary, uLightPos; uniform float uTime;
      void main(){
        vec3 N = normalize(vNormal);
        vec3 V = normalize(cameraPosition - vWorldPosition);
        vec3 L = normalize(uLightPos - vWorldPosition);
        vec3 H = normalize(L + V);
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);
        float spec = pow(max(dot(N, H), 0.0), 32.0);
        float shift = sin(fresnel * 3.14159 + uTime * 0.5) * 0.5 + 0.5;
        vec3 iri = mix(uAccent, uSecondary, shift);
        vec3 col = mix(uBaseColor * 0.01, iri, fresnel * 0.8);
        col += spec * 0.6 * uAccent;
        gl_FragColor = vec4(col, uOpacity);
      }
    `,
  });
}

// ═══════════════════════════════════════════════════════════════
// GEOMETRY BUILDERS
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let currentSection = 0;
let targetZ = camera.position.z;
let targetY = camera.position.y;
let isAnimating = false;
const sectionObjects = [[], [], [], []];
const iridMaterials = [];
let font = null;
let textMeshes = [];
let orbitalGroups = [];
let particles = null;
let boxes = [];
let clickableMeshes = [];
let isModalOpen = false;

// ═══════════════════════════════════════════════════════════════
// PARTICLES
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// RANDOM BOXES
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// ORBITAL OBJECTS — CLICKABLE WITH DATA
// ═══════════════════════════════════════════════════════════════
function buildOrbitalGroup(sectionIndex) {
  const group = new THREE.Group();
  const z = SECTION_Z[sectionIndex];
  group.position.set(0, 0, z);

  const dataEntries = PORTFOLIO_DATA[sectionIndex] || [];
  const count = dataEntries.length;

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
    mesh.userData.isClickable = true;
    mesh.userData.section = sectionIndex;
    mesh.userData.dataIndex = i;
    mesh.userData.originalScale = s;
    mesh.userData.hoverScale = s * 1.3;

    group.add(mesh);
    sectionObjects[sectionIndex].push(mesh);
    clickableMeshes.push(mesh);
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

  // Wide torus
  const radius = 10 + Math.random() * 6;
  const tube = 0.025 + Math.random() * 0.035;
  const radialSegments = 24 + Math.floor(Math.random() * 16);
  const tubularSegments = 96 + Math.floor(Math.random() * 64);
  const torusGeom = new THREE.TorusGeometry(
    radius,
    tube,
    radialSegments,
    tubularSegments,
  );
  const torusMat = makeIridescentMaterial(theme.bg);
  iridMaterials.push(torusMat);
  const torus = new THREE.Mesh(torusGeom, torusMat);
  torus.position.set(0, 0, 0);
  torus.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
  );
  torus.userData.rotSpeed = new THREE.Vector3(0, 0.004, 0.004);
  group.add(torus);
  sectionObjects[sectionIndex].push(torus);
  sectionObjects[sectionIndex].push(center);

  scene.add(group);
  orbitalGroups.push(group);
}

// ═══════════════════════════════════════════════════════════════
// TEXT GEOMETRY
// ═══════════════════════════════════════════════════════════════
function getResponsiveTitleSize() {
  const w = window.innerWidth;
  if (w > 1600) return 4.5;
  if (w > 1200) return 3.8;
  if (w > 900) return 3.2;
  if (w > 600) return 2.6;
  return 3.0;
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

    const sub = SECTION_SUBS[i].split("\\n");
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

// ═══════════════════════════════════════════════════════════════
// MODAL SYSTEM
// ═══════════════════════════════════════════════════════════════
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const clickHint = document.getElementById("click-hint");

const modalTag = document.getElementById("modal-tag");
const modalTitle = document.getElementById("modal-title");
const modalYear = document.getElementById("modal-year");
const modalCategory = document.getElementById("modal-category");
const modalClient = document.getElementById("modal-client");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const modalLink = document.getElementById("modal-link");
const modalImg = document.getElementById("modal-img");
const statDuration = document.getElementById("stat-duration");
const statTeam = document.getElementById("stat-team");
const statTech = document.getElementById("stat-tech");

function openModal(data) {
  if (isModalOpen) return;
  isModalOpen = true;

  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalYear.textContent = data.year;
  modalCategory.textContent = data.category;
  modalClient.textContent = data.client;
  modalDescription.textContent = data.description;
  statDuration.textContent = data.duration;
  statTeam.textContent = data.team;
  statTech.textContent = data.tech;
  modalLink.href = data.link;
  modalImg.src = data.image;

  modalTags.innerHTML = "";
  data.tags.forEach((tagText) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tagText;
    modalTags.appendChild(span);
  });

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!isModalOpen) return;
  modalOverlay.classList.add("closing");
  setTimeout(() => {
    modalOverlay.classList.remove("active", "closing");
    isModalOpen = false;
    document.body.style.overflow = "";
    modalImg.src = "";
  }, 500);
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay || e.target.id === "modal-backdrop")
    closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isModalOpen) closeModal();
});

// Click hint (desktop only)
function showClickHint() {
  if (clickHint && !isTouchDevice) clickHint.classList.add("visible");
}
function hideClickHint() {
  if (clickHint) clickHint.classList.remove("visible");
}

// Swipe hint (mobile only)
const swipeHint = document.getElementById("swipe-hint");
function showSwipeHint() {
  if (swipeHint && isTouchDevice && currentSection < SECTION_COUNT - 1) {
    swipeHint.classList.add("visible");
  }
}
function hideSwipeHint() {
  if (swipeHint) swipeHint.classList.remove("visible");
}

let hintTimeout;
function scheduleHint() {
  clearTimeout(hintTimeout);
  hideClickHint();
  hideSwipeHint();
  hintTimeout = setTimeout(() => {
    if (!isModalOpen) {
      if (isTouchDevice) showSwipeHint();
      else showClickHint();
    }
  }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// APPLY THEME
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// RANDOMIZE
// ═══════════════════════════════════════════════════════════════
function randomize() {
  themeIdx = (themeIdx + 1) % THEMES.length;
  theme = THEMES[themeIdx];
  applyTheme();
  buildParticles();
  buildBoxes();
  orbitalGroups.forEach((g) => scene.remove(g));
  orbitalGroups = [];
  sectionObjects.forEach((arr, i) => {
    sectionObjects[i] = [];
  });
  clickableMeshes = [];
  iridMaterials.length = 0;
  for (let i = 0; i < SECTION_COUNT; i++) buildOrbitalGroup(i);
  buildTexts();
  document.getElementById("c-tr").textContent = "Theme: " + theme.name;
}

// ═══════════════════════════════════════════════════════════════
// CAMERA TWEEN
// ═══════════════════════════════════════════════════════════════
function tweenCamera(toZ, toY, cb) {
  if (isAnimating) return;
  isAnimating = true;
  const startZ = camera.position.z;
  const startY = camera.position.y;
  const midZ = startZ + (startZ < toZ ? -15 : 15);
  const dur1 = 500,
    dur2 = 900,
    dur3 = 500;
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
    if (p < 1) requestAnimationFrame(phase1);
    else {
      t0 = null;
      requestAnimationFrame(phase2);
    }
  }
  function phase2(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur2, 1);
    camera.position.z = midZ + (toZ + 50 - midZ) * easeInOut(p);
    camera.position.y = startY + (toY - startY) * easeOut(p);
    if (p < 1) requestAnimationFrame(phase2);
    else {
      t0 = null;
      requestAnimationFrame(phase3);
    }
  }
  function phase3(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur3, 1);
    camera.position.z = toZ + 50 + (toZ - (toZ + 50)) * easeOutBack(p);
    if (p < 1) requestAnimationFrame(phase3);
    else {
      isAnimating = false;
      if (cb) cb();
    }
  }
  requestAnimationFrame(phase1);
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATE
// ═══════════════════════════════════════════════════════════════
function gotoSection(idx) {
  if (idx === currentSection || isAnimating) return;
  currentSection = idx;
  updateNav();
  updateCounter();
  const targetCamZ = SECTION_Z[idx] + SECTION_Z_DIFF;
  tweenCamera(targetCamZ, 0);
  if (idx > 0) document.getElementById("scroll-hint").style.opacity = "0";
  scheduleHint();
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

// ═══════════════════════════════════════════════════════════════
// MOUSE, CURSOR & RAYCASTING
// ═══════════════════════════════════════════════════════════════
const mouse2D = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const cursorEl = document.getElementById("cursor");
let curX = 0,
  curY = 0,
  curRX = 0,
  curRY = 0;
let hoveredMesh = null;

window.addEventListener("mousemove", (e) => {
  curX = e.clientX;
  curY = e.clientY;
  mouse2D.x = (e.clientX / innerWidth) * 2 - 1;
  mouse2D.y = (e.clientY / innerHeight) * -2 + 1;
  if (!isModalOpen) {
    camera.rotation.y = mouse2D.x * 0.03;
    camera.rotation.x = mouse2D.y * 0.012;
  }
});

window.addEventListener("click", (e) => {
  if (isModalOpen || isAnimating) return;
  raycaster.setFromCamera(mouse2D, camera);
  const hits = raycaster.intersectObjects(clickableMeshes);
  if (hits.length > 0) {
    const mesh = hits[0].object;
    if (mesh.userData.isClickable) {
      const section = mesh.userData.section;
      const dataIndex = mesh.userData.dataIndex;
      const data = PORTFOLIO_DATA[section]?.[dataIndex];
      if (data) {
        openModal(data);
        hideClickHint();
      }
    }
  }
});

function updateCursor() {
  curRX += (curX - curRX) * 0.18;
  curRY += (curY - curRY) * 0.18;
  cursorEl.style.left = curRX + "px";
  cursorEl.style.top = curRY + "px";

  if (isModalOpen) {
    document.body.classList.remove("hover-3d", "hover-clickable");
    return;
  }

  raycaster.setFromCamera(mouse2D, camera);
  const hits = raycaster.intersectObjects(clickableMeshes);

  if (hits.length > 0) {
    const mesh = hits[0].object;
    if (mesh.userData.isClickable) {
      document.body.classList.add("hover-clickable");
      document.body.classList.remove("hover-3d");
      if (hoveredMesh !== mesh) {
        if (hoveredMesh && hoveredMesh.userData.originalScale) {
          hoveredMesh.scale.setScalar(hoveredMesh.userData.originalScale);
        }
        hoveredMesh = mesh;
      }
      const targetScale = mesh.userData.hoverScale;
      mesh.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1,
      );
      return;
    }
  }

  if (hoveredMesh) {
    const orig = hoveredMesh.userData.originalScale;
    hoveredMesh.scale.lerp(new THREE.Vector3(orig, orig, orig), 0.1);
    if (Math.abs(hoveredMesh.scale.x - orig) < 0.01) {
      hoveredMesh.scale.setScalar(orig);
      hoveredMesh = null;
    }
  }

  const allMeshes = [];
  orbitalGroups.forEach((g) =>
    g.traverse((c) => {
      if (c.isMesh) allMeshes.push(c);
    }),
  );
  const allHits = raycaster.intersectObjects(allMeshes);
  document.body.classList.toggle("hover-3d", allHits.length > 0);
  document.body.classList.remove("hover-clickable");
}

// ═══════════════════════════════════════════════════════════════
// SCROLL NAVIGATION — Desktop (wheel) + Mobile (touch)
// ═══════════════════════════════════════════════════════════════

// ── Desktop: Wheel ──
let wheelCooldown = false;
window.addEventListener("wheel", (e) => {
  if (wheelCooldown || isAnimating || isModalOpen) return;
  wheelCooldown = true;
  setTimeout(() => {
    wheelCooldown = false;
  }, 1200);
  if (e.deltaY > 0)
    gotoSection(Math.min(currentSection + 1, SECTION_COUNT - 1));
  else gotoSection(Math.max(currentSection - 1, 0));
});

// ── Mobile: Touch Swipe ──
let touchStartY = 0;
let touchStartX = 0;
let touchStartTime = 0;
let isSwiping = false;

window.addEventListener(
  "touchstart",
  (e) => {
    // No interceptar toques dentro del modal
    if (isModalOpen) return;

    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    touchStartTime = Date.now();
    isSwiping = true;

    // Raycasting táctil: actualizar mouse2D para que el click funcione
    mouse2D.x = (e.touches[0].clientX / innerWidth) * 2 - 1;
    mouse2D.y = (e.touches[0].clientY / innerHeight) * -2 + 1;
  },
  { passive: true },
);

window.addEventListener(
  "touchmove",
  (e) => {
    if (!isSwiping || isModalOpen || isAnimating) return;

    const touchY = e.touches[0].clientY;
    const dy = touchStartY - touchY;

    // Solo procesar swipe vertical significativo
    if (Math.abs(dy) > 60) {
      isSwiping = false; // Evitar múltiples navegaciones

      if (dy > 0) {
        gotoSection(Math.min(currentSection + 1, SECTION_COUNT - 1));
      } else {
        gotoSection(Math.max(currentSection - 1, 0));
      }
    }
  },
  { passive: true },
);

window.addEventListener("touchend", (e) => {
  if (!isSwiping || isModalOpen) return;

  const touchEndY = e.changedTouches[0].clientY;
  const touchEndX = e.changedTouches[0].clientX;
  const dy = touchStartY - touchEndY;
  const dx = touchStartX - touchEndX;
  const dt = Date.now() - touchStartTime;

  // Click táctil (toque corto sin movimiento significativo)
  if (Math.abs(dy) < 10 && Math.abs(dx) < 10 && dt < 300) {
    // Actualizar mouse2D para raycasting
    mouse2D.x = (touchEndX / innerWidth) * 2 - 1;
    mouse2D.y = (touchEndY / innerHeight) * -2 + 1;

    raycaster.setFromCamera(mouse2D, camera);
    const hits = raycaster.intersectObjects(clickableMeshes);

    if (hits.length > 0) {
      const mesh = hits[0].object;
      if (mesh.userData.isClickable) {
        const section = mesh.userData.section;
        const dataIndex = mesh.userData.dataIndex;
        const data = PORTFOLIO_DATA[section]?.[dataIndex];
        if (data) {
          openModal(data);
          hideClickHint();
          hideSwipeHint();
        }
      }
    }
  }

  // Swipe vertical
  else if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) {
    if (dy > 0) gotoSection(Math.min(currentSection + 1, SECTION_COUNT - 1));
    else gotoSection(Math.max(currentSection - 1, 0));
  }

  isSwiping = false;
});

// ═══════════════════════════════════════════════════════════════
// NAV BUTTONS
// ═══════════════════════════════════════════════════════════════
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => gotoSection(Number(btn.dataset.section)));
});

// ═══════════════════════════════════════════════════════════════
// DOUBLE CLICK → RANDOMIZE
// ═══════════════════════════════════════════════════════════════
window.addEventListener("dblclick", (e) => {
  if (!isModalOpen) randomize();
});

// ═══════════════════════════════════════════════════════════════
// FULLSCREEN
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// RESIZE
// ═══════════════════════════════════════════════════════════════
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  buildTexts();
});

// ═══════════════════════════════════════════════════════════════
// ANIMATE
// ═══════════════════════════════════════════════════════════════
let clock = new THREE.Clock();

function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  if (particles) {
    particles.rotation.x = t * 0.00008;
    particles.rotation.y = t * 0.00015;
  }
  boxes.forEach((b) => {
    b.rotation.y += 0.001;
    b.rotation.z += 0.0005;
  });

  orbitalGroups.forEach((group) => {
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

  textMeshes.forEach((m) => {
    if (m.material && m.material.uniforms && m.material.uniforms.uTime) {
      m.material.uniforms.uTime.value = t;
    }
  });

  iridMaterials.forEach((mat) => {
    if (mat.uniforms) mat.uniforms.uTime.value = t;
  });

  accentLight.position.x = Math.sin(t * 0.4) * 20;
  accentLight.position.y = Math.cos(t * 0.3) * 15;
  secondaryLight.position.x = Math.cos(t * 0.35) * 18;
  secondaryLight.position.z = 15 + Math.sin(t * 0.5) * 10;

  updateCursor();
  composer.render();
  stats.end();
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
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

scheduleHint();
animate();
