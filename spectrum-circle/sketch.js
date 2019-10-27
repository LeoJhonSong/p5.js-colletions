// particles
var follower1 = [];
var follower1Num = 500;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    angleMode(RADIANS);
    background(0);
    for (var i = 0; i <= follower1Num; i++) {
        follower1.push(new Follower());
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
    //detect frequency
    spectrum = fft.analyze();
    frequency = spectrum.indexOf(Math.max(...spectrum)) * 20000 / spectrum.length;
    //draw spectrum
    translate(width / 2, height / 2);
    noStroke();
    var radius = 100;
    for (var i = 0; i < spectrum.length; i++) {
        let x = 0;
        let y = radius;
        let h = map(spectrum[i], 0, 255, 0, 300);
        angle = PI / 2 + i / spectrum.length * TWO_PI;
        fill(color(round(map(i, 0, spectrum.length, 0, 100)), 100, 100));
        rotate(angle);
        rect(x, y, TWO_PI * radius / spectrum.length * 10, h);
        rotate(-angle);
    }
    // speed
}