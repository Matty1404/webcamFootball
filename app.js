import './footballGame/handTrack.js';
import { drawHands } from './footballGame/handTrack.js';


const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];

drawHands(canvasElement, videoElement);

