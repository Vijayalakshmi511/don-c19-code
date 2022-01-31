var bagroundImg,baground;
var playerImg,player;
var aesImg,aes,aesGroup;
var bangImg,bang;
var gameState = "play";
//The below line number 7 is wrong as you cannot assign 2 values to one single variable 
//called gameState and also when you give value as end, is end a variable? What value end 
//holds?
//var gameState = end;
var score;
var planetsGroup,planet1,planet2,planet3,planet4,planet5,planet6,planet7


function preload(){
    bagroundImg = loadImage("baground.png")
    playerImg = loadImage("player.png")
    aesImg = loadImage("aesteroids.png")
    bangImg = loadImage("Bang.png")
    planet1 = loadImage("planet 1.png")
    planet2 = loadImage("planet 2.png")
    planet3 = loadImage("planet 3.png")
    planet4 = loadImage("planet 4.png")
    planet5 = loadImage("planet 5.png")
    planet6 = loadImage("planet 6.png")
    planet7 = loadImage("planet 7.png")
}

function setup() {
 createCanvas(600,620)

  baground = createSprite(300,300);
  baground.addImage("baground",bagroundImg);
  baground.scale =1
   
  player = createSprite(300,500,5,5)
  player.addImage(playerImg)
  player.scale = 0.2
  player.debug = false
  player.setCollider("rectangle",0,0,player.width,650);

  bang = createSprite(300,180,50,50);
  bang.addImage(bangImg);
  bang.visible = false;
  bang.scale = 0.5

  aesGroup = createGroup();
  planetsGroup = createGroup();
  
  score = 0;

 // player.x = World.mouseX;
  
}

function draw() 
{
    background(200);

   
    
    

 //   baground.depth = score.depth
   // score.depth = score.depth +1
    

  


    if(gameState==="play")
    {
         baground.velocityY = (4 + 3* score/100)
         if(baground.y > 660){
            baground.y = 100
         }
      
       
        if(baground.y < 100){
           baground.y = 600
        }  
        
       player.x = World.mouseX;

       if(keyDown("UP_ARROW")) {
          baground.velocityY = baground.velocityY+8
        }
        
        
        if(keyDown("DOWN_ARROW")) {
            baground.velocityY = baground.velocityY=-3
          }
    
          if(planetsGroup.isTouching(player)) {
            score = score+1 
         }
        
        

         showobsticle()
         showplanets()

          
          if(aesGroup.isTouching(player)){
            gameState = "end"
          }
     
      
       
      }
      
      else if(gameState === "end"){
      
         baground.velocityY = 0
         aesGroup.destroyEach();
         planetsGroup.destroyEach();
         //Since you are just moving the player with your mouse , there is no need to set velocity Y to 0
        //player.velocityY =  0
        //Now all your asteriods are in group. So when the gamestate is end , asteriod should not be seen on the screen
        //aesteroid.velocityY = 0
        bang.visible=true;
        if(mousePressedOver(bang)&&gameState==="end") {
          reset();
         }
      
       
      }

      drawSprites()
      textSize(30);
      fill("white")
      text("Score: "+ score, 400,50);
}

function showobsticle(){
    if(frameCount%120===0){
      
      var aesteroid = createSprite(100,70,20,10)
      aesteroid.addImage(aesImg)
      aesteroid.velocityY = 5
      aesteroid.setCollider("rectangle",0,0,199,aesteroid.height-300);
  
      aesteroid.scale = 0.2
      aesteroid.x = Math.round(random(100,400))
      aesteroid.debug = false
      aesGroup.add(aesteroid)
    }
  }

  function showplanets() {
    if(frameCount%100===0){

        var planet =createSprite(0,2,50,50);
        planet.velocityY = 3
        planet.x = Math.round(random(100,400))
        planet.debug = false
        
        
        
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: planet.addImage(planet1);
              break;
      case 2: planet.addImage(planet2);
              break;
      case 3: planet.addImage(planet3);
              break;
      case 4: planet.addImage(planet4);
              break;
      case 5: planet.addImage(planet5);
              break;
      case 6: planet.addImage(planet6);
              break;
      case 7: planet.addImage(planet7);
              break;
      default: break;
    }
    planet.scale = 0.2;
    planetsGroup.add(planet);
    planet.depth = player.depth
    planet.depth = planet1
    planet.depth = planet2
    planet.depth = planet3
    planet.depth = planet4
    planet.depth = planet5
    planet.depth = planet6
    planet.depth =  planet7
    player.depth = player.depth+1

    }
    
  }
  function reset() {
      gameState  = "play"
      bang.visible=false;
      //In the reset function after the gamestate becomes play we should see the asteroids and planets again
      //So dont destroy.
      //aesGroup.destroyEach()
      //planetsGroup.destroyEach()
      score = 0
  } 
