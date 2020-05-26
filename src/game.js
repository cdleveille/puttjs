export default class Game {
	constructor(backgroundColor, ball, holes, cupSound, wallSounds, popSound, scoreCard) {
		this.backgroundColor = backgroundColor;
		this.ball = ball;
		this.ball.game = this;
		this.holes = holes;
		this.cupSound = cupSound;
		this.wallSounds = wallSounds;
		this.popSound = popSound;
		this.scoreCard = scoreCard;
		this.currentHoleNum;
		
		this.rollDecel = 0.37;
		this.cupDecel = 12;
		this.cupCenterPull = 12;
		this.bounceWall = 0.35;
	}

	loadHole(num) {
		this.currentHoleNum = num;
		this.currentHole = this.holes[num];
		this.cup = this.currentHole.cup;
		this.ball.x = this.currentHole.startX;
		this.ball.y = this.currentHole.startY;
		this.ball.xv = 0;
		this.ball.yv = 0;
		this.playCupSound = true;
		this.spottingBall = true;
		this.isFrozen = false;
		this.showScoreCard = false;
	}

	attemptToSpotBall() {
		if ((this.ball.x - this.ball.radius > this.currentHole.startZone.x && this.ball.x + this.ball.radius < this.currentHole.startZone.x + this.currentHole.startZone.width) &&
			(this.ball.y - this.ball.radius > this.currentHole.startZone.y && this.ball.y + this.ball.radius < this.currentHole.startZone.y + this.currentHole.startZone.height)) {
				this.spottingBall = false;
				this.popSound.play();
			}
	}

	// get the current time (high precision)
	timestamp() {
		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	}

	handleCollisions() {
		// ball hits edge of window
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

		// ball is over the cup
		if (this.ballIsOverCup(this.cup.x, this.cup.y, this.cup.radius)) {

			this.ball.decel(this.cupDecel);
			this.pullBallTowardCupCenter(this.cupCenterPull);

			let ballVelocity = Math.sqrt(Math.pow(this.ball.xv, 2) + Math.pow(this.ball.yv, 2));
			if (ballVelocity < 10) {
				this.ball.isInCup = true;
				this.ball.x = this.cup.x;
				this.ball.y = this.cup.y;
				this.ball.xv = 0;
				this.ball.yv = 0;
				this.ball.radius = 4;
				this.ball.color = "#CCCCCC";
				if (this.playCupSound && !this.isFrozen) {
					this.cupSound.play();
					this.playCupSound = false;
					this.isFrozen = true;
					this.frozenAtTime = this.timestamp();
					//this.showScoreCard = true;
				} else if (this.timestamp() - this.frozenAtTime > 1000) {
					this.showScoreCard = true;
					if (this.timestamp() - this.frozenAtTime > 5000) {
						if (this.currentHoleNum < 8) {
							this.loadHole(this.currentHoleNum + 1);
						}
					}
				}
			}
		} else {
			this.ball.isInCup = false;
			this.ball.radius = 5;
			this.ball.color = "#FFFFFF";
			this.playCupSound = true;
		}

		// ball hits a wall
		for (var i = 0; i < this.currentHole.walls.length; i++) {
			let wall = this.currentHole.walls[i];
			if (wall.ballIsInContact(this.ball)) {
				
				let currentBallVelocity = Math.sqrt(Math.pow(this.ball.xv, 2) + Math.pow(this.ball.yv, 2));
				if (currentBallVelocity > 600) {
					this.wallSounds.wall1.play();
				} else if (currentBallVelocity > 400) {
					this.wallSounds.wall2.play();
				} else if (currentBallVelocity > 200) {
					this.wallSounds.wall3.play();
				} else {
					this.wallSounds.wall4.play();
				}

				[this.ball.x, this.ball.y] = wall.getBallPositionAlongWall(this.ball);
				if (wall.width > wall.height) {
					this.ball.yv = -this.ball.yv * this.bounceWall;
					this.ball.xv = this.ball.xv * 0.8;
				} else {
					this.ball.xv = -this.ball.xv * this.bounceWall;
					this.ball.yv = this.ball.yv * 0.8;
				}
			}
		}

		// ball is over a slope
		for (var i = 0; i < this.currentHole.slopes.length; i++) {
			let slope = this.currentHole.slopes[i];
			if (slope.ballIsOver(this.ball)) {
				this.ball.xv += slope.slopeAccelX;
				this.ball.yv += slope.slopeAccelY;
			}
		}
	}

	// determine whether the ball is over the cup
	ballIsOverCup(x, y, r) {
		if (Math.sqrt( Math.pow(this.ball.x - x, 2) + Math.pow(this.ball.y - y, 2) ) <= r) {
			return true
		}
		return false
	}

	pullBallTowardCupCenter() {
		let cup = this.currentHole.cup;
		let ball = this.ball;
		let xDiff = cup.x - ball.x;
		let yDiff = cup.y - ball.y;
		let distanceFromCenter = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
		let accelRatio = (cup.radius - distanceFromCenter) / cup.radius;
		let atanDegrees = ball.degrees(Math.atan(yDiff / xDiff));
		let angle = 0, deltaXV = 0, deltaYV = 0;
		if (xDiff > 0) {
			angle = atanDegrees;
			deltaXV = Math.cos(ball.radians(angle));
			deltaYV = Math.sin(ball.radians(angle));
		} else if (xDiff < 0) {
			if (yDiff > 0) {
				angle = 180 + atanDegrees;
			} else if (yDiff < 0) {
				angle = -180 + atanDegrees;
			}
			deltaXV = Math.cos(ball.radians(angle));
			deltaYV = Math.sin(ball.radians(angle));
		} else if (xDiff == 0) {
			if (yDiff > 0) {
				angle = -90;
			} else {
				angle = 90
			}
			deltaXV = -Math.cos(ball.radians(angle));
			deltaYV = -Math.sin(ball.radians(angle));
		} else if (yDiff == 0) {
			angle = 180;
			deltaXV = -Math.cos(ball.radians(angle));
			deltaYV = -Math.sin(ball.radians(angle));
		}
		this.ball.xv += deltaXV * this.cupCenterPull;
		this.ball.yv += deltaYV * this.cupCenterPull;
	}

	// adapt all scalable game fields to the size of the window
	resize(newWidth, newHeight) {
		this.gameWidth = newWidth;
		this.gameHeight = newHeight;
	}

	update(step) {
		if (!this.spottingBall) {
			this.ball.update(step, this.rollDecel);
			this.handleCollisions();
		}
	}

	draw(ctx) {
		// clear and fill with background color
		ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

		// draw zones
		for (var i = 0; i < this.currentHole.zones.length; i++) {
			this.currentHole.zones[i].draw(ctx);
		}

		// draw slopes
		for (var i = 0; i < this.currentHole.slopes.length; i++) {
			this.currentHole.slopes[i].draw(ctx);
		}

		// draw walls
		for (var i = 0; i < this.currentHole.walls.length; i++) {
			this.currentHole.walls[i].draw(ctx);
		}

		// draw text
		ctx.font = "24px Arial";
		ctx.fillStyle = "#000000";
		ctx.fillText("Hole " + (this.currentHoleNum + 1) + " | Par " + this.currentHole.par + " | Strokes: " + this.currentHole.strokeCount, this.gameWidth / 2 - (this.gameWidth / 10), (this.gameHeight / 12) - 10);

		this.cup.draw(ctx);

		this.ball.draw(ctx);

		// draw scorecard
		if (this.showScoreCard) {
			this.scoreCard.draw(ctx);
		}
	}
}