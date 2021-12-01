Song = "";
leftWristx = "";
leftWristy = "";
rightWristx = "";
rightWristy = "";
ScoreLeftWrist = 0;
ScoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(750,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose",gotPoses);
}

function gotPoses(result)
{
    if(result.length > 0)
    {
        ScoreLeftWrist = result[0].pose.keypoints[9].score;
        ScoreRightWrist = result[0].pose.keypoints[10].score;
        console.log(ScoreLeftWrist+"  "+ScoreRightWrist);

        console.log(result);
        leftWristx = result[0].pose.leftWrist.x;
        leftWristy = result[0].pose.leftWrist.y;
        console.log(leftWristx+"  "+leftWristy);

        rightWristx = result[0].pose.rightWrist.x;
        rightWristy = result[0].pose.rightWrist.y;
        console.log(rightWristx+"  "+rightWristy);
    }
}

function modelLoaded()
{
    console.log("Pose Initialized");
}

function preload()
{
   Song = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,750,600);

    if(ScoreRightWrist >0.2)
    {
        circle(rightWristy,rightWristy,30);

        if(rightWristy >0 && rightWristy <100)
        {
            document.getElementById("Theworst").innerHTML = "Speed x0.5";
            Song.rate(0.5);
        }

        if(rightWristy >100 && rightWristy <200)
        {
            document.getElementById("Theworst").innerHTML = "Speed x1";
            Song.rate(1);
        }

        if(rightWristy >200 && rightWristy <300)
        {
            document.getElementById("Theworst").innerHTML = "Speed x1.5";
            Song.rate(1.5);
        }

        if(rightWristy >300 && rightWristy <400)
        {
            document.getElementById("Theworst").innerHTML = "Speed x2";
            Song.rate(2);
        }

        if(rightWristy >400 && rightWristy <500)
        {
            document.getElementById("Theworst").innerHTML = "Speed x2.25";
            Song.rate(2.25);
        }

        if(rightWristy >400)
        {
            document.getElementById("Theworst").innerHTML = "Speed x2.5";
            Song.rate(2.5);
        }
    }

    if(ScoreLeftWrist > 0.2)
    {
        circle(leftWristx,leftWristy,30);
        leftWristyinNumber = Number (leftWristy);
        removeDecimal = floor(leftWristyinNumber);
        Volume = removeDecimal/600;
        Song.setVolume(Volume);
        document.getElementById("Thebest").innerHTML = "Volume:" + Volume;
    }

}

function play()
{
    Song.play();
    Song.setVolume(1);
    Song.rate(1);
}