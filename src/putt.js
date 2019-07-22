// http-server -a localhost -p 8000 -c-1    http://localhost:8000/putt.html

import Game from "/src/game.js";
import Ball from "/src/ball.js";
import Cup from "/src/cup.js";
import InputHandler from "/src/input.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let backgroundColor = "#1C8014";

let ball = new Ball(5, "#FFFFFF");

let cup = new Cup(800, 200, 10);

let game = new Game(ctx, backgroundColor, ball, cup);

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

    game.draw();
    last = now - (dt % step);
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);