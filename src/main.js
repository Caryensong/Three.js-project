import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; //Orbit controls allow the camera to orbit around a target.

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

//Object

const geometry = new THREE.TorusGeometry(10, 1, 10, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//light

const pointLight = new THREE.PointLight(0xffffff); //hexadezimale Zahl 0x
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); //CONTROL


//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//background
const spaceTexture = new THREE.TextureLoader().load('./public/assets/img/space.jpg');

scene.background =spaceTexture;

//capsule
const capsuleTexture = new THREE.TextureLoader().load('./public/assets/img/saturn.jpg');

const capsule =new THREE.Mesh(
  new THREE.CapsuleGeometry(8,1,30,20),
  new THREE.MeshBasicMaterial({map: capsuleTexture })
);

scene.add(capsule);

// Moon

const moonTexture = new THREE.TextureLoader().load('./public/assets/img/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./public/assets/img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);




//Animation 
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.009;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();
