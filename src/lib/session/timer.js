export class Timer {
	constructor(seconds) {
		this.duration = seconds;

		this.remaining = seconds;
	}

	tick() {
		if (this.remaining > 0) {
			this.remaining--;
		}
	}

	isFinished() {
		return this.remaining <= 0;
	}
}
