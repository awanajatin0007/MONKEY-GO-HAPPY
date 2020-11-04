
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime,banana ;
var ground, monkeyCollide;


var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;


//Preload
function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 monkeyCollide = loadImage("sprite_0.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(600,400);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(70, 350, 1500, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //score
  score = 0;
  survialTime = 0;
monkey.debug=true;
  monkey.setCollider("circle",10,0)
}

//Draw
function draw() {
  
  //Background
  background ("SKYBLUE");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
 
 //Monkey
  monkey.collide(ground);
if (gameState === PLAY){
    obstacles();
    food();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 180) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(FoodGroup)){
      bananaScore++;  
     FoodGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.9;
  
    
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("sprite_0.png",monkeyCollide);
    monkey.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
    
      
    
   

  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,500,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
obstacleGroup.debug=true;
  }


}

 
 


