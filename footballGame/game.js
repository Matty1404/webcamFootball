import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';


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

    const ballMat = [
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000}),
        new THREE.MeshBasicMaterial({color:0xFF0000})
    ];

    const ball = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), ballMat);
    ball.position.set(3,0, 0);
    scene.add(ball);

    const cube3 = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), ballMat);
    cube3.position.set(-2,0, -2);
    scene.add(cube3);
  
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
  
    function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
      
  
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  main();