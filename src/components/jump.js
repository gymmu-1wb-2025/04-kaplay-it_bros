import k from "../main";

/**
 * @typedef {import("kaplay").GameObj} GameObj
 */

export default function jump() {
	return {
		id: "jump",
		/** @this {GameObj} */
		add() {
			this.onKeyDown("space", () => {
				if (this.isGrounded()) {
					this.jump();
				}
			});
			this.onCollide("npc", (npc, col) => {
				// Player jumps ontop of npc
				if (col.normal.y < 0) {
					npc.hp -= 1;
					this.jump();
				} else {
					this.hp -= 1;
				}
			});
		},
	};
}
