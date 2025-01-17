import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js";

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.z = 5;

// Load textures
const textureLoader = new THREE.TextureLoader();
const cardFrontTexture = textureLoader.load("./cards/ty.jpg");
// Texture to show on hover

// Create card geometry
const cardGeometry = new THREE.PlaneGeometry(2.5, 3.5); // Aspect ratio of a card

// Create materials for front
const frontMaterial = new THREE.MeshBasicMaterial({ map: cardFrontTexture });

// Create meshes for the card front
const cardFront = new THREE.Mesh(cardGeometry, frontMaterial);

// Group the card front together
const cardGroup = new THREE.Group();

cardGroup.add(cardFront);
scene.add(cardGroup);

// Mouse movement event listener
let mouseX = 0;
let mouseY = 0;
window.addEventListener("mousemove", (event) => {
  // Normalize mouse position to be between -1 and 1
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("click", (event) => {
  // Normalize mouse position to be between -1 and 1
  mouseX = 0;
  mouseY = 0;
});
window.addEventListener("mouseout", (event) => {
  // Normalize mouse position to be between -1 and 1
  mouseX = 0;
  mouseY = 0;
});
// Mouse hover detection to change texture

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Map mouse position to control the card's rotation
  // Rotate the card based on mouse movement
  cardGroup.rotation.y = mouseX * Math.PI; // Control rotation around the Y-axis
  cardGroup.rotation.x = mouseY * Math.PI; // Control rotation around the X-axis

  renderer.render(scene, camera);
}
animate();
