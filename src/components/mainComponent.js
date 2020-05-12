import React , { useCallback } from "react"

import Slider from 'react-input-slider';

export default (props ) =>  {
    const usePip = useCallback(
        () => {
            props.cameraRef.current.requestPictureInPicture()
        },
        [props.cameraRef.current],
      );
    return (<main className="container">
        <div> 
            <video ref={props.cameraRef} id="video" width="320" height="240" preload="preload" autoPlay loop muted></video>
            <canvas ref={props.canvasRef} width="320" height="240"></canvas>
            <Slider className="slider" axis="y" y={props.sliderState.y} onChange={({ y }) => props.setSliderState(sliderState => ({ ...sliderState, y }))} />
        </div>
        <div className="stats">
            &nbsp;
            <a onClick={usePip}>Use pip</a>

        </div>
    </main>);
    }
    
    