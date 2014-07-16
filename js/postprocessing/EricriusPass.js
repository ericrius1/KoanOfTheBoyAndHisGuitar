THREE.EricriusPass = function(center, angle, scale) {
  if(THREE.EricriusShader === undefined){
    console.error("THREE.EricriusPass relies on THREE.EricriusShader!");
  }
  var shader = THREE.EricriusShader;
  this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  if ( center !== undefined ) this.uniforms[ "center" ].value.copy( center );
  if ( angle !== undefined ) this.uniforms[ "angle"].value = angle;
  if ( scale !== undefined ) this.uniforms[ "scale"].value = scale;

  this.material = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shaders.fragmentShaders.blobs
  });

  this.enabled = true;
  this.renderToScreen = false;
  this.needsSwap = true;

  //eft, right, top, bottom, near, far
  this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  this.scene = new THREE.Scene();

  this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2), null);
  this.scene.add(this.quad);

};

THREE.EricriusPass.prototype = {
  render: function(renderer, writeBuffer, readBuffer, delta) {
    this.uniforms['tDiffuse'].value = readBuffer;
    this.uniforms['tSize'].value.set(readBuffer.width, readBuffer.height);

    this.quad.material = this.material;

    if(this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, false);
    }
  }
}