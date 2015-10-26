var imgs = {},
    data = pawn_captures;
var canvas_width = 500,
    canvas_height = 300;
var height, width;
var ready_imgs = 0;
var Y_AXIS = 0, X_AXIS = 1;
var maxWhite = 0, maxBlack = 0;
function setup() {
  createCanvas(canvas_width,canvas_height);
  imgs.WP = loadImage("assets/WP.png",function(img){ height = img.height; width = img.width; ready_imgs += 1;});
  imgs.WR = loadImage("assets/WR.png",function(img){ ready_imgs += 1;});
  imgs.BP = loadImage("assets/BP.png",function(img){ ready_imgs += 1;});
  imgs.BR = loadImage("assets/BR.png",function(img){ ready_imgs += 1;});
  for(var i = 1; i <= 8; i++) {
    if(data.WP[i] !== undefined && data.WP[i] > maxWhite) maxWhite = data.WP[i];
    if(data.BP[i] !== undefined && data.BP[i] > maxBlack) maxBlack = data.BP[i];
  }
}
var drawn = false;
function draw() {
  if(drawn) return;
  if(ready_imgs < 4) return;
  strokeWeight(2);
  stroke(0);
  fillInt = 1;
  for(var i = 0; i < 8; i++) {
    fill(125+125*fillInt);
    fillInt = abs(1 - fillInt);
    rect(width*i+1,1,width,height);
    rect(width*i+1,height*2.5,width,height);
  }
  image(imgs.WR,0,0);
  image(imgs.WP,width,0);
  image(imgs.BR,width*7,height*2.5);
  image(imgs.BP,width*6,height*2.5);
  var wpRate = data.WP,
      bpRate = data.BP;
  var whiteColor, blackColor, str,
      white = color(255,255,255);
  textAlign(CENTER);
  textSize(14);
  strokeWeight(3);
  for(i = 1; i <= 8; i++) {
    if(wpRate[''+i] === undefined) wpRate[''+i] = 0;
    if(i != 1) {
      whiteColor = color(255,(1-wpRate[''+i]/maxWhite)*255,0);
      setGradient(width*(i-1)+1,height+3,width,height-5,whiteColor,white,Y_AXIS);
      str = Math.round(wpRate[''+i]*100)+'%';
      fill(255);
      stroke(0);
      text(str,width*(i-0.5),height*1.5);
    }
    if(bpRate[''+i] === undefined) bpRate[''+i] = 0;
    if(i != 8) {
      blackColor = color(255,(1-bpRate[''+i]/maxBlack)*255,0);
      setGradient(width*(i-1)+1,height*3.5+2,width,height-5,blackColor,white,Y_AXIS);
      str = Math.round(bpRate[''+i]*100)+'%';
      fill(255);
      stroke(0);
      text(str,width*(i-0.5),height*4);
    }
  }
  drawn = true;
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
