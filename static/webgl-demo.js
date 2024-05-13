main();


const shaders = {
  vs: `#version 300 es
      in vec2 vertPosition;
      in vec3 vertColor;
      out vec3 fragColor;

      void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0, 1);
      }`,
      fs: `#version 300 es 
        precision mediump float; 
        in vec3 fragColor; 
        out vec4 outColor; 
      
        void main() { 
            outColor = vec4(fragColor, 1); 
        }` 
};
//
// start here
//
function main() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.6, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vertexShader, shaders.vs);
  gl.shaderSource(fragmentShader, shaders.fs);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
}
