var Moon = function(){

  var moonGeo = new THREE.CircleGeometry(1, 20);
  var moon = new THREE.Mesh(moonGeo);
  moon.position.set(-10, 15, 0);
  scene.add(moon);


  this.update = function(){

  }
}