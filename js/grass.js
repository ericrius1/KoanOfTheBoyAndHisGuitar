var Grass = function(groundMesh) {
  var drawArray = [];
  var lineGeo = new THREE.Geometry();
  var pv = function(x, y, z) {
    lineGeo.vertices.push(new THREE.Vector3(x, y, z));
  }

  var attributes = {
    draw: {type: 'f', value: []}
  }

  var shaderMaterial = new THREE.ShaderMaterial({
    attributes: attributes,
    vertexShader: shaders.vertexShaders.lines,
    fragmentShader: shaders.fragmentShaders.lines
  });
  createBlades();

  var lines = new THREE.Line(lineGeo, shaderMaterial, THREE.LineStrip);
  scene.add(lines);


  function createBlades() {
    var points = THREE.GeometryUtils.randomPointsInGeometry(groundMesh.geometry, 100);
    for (var i = 0; i < points.length; i++) {
      var bladeHeight = _.random(4, 6);
      var point = points[i];
      for (var j = 0; j < bladeHeight; j++) {
        pv(point.x, j, point.y);
        if( j ===0 || j === bladeHeight -1){
          drawArray.push(0)
        }
        else{
          drawArray.push(1);
        }
      }
    }

    var vertices = lineGeo.vertices;
    var values_draw = attributes.draw.value;
    for(var v = 0; v < vertices.length; v++){
      values_draw [ v ] = drawArray[v]; 
    }
  }
  this.update = function() {

  }
}