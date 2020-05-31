import React, { useEffect, useRef, useState } from "react"
import './index.css';

import canvasCameraDrawer from '../helpers/canvasCameraDrawer'
import trackerBinder from '../helpers/trackerBinder'
import Main from '../components/mainComponent'
import Footer from '../components/footerComponent'
import fetchInject from 'fetch-inject'
import { isCorrectPosition$ } from '../helpers/timer'
export default () => {

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [sliderState, setSliderState] = useState({ y: 50 });
  const [loaded, setLoaded] = useState(false);
  const [headPosition, setHeadPosition] = useState();
  const [isSettingStraight, setIsSettingStraight] = useState(undefined);
  const [setupState, setSetupState] = useState({ hasCamera: false });

  //unfortuntly the webcam current library is not node/npm.
  useEffect(() => {

    fetchInject([
      '/build/tracking.js',
      '/build/data/face.js'
    ]).then(_ => setLoaded(true))
  }, []);

  useEffect(() => {
    if (loaded) {
      trackerBinder(cameraRef, setHeadPosition);
    }

  }, [loaded]);


  // new head event

  useEffect(() => {
    if (!headPosition) {
      return;
    }
    setSetupState({ ...setupState, hasCamera: true })

    const treshold = sliderState.y * 2.3; // because height is 240

    const currentEyeHeight = headPosition.y + (headPosition.height / 2);
    const isStraight = treshold > currentEyeHeight;

    setIsSettingStraight(isStraight);
    canvasCameraDrawer(canvasRef.current, headPosition, treshold, isStraight, currentEyeHeight);

  }, [headPosition, sliderState]);

  useEffect(() => {
    isCorrectPosition$.next(isSettingStraight);
    if (isSettingStraight !== undefined) {
      document.title = (isSettingStraight ? '😎' : '😪') + ' - fix your back positure using camera coaching';
    }

  }, [isSettingStraight])

  return (<>

    <header>
      Sit straigt coach - sit straigt and move the slider  <span role="img">{isSettingStraight ? '😎' : '😪'}</span>
    </header>
    <Main
      cameraRef={cameraRef}
      canvasRef={canvasRef}
      sliderState={sliderState}
      setSliderState={setSliderState}
      setupState={setupState}
      setSetupState={setSetupState}
    />
    <Footer />
  </>);
}
