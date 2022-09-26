import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { drawHands3D } from './handTrack3D.js';


const videoElement = document.getElementsByClassName('input_video')[0];


function genShot() {
      //    X Y Z
  // var vector = [5,24,40];
  // var vector = [-2,24,24];
  var vector = [-2,24,10];
  // var vector = [0,0,0];
  return vector;

  //each determine the x speed, y speed and z speed, then multiply by a multiplier after to get the correct speed on screen.
}

function initialise(scene) {
  const pointArray = [];
  const pointBoxs = [];
  for (var i = 0; i < 21 * 2; i++) {
    const ballgeometry = new THREE.SphereGeometry( 0.15, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const point = new THREE.Mesh(ballgeometry, material );
    point.position.set(0,2, -4);
    let pointBox = new THREE.Sphere(point.position, 0.15);
    pointBoxs.push(pointBox);
    pointArray.push(point);
    scene.add(point);
  }
  return [pointArray, pointBoxs];
}


function main() {

    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor(0x87CEEB, 1);


    //camera settings
    const fov = 72;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    
    camera.position.y = 4;
    camera.position.z = 4;
    camera.lookAt(new THREE.Vector3(0,0,-10)); 
    const scene = new THREE.Scene();
  
    //create ground
    const boxWidth = canvas.width;
    const boxHeight = 1;
    const boxDepth = 100;
    const geometry = new THREE.BoxBufferGeometry(boxWidth, boxHeight, boxDepth);
  
    const loader = new THREE.TextureLoader();

    const gtexture = loader.load('./textures/grasstexture.png');
    gtexture.wrapS = THREE.RepeatWrapping;
    gtexture.wrapT = THREE.RepeatWrapping;
    gtexture.repeat.set(17, 15);
    const ground = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: gtexture}));    
    ground.position.set(0 ,0, 0);
    // ground.position.set(0 ,-4, 0);

    //bounding box for ground to detect collision 
    let groundBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    groundBox.setFromObject(ground);

    //load the ball into the scene
    const btexture = loader.load('./textures/FootbalT.png');
    const ballgeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
    const material = new THREE.MeshBasicMaterial({map: btexture});
    const football = new THREE.Mesh(ballgeometry, material );
    football.position.set(0,1, -30);
    let ballBox = new THREE.Sphere(football.position, 0.5);
    scene.add(football, ground);


    //gen hands

    var [pointArray, pointBoxs] = initialise(scene);
    drawHands3D(scene, videoElement, pointArray);


    function checkCollision() {
      const x = football.position.x;
      const y = football.position.y;
      const z = football.position.z;
      football.position.x += velocity[0] * multiplier;
      football.position.y += velocity[1] * multiplier;
      football.position.z += velocity[2] * multiplier;

      if (ballBox.intersectsBox(groundBox)) {
        //get vector of ball, raytrace taht with the surface and calculate the new vector
        
        velocity[1] *= -0.7;
        if (velocity[1] < 1) {
          velocity[1] = 0;
        }
      }

      for (let point of pointBoxs) {
        if (ballBox.intersectsSphere(point)) {
          velocity[0] *= -0.5;
          velocity[2] *= -0.5;
          break;
        }
      }





      football.position.set(x, y, z);
    }

 
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
    var velocity = genShot();
    const gravity = 60;
    const airRes = 1;
    const multiplier = 0.01;

    function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }


      football.rotation.x += velocity[2] * 0.06;
      football.rotation.y +=  velocity[0] * 0.06;

      football.position.x += velocity[0] * multiplier;
      football.position.y += velocity[1] * multiplier;
      football.position.z += velocity[2] * multiplier;

      velocity[1] -= gravity * multiplier;
      if (Math.abs(velocity[0]) > 0.2) {
        if (velocity[0] > 0) {
          velocity[0] -= airRes * multiplier;
        } else {
          velocity[0] += airRes * multiplier;
        }
      } else {
        velocity[0] = 0;
      }
      if (Math.abs(velocity[2]) > 0.2) {
        if (velocity[2] > 0) {
          velocity[2] -= airRes * multiplier;
        } else {
          velocity[2] += airRes * multiplier;
        }
      } else {
        velocity[2] = 0;
      }
      checkCollision();

      renderer.render(scene, camera);
  
      if (football.position.z > -2) {
        console.log("GOALLLLLL")
      }

      requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
  }
  
  main();
  