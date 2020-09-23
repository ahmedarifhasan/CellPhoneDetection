const video = document.getElementById('webcam');
const demosSection = document.getElementById('demos');

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}


if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
    document.getElementById("alert").style.display = "inline-block"
    document.getElementById("alert").innerHTML = "getUserMedia() is not supported by your browser";
}

function enableCam(event) {
    document.getElementById("bu").style.display = "none"
    if (!model) {
        return;
    }
    event.target.classList.add('removed');
    const constraints = {
        video: true
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

var model = true;
demosSection.classList.remove('invisible');

var model = undefined;

cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;
    demosSection.classList.remove('invisible');
});
console.log(1);
document.getElementById("webcamButton").click()
setTimeout(() => {
    document.getElementById("webcamButton").click()
    console.log("clicking....");
    // document.getElementById('content').remove()
    document.getElementsByClassName("loading")[0].classList.remove("loading")
}, 6000)

var alert = document.getElementById("alert")
alert.style.display = "none"
var flag = true

function predictWebcam() {
    model.detect(video).then(
        (predictions) => {
            for (let n = 0; n < predictions.length; n++) {
                if (predictions[n].class == "cell phone") {
                    console.log("CP");
                    if (predictions[n].score > 0.60) {
                        console.log("Detected a", predictions[n].class);
                        alert.style.display = "inline-block";
                    } else if (predictions[n].score < 0.30) {
                        console.log(predictions[n].score);
                        alert.style.display = "none";
                    }
                }else{
                    setTimeout(()=>{
                        alert.style.display = "none";
                    },500)
                }
            }
            window.requestAnimationFrame(predictWebcam);
        });
}