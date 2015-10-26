var imgs = {};
var canvas_width = 750,
    canvas_height = 600;
var height, width;
var ready_imgs = 0,
    total_imgs = 12; // Update this if the images are changed

var board_offset = 20,
    columns = ["A","B","C","D","E",'F',"G","H"],
    column_d = {"a":0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7};

var square_d = {
  "a1":[8,0],  "b1":[8,1],  "c1":[8,2],  "d1":[8,3],  "e1":[8,4],  "f1":[8,5],  "g1":[8,6],  "h1":[8,7],  
  "a2":[7,0],  "b2":[7,1],  "c2":[7,2],  "d2":[7,3],  "e2":[7,4],  "f2":[7,5],  "g2":[7,6],  "h2":[7,7],
  "a3":[6,0],  "b3":[6,1],  "c3":[6,2],  "d3":[6,3],  "e3":[6,4],  "f3":[6,5],  "g3":[6,6],  "h3":[6,7],
  "a4":[5,0],  "b4":[5,1],  "c4":[5,2],  "d4":[5,3],  "e4":[5,4],  "f4":[5,5],  "g4":[5,6],  "h4":[5,7],
  "a5":[4,0],  "b5":[4,1],  "c5":[4,2],  "d5":[4,3],  "e5":[4,4],  "f5":[4,5],  "g5":[4,6],  "h5":[4,7],
  "a6":[3,0],  "b6":[3,1],  "c6":[3,2],  "d6":[3,3],  "e6":[3,4],  "f6":[3,5],  "g6":[3,6],  "h6":[3,7],
  "a7":[2,0],  "b7":[2,1],  "c7":[2,2],  "d7":[2,3],  "e7":[2,4],  "f7":[2,5],  "g7":[2,6],  "h7":[2,7],
  "a8":[1,0],  "b8":[1,1],  "c8":[1,2],  "d8":[1,3],  "e8":[1,4],  "f8":[1,5],  "g8":[1,6],  "h8":[1,7]
};

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
    fill(0);
    textStyle(BOLD);
    strokeWeight(0);
    text(8-j,2,height*(0.9+j));
    text(columns[j],width*(0.8+j),15);
    for(var i = 0; i < 8; i++) {
      fill(190+65*fillInt);
      fillInt = abs(1 - fillInt);
      rect(width*i+board_offset,height*j+board_offset,width,height);
      //rect(width*i+1,height*2.5,width,height);
    }
  }
}

function drawRows(label) {
  var d = row_d[label],
      y, str, cnt = 0, max = 0;
  for(var rw in d) { if(d[rw] > max) max = d[rw]; }
  for(var row in d) {
    cnt += 1;
    //y = row;
    strokeWeight(3);
    fill(255,255*(1-d[row]/max),0,155);
    rect(board_offset,board_offset+height*(8-row),width*8,height);

    strokeWeight(0);
    fill(0,0,0);
    str = Math.round(d[row]*10000) / 100+'%';
    text(str,8*width+5+board_offset,(9-row)*height+board_offset-5);
  }
}

function drawCols(label) {
  var d = col_d[label],
      x, str, cnt = 0, max = 0;
  for(var colm in d) { if(d[colm] > max) max = d[colm]; }
  for(var col in d) {
    cnt += 1;
    x = column_d[col];
    strokeWeight(3);
    fill(255,255*(1-d[col]/max),0,155);
    rect(x*width+board_offset,board_offset,width,height*8);
    strokeWeight(0);
    fill(0,0,0);
    str = Math.round(d[col]*10000) / 100+'%';
    text(str,x*width+3+board_offset,8*height+board_offset+15);
  }
}

function drawSquares(label) {
  var d = sq_d[label],
      x,y, str, cnt = 0;
  var redLevel;
  var max = 0;
  for(var sqr in d) { if(d[sqr] > max) max = d[sqr]; }
  for(var sq in d) {
    cnt += 1;
    x = square_d[sq][1];
    y = square_d[sq][0];
    //console.log("X,Y:"+x+","+y+" - SQ: "+sq+" d[sq]: "+d[sq]);
    strokeWeight(0);
    //fill(255,255*(1-d[sq]/max),0,125);
    redLevel = bezierPoint(1,0.2,0,0,d[sq]/max);
    fill(255,255*redLevel,0,225);
    rect(x*width+board_offset,(y-1)*height+board_offset,width,height);
    strokeWeight(2);
    fill(255,255,255);
    stroke(0,0,0);
    str = Math.round(d[sq]*10000) / 100+'%';
    text(str,x*width+2+board_offset,y*height+board_offset-3);
  }
}
function drawControlPieces(col) {
  var ctrl_pz_x = board_offset+11*width;
  if(control_color == 'B') {
    image(imgs.BP,ctrl_pz_x,board_offset);
    image(imgs.BR,ctrl_pz_x,board_offset+height);
    image(imgs.BN,ctrl_pz_x,board_offset+height*2);
    image(imgs.BB,ctrl_pz_x,board_offset+height*3);
    image(imgs.BQ,ctrl_pz_x,board_offset+height*4);
    return;
  }
  if(control_color == 'all') tint(155,255);
  image(imgs.WP,ctrl_pz_x,board_offset);
  image(imgs.WR,ctrl_pz_x,board_offset+height);
  image(imgs.WN,ctrl_pz_x,board_offset+height*2);
  image(imgs.WB,ctrl_pz_x,board_offset+height*3);
  image(imgs.WQ,ctrl_pz_x,board_offset+height*4);
}
var control_color = 'all',
    control_piece = undefined,
    control_mode = 'sq';
