export default class ScoreCard {
	constructor(holes) {
		this.holes = holes;
		this.backgroundImage = new Image();
		this.backgroundImage.src = "/img/scorecard.png";
	}

	draw(ctx) {
		ctx.drawImage(this.backgroundImage, 300, 150);

		ctx.font = "24px Arial";
		ctx.fillStyle = "#000000";

		let xOffset = 340, yOffset = 202;

		ctx.fillText("Hole", xOffset, yOffset);
		ctx.fillText("1", xOffset + 108, yOffset);
		ctx.fillText("2", xOffset + 178, yOffset);
		ctx.fillText("3", xOffset + 248, yOffset);
		ctx.fillText("4", xOffset + 318, yOffset);
		ctx.fillText("5", xOffset + 386, yOffset);
		ctx.fillText("6", xOffset + 455, yOffset);
		ctx.fillText("7", xOffset + 524, yOffset);
		ctx.fillText("8", xOffset + 594, yOffset);
		ctx.fillText("9", xOffset + 662, yOffset);

		ctx.fillText("Par", xOffset + 4, yOffset + 75);
		if (this.holes[0] && this.holes[0].par) {
			ctx.fillText(this.holes[0].par, xOffset + 108, yOffset + 75);
		}
		if (this.holes[1] && this.holes[1].par) {
			ctx.fillText(this.holes[1].par, xOffset + 178, yOffset + 75);
		}
		if (this.holes[2] && this.holes[2].par) {
			ctx.fillText(this.holes[2].par, xOffset + 248, yOffset + 75);
		}
		if (this.holes[3] && this.holes[3].par) {
			ctx.fillText(this.holes[3].par, xOffset + 318, yOffset + 75);
		}
		if (this.holes[4] && this.holes[4].par) {
			ctx.fillText(this.holes[4].par, xOffset + 386, yOffset + 75);
		}
		if (this.holes[5] && this.holes[5].par) {
			ctx.fillText(this.holes[5].par, xOffset + 455, yOffset + 75);
		}
		if (this.holes[6] && this.holes[6].par) {
			ctx.fillText(this.holes[6].par, xOffset + 524, yOffset + 75);
		}
		if (this.holes[7] && this.holes[7].par) {
			ctx.fillText(this.holes[7].par, xOffset + 594, yOffset + 75);
		}
		if (this.holes[8] && this.holes[8].par) {
			ctx.fillText(this.holes[8].par, xOffset + 662, yOffset + 75);
		}

		ctx.fillText("Strokes", xOffset - 15, yOffset + 150);
		if (this.holes[0] && this.holes[0].strokeCount) {
			ctx.fillText(this.holes[0].strokeCount, xOffset + 108, yOffset + 150);
		}
		if (this.holes[1] && this.holes[1].strokeCount) {
			ctx.fillText(this.holes[1].strokeCount, xOffset + 178, yOffset + 150);
		}
		if (this.holes[2] && this.holes[2].strokeCount) {
			ctx.fillText(this.holes[2].strokeCount, xOffset + 248, yOffset + 150);
		}
		if (this.holes[3] && this.holes[3].strokeCount) {
			ctx.fillText(this.holes[3].strokeCount, xOffset + 318, yOffset + 150);
		}
		if (this.holes[4] && this.holes[4].strokeCount) {
			ctx.fillText(this.holes[4].strokeCount, xOffset + 386, yOffset + 150);
		}
		if (this.holes[5] && this.holes[5].strokeCount) {
			ctx.fillText(this.holes[5].strokeCount, xOffset + 455, yOffset + 150);
		}
		if (this.holes[6] && this.holes[6].strokeCount) {
			ctx.fillText(this.holes[6].strokeCount, xOffset + 524, yOffset + 150);
		}
		if (this.holes[7] && this.holes[7].strokeCount) {
			ctx.fillText(this.holes[7].strokeCount, xOffset + 594, yOffset + 150);
		}
		if (this.holes[8] && this.holes[8].strokeCount) {
			ctx.fillText(this.holes[8].strokeCount, xOffset + 662, yOffset + 150);
		}
		
	}
}