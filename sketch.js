//Global Variables
var bg,backgroundImage;
var obstacle,obstacleImage,obstacleGroup;
var score;
var monkey_player,monkeyImage;
var banana,bananaImage,bananaGroup;
var invisibleGround;

function preload(){
  monkeyImage = loadAnimation("Monkey_01.png");
  backgroundImage = loadAnimation("ground.jpg")
  bananaImage = loadAnimation("Banana.png");
  obstacleImage = loadAnimation("stone.png");
  gameOverImage = loadAnimation("gameOver.png");
  restartImage = loadAnimation("restart.png");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function setup() {
  createCanvas(600,300);  
  bg = createSprite(200,200,10,10);
 bg.addAnimation("background",backgroundImage);
 bg.x = bg.width/2;
  bg.velocityX = -3;  

monkey_player = createSprite(100,240,10,10); monkey_player.addAnimation("monkey",monkeyImage);
monkey_player.scale = 0.12;
  
  //var invisibleGround = createSprite(150,250,600,300);
   invisibleGround = createSprite(400,250,800,10);
  invisibleGround.visible = false;
    
  var bananaGroup = new Group();
  var obstacleGroup = new Group();
  
 score = 0;
    
}

function draw(){
 background(255);
  stroke("white");
  textSize(20);
  fill("white");
 
 //console.log(monkey_player.scale);
  
  if(keyDown("space") && monkey_player.y >= 150){
    monkey_player.velocityY = -16;
  }
  
   monkey_player.velocityY = monkey_player.velocityY+0.8;
  
  if(bananaGroup.isTouching(monkey_player)){
    score = score + 2;
    bananaGroup.destroyEach();
    //monkey_player.scale=monkey_player.scale+0.005;         
  }
  

  
  if(obstacleGroup.isTouching(monkey_player)){
    score = score - 2;
    monkey_player.scale=0.12;                        obstacleGroup.destroyEach();
  } 
  
  
  if (bg.x < 0){
    bg.x = bg.width/12;
  }  

    
 // monkey_player.collide(invisibleGround);
  monkey_player.collide(invisibleGround);
  
     createBanana();
  createObstacle();  
  drawSprites();
  text("score: " + score,500,50);
}

function createBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,random(10,200),10,10)
    banana.velocityX = -10;                                     banana.addAnimation("banana",bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 600;
    bananaGroup.add(banana);  
  }
  switch(score){
    case 10: monkey_player.scale = 0.14;
      break;
    case 20: monkey_player.scale = 0.16;  
      break;
    case 30: monkey_player.scale = 0.18;
      break;
    case 40: monkey_player.scale = 0.20;
      break;
    default: break;
  }
}

function createObstacle(){
if(frameCount % 300 === 0){
  var Obstacle = createSprite(800,200,100,100);
  Obstacle.velocityX = -10;
  Obstacle.addAnimation("obstacle","stone.png");
  Obstacle.scale = 0.1;
  Obstacle.lifetime = 800;
  obstacleGroup.add(Obstacle);
}
}