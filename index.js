var chosenColor=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userPattern=[];

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started)
    {
        $("h1").text("level "+level);
        nextSequence(); 
        started=true;
    }
});

$(".btn").click(function()
{
   var userChosenColour=this.id;
    console.log(userPattern);
    userPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(gamePattern.length==userPattern.length);
    checkResponse(userPattern.length);
});

function checkResponse(index)
{
    if(gamePattern.length == userPattern.length)
    {
        if(matchResponseTrue(index))
       setTimeout(nextSequence,1000);
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        repeatOver();
    }
      

}

function nextSequence()
{ 
    level++;
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var selectedColor = chosenColor[randomNumber]; 
    gamePattern.push(selectedColor);
    $("#"+selectedColor).fadeIn(150).fadeOut(150).fadeIn(150);

    for(var i=0;i<gamePattern.length;i++){
        setTimeout(function(){},500);
     playSound(gamePattern[i]); 
     animatePress(gamePattern[i]);
     console.log(gamePattern);
    } 
   
}


 
function repeatOver()
{
    userPattern=[];
    gamePattern=[];
    level=0;
    started=false;
    
}

function matchResponseTrue(index){
    for(var i=0;i<=index;i++){
        if(userPattern[i]==gamePattern[i])
        continue;
        else
        return false;
    }
    return true;
}


function playSound(selectedColor)
{
    var audio=new Audio("sounds/"+selectedColor+".mp3");
    audio.play();

}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed");},150);
}



 