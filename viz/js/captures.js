var imgs = {},
    piece_list = [],
    piece_pos = {},
    height = 0,
    width = 0;
var canvas_height = 500,
    canvas_width = 480;
function setup() {
  createCanvas(canvas_width, canvas_height);
  imgs.P = loadImage("assets/WP.png",function(img){ height = img.height; width = img.width;} );
  imgs.B = loadImage("assets/WB.png");
  imgs.N = loadImage("assets/WN.png");
  imgs.R = loadImage("assets/WR.png");
  imgs.Q = loadImage("assets/WQ.png");
  imgs.K = loadImage("assets/WK.png");
  piece_list = ['P','B','N','R','Q','K'];
  piece_pos = {'P':0,'B':1,'N':2,'R':3,'Q':4,'K':5};
}


function drawCol(Xpos,exclude,alpha) {
  var count = 0;
  if(alpha) tint(255,alpha);
  for(var key in imgs) {
    count += 1;
    if(key == exclude) continue;
    image(imgs[key],Xpos,height*(count-1));
  }
}
function drawRightCol(e,a) { drawCol(canvas_width - width,e,a); }
function drawLeftCol(e,a) { drawCol(0,e,a); }
function drawInitial() {
  drawRightCol();
  drawLeftCol();
}
function drawNonInitial(pz) {
  drawRightCol();
  drawLeftCol(pz,125);
}
var colors = ['rgb(0,255,0)',
              'rgb(255,0,0)',
              'rgb(0,0,255)',
              'rgb(255,0,255)',
              'rgb(0,255,255)',
              'rgb(255,255,0)'];
function drawBezier(pz) {
  stroke(100);
  var prop = data[pz],
      graphHeight = 3*height,
      bezierX = width*3,
      bezierY = canvas_height/2 - 2*height;
  for(var i = 0; i < piece_list.length; i++) {
    var key = piece_list[i];
    fill(colors[i]);
    beginShape();
    vertex(bezierX,bezierY);
    bezierVertex(
           bezierX+width,bezierY, // Control point
           canvas_width-2*width,height*i,
           canvas_width-width,height*i+height*0.2); // End point
    vertex(canvas_width-width,height*i+height); // End point
    bezierVertex(canvas_width-2*width,height*(i+1),
                 bezierX+width,bezierY+graphHeight*prop[key], // Control point
                 bezierX,bezierY+graphHeight*prop[key]);       // Start point
    vertex(bezierX,bezierY);
    bezierY += graphHeight*prop[key];
    endShape(CLOSE);
  }

}
function drawGraph(pz) {
  image(imgs[lookingAt],width*2,canvas_height/2-height*3/2);
  drawBezier(pz);
  drawNonInitial(pz);
}

var transitionCounter = 0,
    transitionStep = 0.02;
function drawTransition(pz,direction) {
  var point_a = [0,piece_pos[pz]*height],
      point_b = [width*2,canvas_height/2-height*3/2];
  var start = direction == 'forth' ? point_b : point_a,
      end = direction == 'forth' ? point_a : point_b;
  var bzPoint = bezierPoint(0,0,1,1,transitionCounter);
  var x = start[0]*bzPoint + end[0]*(1-bzPoint),
      y = start[1]*bzPoint + end[1]*(1-bzPoint);
  image(imgs[pz],x,y);
  transitionCounter += transitionStep;
  if(transitionCounter >= 1) {
    state = direction == 'back' ? 'initial' : 'graph';
    transitionCounter = 0;
  }
  drawNonInitial(pz);
}

var lookingAt = 'B',
    state = "initial"; // "initial", "tr-forth", "tr-back", "graph"

function draw() {
  background(255);
  if(state == 'initial') {drawInitial(); return; }
  if(state == 'graph') {drawGraph(lookingAt); return;};
  if(state == 'tr-back'){ drawTransition(lookingAt,'back'); return; }
  if(state == 'tr-forth'){ drawTransition(lookingAt,'forth'); return; }
}

function mousePressed() {
  if(state == 'tr-forth' || state == 'tr-back') return ;
  if(state == 'graph') {
    state = 'tr-back';
  }
  if(state == 'initial') {
    var pz = Math.floor(mouseY/height),
        is_pz = mouseX <= width;
    lookingAt = is_pz ? piece_list[pz] : undefined;
    state = is_pz ? 'tr-forth' : 'initial';
  }
}
