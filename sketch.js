
var monkey , monkey_running,banana ,bananaImage, obstacle, obstacleImage,bananaGroup, obstacleGroup, score,survivaltime=0
 
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey= createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  if(gameState===PLAY){
     
    ground=createSprite(200,350,900,10);
    
  ground.velocityX=-5;
  console.log(ground.x);
  }
  
 bananaGroup = new Group();
  obstacleGroup = new Group();
  
   score=0;
  survivaltime=0;
}


function draw() {
  
background("green");
  
  if(ground.x>0){
    ground.x=ground.width/2;
  }
  if(gameState===PLAY){
    
  textSize(20);
  fill("black");
  text("Score:"+score,320,50);
  
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivaltime,90,50);
    
  if(keyDown("space") && monkey.y>=150){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.6;
    
  monkey.collide(ground);
    
  banana();
  obstacles ();
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score=score+1;
    }
    if(obstacleGroup.isTouching(monkey)){
       survivaltime = 0;
      gameState=END;
    }
  }
  if(gameState === END){
    
    ground.velocityX=0;
    
    obstacle.velocityX=0; 
   
    monkey.pause();
    
    monkey.collide(ground);
    
    bananaGroup.destroyEach();
    
    obstacleGroup.destroyEach();
    
    survivaltime = 0;
    
    fill("black")
     textSize(20);
    text("Game Over",135,160)
   
    textSize(20);
    fill("black")
   text("Press R to restart",120,200);
    
    if(keyDown("R")){
       survivaltime = 0;
    reset();
  }
  }
  
   drawSprites();
  
}
function banana(){
  
  if(frameCount%80===0){
  var banana=createSprite(400,360,10,30);
    banana.velocityX=-5;
   banana.addImage(bananaImage);
   banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    banana.lifeTime = 100
   bananaGroup.add(banana);
  }
  
}
function obstacles(){
  
  if(frameCount%300===0){
    obstacle=createSprite(400,325,10,40);
    obstacle.collide(ground); 
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifeTime = 100
    obstacleGroup.add(obstacle);
    
  }
}
function reset(){
  
  gameState=PLAY;
  score=0;
  survivaltime=0;
  monkey.play();
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
}




