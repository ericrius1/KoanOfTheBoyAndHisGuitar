attribute float draw;
varying float vDraw;

attribute float windFactor;
uniform vec2 windSize;
uniform vec2 windMin;
uniform vec3 windDirection;
uniform sampler2D tWindForce;
uniform float windScale;

void main() {
  vDraw = draw;
  //calculate the windUV texture lookup coordinate
  //based on the 2D, xz (horizontal) position of the vertex
  vec4 wpos = modelMatrix * vec4(position, 1.0);
  wpos.z = -wpos.z;
  vec2 totPos = wpos.xz - windMin;
  vec2 windUV = totPos / windSize;

  //The UV coordinate is used to lookup the windforce
  //from the Perlin noise wind texture.
  float vWindForce = texture2D(tWindForce, windUV).x;

  //vWindForce value is composited with the vertex specific windFactor,
  //in order to compute how much deformation the vertex needs.
  //The global windScale parameter to control the overall strength of the wind,
  //and a windDirectionVector, which specifies which direction the wind deformation needs to take place   
  float windMod = ((1.0 - vWindForce) * windFactor) * windScale;
  vec4 pos = vec4(position, 1.0);
  pos.x += windMod * windDirection.x;
  pos.y += windMod * windDirection.y;
  pos.z += windMod * windDirection.z;

  vec4 mvPosition = modelViewMatrix * pos;
  gl_Position = projectionMatrix * mvPosition;
}