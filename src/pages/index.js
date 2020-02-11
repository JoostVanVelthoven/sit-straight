import React, { useEffect, useRef, useState } from "react"
import './index.css';
import { Helmet } from "react-helmet";
import Slider from 'react-input-slider';

//import 'tracking/build/tracking';
// //node_modules/tracking/build/data/face.js
//import 'tracking/build/data/face';
// require('../../build/tracking');
// //node_modules/tracking/build/data/face.js
// require('../../build/tracking/data/face');



export default () => {

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [state, setState] = useState({ x: 10, y: 10 });
  const [loaded, setLoaded] = useState(false);
  const [headPosition, setHeadPosition] = useState();
  const [isSettingStraight, setIsSettingStraight] = useState(true);

  useEffect(() => {

    window.setTimeout(() => setLoaded(true), 1000);

  }, []);

  useEffect(() => {

    if(!headPosition){
      return;
    }

    var context = canvasRef.current.getContext('2d');

    const treshold = state.y * 2.3; // because height is 240
    
    context.lineWidth = 4;

    context.strokeStyle = '#a6433ceb';
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.beginPath();
    context.moveTo(0, treshold);
    context.lineTo(320, treshold);
    context.stroke();

    const currentEyeHeight = headPosition.y + (headPosition.height / 2);   
    const isStraight = treshold > currentEyeHeight ;
    setIsSettingStraight(isStraight);
    
  
    context.strokeStyle = isStraight ? '#44EB55' : '#EB4E2B';
    
    context.beginPath();
    context.moveTo(headPosition.x, currentEyeHeight);
    context.lineTo(headPosition.x + currentEyeHeight, currentEyeHeight);
    context.stroke();
    context.strokeStyle = '#ccc';

    context.lineWidth = 2;
    context.strokeRect(headPosition.x, headPosition.y, currentEyeHeight, headPosition.height);


  }, [ headPosition ]);




  useEffect(() => {

    if (loaded) {
      setCamera();
    }

  }, [loaded]);

  var setCamera = () => {

    var tracker = new window.tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    window.tracking.track(cameraRef.current, tracker, { camera: true });

    tracker.on('track', frameAnalysed);
  };

  const frameAnalysed = event => {
    event.data.forEach(function (rect) {     
      setHeadPosition(rect);
    });


  }

  return (<>
    <Helmet>
      <script src="/build/tracking.js"></script>
      <script src="/build/data/face.js"></script>

    </Helmet>
    <header>
      Sit straigt coach - sit straigt and move the slider  <span role="img">{isSettingStraight}{isSettingStraight ? '😎' : '😪' }</span>
    </header>
    <main>

      <div className="container">
        <video ref={cameraRef} id="video" width="320" height="240" preload="preload" autoPlay loop muted></video>
        <canvas ref={canvasRef} width="320" height="240"></canvas>
      </div>
      <div>
        <Slider axis="y" y={state.y} onChange={({ y }) => setState(state => ({ ...state, y }))} />
          {isSettingStraight}
      </div>

    </main></>);
}
