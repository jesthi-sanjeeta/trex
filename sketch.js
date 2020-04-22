var PLAY=1;
var END=0;
var gameState=PLAY;

var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var cloudGroup,cloudImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,
    obstacle6
var score;
var gameOver,restart,gameOverImg,restartImg;
var jumpSound,endSound;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadImage("trex_collided.png");
  groundImage= loadImage("ground2.png");
  obstacle1 =loadImage("obstacle1.png");
  obstacle2 =loadImage("obstacle2.png");
  obstacle3 =loadImage("obstacle3.png");
  obstacle4 =loadImage("obstacle4.png");
  obstacle5 =loadImage("obstacle5.png");
  obstacle6 =loadImage("obstacle6.png");
  cloudImage=loadImage("cloud.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  endSound=loadSound("die.mp3");
  
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  
  trex.addImage("collided",trex_collided);   
  
  ground=createSprite(200,180,400,10);
  ground.addImage("ground",groundImage);
  
  invisibleGround=createSprite(200,195,400,5);
  invisibleGround.visible=false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.4;
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.4;
  gameOver.visible=false;
  restart.visible=false;
  
  cloudGroup = new Group();
  obstaclesGroup =new Group();
  score =0;
  trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
}

function draw() {
  background(180);
  if(gameState === PLAY){
    if(keyDown('space') && trex.y >150){
      trex.velocityY=-10;
      jumpSound.play();
    }
    score=score+Math.round(getFrameRate()/60);
    text("Score: " + score,50,50);
    ground.velocityX =-8;
    if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
        spawnClouds();
       spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
      endSound.play();
      //
    }
  }
  else if(gameState===END){
    restart.visible=true;
    gameOver.visible=true;
    trex.velocityX=0;
    trex.velocityY=0;
    ground.velocityX=0;
    ground.velocityY=0;
    trex.changeImage("collided");
    cloudGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
     
  }
  trex.velocityY=trex.velocityY +0.8;
  trex.collide(invisibleGround);
  
 if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  score = 0;
  
}
function spawnClouds(){
  if(frameCount % 60===0){
    var cloud= createSprite(600,120,40,10);
    cloud.y=Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.velocityX=-3;
    cloud.lifetime =200;
    
    cloud.depth=trex.depth;
    trex.depth=trex.depth +1;
    cloudGroup.add(cloud);
  }
}
function spawnObstacles(){
  if(frameCount % 60 ===0){
    var obstacle= createSprite(600,165,10,40);
    obstacle.velocityX=-8;
    var rand= Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
  }
}