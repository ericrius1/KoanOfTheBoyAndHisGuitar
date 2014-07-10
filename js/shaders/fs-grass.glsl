
varying float vDraw;

void main() {

  if (vDraw == 0.0) {
    discard;
  }


  gl_FragColor = vec4( 0.2, 0.9, 0.3, 1.0 );

}