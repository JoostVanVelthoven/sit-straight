import React, { useEffect, useRef } from "react"
import './index.css';
import {Helmet} from "react-helmet";


//import 'tracking/build/tracking';
// //node_modules/tracking/build/data/face.js
 //import 'tracking/build/data/face';
// require('../../build/tracking');
// //node_modules/tracking/build/data/face.js
// require('../../build/tracking/data/face');



export default () => {

    //const cameraRef = useRef(null);



    useEffect(() => {

        
        window.setTimeout(setCamera,5000);

    });

    function setCamera() {
    
            var video = document.getElementById('video');

            
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
      
            var tracker = new window.tracking.ObjectTracker('face');
            console.log(tracker);
            tracker.setInitialScale(4);
            tracker.setStepSize(2);
            tracker.setEdgesDensity(0.1);
      
            window.tracking.track('#video', tracker, { camera: true });
      
            tracker.on('track', function(event) {

                console.log(event);
              context.clearRect(0, 0, canvas.width, canvas.height);
      
              event.data.forEach(function(rect) {
                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
              });
            });  
   
    }

    return (<>
    <Helmet>    
  <script src="/build/tracking.js"></script>
  <script src="/build/data/face.js"></script>

</Helmet>
        <header>
            Sit straigt coach - sit straigt and move the slider  <span role="img">😁</span>
    </header>
        <main>
      
    <div className="container">
      <video id="video" width="320" height="240" preload="preload" autoPlay loop muted></video>
      <canvas id="canvas" width="320" height="240"></canvas>
    </div>

            
            </main></>);
}
