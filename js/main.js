//felt somehow... fragmented

var camera, renderer, scene, controls, clock, field, grass;
var line;
var randFloat = THREE.Math.randFloat;
var itemsToLoad = 2;
var shaders = new ShaderLoader('js/shaders');

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();


  camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000);
  camera.position.z = 100;
  camera.position.y = 10;
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(w, h);
  renderer.autoClear = false;
  controls = new THREE.OrbitControls(camera, renderer.domElement);



  document.body.appendChild(renderer.domElement);
  field = new Field();

  grass = new Grass(field.getMesh());

}
shaders.shaderSetLoaded = function() {
  itemsToLoad--;
  if (itemsToLoad === 0) {
    start();
  }
}

shaders.load('fs-lines', 'lines', 'fragment');
shaders.load('vs-lines', 'lines', 'vertex');

window.addEventListener('resize', onWindowResize);

// var audio = loadAudio('assets/song.mp3');
// audio.play();

function loadAudio(uri) {
  var audio = new Audio();
  audio.src = uri;
  return audio;
}


var w = window.innerWidth;
var h = window.innerHeight;

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
  TWEEN.update();
  // field.update();
  controls.update();
  grass.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}