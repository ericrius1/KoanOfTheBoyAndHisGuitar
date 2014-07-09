
varying float vDraw;

void main() {

  if (vDraw == 0.0) {
    discard;
  }


  gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );

}