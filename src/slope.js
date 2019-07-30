export default class Slope {
    constructor(x, y, width, height, color, slopeAccelX, slopeAccelY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.slopeAccelX = slopeAccelX;
        this.slopeAccelY = slopeAccelY;
    }

    ballIsOver(ball) {
        if ((ball.x > this.x && ball.x < this.x + this.width) &&
            (ball.y> this.y && ball.y < this.y + this.height))
        {
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw directional triangles
        ctx.fillStyle = "#1C8014";

        if (this.slopeAccelX < 0) {
            ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2);
        }
    }

}