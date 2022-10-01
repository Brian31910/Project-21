var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cougar;
var cougar1,cougar2,cougar3,cougar4,cougar5;
var wolf;
var coin;
var desert;


var score;
var gameOverImg;
var jumpSound , dieSound;

function preload(){
  cougar_running = loadAnimation("cougar-1.png","cougar-2.png","cougar-3.png","cougar-4.png","cougar-5.png");

  coin = loadImage("coin.png");

  wolfImage = loadImage("wolf.png");
  
  desertImage = loadImage("desert.jpg");
  
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);

  
  cougar = createSprite(50,160,20,50);
  cougar.addAnimation("running", cougar_running);
  
  
  cougar.scale = 0.5;

  wolf = createSprite(600,165,10,40);
  wolf.addImage("wolf",wolfImage);
  
  desert = createSprite(200,180,400,20);
  desert.addImage("desert",desertImage);
  desert.x = desert.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
 
  gameOver.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  wolfGroup = createGroup();

  
  cougar.setCollider("rectangle",0,0,cougar.width,cougar.height);
  
  score = 0;

  cougar.depth = desert.depth;
  cougar.depth = cougar.depth + 1;
  cougar.scale=0.3
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    
    desert.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (desert.x < 0){
      desert.x = desert.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& cougar.y >= 100) {
        cougar.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    cougar.velocityY = cougar.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnWolf();
    
    if(wolfGroup.isTouching(cougar)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play();
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
    
      desert.velocityX = 0;
      wolf.velocityY = 0;
      
     
      //set lifetime of the game objects so that they are never destroyed
     wolfGroup.setLifetimeEach(-1);

     wolfGroup.setVelocityXEach(0);   
   }
  
 
  //stop cougar from falling down
  cougar.collide(invisibleGround);


  drawSprites();
}



function spawnWolf(){
 if (frameCount % 60 === 0){
   var wolf = createSprite(600,165,10,40);
   wolf.velocityX = -(6 + score/100);
   
    //assign scale and lifetime to the wolf          
    wolf.scale = 0.5;
    wolf.lifetime = 300;
   
   //add each wolf to the group
    wolfGroup.add(wolf);
 }
}

