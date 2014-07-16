varying vec2 vUv;

uniform sampler2D tDiffuse;

void main() {
  if(vUv.x > 0.5){
    discard;
  }
  vec4 color = texture2D(tDiffuse, vUv);
  gl_FragColor = color;

}
