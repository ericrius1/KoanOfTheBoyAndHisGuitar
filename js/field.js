var noiseMap;
var windDirection = new THREE.Vector3(1, 1, 1);

var Field = function(){
  var noiseSpeed = 0.046;
  var noiseOffsetSpeed = 0.11;
  var uniforms = {
    "fTime" :  {type : "f", value: 1},
    "vScale" : {type: "v2", value: new THREE.Vector2(1,1)},
    'vOffset': {type: "v2", value: new THREE.Vector2(1,1)}
  }


  noiseMap = new THREE.WebGLRenderTarget(256, 256, 
    {
      minFilter: THREE.LinearMipmapLinearFilter, 
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat
    }
  );
  uniforms.vScale.value.set(0.3, 0.3);
  var noiseScene = new THREE.Scene();
  var noiseCameraOrtho = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, -10000, 10000);
  noiseCameraOrtho.position.z = 100;
  noiseScene.add(noiseCameraOrtho);

  var noiseMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.noise,
    fragmentShader: shaders.fragmentShaders.noise,
    lights: false
  });

  var planeGeo = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 100, 100);
  var noiseQuadTarget = new THREE.Mesh(planeGeo, noiseMaterial);
  noiseQuadTarget.position.z = -500;
  noiseScene.add(noiseQuadTarget);

  var fieldMat = new THREE.MeshBasicMaterial({map: noiseMap});
  var fieldMesh = new THREE.Mesh(new THREE.PlaneGeometry(fieldSize, fieldSize, 2, 2), fieldMat);
  fieldMesh.rotation.x = -Math.PI/2;
  scene.add(fieldMesh);

  this.getMesh = function(){
    return fieldMesh;
  }  

  this.update = function(){
    delta = clock.getDelta();
    noiseMaterial.uniforms['fTime'].value += delta * noiseSpeed;
    noiseMaterial.uniforms['vOffset'].value.x -= (delta * noiseOffsetSpeed) * windDirection.x;
    noiseMaterial.uniforms['vOffset'].value.y += (delta * noiseOffsetSpeed) * windDirection.z;
    renderer.render(noiseScene, noiseCameraOrtho, noiseMap, true)
  }
};
