
function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  return needResize;
}


function main() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl2");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

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
          precision highp float; 
          in vec3 fragColor; 
          out vec4 outColor; 
        
          void main() { 
              outColor = vec4(fragColor, 1); 
          }` 
  };
  
  
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, shaders.vs);
  gl.shaderSource(fragmentShader, shaders.fs);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const vertexAttributes = {
    position: {
      numberOfComponents: 2,
      data: new Float32Array([0.0, 0.5,
                              -0.5, -0.5,
                              0.5, -0.5]) 
    },
    color: {  
      numberOfComponents: 3, // RGB triple 
      data: new Float32Array([1, 0, 0,
                              0, 1, 0,
                              0, 0, 1]) 
    } 
  };
  
  // Create an initialize vertex buffers 
  var vertexBufferObjectPosition = gl.createBuffer(); 
  var vertexBufferObjectColor = gl.createBuffer(); 
    
  // Bind existing attribute data 
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectPosition); 
  gl.bufferData(gl.ARRAY_BUFFER, vertexAttributes.position.data,  
          gl.STATIC_DRAW); 
    
  var positionAttribLocation = gl.getAttribLocation(program,  
          'vertPosition'); 
    
  gl.vertexAttribPointer(positionAttribLocation, 
      vertexAttributes.position.numberOfComponents,  
          gl.FLOAT, gl.FALSE, 0, 0); 
  gl.enableVertexAttribArray(positionAttribLocation); 
    
  // Bind existing attribute data 
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectColor); 
  gl.bufferData(gl.ARRAY_BUFFER, vertexAttributes.color.data,  
          gl.STATIC_DRAW); 
    
  var colorAttribLocation = gl.getAttribLocation(program,  
          'vertColor'); 
    
  gl.vertexAttribPointer(colorAttribLocation, 
      vertexAttributes.color.numberOfComponents, gl.FLOAT,  
              gl.FALSE, 0, 0); 
  gl.enableVertexAttribArray(colorAttribLocation); 
    
  // Set program as part of the current rendering state 
  gl.useProgram(program); 

  // Pass in the canvas resolution so we can convert from
  // pixels to clip space in the shader
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  // Draw the triangle 
  resizeCanvasToDisplaySize(gl.canvas);
 
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

}


main();