/*** VARIABLES ***/
// Global Variable
var mimmo = 0;
// Gradient
const Y_AXIS = 1;
// Running text
let x_RT;
var message = "WALK TO SEE POST FROM OTHER PEOPLE - WALK TO SEE POST FROM OTHER PEOPLE - WALK TO SEE POST FROM OTHER PEOPLE - ";
// Audio wave
var mic;
// Images
var logo;
var logoType;
var logoBar;
var profile;
// Post
var post0;
var post1;
var post2;
var post3;
var post4;
var post5;
var myStatus;
var myPicture = [];
// Opacity
let alfa = 255;
// Scroll
var startLoc;
var dScroll = 0;
var indexScroll = 0;
// Options for watchPosition function
watchOptions = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};
// Swipe
var indexSwipe = 0;
// Like
var like;
// Dictate
var textPost;
// Slitscan
var video;
var wCamera = 720;
var hCamera = 480;
var inc = 0;
/***** PRELOAD *****/
function preload() {
  /* IMAGES */
  // Logo
  logo = loadImage("assets/logo.png");
  logoType = loadImage("assets/logoType.png");
  logoBar = loadImage("assets/logoBar.png");
  // Profile
  profile = loadImage("assets/profile.png");
  // Posts
  post0 = loadImage("assets/post0.png");
  post1 = loadImage("assets/post1.png");
  post2 = loadImage("assets/post2.png");
  post3 = loadImage("assets/post3.png");
  post4 = loadImage("assets/post4.png");
  post5 = loadImage("assets/post5.png");
  /* SCROLL */
  startLoc = getCurrentPosition();
  watchPosition(positionPing);
  /* LIKE */
  like = loadImage("assets/like.png");
}

/*** SETUP ***/
function setup() {
  /* General Stuff */
  colorMode(RGB);
  frameRate(12);
  imageMode(CENTER);
  setMoveThreshold(0);
  pixelDensity(1);
  /* STATIC STUFF */
  // Canvas
  createCanvas(windowWidth, windowHeight);
  /** DESKTOP DEVICE **/
  /* RUNNING TEXT */
  x_RT = 0;
  /* SINE WAVE */
  mic = new p5.AudioIn();
  mic.start();
  /** SPEECH RECOGNITION **/
  let lang = navigator.language || 'en-US';
  let speechRec = new p5.SpeechRec(lang, gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);
  // Got Speech
  function gotSpeech() {
    var mostrecentword = speechRec.resultString.split(' ').pop();
    if (mostrecentword.indexOf("listen") !== -1) {
      message = "TO POST A PICTURE SAY «PHOTO», TO POST A STATUS SAY «POST» - TO POST A PICTURE SAY «PHOTO», TO POST A STATUS SAY «POST» - ";
      mimmo = 5;
    } else if (mostrecentword.indexOf("post") !== -1) {
      message = "DICTATE THE TEXT YOU WANT TO POST - DICTATE THE TEXT YOU WANT TO POST - DICTATE THE TEXT YOU WANT TO POST - "
      mimmo = 6;
    } else if (mostrecentword.indexOf("photo") !== -1) {
      message = "FOLLOW THE SLITSCAN TO TAKE A PICTURE - FOLLOW THE SLITSCAN TO TAKE A PICTURE - FOLLOW THE SLITSCAN TO TAKE A PICTURE - "
      mimmo = 7;
    }
  }
  // Dictate
  function gotSpeech() {
    if (speechRec.resultValue) {
      textPost = speechRec.resultString;
    }
  }
  /* SLITSCAN */
  // Webcam input
  video = createCapture(VIDEO);
  video.size(wCamera, hCamera);
}

