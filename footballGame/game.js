import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';


function collisionDetection() {
  //angle hit object
  //velocity of the object
  //angle of object hit
  //calculate new velocity
  //maybe use raycasting to find resulting vector of where to go...


}

function genShot() {
      //    X Y Z
  // var vector = [5,24,40];
  var vector = [-10,24,6];
  return vector;

  //each determine the x speed, y speed and z speed, then multiply by a multiplier after to get the correct speed on screen.
}

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor(0x87CEEB, 1);


    //camera settings
    const fov = 75;
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
    ground.position.set(0 ,-2, 0);

    //bounding box for ground to detect collision 
    let groundBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    groundBox.setFromObject(ground);

    //load the ball into the scene
    const btexture = loader.load('./textures/FootbalT.png');
    const ballgeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
    const material = new THREE.MeshBasicMaterial({map: btexture});
    const football = new THREE.Mesh(ballgeometry, material );
    football.position.set(0,1, -20);
    let ballBox = new THREE.Sphere(football.position, 0.5);
    scene.add(football, ground);




    function checkCollision() {
      if (ballBox.intersectsBox(groundBox)) {
        //get vector of ball, raytrace taht with the surface and calculate the new vector


        
        velocity[1] *= -0.7;
        if (velocity[1] < 3) {
          velocity[1] = 0;
        }
      }
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
      if (velocity[0] > 0) {
        velocity[0] -= airRes * multiplier;
      } else {
        velocity[0] = 0;
      }
      if (velocity[2] > 0) {
        velocity[2] -= airRes * multiplier;
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