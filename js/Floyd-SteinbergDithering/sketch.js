var img;
var render = true;
var factor = 2;

function preload() {
  img = loadImage("data/godfather.jpg");
}

function setup() {
  createCanvas(1280, 640);
  background(255);
  image(img, 0, 0);
  //filter(GRAY);
  //img.filter(GRAY);
}

function draw() {
  if (!render) return;

  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 1; x < img.width-1; x++) {
      let pix = img.get(x, y);
      let r = red(pix);
      let g = green(pix);
      let b = blue(pix);

      let newR = round(factor * r / 255) * (255/factor);
      let newG = round(factor * g / 255) * (255/factor);
      let newB = round(factor * b / 255) * (255/factor);

      img.set(x, y, color(newR, newG, newB, 255));

      let errR = r - newR;
      let errG = g - newG;
      let errB = b - newB;

      let c = img.get(x+1, y);
      let nR = red(c), nG = green(c), nB = blue(c);
      nR = nR + errR * 7/16.0;
      nG = nG + errG * 7/16.0;
      nB = nB + errB * 7/16.0;
      img.set(x+1, y  , color(nR, nG, nB, 255));

      c = img.get(x-1, y+1);
      nR = red(c); nG = green(c); nB = blue(c);
      nR = nR + errR * 3/16.0;
      nG = nG + errG * 3/16.0;
      nB = nB + errB * 3/16.0;
      img.set(x-1, y+1, color(nR, nG, nB, 255));

      c = img.get(x, y+1);
      nR = red(c); nG = green(c); nB = blue(c);
      nR = nR + errR * 5/16.0;
      nG = nG + errG * 5/16.0;
      nB = nB + errB * 5/16.0;
      img.set(x  , y+1, color(nR, nG, nB, 255));

      c = img.get(x+1, y+1);
      nR = red(c); nG = green(c); nB = blue(c);
      nR = nR + errR * 1/16.0;
      nG = nG + errG * 1/16.0;
      nB = nB + errB * 1/16.0;
      img.set(x+1, y+1, color(nR, nG, nB, 255));
    }
  }
  img.updatePixels();
  image(img, 640, 0);
  render = false;
}