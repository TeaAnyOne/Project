    var WIDTH = 200, HEIGHT = 200;     

    var renderer	= new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColorHex(0xffffff);
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild( renderer.domElement );
    var onRenderFcts= [];
    var scene	= new THREE.Scene();
    var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 3;
    //////////////////////////////////////////////////////////////////////////////////
    //		add a text								//
    //////////////////////////////////////////////////////////////////////////////////

    var mesh	= new THREEx.Text('3D');
    mesh.scale.multiplyScalar(1);
    mesh.position.y	= -0.5;
    scene.add(mesh);

    //////////////////////////////////////////////////////////////////////////////////
    //		Camera Controls							//
    //////////////////////////////////////////////////////////////////////////////////
    var mouse	= {x : 0, y : 0};
    document.addEventListener('mousemove', function(event){
            mouse.x	= (event.clientX / window.innerWidth ) - 0.5;
            mouse.y	= (event.clientY / window.innerHeight) - 0.5;
    }, false);
    onRenderFcts.push(function(delta, now){
            camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3);
            camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3);
            camera.lookAt( scene.position );
    });
    //////////////////////////////////////////////////////////////////////////////////
    //		render the scene						//
    //////////////////////////////////////////////////////////////////////////////////
    onRenderFcts.push(function(){
            renderer.render( scene, camera );		
    });

    //////////////////////////////////////////////////////////////////////////////////
    //		loop runner							//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null;
    requestAnimationFrame(function animate(nowMsec){
            // keep looping
            requestAnimationFrame( animate );
            // measure time
            lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
            var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec	= nowMsec;
            // call each update function
            onRenderFcts.forEach(function(onRenderFct){
                    onRenderFct(deltaMsec/1000, nowMsec/1000);
            });
    });
