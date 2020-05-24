export default class Cup {
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	draw(ctx) {
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#003300";
		ctx.stroke();
	}
}