import React, { useEffect, useRef, useState } from "react"
import './index.css';
import { Helmet } from "react-helmet";
import Slider from 'react-input-slider';


export default () => {

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [state, setState] = useState({ y: 50 });
  const [loaded, setLoaded] = useState(false);
  const [headPosition, setHeadPosition] = useState();
  const [isSettingStraight, setIsSettingStraight] = useState(true);

  useEffect(() => {

    window.setTimeout(() => setLoaded(true), 1000);

  }, []);

  useEffect(() => {

    if (!headPosition) {
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
    const isStraight = treshold > currentEyeHeight;
    setIsSettingStraight(isStraight);


    context.strokeStyle = isStraight ? '#44EB55' : '#EB4E2B';

    context.beginPath();
    context.moveTo(headPosition.x, currentEyeHeight);
    context.lineTo(headPosition.x + currentEyeHeight, currentEyeHeight);
    context.stroke();
    context.strokeStyle = '#ccc';

    context.lineWidth = 2;
    context.strokeRect(headPosition.x, headPosition.y, currentEyeHeight, headPosition.height);


  }, [headPosition]);




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

  useEffect(() =>  {
    document.title = ( isSettingStraight ? '😎' : '😪') + ' - sit straight using camera coaching';

  }, [isSettingStraight])

  return (<>
    <Helmet>
      <script src="/build/tracking.js"></script>
      <script src="/build/data/face.js"></script>

    </Helmet>
    <header>
      Sit straigt coach - sit straigt and move the slider  <span role="img">{isSettingStraight ? '😎' : '😪'}</span>
    </header>
    <main className="container">
      <div> <video ref={cameraRef} id="video" width="320" height="240" preload="preload" autoPlay loop muted></video>
        <canvas ref={canvasRef} width="320" height="240"></canvas>

        <Slider className="slider" axis="y" y={state.y} onChange={({ y }) => setState(state => ({ ...state, y }))} />
        {isSettingStraight}
      </div>
      <div className="stats">
        &nbsp;
      </div>



    </main></>);
}
