attribute float draw;
varying float vDraw;

void main() {
  vDraw = draw;
  gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(position,1.0);
}   