import React , { useCallback } from "react"

import Slider from 'react-input-slider';

export default ({sliderState ,  setSliderState , cameraRef , canvasRef, setupState ,  setSetupState } ) =>  {
    
    console.log(setupState);
    const usePip = useCallback(
        () => {
            const requestPip = cameraRef.current.requestPictureInPicture;
            if(requestPip){
                setSetupState({ ...setupState , hasPip : true} );
                requestPip();
            }
        },
        [cameraRef.current],
      );

    const chanedSliderState = useCallback(
        
        ({ y }) => {
            setSetupState({ ...setupState , isSliderUsed : true} );
            setSliderState(sliderState => ({ ...sliderState, y }));
        } ,
        []
      );
      //   

    return (<main className="container">
        <div> 
            <video ref={cameraRef} id="video" width="320" height="240" preload="preload" autoPlay loop muted></video>
            <canvas ref={canvasRef} width="320" height="240"></canvas>
            <Slider className="slider" axis="y" y={sliderState.y} onChange={chanedSliderState} />
        </div>
        
        <div className="stats">
            <div><span className="bulb" >{setupState.hasCamera ? '✓' : 1}</span> Allow camera access</div>
            <div><span className="bulb">{setupState.isSliderUsed ? '✓' : 2}</span> Adjust slider</div>
            <div onClick={usePip}><span className="bulb">{setupState.hasPip ? '✓' : 3}</span> PIP for non active browser checking</div>
        </div>
        

    </main>);
    }
    
    