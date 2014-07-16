
varying float vDraw;

void main() {

  if (vDraw == 0.0) {
    discard;
  }

  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep( 170.0, 70.0, depth );  

  gl_FragColor = vec4( vec3(0.2, 0.9, 0.3) * fogFactor, 1.0 );

}