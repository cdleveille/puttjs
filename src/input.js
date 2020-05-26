export default class InputHandler{
	constructor(canvas, game) {
		canvas.addEventListener('click', (event) => {
			let clickX = event.clientX - ((window.innerWidth - canvas.width) / 2);
			let clickY = event.clientY - ((window.innerHeight - canvas.height) / 2);
			
			if (game.spottingBall) {
				game.attemptToSpotBall();
			} else {
				game.ball.hitAction(clickX, clickY);
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