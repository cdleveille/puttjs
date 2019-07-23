// http-server -a localhost -p 8000 -c-1    http://localhost:8000/putt.html

import Game from "/src/game.js";
import Ball from "/src/ball.js";
import Cup from "/src/cup.js";
import Hole from "/src/hole.js";
import Wall from "/src/wall.js";
import Zone from "/src/zone.js";
import InputHandler from "/src/input.js";
import WindowHandler from "/src/window.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

let puttSound = new sound("/snd/putt.mp3");
let cupSound = new sound("/snd/cup.mp3");
let wallSound = new sound("/snd/wall.mp3");

let backgroundColor = "#555555";

let ball = new Ball(5, "#FFFFFF", puttSound);

// hole 1
let cup1 = new Cup(800, 250, 10);
let walls1 = [  new Wall(150, 100, 20, 300),
                new Wall(150, 100, 750, 20),
                new Wall(150, 380, 750, 20),
                new Wall(900, 100, 20, 300)
             ];
let zones1 = [  new Zone(170, 120, 110, 260, "#156601"),
                new Zone(280, 120, 620, 260, "#1C8014")
             ];
let hole1 = new Hole(cup1, walls1, zones1, 225, 250);

let holes = [hole1];

let game = new Game(backgroundColor, ball, holes, cupSound, wallSound);
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