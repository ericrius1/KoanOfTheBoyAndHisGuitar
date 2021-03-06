var Grass = function(groundMesh) {
  createBlades();
  function createBlades() {
    var numBlades = 10000;
    var lineGeo = new THREE.Geometry();
    var grassMaterial = getGrassMaterial();
    var drawArray = [];
    var windArray = [];
    var points = THREE.GeometryUtils.randomPointsInGeometry(groundMesh.geometry, numBlades);
    for (var i = 0; i < points.length; i++) {
      var bladeHeight = _.random(2, 3);
      var point = points[i];
      for (var j = 0; j < bladeHeight; j++) {
        var vertex = new THREE.Vector3(point.x, j/2, point.y);
        lineGeo.vertices.push(vertex);
        var nH = vertex.y/bladeHeight + 0.5;
        windArray.push(nH * nH * nH);
        if( j ===0 || j === bladeHeight -1){
          drawArray.push(0)
        }
        else{
          drawArray.push(1);
        }
      }
    }

    var vertices = lineGeo.vertices;
    var values_draw = grassMaterial.attributes.draw.value;
    var values_wind = grassMaterial.attributes.windFactor.value;
    //copy array values into attribute array
    for(var v = 0; v < vertices.length; v++){
      values_draw [ v ] = drawArray[ v ];
      values_wind [ v ] = windArray[ v ];
    }
    var lines = new THREE.Line(lineGeo, grassMaterial, THREE.LineStrip);
    scene.add(lines);
  }

  function getGrassMaterial(){
    var attributes = {
      draw: {type: 'f', value: []},
      windFactor: {type: 'f', value: []}
    }
    var uniforms = {
      'windMin': {type: "v2", value: new THREE.Vector2(-30, -30)},
      'windSize': {type: 'v2', value: new THREE.Vector2(fieldSize,fieldSize)},
      "windDirection": {type: 'v3', value: windDirection},
      "tWindForce": {type: "t", value: noiseMap},
      "windScale": {type : 'f', value: 2.0}
    }
    var grassMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      attributes: attributes,
      vertexShader: shaders.vertexShaders.grass,
      fragmentShader: shaders.fragmentShaders.grass
    });

    grassMaterial.linewidth = 3;
    return grassMaterial;

  }
  this.update = function() {
  }
}