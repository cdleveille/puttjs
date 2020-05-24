export default class Slope {
	constructor(x, y, width, height, startColor, endColor, slopeAccelX, slopeAccelY) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.startColor = startColor;
		this.endColor = endColor;
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
		let gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
		gradient.addColorStop(0, this.startColor);
		gradient.addColorStop(1, this.endColor);
		ctx.fillStyle = gradient;
		ctx.fillRect(this.x, this.y, this.width, this.height);  

		if (this.slopeAccelX < 0) {
			ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2);
		}
	}

}