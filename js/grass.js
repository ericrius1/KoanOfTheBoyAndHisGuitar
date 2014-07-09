var Grass = function(groundMesh) {
  var lineGeo = new THREE.Geometry();

  var grassAttributes = {
    draw: {type: 'f', value: []},
    windFactor: {type: 'f', value: []}
  }

  var grassMaterial = new THREE.ShaderMaterial({
    attributes: attributes,
    vertexShader: shaders.vertexShaders.lines,
    fragmentShader: shaders.fragmentShaders.lines
  });
  createBlades();

  var lines = new THREE.Line(lineGeo, grassMaterial, THREE.LineStrip);
  scene.add(lines);


  function createBlades() {
    var drawArray = [];
    var windArray = [];
    var points = THREE.GeometryUtils.randomPointsInGeometry(groundMesh.geometry, 100);
    for (var i = 0; i < points.length; i++) {
      var bladeHeight = _.random(4, 6);
      var point = points[i];
      for (var j = 0; j < bladeHeight; j++) {
        var vertex = new THREE.Vector3(point.x, j/2, point.y);
        lineGeo.vertices.push(vertex);
        var nH = vertex.y/bladeHeight + 0.5
        windArray.push(nh * nH * nH);
        if( j ===0 || j === bladeHeight -1){
          drawArray.push(0)
        }
        else{
          drawArray.push(1);
        }
      }
    }

    var vertices = lineGeo.vertices;
    var values_draw = grassAttributes.draw.value;
    var values_wind = grassAttributes.windFactor.value;
    //copy array values into attribute array
    for(var v = 0; v < vertices.length; v++){
      values_draw [ v ] = drawArray[ v ];
      values_wind [ v ] = windArray[ v ];
    }
  }
  this.update = function() {

  }
}