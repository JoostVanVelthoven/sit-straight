import React, { useCallback, useState } from "react"

import Slider from 'react-input-slider';
import { useObservable } from "rxjs-hooks";
import { percentageCorrect$, timeCorrect$ } from '../helpers/timer';

export default ({ sliderState, setSliderState, cameraRef, canvasRef, setupState, setSetupState }) => {

    const [pipMessage, setPipMessage] = useState(null);

    const usePip = useCallback(
        () => {
            const requestPip = cameraRef.current.requestPictureInPicture;
            if (requestPip) {
                setSetupState({ ...setupState, hasPip: true });
                cameraRef.current.requestPictureInPicture();
                setPipMessage("Picture-in-Picture mode activated. Click to disable.");
            }
        },
        [cameraRef.current, cameraRef, cameraRef.current, setupState, setSetupState],
    );

    const chanedSliderState = useCallback(

        ({ y }) => {
            setSetupState({ isSliderUsed: true, ...setupState });
            setSliderState(sliderState => ({ ...sliderState, y }));
        },
        [setupState, setSetupState, setSliderState]
    );

    const timeCorrect = useObservable(() => timeCorrect$);
    const percentageCorrect = useObservable(() => percentageCorrect$);

    const disablePip = useCallback(() => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
            setPipMessage(null);
        }
    }, []);

    return (<main className="container">
        <div>
            <video ref={cameraRef} id="video" width="320" height="240" preload="preload" autoPlay loop muted></video>
            <canvas ref={canvasRef} width="320" height="240"></canvas>
            <Slider className="slider" axis="y" y={sliderState.y} onChange={chanedSliderState} />
        </div>

        <div className="setup">
            <div><span className="bulb" >{setupState.hasCamera ? '✓' : 1}</span> Allow camera access</div>
            <div><span className="bulb">{setupState.isSliderUsed ? '✓' : 2}</span> Adjust slider</div>
            {cameraRef.current && cameraRef.current.requestPictureInPicture &&
                <div onClick={usePip} onKeyDown={usePip} role="link" className="click"><span className="bulb">{setupState.hasPip ? '✓' : 3}</span> PIP for non active browser checking</div>}
        </div>
        <div className="stats">
            <div>{timeCorrect}</div>
            <div>{percentageCorrect}</div>
        </div>
        {pipMessage && (
            <div className="pip-message" onClick={disablePip}>
                {pipMessage}
            </div>
        )}
    </main>);
}
