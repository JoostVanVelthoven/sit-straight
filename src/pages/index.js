import React, { useEffect  , useRef} from "react"
import * as faceapi from 'face-api.js';
import './index.css';

export default () =>  { 

   
    const cameraRef = useRef(null);

    useEffect( () => {

     
        // await facepi.nets.tinyFaceDetector.loadFromUri();
        

        // cameraRef.current.addEventListener('play', () => {
            
        //     const video = cameraRef.current;
            
        //     const canvas = faceapi.createCanvasFromMedia(cameraRef.current)
        //     document.body.append(canvas)
        //     const displaySize = { width: video.width, height: video.height }
        //     faceapi.matchDimensions(canvas, displaySize)
        //     setInterval(async () => {
        //       const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        //       const resizedDetections = faceapi.resizeResults(detections, displaySize)
        //       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        //       //faceapi.draw.drawDetections(canvas, resizedDetections)
        //       //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //       //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        //     }, 100)
        //   })
        
        
       


        //window.setTimeout(function() {



            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            }
                ).then((stream)=>{

                    cameraRef.current.srcObject = stream;  
                 })              
   
      //},1000);
    });
  


    return(<html>

<body>
    <header>
        Sit straigt coach - sit straigt and move the slider  😁
    </header>
    <main>
    <video id="video" ref={cameraRef} width="320" height="240" preload="preload" autoPlay="autoPlay" loop="loop" muted="muted"></video>
      <canvas id="canvas" width="320" height="240"></canvas></main></body>

</html>); }
