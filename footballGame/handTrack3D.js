import "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";
import "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js";
import "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js";
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';




export function drawHands3D(videoElement, pointArray) {

    //for each result, add a circle to scene, on each update, move each circle of the result 


    function onResults(results) {
        //from the array of points, update to be that of the coord from the result
        if (results.multiHandLandmarks.length == 1) {
          const handpoints = results.multiHandLandmarks[0];
          console.log(handpoints);
          for (let i = 0; i < 21; i++) {
            pointArray[i].position.set(-handpoints[i].x * 8 + 3, -handpoints[i].y * 8 + 8, (handpoints[i].z - handpoints[0].z) * 8 - 2);
            console.log(pointArray[i].position.x)
          }
        } else if (results.multiHandLandmarks.length == 2) {
          const handpoints = results.multiHandLandmarks[0].concat(results.multiHandLandmarks[1]);
          for (let i = 0; i < 21 * 2; i++) {
            pointArray[i].position.set(-handpoints[i].x * 8 + 3, -handpoints[i].y * 8 + 8, (handpoints[i].z - handpoints[0].z) * 8 - 2);
          }
        }
      }
      
      const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }});
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1, //0
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });


      //default at 0, 0, -3
      //once detected, set position of them to be the coords 

      //create a shit tonne of points for each hand and add them to scene and an array

      hands.onResults(onResults);
      var frame = 0;
      
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          if (frame < 3) {
            frame++;
          } else {
            await hands.send({image: videoElement});
            frame = 0;
          }
        },
        width: 1280,
        height: 720
      });
      camera.start();
}