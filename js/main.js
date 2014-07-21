//felt somehow... fragmented

//New moon, so dark.
//Sleek mountain lion
//Is even stumbling about

var camera, renderer, scene, controls, clock, field, grass, moon, composer;
var line;
var randFloat = THREE.Math.randFloat;
var itemsToLoad = 2;
var shaders = new ShaderLoader('js/shaders');
var fieldSize = 60;
var startTime = Date.now();
function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();


  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.z = 20;
  camera.position.y = 5;
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x130f13);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  field = new Field();
  grass = new Grass(field.getMesh());
  moon = new Moon();

}
shaders.shaderSetLoaded = function() {
  itemsToLoad--;
  if (itemsToLoad === 0) {
    start();
  }
}

shaders.load('vs-grass', 'grass', 'vertex');
shaders.load('fs-grass', 'grass', 'fragment');
shaders.load('vs-noise', 'noise', 'vertex');
shaders.load('fs-noise', 'noise', 'fragment');
shaders.load('fs-moon', 'moon', 'fragment');
shaders.load('vs-moon', 'moon', 'vertex');

window.addEventListener('resize', onWindowResize);

// var audio = loadAudio('assets/song.mp3');
// audio.play();

function loadAudio(uri) {
  var audio = new Audio();
  audio.src = uri;
  return audio;
}


var canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
var context = canvas.getContext('2d');

loadColor();

function loadColor() {
  var img = new Image();
  img.onload = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this, 0, 0);
    itemsToLoad--;
    if (itemsToLoad === 0) {
      start();
    }
  }
  img.src = "assets/grass.jpg"
}

function getPixel(x, y) {
  if (isNaN(x) || isNaN(y)) {
    return {
      r: 1,
      g: 1,
      b: 1
    }
  };
  var data = context.getImageData(x, y, 1, 1).data;
  return {
    r: data[0],
    g: data[1],
    b: data[2]
  };
}

function start() {
  init();
  animate();
}


function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
  grass.update();
  field.update();
  moon.update();
  renderer.render(scene, camera);
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}