
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var bananasGroup;
var obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);

  monkey=createSprite(80,250,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
 
  
  
  ground=createSprite(400,260,1200,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x);
  
  bananaGroup=new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
 background("green");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time :"+survivaltime,250,50);

  if(gameState===PLAY){
  monkey.collide(ground);
    
survivaltime=Math.ceil(frameCount/frameRate());
    
  if(keyDown("space")&& monkey.y>150){
    monkey.velocityY=-12;
  }
  
   monkey.velocityY=monkey.velocityY+0.8;

  if(ground.x<0){
    ground.x=ground.width/2;
  }
    
  spawnbanana();
  spawnobstacle();
   if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  
  }
  else if(gameState===END){
    
    ground.velocityX=0;
    monkey.velocityY=0;
   
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function spawnbanana(){
  if(frameCount%80===0){
    banana=createSprite(300,100,50,10);
    banana.y=Math.round(random(100,150));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=200;
    console.log(banana.depth);
  
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
   bananaGroup.add(banana);
  }
    
}

function spawnobstacle(){
  if(frameCount%200===0){
    var obstacle=createSprite(600,240,50,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacle.lifetime=600;
    obstaclesGroup.add(obstacle);
  }
}