var pz_dic = {'P':0,'R':1,'N':2,'B':3,'Q':4, undefined:5},
    pz_dic_lst = ['P','R','N','B','Q',undefined];
var color_dic = {'all':0, 'W':1, 'B':2},
    mode_dic = {'sq':0,'col':1,'row':2};
function drawControls() {
  var ctrl_pz_x = board_offset+11*width;
  drawControlPieces(control_color);
  
  fill(0);
  strokeWeight(0);
  textSize(14);
  textStyle(BOLD);

  text("All pieces",ctrl_pz_x+5,board_offset+height*5.5,width);

  var ctrl_txt_x = board_offset+9*width;
  text("All (B&W)",ctrl_txt_x, board_offset*2);
  text("White",ctrl_txt_x, board_offset*2+height*0.5);
  text("Black",ctrl_txt_x, board_offset*2+height);

  text("Per square",ctrl_txt_x, board_offset*2+2*height);
  text("Per column",ctrl_txt_x, board_offset*2+height*2.5);
  text("Per row",ctrl_txt_x, board_offset*2+3*height);

  stroke(0);
  strokeWeight(2);
  fill(255,255,255,0);
  rect(ctrl_txt_x-5,board_offset+2+height*0.5*color_dic[control_color],width*1.5,25,5,5,5,5);
  rect(ctrl_txt_x-5,board_offset+2+2*height+height*0.5*mode_dic[control_mode],width*1.5,25,5,5,5,5);
  //if(control_piece !== undefined) {
  rect(ctrl_pz_x,board_offset+height*pz_dic[control_piece],width,height,5,5,5,5);
//}
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

var drawn = false,
    drawMode = {'col':drawCols, 'row':drawRows, 'sq':drawSquares};
function draw() {
  if(drawn) return;
  if(ready_imgs < total_imgs) return;
  var pz_id = 'all';
  background(255);
  drawBoard();
  drawPieces();
  drawControls();
  if(control_piece !== undefined) pz_id = control_piece;
  if(control_piece !== undefined && control_color != 'all') pz_id = control_color+control_piece;
  drawMode[control_mode](pz_id);
  drawn = true;
}

// Tests whether a point is within a rectangle
function inside(x,y,w,h,test_x,test_y) {
  if(test_x >= x && test_x <= x+w && test_y >= y && test_y <= y+h) return true;
  return false;
}
function setColor(col) {
  control_color = col;
  if(control_piece === undefined && col != 'all') {
    control_piece = "P"; // Becaouse we don't have 'just color' data
  }
  drawn = false;
  console.log(col);
}
function setMode(md) {
  control_mode = md;
  drawn = false;
  console.log(md);
}
function mousePressed(){
  var ctrl_pz_x = board_offset+11*width,
      ctrl_txt_x = board_offset+9*width,
      is_pz = mouseX <= ctrl_pz_x+width && mouseX >= ctrl_pz_x && 
        mouseY >= board_offset && mouseY <= board_offset+6*height;
  if(is_pz) {
    var pz = pz_dic_lst[Math.floor((mouseY - board_offset) / height)];
    if(pz == control_piece) control_piece = undefined;
    else control_piece = pz;
    console.log("Pz: "+control_piece);
    if(control_piece === undefined && control_color != 'all') control_color = 'all';
    drawn = false;
    return ;
  }
  if(inside(ctrl_txt_x-5,board_offset+2,width*1.5,25,mouseX,mouseY)) { setColor('all'); return; }
  if(inside(ctrl_txt_x-5,board_offset+2+height*0.5,width*1.5,25,mouseX,mouseY)) { setColor('W'); return; }
  if(inside(ctrl_txt_x-5,board_offset+2+height*0.5*2,width*1.5,25,mouseX,mouseY)) { setColor('B'); return; }

  if(inside(ctrl_txt_x-5,board_offset+2+height*2,width*1.5,25,mouseX,mouseY)) { setMode('sq'); return; }
  if(inside(ctrl_txt_x-5,board_offset+2+height*2.5,width*1.5,25,mouseX,mouseY)) { setMode('col'); return; }
  if(inside(ctrl_txt_x-5,board_offset+2+height*3,width*1.5,25,mouseX,mouseY)) { setMode('row'); return; }
}
function touchStarted() {
}