/*** DRAW ***/
function draw() {
  /** STATIC STUFF **/
  b1 = color(30, 40, 50);
  b2 = color(40, 50, 60);
  yello = color(235, 185, 35);
  // Gradient Background
  setGradient(0, 0, width, height, b2, b1, Y_AXIS);
  /** DESKTOP / MOBILE **/
  var windowRatio = width / height;
  // Font
  textFont('Rajdhani');
  textAlign(CENTER, CENTER);
  if (windowRatio > 1) {
    textSize(height / 35);
    noStroke();
    fill(yello);
    text("For a better experience open", width / 2, (height / 2) - (height / 20));
    textStyle(BOLD);
    text("The Unsocial", width / 2, height / 2);
    textStyle(NORMAL);
    text("on a mobile device", width / 2, (height / 2) + (height / 20));
  } else {
    /** MOBILE DEVICE **/
    if (frameCount < 24) {
      var logoRatio = logo.width / logo.height;
      var logoTypeRatio = logoType.width / logoType.height;
      fill(yello);
      rect(0, 0, width, height);
      image(logo, width / 2, 2 * height / 5, width / 3, (width / 3) / logoRatio);
      image(logoType, width / 2, 3 * height / 5, width / 3, (width / 3) / logoTypeRatio);
      if (frameCount > 12) {
        tint(255, alfa);
        alfa -= 25;
      }
    } else {
      /* Logo bar */
      rectMode(CENTER);
      fill(b1);
      rect(width / 2, height / 20, width, height / 10);
      /* Sine Wave */
      noFill();
      // Volume
      var vol = mic.getLevel();
      var vol_map = map(vol, 0, 1, 0, 120);
      var amount = 500;
      var frequency = random(1) / 5;
      var offset = vol_map;
      var startY = height / 20;
      stroke('white');
      strokeWeight(4);
      // Wave shape
      beginShape();
      vertex(0, startY);
      for (var c = 1; c < amount; c++) {
        var sinoffset = sin(frequency * c);
        var sinX = c * (width / amount);
        var sinY = startY + (sinoffset * offset);
        bezierVertex(sinX, sinY, sinX, sinY, sinX, sinY);
      }
      endShape();
      /* Logo */
      tint(255, 255);
      image(logoBar, width / 2, height / 20, height / 15, height / 15);
      /* Personal Profile */
      image(profile, width / 2, 4 * height / 20, height / 10, height / 10);
      textStyle(BOLD);
      textSize(height / 40);
      noStroke();
      fill(yello);
      text('Ale Fac', width / 2, 5.5 * height / 20);
      /* RUNNING TEXT */
      // Bar
      noStroke();
      fill(b2);
      rect(width / 2, 31 * height / 32, width, height / 16);
      var messageWidth = textWidth(message);
      // Text
      if (x_RT < -messageWidth) {
        x_RT = 0;
      }
      textStyle(NORMAL);
      textSize(height / 30);
      fill(255);
      textAlign(LEFT);
      text(message, x_RT, 31 * height / 32);
      x_RT = x_RT - width / 20;
      // Acceleraton
      var accZ = accelerationZ;
      var accX = accelerationX;
      var accY = accelerationY;
      // Posts Images Ratio
      var postRatio0 = post0.width / post0.height;
      var postRatio1 = post1.width / post1.height;
      var postRatio2 = post2.width / post2.height;
      var postRatio3 = post3.width / post3.height;
      var postRatio4 = post4.width / post4.height;
      var postRatio5 = post5.width / post5.height;
      var likeRatio = like.width / like.height;

      /** INTERACTIONS **/
      if (mimmo == 0) {
        /* SCROLL */
        // Navigation
        fill(255);
        rect((width / 2), 6.5 * height / 20, width / 2, height / 160, height / 320);
        if (indexScroll == 0) {
          // Navigation
          fill(yello);
          rect((width / 2) - (width / 4), 6.5 * height / 20, width / 12, height / 160, height / 320);
          // Post
          image(post0, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio0));
        } else if (indexScroll == 1) {
          // Navigation
          fill(yello);
          rect((width / 2) - (width / 4), 6.5 * height / 20, width / 16, height / 160, height / 320);
          // Post
          image(post1, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio1));
        } else if (indexScroll == 2) {
          // Navigation
          fill(yello);
          rect((width / 2) - (width / 4), 6.5 * height / 20, width / 6, height / 160, height / 320);
          // Post
          image(post2, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio2));
          message = "TO SEE OTHER POSTS FROM LUCIA, MOVE YOUR PHONE TO THE RIGHT - TO SEE OTHER POSTS FROM LUCIA, MOVE YOUR PHONE TO THE RIGHT - TO SEE OTHER POSTS FROM LUCIA, MOVE YOUR PHONE TO THE RIGHT - ";
          mimmo = 1;
        }
      } else if (mimmo == 1) {
        indexScroll = 2;
        /* SWIPE */
        // Navigation
        fill(255);
        rect((width / 2), 6.5 * height / 20, width / 2, height / 160, height / 320);
        // Swipe Index
        if (accX > 10) {
          indexSwipe = indexSwipe + 1;
        }
        // Post
        if (indexSwipe == 0) {
          // Navigation
          fill(yello);
          rect((width / 2) - (width / 4), 6.5 * height / 20, width / 6, height / 160, height / 320);
          // Post
          image(post2, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio2));
        } else if (indexSwipe == 1) {
          // Navigation
          fill(yello);
          rect((width / 2), 6.5 * height / 20, width / 6, height / 160, height / 320);
          // Post
          image(post3, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio3));
        } else if (indexSwipe == 2) {
          // Navigation
          fill(yello);
          rect((width / 2) + (width / 4), 6.5 * height / 20, width / 6, height / 160, height / 320);
          // Post
          image(post4, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio4));
          message = "TO LIKE THIS POST, JUMP - TO LIKE THIS POST, JUMP - TO LIKE THIS POST, JUMP - ";
          mimmo = 2;
        }
      } else if (mimmo == 2) {
        indexSwipe = 2;
        // Navigation
        fill(255);
        rect((width / 2), 6.5 * height / 20, width / 2, height / 160, height / 320);
        fill(yello);
        rect((width / 2) + (width / 4), 6.5 * height / 20, width / 6, height / 160, height / 320);
        /* LIKE */
        image(post5, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio5));
        if (accZ > 5) {
          image(like, width / 2, 3 * height / 5, width / 2, (width / 2) / likeRatio);
          message = "TO SHARE THIS POST, THROW YOUR PHONE TO SOMEONE IN FRONT OF YOU - TO SHARE THIS POST, THROW YOUR PHONE TO SOMEONE IN FRONT OF YOU - TO SHARE THIS POST, THROW YOUR PHONE TO SOMEONE IN FRONT OF YOU - ";
          mimmo = 3;
        }
      } else if (mimmo == 3) {
        /* SHARE */
        // Navigation
        fill(255);
        rect((width / 2), 6.5 * height / 20, width / 2, height / 160, height / 320);
        fill(yello);
        rect((width / 2) + (width / 4), 6.5 * height / 20, width / 6, height / 160, height / 320);
        // Post
        image(post5, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio5));
        if (accY > 5) {
          fill(235, 185, 35);
          rect(width / 2, 3 * height / 5, 1.25 * width / 2, 1.25 * width / 6, width / 40);
          fill(255);
          textAlign(CENTER, CENTER);
          textSize(width / 8);
          textStyle(BOLD);
          text("Shared", width / 2, 3 * height / 5);
          message = "TO CREATE A POST, SAY «LISTEN» - TO CREATE A POST, SAY «LISTEN» - TO CREATE A POST, SAY «LISTEN» - ";
          mimmo = 4;
        }
      } else if (mimmo == 4) {
        /* LISTEN */
        // Navigation
        fill(255);
        rect(width / 2, 6.5 * height / 20, width / 2, height / 160, height / 320);
        fill(yello);
        rect((width / 2) + (width / 4), 6.5 * height / 20, width / 6, height / 160, height / 320);
        // Post
        image(post5, width / 2, 4 * height / 7, 15 * width / 20, 15 * width / (20 * postRatio5));
      } else if (mimmo == 5) {
        /* SHAKE */
        /* POST */
        fill(255);
        textAlign(CENTER, CENTER);
        textStyle(NORMAL);
        text("Post in Progress", width / 2, height / 2);
      } else if (mimmo == 6) {
        /* DICTATE */
        fill(255, 255, 255, 128);
        rect(width / 2, height / 2, 1.5 * width / 2, height / 3, height / 36);
        fill(b2);
        textAlign(CENTER, CENTER);
        textStyle(NORMAL);
        text(textPost, width / 2, height / 2);
        myStatus = textPost;
      } else if (mimmo == 7) {
        /* SLITSCAN */
        for (var i = 0; i < 4 * width / 6; i++) {
          myPicture[i] = copy(video, 2 * wCamera / 3, 0, 1, hCamera / 3, (width / 6) + i, height / 3, 1, 2 * hCamera / 3);
        }
      }
    }
  }
}

/** FUNCTIONS **/
/* GRADIENT */
function setGradient(x, y, w, h, b1, b2, axis) {
  noFill();
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(b1, b2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}
/* POSITION PING */
function positionPing(position) {
  var d = calcGeoDistance(startLoc.latitude, startLoc.longitude, position.latitude, position.longitude);
  dScroll = d * 10000;
  if (dScroll > 10 && dScroll < 20) {
    indexScroll = 1;
  } else if (dScroll > 20) {
    indexScroll = 2;
  }
}
