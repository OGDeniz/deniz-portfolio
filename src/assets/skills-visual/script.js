import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// =======================================================
// Globals

const canvasEl = document.querySelector("#laptop");
const videoEl = document.createElement("video");

let mainTl, laptopAppearTl, laptopOpeningTl, screenOnTl, textureScrollTl, floatingTl;
let scene, camera, renderer, orbit;
let darkPlasticMaterial, cameraMaterial, baseMetalMaterial, logoMaterial, screenMaterial;
let macGroup, lidGroup, bottomGroup, screenMesh, lightHolder, screenLight;
let screenImageTexture;

const screenSize = [29.4, 20];

// =======================================================
// Start

initScene();
createMaterials();

const modelLoader = new GLTFLoader();
modelLoader.load(
  "https://ksenia-k.com/models/mac-noUv.glb",
  (glb) => {
    parseModel(glb);
    addScreen();
    addKeyboard();
    createTimelines();
    mainTl.play(0);

    render();
    updateSceneSize();
    window.addEventListener("resize", updateSceneSize);
  },
  undefined,
  (error) => {
    console.error("Fehler beim Laden des 3D-Modells:", error);
  }
);

// =======================================================
// Scene setup

function initScene() {
  scene = new THREE.Scene();

  const parent = canvasEl.parentElement;
  const width = parent.clientWidth || 600;
  const height = parent.clientHeight || 400;

  camera = new THREE.PerspectiveCamera(38, width / height, 10, 1000);
  camera.position.set(0, 8, 92);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvasEl,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  lightHolder = new THREE.Group();
  scene.add(lightHolder);

  const frontLight = new THREE.PointLight(0xfff5e1, 1.1);
  frontLight.position.set(0, 10, 55);
  lightHolder.add(frontLight);

  const sideLight = new THREE.PointLight(0x66e7ff, 0.45);
  sideLight.position.set(-35, 15, 30);
  scene.add(sideLight);

  const rimLight = new THREE.PointLight(0x8a7dff, 0.35);
  rimLight.position.set(35, 10, -10);
  scene.add(rimLight);

  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enablePan = false;
  orbit.enableDamping = true;
  orbit.enableZoom = false;
  orbit.minPolarAngle = Math.PI / 2.7;
  orbit.maxPolarAngle = Math.PI / 1.9;
  orbit.minAzimuthAngle = -0.8;
  orbit.maxAzimuthAngle = 0.8;

  macGroup = new THREE.Group();
  macGroup.position.set(0, -8, -8);
  scene.add(macGroup);

  lidGroup = new THREE.Group();
  macGroup.add(lidGroup);

  bottomGroup = new THREE.Group();
  macGroup.add(bottomGroup);
}

function updateSceneSize() {
  const parent = canvasEl.parentElement;
  if (!parent) return;

  const width = parent.clientWidth;
  const height = parent.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function createMaterials() {
  const textLoader = new THREE.TextureLoader();

  screenImageTexture = textLoader.load(
    "/desktop.png",
    (tex) => {
      tex.flipY = false;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      const imageAspect = tex.image.width / tex.image.height;
      const screenAspect = screenSize[0] / screenSize[1];
      if (imageAspect > screenAspect) {
        const scale = screenAspect / imageAspect;
        tex.repeat.set(scale, 1);
        tex.offset.set((1 - scale) / 2, 0);
      } else {
        const scale = imageAspect / screenAspect;
        tex.repeat.set(1, scale);
        tex.offset.set(0, (1 - scale) / 2);
      }
    }
  );

  screenMaterial = new THREE.MeshBasicMaterial({
    map: screenImageTexture,
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
  });


  darkPlasticMaterial = new THREE.MeshStandardMaterial({
    color: 0x060606,
    roughness: 0.88,
    metalness: 0.4,
  });

  cameraMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
  });

  baseMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0xcecfd3,
    roughness: 0.5,
    metalness: 0.75,
  });

  logoMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
}

