import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';


function collisionDetection() {
  //angle hit object
  //velocity of the object
  //angle of object hit
  //calculate new velocity
}

function genShot() {
      //    X Y Z
  // var vector = [5,24,40];
  var vector = [0,24,0];
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
    scene.add(ground);

    //load the ball into the scene
    const btexture = loader.load('./textures/FootbalT.png');
    const ballgeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
    const material = new THREE.MeshBasicMaterial({map: btexture});
    const football = new THREE.Mesh(ballgeometry, material );
    football.position.set(0,1, -20);
    scene.add(football);

    const ballMat = [
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000})
    ];

  
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
  
    var towards = true;

    var velocity = genShot();
    const gravity = 60;
    const multiplier = 0.01;

    function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }


      football.rotation.y = time * 1;
      football.rotation.x = time * 1;

      football.position.x += velocity[0] * multiplier;
      football.position.y += velocity[1] * multiplier;
      football.position.z += velocity[2] * multiplier;

      velocity[1] -= gravity * multiplier;

      // if (towards) {
      //   football.position.z += 0.25;
      //   if (football.position.z > 1) {
      //     towards = false;
      //   } 
      // } else {
      //   football.position.z -= 0.25;
      //   if (football.position.z < -20) {
      //     towards = true;
      //   } 
      // }



      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  main();