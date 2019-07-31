export default class InputHandler{
    constructor(canvas, game) {
        let left = 37;
        let right = 39;
        let up = 38;
        let down = 40;

        document.addEventListener("keydown", (event) => {
            switch(event.keyCode) {
                case left:
                    game.ball.keyAction("left", null);
                    break;
                case right:
                    game.ball.keyAction("right", null);
                    break;
                case up:
                    game.ball.keyAction("up", null);
                    break;
                case down:
                    game.ball.keyAction("down", null);
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch(event.keyCode) {
                case left:
                    game.ball.keyAction(null, "left");
                    break;
                case right:
                    game.ball.keyAction(null, "right");
                    break;
                case up:
                    game.ball.keyAction(null, "up");
                    break;
                case down:
                    game.ball.keyAction(null, "down");
                    break;
            }
        });

        canvas.addEventListener('click', (event) => {
            let clickX = event.clientX - ((window.innerWidth - canvas.width) / 2);
            let clickY = event.clientY - ((window.innerHeight - canvas.height) / 2);

            game.shadowX = clickX;
            game.shadowY = clickY;
            
            if (!game.spottingBall) {
                game.ball.hitAction(clickX, clickY);
            } else {
                game.attemptToSpotBall();
            }
        });

        canvas.addEventListener('mousemove', (event) => {
            if (game.spottingBall) {
                let mouseX = event.clientX - ((window.innerWidth - canvas.width) / 2);
                let mouseY = event.clientY - ((window.innerHeight - canvas.height) / 2);

                game.ball.moveTo(mouseX, mouseY);
            }
        });
    }
}