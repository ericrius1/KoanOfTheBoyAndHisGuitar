varying vec2 vUv;

uniform sampler2D tDiffuse;

void main() {
  vec2 point = vec2(0.5, 0.5);
  // if(vUv.x > 0.5 || vUv.y < 0.5){
  //   discard;
  // }
  vec4 texel = texture2D(tDiffuse, vUv);
  float distance =  pow(length(  (vUv - point)/.1), 1. );
  texel.r *= 5.;
  texel.g *= 5.;
  texel.b *= 5.;
  gl_FragColor = texel;

}
