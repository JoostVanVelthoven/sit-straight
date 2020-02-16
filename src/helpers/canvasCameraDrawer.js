export default (canvas, headPosition, treshold, isStraight, currentEyeHeight) => {
    var context = canvas.getContext('2d');

    context.lineWidth = 4;

    context.strokeStyle = '#a6433ceb';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(0, treshold);
    context.lineTo(320, treshold);
    context.stroke();

    context.strokeStyle = isStraight ? '#44EB55' : '#EB4E2B';

    context.beginPath();
    context.moveTo(headPosition.x, currentEyeHeight);
    context.lineTo(headPosition.x + currentEyeHeight, currentEyeHeight);
    context.stroke();
    context.strokeStyle = '#ccc';

    context.lineWidth = 2;
    context.strokeRect(headPosition.x, headPosition.y, currentEyeHeight, headPosition.height);

}