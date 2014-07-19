var Moon = function(){

  var moonGeo = new THREE.IcosahedronGeometry( 20, 4 );
  var uniforms = {
    tExplosion: { 
      type: 't',
      value: THREE.ImageUtils.loadTexture('assets/explosion.png')
    },

    time: {
      type: 'f',
      value: 0.0
    }
  };
  var moonMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.moon,
    fragmentShader: shaders.fragmentShaders.moon,
    transparent: true
  })
  var moon = new THREE.Mesh(moonGeo, moonMat);
  moon.position.set(0, 1, 0);
  scene.add(moon);



  this.update = function(){
  }
}