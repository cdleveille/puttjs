// http-server -a localhost -p 8000 -c-1    http://localhost:8000/putt.html

import Game from "/src/game.js";
import Ball from "/src/ball.js";
import Cup from "/src/cup.js";
import Hole from "/src/hole.js";
import Wall from "/src/wall.js";
import Zone from "/src/zone.js";
import Slope from "/src/slope.js";
import InputHandler from "/src/input.js";
import WindowHandler from "/src/window.js";
import Sound from "/src/sound.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let puttSounds = {
  putt1: new Sound("/snd/putt1.mp3"),
  putt2: new Sound("/snd/putt2.mp3"),
  putt3: new Sound("/snd/putt3.mp3"),
  putt4: new Sound("/snd/putt4.mp3")
};

let wallSounds = {
  wall1: new Sound("/snd/wall1.mp3"),
  wall2: new Sound("/snd/wall2.mp3"),
  wall3: new Sound("/snd/wall3.mp3"),
  wall4: new Sound("/snd/wall4.mp3")
};

let cupSound = new Sound("/snd/cup.mp3");

let backgroundColor = "#555555";

let ball = new Ball(5, puttSounds);

// hole 1
let cup1 = new Cup(800, 250, 10);
let startZone = { x: 170, y: 120, width: 110, height: 260 };
let zones1 =    [   new Zone(170, 120, 110, 260, "#156601"),
                    new Zone(280, 120, 620, 260, "#1C8014"),
                    new Zone(600, 120, 300, 260, "#045500")
                ];
let slopes1 =   [   new Slope(400, 120, 200, 260, "#1C8014", "#045500", -1.6, 0)];
let walls1 =    [   new Wall(150, 100, 20, 300),
                    new Wall(150, 100, 750, 20),
                    new Wall(150, 380, 750, 20),
                    new Wall(900, 100, 20, 300)
                ];
let hole1 = new Hole(cup1, walls1, zones1, slopes1, startZone, 2);

let holes = [hole1];

let game = new Game(backgroundColor, ball, holes, cupSound, wallSounds);
game.loadHole(0);

let windowHandler = new WindowHandler(canvas, game, .9);

let inputHandler = new InputHandler(canvas, game);

let updateRate = 500;
let dt, now, last = game.timestamp(), step = 1 / updateRate;

function frame() {
    now = game.timestamp();
    dt = Math.min(1, (now - last) / 1000);

    while(dt > step) {
        dt = dt - step;
        game.update(step);
    }

    game.draw(ctx);
    last = now - (dt % step);
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);