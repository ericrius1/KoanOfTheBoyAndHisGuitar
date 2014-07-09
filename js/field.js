var Field = function(){

  
  var fieldMesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100));
  fieldMesh.rotation.x = -Math.PI/2;
  scene.add(fieldMesh);

  this.getMesh = function(){
    return fieldMesh;
  }  


}