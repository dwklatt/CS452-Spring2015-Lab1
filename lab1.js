var gl;
var points;
var index = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    // Four Vertices
    
    var square = [
        vec2( -0.5, -0.5 ),
        vec2(  -0.5,  0.5 ),
        vec2(  0.5, 0.5 ),
        vec2( 0.5, -0.5)
    ];
    var triangle = [
        vec2( -0.5, -0.5 ),
        vec2( -0.5, 0.5),
        vec2( 0.5, -0.5)
    ];
    var pentagon = [
        vec2( 0.0, 0.6),
        vec2( 0.65, 0.25),
        vec2( 0.4, -0.3),
        vec2( -0.4, -0.3),
        vec2( -0.65, 0.25)
    ];

    var t = triangle;
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 80, gl.STATIC_DRAW );
    //gl.bufferSubData(gl.ARRAY_BUFFER, 3, flatten(triangle));

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    canvas.addEventListener("click", function(event){
        index = index%3;

        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);
        if(index == 0){
          t = triangle;
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(t));
        }
        else if(index == 1){
          t = square;
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(t));
        }
        else {
          t = pentagon;
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(t));
        }
        index++;
    } );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, index+2 );

    window.requestAnimFrame(render);
}
