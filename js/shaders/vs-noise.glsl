
varying vec2 vUv;
uniform vec2 vScale;
uniform vec2 vOffset;

void main( void ) {

  vUv = (uv * vScale) + vOffset;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}