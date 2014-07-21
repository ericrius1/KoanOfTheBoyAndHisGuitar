var Moon = function(){

  var moonGeo = new THREE.IcosahedronGeometry( 4, 4 );
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
  moon.position.set(-10, 10, 0);
  scene.add(moon);



  this.update = function(){
    moonMat.uniforms['time'].value = 0.000025 * (Date.now() - startTime);
  }
}