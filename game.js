//scene object variables
var renderer, scene, camera, pointLight, spotLight;

//field variables
var fieldWidth = 500, fieldHeight = 200;

//paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;

var middleBlockPaddle1Width, middleBlockPaddle1Height, middleBlockPaddle1Depth, middleBlockPaddle1Quality;
var middleBlockPaddle2Width, middleBlockPaddle2Height, middleBlockPaddle2Depth, middleBlockPaddle2Quality;
var middleLeftBlockPaddle1Width, middleLeftBlockPaddle1Height, middleLeftBlockPaddle1Depth, middleLeftBlockPaddle1Quality;
var middleLeftBlockPaddle2Width, middleLeftBlockPaddle2Height, middleLeftBlockPaddle2Depth, middleLeftBlockPaddle2Quality;
var middleRightBlockPaddle1Width, middleRightBlockPaddle1Height, middleRightBlockPaddle1Depth, middleRightBlockPaddle1Quality;
var middleRightBlockPaddle2Width, middleRightBlockPaddle2Height, middleRightBlockPaddle2Depth, middleRightBlockPaddle2Quality;
var RightBlockPaddle1Width, RightBlockPaddle1Height, RightBlockPaddle1Depth, RightBlockPaddle1Quality;
var LeftBlockPaddle1Width, LeftBlockPaddle1Height, LeftBlockPaddle1Depth, LeftBlockPaddle1Quality;

//ball variables
var paddle, middleBlockPaddle1, middleBlockPaddle2, middleLeftBlockPaddle1, middleLeftBlockPaddle2,
middleRightBlockPaddle1, middleRightBlockPaddle2, RightBlockPaddle1, LeftBlockPaddle1, 
LeftBlock, RightBlock, middleRightBlock, middleLeftBlock, middleBlock, RandomBlock;

//game-related variables
var score = 0;

var repeater;

var collidableMeshList = [];

function setup()
{
//	update the board to reflect the max score for match win
	document.getElementById("winnerBoard").innerHTML = "Move in the gaps!";

//	set up all the 3D objects in the scene
	createScene();

//	and let's get cracking!
	draw();
}

function createScene()
{
//	set the scene size
	var WIDTH = 640,
	HEIGHT = 360;

//	set some camera attributes
	var VIEW_ANGLE = 50,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

	var c = document.getElementById("gameCanvas");

//	create a WebGL renderer, camera
//	and a scene
	renderer = new THREE.WebGLRenderer({antialias:true});
	camera =
		new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR);

	scene = new THREE.Scene();

//	add the camera to the scene
	scene.add(camera);

//	set a default position for the camera
//	not doing this somehow messes up shadow rendering
	//camera.position.z = 320;

//	start the renderer
	renderer.setSize(WIDTH, HEIGHT);

//	attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

//	set up the playing surface plane
	var planeWidth = fieldWidth,
	planeHeight = fieldHeight,
	planeQuality = 10;

//	create the paddle1's material
	var paddleMaterial =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var middleBlockPaddle1Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var middleBlockPaddle2Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var middleLeftBlockPaddle1Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var middleLeftBlockPaddle2Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var middleRightBlockPaddle1Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var middleRightBlockPaddle2Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var RightBlockPaddle1Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the paddle1's material
	var LeftBlockPaddle1Material =
		new THREE.MeshLambertMaterial(
				{
					color: 0x1B32C0
				});
	
//	create the plane's material
	var planeMaterial =
		new THREE.MeshLambertMaterial(
				{
					color: 0xb2b2ff
				});
//	create the table's material
	var tableMaterial =
		new THREE.MeshLambertMaterial(
				{
					color: 0x111111
				});
//	create the ground's material
	var groundMaterial =
		new THREE.MeshLambertMaterial(
				{
					color: 0x888888
				});


//	create the playing surface plane
	var plane = new THREE.Mesh(

			new THREE.PlaneGeometry(
					planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
					planeHeight,
					planeQuality,
					planeQuality),

					planeMaterial);

	scene.add(plane);
	plane.receiveShadow = true;	

	var table = new THREE.Mesh(

			new THREE.CubeGeometry(
					planeWidth * 1.05,	// this creates the feel of a billiards table, with a lining
					planeHeight * 1.03,
					100,	// an arbitrary depth, the camera can't see much of it anyway
					planeQuality,
					planeQuality,
					1),

					tableMaterial);
	table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
	scene.add(table);
	table.receiveShadow = true;	

