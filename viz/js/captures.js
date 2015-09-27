var imgs = {},
    piece_list = [],
    piece_pos = {},
    height = 0,
    width = 0,
    ready = 0;
var canvas_height = 400,
    canvas_width = 480;
function setup() {
  createCanvas(canvas_width, canvas_height);
  imgs.P = loadImage("assets/WP.png",function(img){ height = img.height; width = img.width; ready += 1;} );
  imgs.B = loadImage("assets/WB.png",function(){ready+= 1;});
  imgs.N = loadImage("assets/WN.png",function(){ready+= 1;});
  imgs.R = loadImage("assets/WR.png",function(){ready+= 1;});
  imgs.Q = loadImage("assets/WQ.png",function(){ready+= 1;});
  imgs.K = loadImage("assets/WK.png",function(){ready+= 1;});
  piece_list = ['P','B','N','R','Q','K'];
  piece_pos = {'P':0,'B':1,'N':2,'R':3,'Q':4,'K':5};
}


function drawCol(Xpos,exclude,alpha) {
  tint(165);
  var count = 0;
  if(alpha) tint(165,alpha);
  for(var key in imgs) {
    count += 1;
    if(key == exclude) continue;
    image(imgs[key],Xpos,height*(count-1));
  }
}
function drawRightCol(e,a) { drawCol(canvas_width - width,e,a); }
function drawLeftCol(e,a) { drawCol(0,e,a); }

var initialDrawn = false;
function drawInitial() {
  if(initialDrawn || ready < 6) return;
  initialDrawn = true;
  background(255);
  drawRightCol();
  drawLeftCol();
}
function drawNonInitial(pz) {
  drawRightCol();
  drawLeftCol(pz,125);
}
var colors = ['rgb(103, 194, 240)',
              'rgb(200, 131, 255)',
              'rgb(161, 240, 137)',
              'rgb(236,164,154)',
              'rgb(255, 190, 129)',
              'rgb(255, 240, 134)'];
var line_colors = ['#1B6B9A',
              '#603885',
              '#3E693E',
              '#BD312C',
              '#D35B00',
              '#DAB212'];
function drawBezier(pz,fraction) {
  var prop = data[pz],
      graphHeight = 3*height,
      bezierX = width*3,
      bezierY = canvas_height/2 - 2.5*height;
  stroke(0);
  strokeWeight(0.5);
  for(var i = 0; i < piece_list.length; i++) {
    var key = piece_list[i];
    //stroke(line_colors[i]);
    fill(colors[i]);
    beginShape();
    vertex(bezierX,bezierY);
    bezierVertex(
           bezierX+width,bezierY, // Control point
           canvas_width-2*width,height*i,
           canvas_width-width,height*(i+0.2)); // End point
    vertex(canvas_width-width,height*i+height); // End point
    bezierVertex(canvas_width-2*width,height*(i+1),
                 bezierX+width,bezierY+graphHeight*prop[key], // Control point
                 bezierX,bezierY+graphHeight*prop[key]);       // Start point
    vertex(bezierX,bezierY);
    bezierY += graphHeight*prop[key];
    endShape(CLOSE);
  }
  strokeWeight(2);
  line(bezierX,canvas_height/2-2.5*height,bezierX,bezierY);
}
function drawPercentages(pz) {
  var perc = data[pz],
      count = 0;
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(14);
  for(var i = 0; i < piece_list.length; i++) {
    var key = piece_list[i],
        str = Math.round(perc[key]*100);
    if(i == piece_list.length - 1) str = 100 - count;
    count += str;
    text(str+'%',canvas_width-width*1.55,height*(i+0.6));
  }
}
var graphReady = false;
function drawGraph(pz) {
  if(graphReady || ready < 6) return;
  background(255);
  tint(165);
  image(imgs[lookingAt],width*2,canvas_height/2-height*3/2);
  drawBezier(pz);
  drawNonInitial(pz);
  drawPercentages(pz);
  graphReady = true;
}

var transitionCounter = 0,
    transitionStep = 0.03;
function drawTransition(pz,direction) {
  background(255);
  var point_a = [0,piece_pos[pz]*height],
      point_b = [width*2,canvas_height/2-height*3/2];
  var start = direction == 'forth' ? point_b : point_a,
      end = direction == 'forth' ? point_a : point_b;
  var bzPoint = bezierPoint(0,0,1,1,transitionCounter);
  var x = start[0]*bzPoint + end[0]*(1-bzPoint),
      y = start[1]*bzPoint + end[1]*(1-bzPoint);
  tint(165);
  image(imgs[pz],x,y);
  transitionCounter += transitionStep;
  if(transitionCounter >= 1) {
    state = direction == 'back' ? 'initial' : 'graph';
    if(state == 'initial') lookingAt = undefined;
    transitionCounter = 0;
  }
  drawNonInitial(pz);
  drawBezier(pz,bzPoint);
}

var lookingAt = 'P',
    state = "graph"; // "initial", "tr-forth", "tr-back", "graph"

function draw() {
  var in_state = state;
  if(in_state == 'initial') {drawInitial(); }
  if(in_state == 'graph') {drawGraph(lookingAt); };
  if(in_state == 'tr-back'){ drawTransition(lookingAt,'back');  }
  if(in_state == 'tr-forth'){ drawTransition(lookingAt,'forth'); }
  /*textAlign(LEFT);
  textSize(14);
  textStyle(BOLD);
  stroke(255);
  fill(0);
  strokeWeight(1);
  text("WHEN A PIECE IS CAPTURED, WHO CAPTURES IT MOST OFTEN?",100,20,150);*/
}

function mousePressed() {
  if(state == 'tr-forth' || state == 'tr-back') return ;
  if(state == 'initial' || state == 'graph') {
    var pz = Math.floor(mouseY/height),
        is_pz = mouseX <= width && mouseY <= height*5 && lookingAt != piece_list[pz];
    if(is_pz) lookingAt = piece_list[pz];
    if(is_pz) state = 'tr-forth';
    if(is_pz) graphReady = false;
    if(is_pz) initialDrawn = false;
  }
  if(state == 'graph') {
    state = 'tr-back';
    graphReady = false;
  }
}
