// particles
var follower1 = [];
var follower1Num = 500;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB);
    background(255);
    for (var i = 0; i <= follower1Num; i++) {
        follower1.push(new Follower());
    }
}

function draw() {
    // draw followers
    // for shadow
    fill('rgba(255,255,255,0.3)');
    noStroke();
    rect(0, 0, windowWidth, windowHeight);
    for (var i = 0; i < follower1.length; i++) {
        follower1[i].update();
        follower1[i].render();

    }
}

class Follower {
    constructor() {
        this.loc = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }
    render() {
        fill(0);
        noStroke();
        ellipse(this.loc.x, this.loc.y, 9, 9);
    }
    update() {
        this.acc = createVector(mouseX - this.loc.x, mouseY - this.loc.y);
        this.acc.limit(0.1);
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.loc.add(this.vel);
    }
}
