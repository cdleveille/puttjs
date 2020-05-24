export default class Wall {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	ballIsInContact(ball) {
		if ((ball.x + ball.radius > this.x && ball.x - ball.radius < this.x + this.width) &&
			(ball.y + ball.radius > this.y && ball.y - ball.radius < this.y + this.height))
		{
			return true;
		}
		return false;
	}

	getBallPositionAlongWall(ball) {
		if (this.width > this.height) {
			if (ball.yv < 0) {
				return [ball.x, this.y + this.height + ball.radius];
			} else {
				return [ball.x, this.y - ball.radius];
			}
		} else {
			if (ball.xv < 0) {
				return [this.x + this.width + ball.radius, ball.y];
			} else {
				return [this.x - ball.radius, ball.y];
			}
		}
	}

	draw(ctx) {
		ctx.fillStyle = "#8C5F01";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}