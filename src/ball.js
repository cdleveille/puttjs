export default class Ball {
	constructor(radius, puttSounds) {
		this.radius = radius;
		this.puttSounds = puttSounds;
		this.isInCup = false;
	}

	hitAction(clickX, clickY) {
		let currentBallVelocity = Math.sqrt(Math.pow(this.xv, 2) + Math.pow(this.yv, 2));
		if (currentBallVelocity < 1 && !this.game.isFrozen) {

			let xDiff = clickX - this.x;
			let yDiff = clickY - this.y;

			let newBallVelocity = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

			if (newBallVelocity > 100) {
				this.puttSounds.putt1.play();
			} else if (newBallVelocity > 66) {
				this.puttSounds.putt2.play();
			} else if (newBallVelocity > 33) {
				this.puttSounds.putt3.play();
			} else {
				this.puttSounds.putt4.play();
			}
	
			this.xv += -xDiff * 5;
			this.yv += -yDiff * 5;

			this.game.currentHole.strokeCount++;
		}
	}

	moveTo(x, y) {
		this.x = x;
		this.y = y;
	}

	decel(rollDecel) {
		let atanDegrees = this.degrees(Math.atan(this.yv / this.xv));
		let angle = 0, xDecel = 0, yDecel = 0;
		if (this.xv > 0) {
			angle = atanDegrees;
			xDecel = -Math.cos(this.radians(angle));
			yDecel = -Math.sin(this.radians(angle));
		} else if (this.xv < 0) {
			if (this.xv > 0) {
				angle = 180 + atanDegrees;
			} else if (this.xv < 0) {
				angle = -180 + atanDegrees;
			}
			xDecel = -Math.cos(this.radians(angle));
			yDecel = -Math.sin(this.radians(angle));
		} else if (this.xv == 0) {
			if (this.xv > 0) {
				angle = -90;
			} else {
				angle = 90
			}
			xDecel = Math.cos(this.radians(angle));
			yDecel = Math.sin(this.radians(angle));
		} else if (this.xv == 0) {
			angle = 180;
			xDecel = Math.cos(this.radians(angle));
			yDecel = Math.sin(this.radians(angle));
		}

		let xDecelAmt = xDecel * rollDecel;
		let yDecelAmt = yDecel * rollDecel;

		this.xv += xDecelAmt;
		this.yv += yDecelAmt;
	}

	// convert radians to degrees
	degrees(radians) {
		return (radians * 180) / Math.PI;
	}

	// convert degrees to radians
	radians(degrees) {
		return (degrees * Math.PI) / 180;
	}

	update(step, rollDecel) {
		this.decel(rollDecel);

		this.x += this.xv * step;
		this.y += this.yv * step;
	}

	draw(ctx) {
		ctx.fillStyle = '#FFFFFF';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#003300";
		ctx.stroke();
	}
}