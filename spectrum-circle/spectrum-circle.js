var zoff = 0;
var mic;
var spectrum;

var isClicked = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB);
    angleMode(RADIANS);
    background(0);
    for (var i = 0; i <= curve1Num; i++) {
        curve1.push(new Curve());
    }
    mic = new p5.AudioIn();
    // start mic with a click
    userStartAudio().then(function () {
        mic.start();
    });
    fft = new p5.FFT();
    fft.setInput(mic);
}

function draw() {
    background(0);
    // if mic not triggered, show the text
    if (!isClicked) {
        textSize(32);
        fill(255);
        text('click to record the music', 10, 30);
    }
    //detect frequency
    spectrum = fft.analyze();
    frequency = spectrum.indexOf(Math.max(...spectrum)) * 20000 / spectrum.length;
    translate(width / 2, height / 2);
    //draw spectrum
    noStroke();
    colorMode(HSB, 100);
    var radius = 100;
    for (var i = 0; i < spectrum.length; i++) {
        let x = 0;
        let y = radius;
        let h = spectrum[i];
        angle = PI / 4 + i / spectrum.length * PI*1.5;
        fill(color(round(map(i, 0, spectrum.length, 0, 100)), 100, 100));
        rotate(angle);
        rect(x, y, TWO_PI * radius / spectrum.length * 10, h);
        rotate(-angle);
    }
    // speed
    zoff = zoff + randomGaussian(0.05, 0.02);
}

class Curve {
    constructor() {
        // shape
        this.maxNoise = 0.3;
        //this.maxNoise = random(0.01, 0.05);
    }
    wiggle(zoff, k, t) {
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.05) {
            var xoff = map(cos(i) * k * 0.08, -1, 1, 0, this.maxNoise);
            var yoff = map(sin(i) * k * 0.08, -1, 1, 0, this.maxNoise);
            var r = map(noise(xoff, yoff, zoff), 0, 1, 0.9, t * k);
            var x = r * cos(i);
            var y = r * sin(i);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
}