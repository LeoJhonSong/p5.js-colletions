var flower1 = [];
var flower1Num = 120;
var zoff = 0;
var mic;
var spectrum;
var isClicked = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    // record mic
    mic = new p5.AudioIn();
    // start mic with a click
    userStartAudio().then(function () {
        mic.start();
        isClicked = 1;
    });
    // set the fft
    fft = new p5.FFT();
    fft.setInput(mic);
    // initial the flower
    for (var i = 0; i <= flower1Num; i++) {
        flower1.push(new Flower());
    }
}

function draw() {
    background(0);
    // if mic not triggered, show the text
    if (!isClicked) {
        textSize(32);
        fill(255);
        text('click to record the music', 10, 30);
    }
    // get the main frequency of the sound
    spectrum = fft.analyze();
    frequency = spectrum.lastIndexOf(Math.max(...spectrum));
    translate(width / 2, height / 2);
    // draw the flower
    for (let i = 20; i < flower1.length; i++) {
        stroke(color(map(frequency, 0, 250, 0, 360), 100, 100));
        strokeWeight(1.5);
        noFill();
        flower1[i].wiggle(zoff, i);
    }
    // how different from pic to pic, or, the change speed
    zoff = zoff + 0.03;
}

class Flower {
    constructor() {
        // shape
        this.maxNoise = 0.5;
    }
    // index is the index of polygon
    wiggle(zoff, index) {
        // size of flower
        var t = index * 0.5;
        var k = index * 0.08;
        // draw a polygon
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.08 // how many vertex
        ) {
            var xoff = map(cos(i) * k, -1, 1, 0, this.maxNoise);
            var yoff = map(sin(i) * k, -1, 1, 0, this.maxNoise);
            var r = map(noise(xoff, yoff, zoff), 0, 1, 0.9, t * k);
            var x = r * cos(i);
            var y = r * sin(i);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
}