//	// set up the paddle vars
	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;
	
	middleBlockPaddle1Width = 10;
	middleBlockPaddle1Height = 75;
	middleBlockPaddle1Depth = 10;
	middleBlockPaddle1Quality = 1;
	
	middleBlockPaddle2Width = 10;
	middleBlockPaddle2Height = 75;
	middleBlockPaddle2Depth = 10;
	middleBlockPaddle2Quality = 1;
	
	middleLeftBlockPaddle1Width = 10;
	middleLeftBlockPaddle1Height = 30;
	middleLeftBlockPaddle1Depth = 10;
	middleLeftBlockPaddle1Quality = 1;
	
	middleLeftBlockPaddle2Width = 10;
	middleLeftBlockPaddle2Height = 110;
	middleLeftBlockPaddle2Depth = 10;
	middleLeftBlockPaddle2Quality = 1;
	
	middleRightBlockPaddle1Width = 10;
	middleRightBlockPaddle1Height = 30;
	middleRightBlockPaddle1Depth = 10;
	middleRightBlockPaddle1Quality = 1;
	
	middleRightBlockPaddle2Width = 10;
	middleRightBlockPaddle2Height = 110;
	middleRightBlockPaddle2Depth = 10;
	middleRightBlockPaddle2Quality = 1;
	
	RightBlockPaddle1Width = 10;
	RightBlockPaddle1Height = 160;
	RightBlockPaddle1Depth = 10;
	RightBlockPaddle1Quality = 1;
	
	LeftBlockPaddle1Width = 10;
	LeftBlockPaddle1Height = 160;
	LeftBlockPaddle1Depth = 10;
	LeftBlockPaddle1Quality = 1;

	paddle = new THREE.Mesh(

			new THREE.CubeGeometry(
					paddleWidth,
					paddleHeight,
					paddleDepth,
					paddleQuality,
					paddleQuality,
					paddleQuality),                                

					paddleMaterial);
                                        
	
	middleBlockPaddle1 = new THREE.Mesh(

			new THREE.CubeGeometry(
					middleBlockPaddle1Width,
					middleBlockPaddle1Height,
					middleBlockPaddle1Depth,
					middleBlockPaddle1Quality,
					middleBlockPaddle1Quality,
					middleBlockPaddle1Quality),

					middleBlockPaddle1Material);
	
	middleBlockPaddle2 = new THREE.Mesh(

			new THREE.CubeGeometry(
					middleBlockPaddle2Width,
					middleBlockPaddle2Height,
					middleBlockPaddle2Depth,
					middleBlockPaddle2Quality,
					middleBlockPaddle2Quality,
					middleBlockPaddle2Quality),

					middleBlockPaddle2Material);
	
	middleLeftBlockPaddle1 = new THREE.Mesh(

			new THREE.CubeGeometry(
					middleLeftBlockPaddle1Width,
					middleLeftBlockPaddle1Height,
					middleLeftBlockPaddle1Depth,
					middleLeftBlockPaddle1Quality,
					middleLeftBlockPaddle1Quality,
					middleLeftBlockPaddle1Quality),

					middleLeftBlockPaddle1Material);
	
	middleLeftBlockPaddle2 = new THREE.Mesh(

			new THREE.CubeGeometry(
					middleLeftBlockPaddle2Width,
					middleLeftBlockPaddle2Height,
					middleLeftBlockPaddle2Depth,
					middleLeftBlockPaddle2Quality,
					middleLeftBlockPaddle2Quality,
					middleLeftBlockPaddle2Quality),

					middleLeftBlockPaddle2Material);
	
	middleRightBlockPaddle1 = new THREE.Mesh(

			new THREE.CubeGeometry(
					middleRightBlockPaddle1Width,
					middleRightBlockPaddle1Height,
					middleRightBlockPaddle1Depth,
					middleRightBlockPaddle1Quality,
					middleRightBlockPaddle1Quality,
					middleRightBlockPaddle1Quality),

					middleRightBlockPaddle1Material);
	
	middleRightBlockPaddle2 = new THREE.Mesh(

			new THREE.CubeGeometry(
					middleRightBlockPaddle2Width,
					middleRightBlockPaddle2Height,
					middleRightBlockPaddle2Depth,
					middleRightBlockPaddle2Quality,
					middleRightBlockPaddle2Quality,
					middleRightBlockPaddle2Quality),

					middleRightBlockPaddle2Material);
	
	RightBlockPaddle1 = new THREE.Mesh(

			new THREE.CubeGeometry(
					RightBlockPaddle1Width,
					RightBlockPaddle1Height,
					RightBlockPaddle1Depth,
					RightBlockPaddle1Quality,
					RightBlockPaddle1Quality,
					RightBlockPaddle1Quality),

					RightBlockPaddle1Material);
	
	LeftBlockPaddle1 = new THREE.Mesh(

			new THREE.CubeGeometry(
					LeftBlockPaddle1Width,
					LeftBlockPaddle1Height,
					LeftBlockPaddle1Depth,
					LeftBlockPaddle1Quality,
					LeftBlockPaddle1Quality,
					LeftBlockPaddle1Quality),

					LeftBlockPaddle1Material);
                                               
	
	middleBlock = new THREE.Object3D();
	middleBlock.add(middleBlockPaddle1);
	middleBlock.add(middleBlockPaddle2);
	
	middleLeftBlock = new THREE.Object3D();
	middleLeftBlock.add(middleLeftBlockPaddle1);
	middleLeftBlock.add(middleLeftBlockPaddle2);
	
	middleRightBlock = new THREE.Object3D();
	middleRightBlock.add(middleRightBlockPaddle1);
	middleRightBlock.add(middleRightBlockPaddle2);
	
	RightBlock = new THREE.Object3D();
	RightBlock.add(RightBlockPaddle1);

	LeftBlock = new THREE.Object3D();
	LeftBlock.add(LeftBlockPaddle1);
    
	scene.add(paddle);	
	scene.add(spawning());
	
	paddle.receiveShadow = true;
	paddle.castShadow = true;
        
        collidableMeshList.push(middleBlockPaddle1, middleBlockPaddle2,
        middleLeftBlockPaddle1, middleLeftBlockPaddle2, middleRightBlockPaddle1,
        middleRightBlockPaddle2, RightBlockPaddle1, LeftBlockPaddle1);
	
