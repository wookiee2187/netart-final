// Colors used for objects
var Colors = {
  brown: 0x59332e,
  pink: 0xF5986E,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
  black: 0x000000
};
// clock for animation
var clock = new THREE.Clock();
// mixers for running animations
var mixer;
var mixer2;
var mixer3;
var mixer4;
var mixer5;
var mixer6;
var mixer7;
var mixer8;
var mixer9;
var mixer10;
var mixer11;
var mixer12;
// list_img for images for clouds
var list_img = ['imgs/insta.png', 'imgs/fb.png', 'imgs/google.jpeg', 'imgs/amazon.jpeg'];
window.addEventListener('load', init, false);
// funtion run to initialize
function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  // set up the scene, the camera and the renderer
  createScene();

  // add the lights
  createLights();

  // add the triggers
  createLike();
  createLove();
  createShop();
  createSearch();

  // decided to take out money
  //createAllmoney();

  createQuotes();

  // load animations of walking
  load_ani();
  load_ani2();
  load_ani3();
  load_ani4();
  load_ani5();
  load_ani6();
  load_ani7();
  load_ani8();
  load_ani9();
  load_ani10();
  load_ani11();
  load_ani12();

  // add ground and sky
  createGround();
  createSky();
  add_audio();

  // start a loop that will update the objects' positions
  // and render the scene on each frame
  loop();
}

