var bg,bgImg;
var player, shooterImg, shooter_shooting;
var p1;
var h1,h2,h3,h1IMG,h2IMG,h3IMG;
var zombie,zomIMG;
var zombieGroup,bulletGroup;
var bullets=30,bIMG;
var gameState = "fight";
var life=3;
var score=0;
var blastS,loseS,winS;

function preload(){
  bgImg=loadImage("assets/bg.jpeg");
shooterImg=loadImage("shooter_2.png");
shooter_shooting=loadImage("shooter_3.png");
h1IMG = loadImage("heart_1.png");
h2IMG = loadImage("heart_2.png");
h3IMG = loadImage("heart_3.png");
zomIMG = loadImage("zombie.png");
bIMG = loadImage("b1.jpg");
blastS = loadSound("explosion.mp3");
loseS = loadSound("lose.mp3");
winS = loadSound("win.mp3");

}

function setup(){
createCanvas(windowWidth,windowHeight);

player=createSprite(displayWidth-1300,displayHeight-300,20,20);
player.addImage(shooterImg);
player.scale=0.4

h1 = createSprite(displayWidth-200,40,20,20);
h1.addImage(h1IMG);
h1.scale=0.2;
h1.visible=false;

h2 = createSprite(displayWidth-100,40,20,20);
h2.addImage(h2IMG);
h2.scale=0.2
h2.visible=false;

h3 = createSprite(displayWidth-200,40,20,20);
h3.addImage(h3IMG);
h3.scale=0.2;


zombieGroup=new Group();
bulletGroup=new Group();



}
function draw(){
background(bgImg);
if(gameState ==="fight"){
  if(life===3){
    h3.visible=true;
    h2.visible=false;
    h1.visible=false;
}
  if(life===2){
    h3.visible=false;
    h2.visible=true;
    h1.visible=false;
  }
if(life===1){
    h3.visible=false;
    h2.visible=false;
    h1.visible=true;
}
if(life===0){
  gameState = "lost";
  
}
if(score==100){
  gameState = "won";
  winS.play();
}
p1=createEdgeSprites();

if(keyDown("UP_ARROW")){
  player.y=player.y-10;
}

if(keyDown("DOWN_ARROW")){
  player.y=player.y+10;
}

if(keyWentDown("space")){
  player.addImage(shooter_shooting);
  var bullet = createSprite(displayWidth-1300,player.y-35,10,20);
  bullet.addImage(bIMG);
  bullet.velocityX=10;
  bulletGroup.add(bullet);
 // bullet.x=player.x;
 // bullet.y=player.y;
player.depth = bullet.depth;
player.depth +=2;


  bullet.scale=0.1;
  bullets = bullets-1;

  

}
if(keyWentUp("space")){
  player.addImage(shooterImg);
  }
  if(bullets == 0){
    gameState = "bullet";
  }

// Destroy the zombie when the bullet touches

  if(zombieGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombieGroup.length;i++){
           if(zombieGroup[i].isTouching(bulletGroup)){
               zombieGroup[i].destroy()
               bulletGroup.destroyEach();
               score = score+10;
               blastS.play();
              }
        }
  }
}
if(zombieGroup.isTouching(player)){
    for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
           zombieGroup[i].destroy();
           life=life-1;
      }
      }
}


  player.bounceOff(p1);
  enemy();
  drawSprites();
fill("white");
textSize(20);
text("score:"+ score,displayWidth-200,displayHeight/2-220);
text("lives:"+ life,displayWidth-200,displayHeight/2-280);

// if the player has lost the game 
  if(gameState == "lost"){
        fill("red");
        textSize(50);   
        text("You Have Lost The Game",400,500);
        zombieGroup.destroyEach();
        player.destroy();
        h1.visible=false;
        loseS.play();

}
// if the player has won the game
if(gameState == "won"){
  fill("red");
  textSize(50);   
  text("You Have Won The Game",400,500);
  zombieGroup.destroyEach();
  }
  // if the player is runout of bullets
  if(gameState == "bullet"){
    fill("red");
    textSize(200);   
    text("You Have RunOut Of Bullets ",400,500);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();

}
}

function enemy(){
if(frameCount % 60 ===0){
  var zombie = createSprite(random(400,1000),random(200,800),40,40);
  zombie.addImage(zomIMG);
  zombie.scale=0.2;
  zombie.lifetime=600;
  zombie.velocityX=-2;
 
  zombie.debug=true;
  zombie.setCollider("rectangle",0,0,400,600);
  zombieGroup.add(zombie);
}

}
