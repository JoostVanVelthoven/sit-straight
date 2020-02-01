import React, { useEffect, useRef } from "react"
import * as faceapi from 'face-api.js';
import './index.css';

export default () => {

    const cameraRef = useRef(null);

    async function loadCamera() {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
          ]);

        cameraRef.current.addEventListener('play', () => {

            const video = cameraRef.current;

            const canvas = faceapi.createCanvasFromMedia(cameraRef.current)
            document.body.append(canvas)
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(canvas, displaySize);


            console.log(displaySize)

            setInterval(async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              console.log(detections);
              const resizedDetections = faceapi.resizeResults(detections, displaySize)
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
              faceapi.draw.drawDetections(canvas, resizedDetections)
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
            }, 100)
        });

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }
        ).then((stream) => {

            cameraRef.current.srcObject = stream;
        })

    }

    useEffect(() => {
        loadCamera();      
    });




    return (<>
        <header>
            Sit straigt coach - sit straigt and move the slider  😁
    </header>
        <main>
            <video id="video" ref={cameraRef} width="320" height="240" preload="preload" autoPlay="autoPlay" loop="loop" muted="muted"></video>
            <canvas id="canvas" width="320" height="240"></canvas></main></>);
}
