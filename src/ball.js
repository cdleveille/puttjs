export default class Ball {
    constructor(radius, color, puttSound) {
        this.radius = radius;
        this.color = color;
        this.leftHeld = false;
        this.rightHeld = false;
        this.upHeld = false;
        this.downHeld = false;
        this.accel = 2;
        this.puttSound = puttSound;
    }

    keyAction(keyDown, keyUp) {
        switch(keyDown) {
            case "left":
                this.leftHeld = true;
                break;
            case "right":
                this.rightHeld = true;
                break;
            case "up":
                this.upHeld = true;
                break;
            case "down":
                this.downHeld = true;
                break;
        }
        switch(keyUp) {
            case "left":
                this.leftHeld = false;
                break;
            case "right":
                this.rightHeld = false;
                break;
            case "up":
                this.upHeld = false;
                break;
            case "down":
                this.downHeld = false;
                break;
        }
    }

    hitAction(clickX, clickY) {
        this.puttSound.play();

        let xDiff = clickX - this.x;
        let yDiff = clickY - this.y;

        this.xv += -xDiff * 5;
        this.yv += -yDiff * 5;
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
        if (this.leftHeld) {
            this.xv += -this.accel;
        }
        if (this.rightHeld) {
            this.xv += this.accel;
        }
        if (this.upHeld) {
            this.yv += -this.accel;
        }
        if (this.downHeld) {
            this.yv += this.accel;
        }

        this.decel(rollDecel);
        this.x += this.xv * step;
        this.y += this.yv * step;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#003300";
        ctx.stroke();
    }
}