function add_audio() {
  // instantiate a listener
  var audioListener = new THREE.AudioListener();

  // add the listener to the camera
  camera.add(audioListener);

  // instantiate audio object
  var oceanAmbientSound = new THREE.Audio(audioListener);

  // add the audio object to the scene
  scene.add(oceanAmbientSound);

  // instantiate a loader
  var loader = new THREE.AudioLoader();

  // load a resource
  loader.load(
    // resource URL
    'audio/ambient_ocean.ogg',

    // onLoad callback
    function(audioBuffer) {
      // set the audio object buffer to the loaded object
      oceanAmbientSound.setBuffer(audioBuffer);

      // play the audio
      oceanAmbientSound.play();
    }

  )
}

  function createQuotes() {
    var loader = new THREE.FontLoader();

    loader.load('fonts/helvetiker_regular.typeface.json', function(font) {

      var geometry = new THREE.TextGeometry('it is no longer enough to automate information flows about us; the goal now is to automate us.', {
        font: font,
        size: 30,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });
      var textMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0xffffff
      });

      var mesh = new THREE.Mesh(geometry, textMaterial);
      mesh.position.y = 200;
      mesh.scale.set(0.2, 0.2, 0.2);
      mesh.position.x = -170;

      scene.add(mesh);
    });
  }


  var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container;

  /*
  var mousePos={x:0, y:0};

  // now handle the mousemove event

  function handleMouseMove(event) {

  // here we are converting the mouse position value received
  // to a normalized value varying between -1 and 1;
  // this is the formula for the horizontal axis:

  var tx = -1 + (event.clientX / WIDTH)*2;

  // for the vertical axis, we need to inverse the formula
  // because the 2D y-axis goes the opposite direction of the 3D y-axis

  var ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};

  }
  */

  function createScene() {
    // Get the width and the height of the screen,
    // use them to set up the aspect ratio of the camera
    // and the size of the renderer.
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // Create the scene
    scene = new THREE.Scene();

    // Add a fog effect to the scene; same color as the
    // background color used in the style sheet
    scene.fog = new THREE.Fog(0xC0C0C0, 100, 950);

    // Create the camera
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );


    //camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    //camera.position.set( 0, 200, 100 );
    // Set the position of the camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // Create the renderer
    renderer = new THREE.WebGLRenderer({
      // Allow transparency to show the gradient background
      // we defined in the CSS
      alpha: true,

      // Activate the anti-aliasing; this is less performant,
      // but, as our project is low-poly based, it should be fine :)
      antialias: true
    });

    // Define the size of the renderer; in this case,
    // it will fill the entire screen
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    // Enable shadow rendering
    renderer.shadowMap.enabled = true;

    // Add the DOM element of the renderer to the
    // container we created in the HTML
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    //container.appendChild(document.getElementById('time'));

    //controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.target.set( 0, 100, 0 );
    //controls.update();

    // Listen to the screen: if the user resizes it
    // we have to update the camera and the renderer size
    window.addEventListener('resize', handleWindowResize, false);

    stats = new THREE.Stats();
    //container.appendChild( stats.dom );

    fb = new THREE.Object3D()
  }

  function handleWindowResize() {
    // update height and width of the renderer and the camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }




  // First let's define a Sea object :
  Ground = function() {

    // create the geometry (shape) of the cylinder;
    // the parameters are:
    // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

    // rotate the geometry on the x axis
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // create the material
    var mat = new THREE.MeshPhongMaterial({
      color: Colors.brownDark,
      transparent: true,
      opacity: .6,
      shading: THREE.FlatShading,
    });

    // To create an object in Three.js, we have to create a mesh
    // which is a combination of a geometry and some material
    this.mesh = new THREE.Mesh(geom, mat);

    // Allow the sea to receive shadows
    this.mesh.receiveShadow = true;
  }

  // Instantiate the sea and add it to the scene:

  var ground;

  function createGround() {
    ground = new Ground();

    // push it a little bit at the bottom of the scene
    ground.mesh.position.y = -600;

    // add the mesh of the sea to the scene
    scene.add(ground.mesh);
  }

  Cloud = function(path) {
    // Create an empty container that will hold the different parts of the cloud
    this.mesh = new THREE.Object3D();

    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    var geom = new THREE.CylinderGeometry(25, 25, 25, 25, 10);
    //oxGeometry(20,20,20);

    // create a material; a simple white material will do the trick
    /*var mat = new THREE.MeshPhongMaterial({
    color:Colors.brownDark,
    });
    */
    //'imgs/insta.png'
    var mat = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(path)
    });


    // duplicate the geometry a random number of times
    var nBlocs = 3 + Math.floor(Math.random() * 3);
    for (var i = 0; i < nBlocs; i++) {

      // create the mesh by cloning the geometry
      var m = new THREE.Mesh(geom, mat);

      // set the position and the rotation of each cube randomly
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      // set the size of the cube randomly
      var s = .1 + Math.random() * .9;
      m.scale.set(s, s, s);

      // allow each cube to cast and to receive shadows
      m.castShadow = true;
      m.receiveShadow = true;

      // add the cube to the container we first created
      this.mesh.add(m);
    }
  }

  function getRandomInt1(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  // Define a Sky Object
  Sky = function() {
    // Create an empty container
    this.mesh = new THREE.Object3D();

    // choose a number of clouds to be scattered in the sky
    this.nClouds = 100;

    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle
    var stepAngle = Math.PI * 2 / this.nClouds;

    // create the clouds
    for (var i = 0; i < this.nClouds; i++) {
      pick = getRandomInt1(0, 4);
      var c = new Cloud(list_img[pick]);

      // set the rotation and the position of each cloud;
      // for that we use a bit of trigonometry
      var a = stepAngle * i; // this is the final angle of the cloud
      var h = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself

      // Trigonometry!!! I hope you remember what you've learned in Math :)
      // in case you don't:
      // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;

      // rotate the cloud according to its position
      c.mesh.rotation.z = a + Math.PI / 2;

      // for a better result, we position the clouds
      // at random depths inside of the scene
      c.mesh.position.z = -400 - Math.random() * 400;

      // we also set a random scale for each cloud
      var s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);

      // do not forget to add the mesh of each cloud in the scene
      this.mesh.add(c.mesh);
    }
  }

  // Now we instantiate the sky and push its center a bit
  // towards the bottom of the screen

  var sky;

  function createSky() {
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
  }


  // not used, but works
  var money = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "like";
    var body = new THREE.BoxGeometry(10, 10, 1);
    var bodyMat = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('imgs/money.png')
    });
    var body = new THREE.Mesh(body, bodyMat);
    body.position.set(0, 50, 10);
    this.mesh.add(body);
  }
  var money;

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var All_money = function() {
    this.mesh = new THREE.Object3D();
    this.nMoney = 0;

    for (var i = 0; i < this.nMoney; i++) {
      var m = new money();
      m.mesh.scale.set(1, 1, 1);
      m.mesh.position.y = getRandomInt(30);
      m.mesh.position.x = getRandomInt(100);
      this.mesh.add(m.mesh);
    }


  }

  var all_money;

  function createAllmoney() {
    all_money = new All_money();
    all_money.mesh.position.x = -50;
    all_money.mesh.position.y = 0;
    scene.add(all_money.mesh);
  }



  var like = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "like";
    var body = new THREE.BoxGeometry(15, 15, 15);
    var bodyMat = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('imgs/like.png')
    });
    var body = new THREE.Mesh(body, bodyMat);
    body.position.set(32, -12, 0);
    this.mesh.add(body);
  }
  var like;

  function createLike() {
    like = new like();
    like.mesh.scale.set(1, 1, 1);
    like.mesh.position.y = 100;
    like.mesh.position.x = 40;
    scene.add(like.mesh);
  }

  var love = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "love";
    var body = new THREE.BoxGeometry(15, 15, 15);
    var bodyMat = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('imgs/love.png')
    });
    var body = new THREE.Mesh(body, bodyMat);
    body.position.set(32, -12, 0);
    this.mesh.add(body);
  }
  var love;

  function createLove() {
    love = new love();
    love.mesh.scale.set(1, 1, 1);
    love.mesh.position.y = 100;
    love.mesh.position.x = 60;
    scene.add(love.mesh);
  }

  var shop = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "shop";
    var body = new THREE.BoxGeometry(15, 15, 15);
    var bodyMat = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('imgs/download.png')
    });
    var body = new THREE.Mesh(body, bodyMat);
    body.position.set(32, -12, 0);
    this.mesh.add(body);
  }
  var shop;

  function createSearch() {
    shop = new shop();
    shop.mesh.scale.set(1, 1, 1);
    shop.mesh.position.y = 125;
    shop.mesh.position.x = 40;
    scene.add(shop.mesh);
  }

  var search = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "search";
    var body = new THREE.BoxGeometry(15, 15, 15);
    var bodyMat = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('imgs/gsearch.png')
    });
    var body = new THREE.Mesh(body, bodyMat);
    body.position.set(32, -12, 0);
    this.mesh.add(body);
  }
  var search;

  function createShop() {
    search = new search();
    search.mesh.scale.set(1, 1, 1);
    search.mesh.position.y = 125;
    search.mesh.position.x = 60;
    scene.add(search.mesh);
  }

  function load_ani() {

    var loader2 = new THREE.FBXLoader();
    loader2.load('models/Running.fbx', function(object) {
      console.log(mix);
      console.log(mixer);
      mixer = new THREE.AnimationMixer(object);
      mixer.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      object.position.y = targetY;

      var action = mixer.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -50;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani2() {

    var loader3 = new THREE.FBXLoader();
    loader3.load('models/Running.fbx', function(object) {

      mixer2 = new THREE.AnimationMixer(object);
      mixer2.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer2.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -70;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani3() {
    var loader = new THREE.FBXLoader();
    loader.load('models/Running.fbx', function(object) {

      mixer3 = new THREE.AnimationMixer(object);
      mixer3.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer3.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -30;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani4() {

    var loader = new THREE.FBXLoader();
    loader.load('models/Running.fbx', function(object) {

      mixer4 = new THREE.AnimationMixer(object);
      mixer4.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer4.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = 0;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani5() {

    var loader3 = new THREE.FBXLoader();
    loader3.load('models/Running.fbx', function(object) {

      mixer5 = new THREE.AnimationMixer(object);
      mixer5.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer5.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -50;
      object.position.z = -40;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani6() {

    var loader3 = new THREE.FBXLoader();
    loader3.load('models/Running.fbx', function(object) {

      mixer6 = new THREE.AnimationMixer(object);
      mixer6.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer6.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -70;
      object.position.z = -40;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani7() {

    var loader8 = new THREE.FBXLoader();
    loader8.load('models/Running.fbx', function(object) {

      mixer7 = new THREE.AnimationMixer(object);
      mixer7.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer7.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -30;
      object.position.z = -40;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani8() {

    var loader9 = new THREE.FBXLoader();
    loader9.load('models/Running.fbx', function(object) {

      mixer8 = new THREE.AnimationMixer(object);
      mixer8.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer8.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = 0;
      object.position.z = -40;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani9() {

    var loader10 = new THREE.FBXLoader();
    loader10.load('models/Running.fbx', function(object) {

      mixer9 = new THREE.AnimationMixer(object);
      mixer9.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer9.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -70;
      object.position.z = -70;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani10() {

    var loader = new THREE.FBXLoader();
    loader.load('models/Running.fbx', function(object) {

      mixer10 = new THREE.AnimationMixer(object);
      mixer10.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      //var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      //object.position.y = targetY;

      var action = mixer10.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -30;
      object.position.z = -70;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani11() {

    var loader2 = new THREE.FBXLoader();
    loader2.load('models/Running.fbx', function(object) {
      console.log(mix);
      console.log(mixer);
      mixer11 = new THREE.AnimationMixer(object);
      mixer11.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      object.position.y = targetY;

      var action = mixer11.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = -50;
      object.position.z = -70;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }

  function load_ani12() {

    var loader2 = new THREE.FBXLoader();
    loader2.load('models/Running.fbx', function(object) {
      console.log(mix);
      console.log(mixer);
      mixer12 = new THREE.AnimationMixer(object);
      mixer12.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta

      var targetY = normalize(mousePos.y, -1, 1, -110, 100);

      // update the airplane's position
      object.position.y = targetY;

      var action = mixer12.clipAction(object.animations[0]);
      action.play();
      //var targetX = normalize(mousePos.x, -1, 1, 0, 0);


      object.scale.set(.25, .25, .25);
      object.position.x = 0;
      object.position.z = -70;
      object.rotation.y = 1.75;

      object.traverse(function(child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(object);

    });
  }



  function loop() {

    ground.mesh.rotation.z += .01;
    sky.mesh.rotation.z += .01;
    like.mesh.rotation.x += 0.25;
    love.mesh.rotation.x += 0.25;
    shop.mesh.rotation.x += 0.25;
    search.mesh.rotation.x += 0.25;
    //all_money.mesh.position.y += 3;


    //if (all_money.mesh.position.y > 100) all_money.mesh.position.y = getRandomInt1(-50,0);

    renderer.render(scene, camera);
    var delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    if (mixer2) mixer2.update(delta);

    if (mixer3) mixer3.update(delta);

    if (mixer4) mixer4.update(delta);

    if (mixer5) mixer5.update(delta);

    if (mixer6) mixer6.update(delta);

    if (mixer7) mixer7.update(delta);

    if (mixer8) mixer8.update(delta);

    if (mixer9) mixer9.update(delta);

    if (mixer10) mixer10.update(delta);

    if (mixer11) mixer10.update(delta);

    if (mixer12) mixer10.update(delta);

    renderer.render(scene, camera);

    stats.update();
    // call the loop function again
    requestAnimationFrame(loop);
    //updateCarrotPosition();
    //updatePlane();
    //updatePlayer();
    // render the scene


  }





  function updateLike() {

    // let's move the airplane between -100 and 100 on the horizontal axis,
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)

    // update the airplane's position
    player.mesh.position.y = targetY;
    player.mesh.position.x = targetX;
  }


  function updatePlayer() {

    // let's move the airplane between -100 and 100 on the horizontal axis,
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)

    var targetX = normalize(mousePos.x, -1, 1, -125, 125);
    var targetY = normalize(mousePos.y, -1, 1, 0, 0);

    // update the airplane's position
    player.mesh.position.y = targetY;
    player.mesh.position.x = targetX;
  }

  function normalize(v, vmin, vmax, tmin, tmax) {

    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;

  }
  var hemisphereLight, shadowLight;

  function createLights() {
    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color,
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .4)

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // Set the direction of the light
    shadowLight.position.set(150, 350, 350);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
  }
