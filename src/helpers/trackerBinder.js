export default (cameraRef, setHeadPosition) => {

    const frameAnalysed = event => {
        event.data.forEach(function (rect) {
            setHeadPosition(rect);
        });

    };

    const tracker = new window.tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    window.tracking.track(cameraRef.current, tracker, { camera: true });

    tracker.on('track', frameAnalysed);
};
