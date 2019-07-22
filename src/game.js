export default class Game {
    constructor(ctx, backgroundColor, ball, cup) {
        this.ctx = ctx;
        this.backgroundColor = backgroundColor;
        this.gameWidth = 1000;
        this.gameHeight = 500;
        this.ball = ball;
        this.ball.game = this;
        this.cup = cup;
        this.cup.game = this;

        this.rollDecel = 0.4;
        this.cupDecel = 20;

        this.ball.x = 500;
        this.ball.y = 250;
        this.ball.xv = 0;
        this.ball.yv = 0;

        this.shadowX = -100;
        this.shadowY = -100;

        this.bounceWall = 0.35;
    }

    // get the current time (high precision)
    timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    handleCollisions() {
        // ball hits wall
        if (this.ball.x <= this.ball.radius) {
            this.ball.x = this.ball.radius;
            this.ball.xv = -this.ball.xv * this.bounceWall;
        } else if (this.ball.x >= this.gameWidth - this.ball.radius) {
            this.ball.x = this.gameWidth - this.ball.radius;
            this.ball.xv = -this.ball.xv * this.bounceWall;
        }
        if (this.ball.y <= this.ball.radius) {
            this.ball.y = this.ball.radius;
            this.ball.yv = -this.ball.yv * this.bounceWall;
        } else if (this.ball.y >= this.gameHeight - this.ball.radius) {
            this.ball.y = this.gameHeight - this.ball.radius
            this.ball.yv = -this.ball.yv * this.bounceWall;
        }

        // ball is "over" the cup
        if (this.ballIsOverCup(this.cup.x, this.cup.y, this.cup.radius)) {
            let ballVelocity = Math.sqrt(Math.pow(this.ball.xv, 2) + Math.pow(this.ball.yv, 2));
            if (ballVelocity < 500) {
                this.ball.decel(this.cupDecel);
            }
            if (ballVelocity < 10) {
                this.ball.x = this.cup.x;
                this.ball.y = this.cup.y;
                this.ball.radius = 4;
            }
        } else {
            this.ball.radius = 5;
        }

    }

    // determine whether the ball is over the cup
    ballIsOverCup(x, y, r) {
        if (Math.sqrt( Math.pow(this.ball.x - x, 2) + Math.pow(this.ball.y - y, 2) ) <= r + this.ball.radius / 3) {
            return true
        }
		return false
    }

    update(step) {
        this.ball.update(step, this.rollDecel);
        this.handleCollisions();
    }

    draw() {
        // clear and fill with background color
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

        this.cup.draw();

        this.ball.draw();

        // this.ctx.fillStyle = "#000000";
        // this.ctx.beginPath();
        // this.ctx.arc(this.shadowX, this.shadowY, 2, 0, 2 * Math.PI, false);
        // this.ctx.fill();
        // this.ctx.lineWidth = 1;
        // this.ctx.strokeStyle = "#003300";
        // this.ctx.stroke();
    }
}