song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist=0;
scoreLeftWrist=0;

function preload()
{
    song = loadSound("music.mp3");
    song1 = loadSound("a_man_without_love.mp3");
    song2 = loadsound("distort.mp3");
    song3 = loadSound("me.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
 { if(results.length > 0)
     { console.log(results);
         scoreRightWrist = results[0].pose.keypoints[10].score;
          scoreLeftWrist = results[0].pose.keypoints[9].score;
          console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
           rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
             console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
              leftWristX = results[0].pose.leftWrist.x;
               leftWristY = results[0].pose.leftWrist.y;
                console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
             } }




function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#0000FF");
    stroke("#0000FF");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY >0 && rightWristY <= 100)
        {
            document.getElementById("volume").innerHTML = "Harry potter remix";
            song.play();
            song.rate(1);
        }
        else if(rightWristY >100 && rightWristY <= 200)
        {
            document.getElementById("volume").innerHTML = "A man without love";
            song1.play();
            song1.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 300)
        {
            document.getElementById("volume").innerHTML = "They distort my reality";
            song2.play();
            song2.rate(1);   
        }
        else if(rightWristY >300 && rightWristY <= 400)
        {
            document.getElementById("volume").innerHTML = "Stay with me";
            song3.play();
            song3.rate(1);
        }
        

    }


   

    

    if(scoreLeftWrist > 0.2)
    {
     circle(leftWristX,leftWristY,20);
     InNumberleftWristY = Number(leftWristY);
     remove_decimals = floor(InNumberleftWristY);
     volume = remove_decimals/500;
     document.getElementById("volume").innerHTML = "Volume = "+ volume;
     song.setVolume(volume);
    }
}   

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}
