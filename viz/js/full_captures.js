var imgs = {};
var canvas_width = 600,
    canvas_height = 600;
var height, width;
var ready_imgs = 0,
    total_imgs = 12; // Update this if the images are changed

var board_offset = 20,
    columns = ["A","B","C","D","E",'F',"G","H"];
function setup() {
  createCanvas(canvas_width,canvas_height);
  imgs.WP = loadImage("assets/WP.png",function(img){ height = img.height; width = img.width; ready_imgs += 1;});
  imgs.WR = loadImage("assets/WR.png",function(img){ ready_imgs += 1;});
  imgs.WN = loadImage("assets/WN.png",function(img){ ready_imgs += 1;});
  imgs.WB = loadImage("assets/WB.png",function(img){ ready_imgs += 1;});
  imgs.WQ = loadImage("assets/WQ.png",function(img){ ready_imgs += 1;});
  imgs.WK = loadImage("assets/WK.png",function(img){ ready_imgs += 1;});


  imgs.BP = loadImage("assets/BP.png",function(img){ ready_imgs += 1;});
  imgs.BR = loadImage("assets/BR.png",function(img){ ready_imgs += 1;});
  imgs.BN = loadImage("assets/BN.png",function(img){ ready_imgs += 1;});
  imgs.BB = loadImage("assets/BB.png",function(img){ ready_imgs += 1;});
  imgs.BQ = loadImage("assets/BQ.png",function(img){ ready_imgs += 1;});
  imgs.BK = loadImage("assets/BK.png",function(img){ ready_imgs += 1;});
}

function drawBoard() {
  strokeWeight(2);
  stroke(0);
  var fillInt = 0;
  for(var j = 0; j < 8; j++) {
    fillInt = abs(1 - fillInt);
    fill(255);
    text(8-j,2,height*(0.8+j));
    text(columns[j],width*(0.8+j),15);
    for(var i = 0; i < 8; i++) {
      fill(125+125*fillInt);
      fillInt = abs(1 - fillInt);
      rect(width*i+board_offset,height*j+board_offset,width,height);
      //rect(width*i+1,height*2.5,width,height);
    }
  }
}

function drawPieces() {
  // Rooks
  image(imgs.BR,board_offset,board_offset);
  image(imgs.BR,board_offset+7*width,board_offset);
  image(imgs.WR,board_offset,board_offset+height*7);
  image(imgs.WR,board_offset+7*width,board_offset+height*7);

  // Knights
  image(imgs.BN,board_offset+width,board_offset);
  image(imgs.BN,board_offset+6*width,board_offset);
  image(imgs.WN,board_offset+width,board_offset+height*7);
  image(imgs.WN,board_offset+6*width,board_offset+height*7);

  // Bishops
  image(imgs.BB,board_offset+2*width,board_offset);
  image(imgs.BB,board_offset+5*width,board_offset);
  image(imgs.WB,board_offset+2*width,board_offset+height*7);
  image(imgs.WB,board_offset+5*width,board_offset+height*7);

  // Black Queen and King
  image(imgs.BQ,board_offset+3*width,board_offset);
  image(imgs.BK,board_offset+4*width,board_offset);
  image(imgs.WQ,board_offset+3*width,board_offset+height*7);
  image(imgs.WK,board_offset+4*width,board_offset+height*7);

  // Pawns
  for(var i = 0; i < 8; i++) {
    image(imgs.BP,board_offset+i*width,height+board_offset);
    image(imgs.WP,board_offset+i*width,height*6+board_offset);
  }
}

var drawn = false;
function draw() {
  if(drawn) return;
  if(ready_imgs < total_imgs) return;
  drawBoard();
  drawPieces();
  drawn = true;
}
