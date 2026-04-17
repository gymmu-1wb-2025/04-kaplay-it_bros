import k from "../main";

export default function hunt() {
	return {
		id: "hunt",
		update() {
			const playerPos = k.get("player")[0].pos;
			const selfPos = this.pos;

			if (Math.abs(playerPos.x - selfPos.x) > 400) return;

			if (playerPos.x > selfPos.x) {
				this.moveBy(this.speed, 0);
			} else if (playerPos.x < selfPos.x) {
				this.moveBy(-this.speed, 0);
			}
		},
	};
}