//	set paddles on each side of the table
	paddle.position.x = -fieldWidth/2 + paddleWidth;

	
	middleBlockPaddle1.position.x = fieldWidth/2;
	middleBlockPaddle1.position.y = -60;
	middleBlockPaddle2.position.x = fieldWidth/2;
	middleBlockPaddle2.position.y = 60;
	
	middleLeftBlockPaddle1.position.x = fieldWidth/2;
	middleLeftBlockPaddle1.position.y = 80;
	middleLeftBlockPaddle2.position.x = fieldWidth/2;
	middleLeftBlockPaddle2.position.y = -40;
	
	middleRightBlockPaddle1.position.x = fieldWidth/2;
	middleRightBlockPaddle1.position.y = -80;
	middleRightBlockPaddle2.position.x = fieldWidth/2;
	middleRightBlockPaddle2.position.y = 40;
	
	RightBlockPaddle1.position.x = fieldWidth/2;
	RightBlockPaddle1.position.y = 20;
	
	LeftBlockPaddle1.position.x = fieldWidth/2;
	LeftBlockPaddle1.position.y = -20;
        
        
        
       // collidableMeshList.push(RandomBlock);

//	finally we finish by adding a ground plane
//	to show off pretty shadows
	var ground = new THREE.Mesh(

			new THREE.CubeGeometry(
					1000,
					1000,
					3,
					1,
					1,
					1 ),

					groundMaterial);
	// set ground to arbitrary z position to best show off shadowing
	ground.position.z = -132;
	ground.receiveShadow = true;	
	scene.add(ground);	

//	// create a point light
	pointLight =
		new THREE.PointLight(0xF8D898);

//	set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
//	add to the scene
	scene.add(pointLight);

//	add a spot light
//	this is important for casting shadows
	spotLight = new THREE.SpotLight(0xF8D898);
	spotLight.position.set(0, 0, 460);
	spotLight.intensity = 1.5;
	spotLight.castShadow = true;
	scene.add(spotLight);

//	MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	renderer.shadowMapEnabled = true;
        
    
}

function draw()
{	
//	draw THREE.JS scene
	renderer.render(scene, camera);
//	loop draw function call
	requestAnimationFrame(draw);

	addScore();
	collision();
	cameraPhysics();
	playerPaddleMovement();
	enemyPaddleMovement();
}

function addScore()
{
    if (RandomBlock.position.x === paddle.position.x*2)
	score++;
    document.getElementById("scores").innerHTML = score;
}

function enemyPaddleMovement()
{ 
    if(score < 10)
    {
        RandomBlock.translateX(-10);
    }
    
    if(score >= 10)
    {
        RandomBlock.translateX(-12);
    }

}


function playerPaddleMovement()
{

	if (Key.isDown(Key.D))	
	{

	paddle.position.y = 80;

	}	

	else if (Key.isDown(Key.F))
	{

	paddle.position.y = 40;
		
	}
	
	else if (Key.isDown(Key.H))
	{

	paddle.position.y = 0;
		
	}
	
	else if (Key.isDown(Key.J))
	{

	paddle.position.y = -40;
	
	}
	

	else if (Key.isDown(Key.K))
	{

	paddle.position.y = -80;
        
    }
				
}
	

//Handles camera and lighting logic
function cameraPhysics()
{

//	move to behind the player's paddle
	camera.position.x = paddle.position.x - 100;
	camera.position.y += (paddle.position.y - camera.position.y) * 0.05;
	camera.position.z = paddle.position.z + 100 + 0.04 * (paddle.position.x);

//	rotate to face towards the opponent
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

//Handles paddle collision logic
function collision()
{

    
}   
    
           
function resetBall()
{

}

//checks if either player or opponent has reached 7 points
function matchScoreCheck()
{
     
}

function spawning() 
{
    shapes = [LeftBlock, RightBlock, middleRightBlock, middleLeftBlock, middleBlock];
    var shape = shapes[Math.floor(Math.random()*shapes.length)];
    RandomBlock = new THREE.Object3D();
    RandomBlock.add(shape);
    scene.add(RandomBlock);
    repeater = setTimeout(spawning, 2000);
}
