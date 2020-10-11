//Create variables here

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
}
var database,dog,happydog,foodS,foodStock;

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock,showError);
  
  
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImage);
    console.log(foodS);
  }

  drawSprites();
  //add styles here
  text("Note:press UP_ARROW Key To Feed Drago Milk!",100,100);
  textSize(20);
  fill("white");
 

}
function readStock(data) {
  foodS = data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })

}
function showError(){
  console.log("could not read data" );
}



