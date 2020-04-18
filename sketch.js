var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var cloudGroup,cloudImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,
    obstacle6
var score;

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
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  
  ground=createSprite(200,180,400,10);
  ground.addImage("ground",groundImage);
  
  invisibleGround=createSprite(200,195,400,5);
  invisibleGround.visible=false;
  
  cloudGroup = new Group();
  obstaclesGroup =new Group();
  score =0;
  
}

function draw() {
  background(180);
  if(keyDown('space')){
    trex.velocityY=-10;
  }
  score=score+Math.round(getFrameRate()/60);
  text("Score: " + score,50,50);
  ground.velocityX =-2;
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }
  trex.velocityY=trex.velocityY +0.8;
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  drawSprites();
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
    obstacle.velocityX=-2;
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