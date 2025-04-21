import { FontLoader, OrbitControls, TextGeometry } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three';
import { setupDebugUI } from './debug.js';

const canvas = document.querySelector("#canvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.z = 10;
scene.add(camera);

/**
 * Texture Loader
 */
const textureLoader = new THREE.TextureLoader();

/**
 * controls:
 */
const controls=new OrbitControls(camera,canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


/**
 * Object:
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue' })
)
// scene.add(cube);


/**
 * Text
 */
//matcap
const matcap = textureLoader.load('/matcaps/redsun.png');
const loader = new FontLoader();
const material = new THREE.MeshMatcapMaterial({matcap:matcap})

let text = null;
let font = null;
const spd=40;
loader.load('/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
  font = loadedFont;
  updateTextGeometry();
  // setupDebugUI(textParams, updateTextGeometry);
  // adding donuts: 
  const donutgeo=new THREE.TorusGeometry(0.3,0.2,20,45);
  for(var i =0;i<450;i++){
    const donut=new THREE.Mesh(donutgeo,material);
    donut.position.x=(Math.random()-0.5)*spd;
    donut.position.y=(Math.random()-0.5)*spd;
    donut.position.z=(Math.random()-0.5)*spd;
    donut.rotation.x=Math.random()*Math.PI;
    donut.rotation.y=Math.random()*Math.PI;
    // scale
    const rnd=Math.random()*2; 
    donut.scale.set(rnd,rnd,rnd);

    scene.add(donut);

  }
});

/*
 * Update text geo
 */

const textParams = {
  message: 'Hello Three JS',
  size: 2,
  depth: 0.8,
  positionX: 0,
  positionY: 0,
  positionZ: 0
};

function updateTextGeometry() {
  if (!font) return;

  if (text) {
    scene.remove(text);
    text.geometry.dispose();
  }

  const geometry = new TextGeometry(textParams.message, {
    font: font,
    size: textParams.size,
    depth: textParams.depth,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.04,
    curveSegments: 12
  });
  geometry.center();

  text = new THREE.Mesh(geometry, material);
  text.position.set(textParams.positionX, textParams.positionY, textParams.positionZ);
  scene.add(text);
}



/**
 * render
 */
const render = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}


render();
