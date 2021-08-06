var hBall;
var database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database()
    
    hBall = createSprite(250,250,10,10);
    hBall.shapeColor = "red";
    
    var hBallposition = database.ref('ball/position')
    hBallposition.on("value",readposition,showerror) 
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':  position.x+x,
        'y': position.y+y
    })
}

function readposition (data){ 
position = data.val();
 hBall.x= position.x
 hBall.y= position.y

}

function showerror(){
    console.log("Error in DB");
}