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
  // removed function - still has some ideas I was considering
  //createAllmoney();
  //create quote
  createQuote();
  // load animations of robot walking
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
  // add ground and sky attributed to -
  //https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
  // Author - Karim Maaloul
  createGround();
  createSky();
  // start a loop that will update the object positions
  loop();
}

function createQuote() {
  // Attrubuted to - https://stackoverflow.com/questions/35589984/textgeometry-in-three-js
  //Author (stackoverflow username) - Matt C
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

// variables used to create the scene
var scene,
  camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
  renderer, container;

// Function changed from -
//https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
// Author - Karim Maaloul
function createScene() {
  // Get the width and the height of the screen
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  // Create the scene
  scene = new THREE.Scene();
  // Add a fog effect to the scene
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
  // Set the position of the camera
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;
  // Create the renderer
  renderer = new THREE.WebGLRenderer({
    // Allow transparency to show the gradient background
    alpha: true,
    // Activate the anti-aliasing
    antialias: true
  });
  // Define the size of the renderer
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  // Enable shadow rendering
  renderer.shadowMap.enabled = true;
  // Add the DOM element of the renderer to the
  // container we created in the HTML
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  //controls removed
  //controls = new THREE.OrbitControls( camera, renderer.domElement );
  //controls.target.set( 0, 0, 0 );
  //controls.update();
  // resize
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




Ground = function() {
  // create the geometry (shape) of the cylinder
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
  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
}

var ground;

function createGround() {
  ground = new Ground();
  ground.mesh.position.y = -600;
  scene.add(ground.mesh);
}

Cloud = function(path) {
  // Create an empty container that will hold the different parts of the cloud
  this.mesh = new THREE.Object3D();
  var geom = new THREE.CylinderGeometry(25, 25, 25, 25, 10);
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
var sky;

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

// not used, but works and shows some ideas I was thinking about
/*
var money = function() {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "like";
  var body = new THREE.BoxGeometry(10, 10, 1);
  var bodyMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('imgs/neuron.png')
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
*/

// create a fb like box
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

// create an instagram love box
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

// create a shopping cart box
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

function createShop() {
  shop = new shop();
  shop.mesh.scale.set(1, 1, 1);
  shop.mesh.position.y = 125;
  shop.mesh.position.x = 40;
  scene.add(shop.mesh);
}

// create a google search box
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

function createSearch() {
  search = new search();
  search.mesh.scale.set(1, 1, 1);
  search.mesh.position.y = 125;
  search.mesh.position.x = 60;
  scene.add(search.mesh);
}

// load_ani -> load_ani12 are functions to load animations of people walking
// Attributed to -
//https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_fbx.html
// 7 contributors on github - in link
// I couldn't figure out how to decompose the functions further because of the
// need for a new mixer for each which had to have a scope outside the function
function load_ani() {
  var loader2 = new THREE.FBXLoader();
  loader2.load('models/Running.fbx', function(object) {
    console.log(mix);
    console.log(mixer);
    mixer = new THREE.AnimationMixer(object);
    mixer.addEventListener('loop', function(e) {}); // properties of e: type, action and loopDelta
    var action = mixer.clipAction(object.animations[0]);
    action.play();
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
    var action = mixer2.clipAction(object.animations[0]);
    action.play();
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
    var action = mixer3.clipAction(object.animations[0]);
    action.play();
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
    var action = mixer4.clipAction(object.animations[0]);
    action.play();
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
    var action = mixer5.clipAction(object.animations[0]);
    action.play();
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
    mixer6.addEventListener('loop', function(e) {});
    var action = mixer6.clipAction(object.animations[0]);
    action.play();
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
    var action = mixer7.clipAction(object.animations[0]);
    action.play();
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
    mixer8.addEventListener('loop', function(e) {});
    var action = mixer8.clipAction(object.animations[0]);
    action.play();
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
    mixer9.addEventListener('loop', function(e) {});
    var action = mixer9.clipAction(object.animations[0]);
    action.play();
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
    mixer10.addEventListener('loop', function(e) {});
    var action = mixer10.clipAction(object.animations[0]);
    action.play();
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
    mixer11.addEventListener('loop', function(e) {});
    var action = mixer11.clipAction(object.animations[0]);
    action.play();
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
    mixer12.addEventListener('loop', function(e) {});
    var action = mixer12.clipAction(object.animations[0]);
    action.play();
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
  // animations for ground, boxes, sky
  ground.mesh.rotation.z += .01;
  sky.mesh.rotation.z += .01;
  like.mesh.rotation.x += 0.25;
  love.mesh.rotation.x += 0.25;
  shop.mesh.rotation.x += 0.25;
  search.mesh.rotation.x += 0.25;
  //all_money.mesh.position.y += 3;
  //if (all_money.mesh.position.y > 100) all_money.mesh.position.y = getRandomInt1(-50, 0);
  renderer.render(scene, camera);
  // animations for people walking
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
  // call the loop function again
  requestAnimationFrame(loop);
}

// Lights, attributed to
//https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
// Author - Karim Maaloul

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