function render() {
  orbit.update();
  lightHolder.quaternion.copy(camera.quaternion);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// =======================================================
// Model parsing

function parseModel(glb) {
  [...glb.scene.children].forEach((child) => {
    if (child.name === "_top") {
      lidGroup.add(child);

      [...child.children].forEach((mesh) => {
        if (mesh.name === "lid") {
          mesh.material = baseMetalMaterial;
        } else if (mesh.name === "logo") {
          mesh.material = logoMaterial;
        } else if (mesh.name === "screen-frame") {
          mesh.material = darkPlasticMaterial;
        } else if (mesh.name === "camera") {
          mesh.material = cameraMaterial;
        }
      });
    } else if (child.name === "_bottom") {
      bottomGroup.add(child);

      [...child.children].forEach((mesh) => {
        if (mesh.name === "base") {
          mesh.material = baseMetalMaterial;
        } else if (mesh.name === "legs") {
          mesh.material = darkPlasticMaterial;
        } else if (mesh.name === "keyboard") {
          mesh.material = darkPlasticMaterial;
        } else if (mesh.name === "inner") {
          mesh.material = darkPlasticMaterial;
        }
      });
    }
  });
}

function addScreen() {
  screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(screenSize[0], screenSize[1]),
    screenMaterial
  );

  screenMesh.position.set(0, 10.5, -0.11);
  screenMesh.rotation.set(Math.PI, 0, 0);
  lidGroup.add(screenMesh);

  screenLight = new THREE.RectAreaLight(0xffffff, 0, screenSize[0], screenSize[1]);
  screenLight.position.set(0, 10.5, 0);
  screenLight.rotation.set(Math.PI, 0, 0);
  lidGroup.add(screenLight);

  const darkScreen = screenMesh.clone();
  darkScreen.position.set(0, 10.5, -0.111);
  darkScreen.rotation.set(Math.PI, Math.PI, 0);
  darkScreen.material = darkPlasticMaterial;
  lidGroup.add(darkScreen);
}

function addKeyboard() {
  // Keyboard overlay removed – model uses darkPlasticMaterial directly
}

// =======================================================
// Animation

function createTimelines() {
  floatingTl = gsap.timeline({ repeat: -1 })
    .to([lidGroup.position, bottomGroup.position], {
      duration: 1.8,
      y: "+=0.9",
      ease: "power1.inOut",
    }, 0)
    .to([lidGroup.position, bottomGroup.position], {
      duration: 1.8,
      y: "-=0.9",
      ease: "power1.inOut",
    })
    .timeScale(1);

  screenOnTl = gsap.timeline({ paused: true })
    .to(screenMaterial, {
      duration: 0.15,
      opacity: 0.96,
    }, 0)
    .to(screenLight, {
      duration: 0.15,
      intensity: 1.35,
    }, 0);

  laptopOpeningTl = gsap.timeline({ paused: true })
    .from(lidGroup.position, {
      duration: 0.75,
      z: "+=0.5",
    }, 0)
    .fromTo(lidGroup.rotation, {
      x: 0.5 * Math.PI,
    }, {
      duration: 1,
      x: -0.22 * Math.PI,
      ease: "power2.out",
    }, 0)
    .to(screenOnTl, {
      duration: 0.08,
      progress: 1,
    }, 0.08);

  textureScrollTl = gsap.timeline({ paused: true })
    .to(screenImageTexture.offset, {
      duration: 2,
      y: 0.4,
      ease: "power1.inOut",
    });

  laptopAppearTl = gsap.timeline({ paused: true })
    .fromTo(macGroup.rotation, {
      x: 0.48 * Math.PI,
      y: 0.22 * Math.PI,
    }, {
      duration: 2,
      x: 0.06 * Math.PI,
      y: -0.12 * Math.PI,
      ease: "power3.out",
    }, 0)
    .fromTo(macGroup.position, {
      y: -46,
    }, {
      duration: 1.2,
      y: -6,
      ease: "power3.out",
    }, 0);

  mainTl = gsap.timeline({ defaults: { ease: "none" } })
    .to(laptopAppearTl, {
      duration: 1.4,
      progress: 1,
    }, 0)
    .to(laptopOpeningTl, {
      duration: 1,
      progress: 1,
    }, 0.45)
    .to(textureScrollTl, {
      duration: 1.4,
      progress: 1,
    }, 1.4)
    .to(textureScrollTl, {
      duration: 1,
      progress: 0,
    }, 2.9);
}
