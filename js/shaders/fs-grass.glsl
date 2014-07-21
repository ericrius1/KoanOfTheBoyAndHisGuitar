
varying float vDraw;

void main() {

  if (vDraw == 0.0) {
    discard;
  }
  vec3 color = vec3(0.1, 0.2, 0.0);
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep(100., 0., depth);
  float purpsFactor = smoothstep(0., 100., depth) * .6;
  color.b = purpsFactor;
  color.r = purpsFactor;


  gl_FragColor = vec4(color * fogFactor, 1.0 );

}