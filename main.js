sound = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    sound = loadSound('music.mp3');
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotposes)
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#0000FF");
    stroke("#000000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            speed = 0.5
            document.getElementById("speed").innerHTML = `Speed: ${speed}px`;
            sound.rate(speed)
        }
        if (rightWristY > 100 && rightWristY <= 200) {
            speed = 1
            document.getElementById("speed").innerHTML = `Speed: ${speed}px`;
            sound.rate(speed)
        }
        if (rightWristY > 200 && rightWristY <= 300) {
            speed = 1.5
            document.getElementById("speed").innerHTML = `Speed: ${speed}px`;
            sound.rate(speed)
        }
        if (rightWristY > 300 && rightWristY <= 400) {
            speed = 2
            document.getElementById("speed").innerHTML = `Speed: ${speed}px`;
            sound.rate(speed)
        }
        if (rightWristY > 400 && rightWristY <= 500) {
            speed = 2.5
            document.getElementById("speed").innerHTML = `Speed: ${speed}px`;
            sound.rate(speed)
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numberLeftWristY = Number(leftWristY);
        remove_decimal = floor(numberLeftWristY);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = `Volume: ${volume}`;
        sound.setVolume(volume)
    }
}

function play() {
    sound.play();
    sound.setVolume(1)
    sound.rate(1)
}
