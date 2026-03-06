/**
 * @typedef {import("kaplay").GameObj} GameObj
 */

export default function controller(speed) {
	return {
		id: "controller",

		/** @this {GameObj} */
		add() {
			this.speed = speed;

			this.onKeyDown("d", () => {
				this.move(this.speed, 0);
			});
			this.onKeyDown("a", () => {
				this.move(-this.speed, 0);
			});
		},

		update() {
			console.log(this.pos.y);
		},
	};
}
