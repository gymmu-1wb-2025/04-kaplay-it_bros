import k from "../main";

/**
 * @typedef {import("kaplay").GameObj} GameObj
 */

export default function shoot() {
	const radius = 8;
	const speed = 600; // pixels pro sekunde; oder :60 falls pixel pro frame

	return {
		id: "shoot",

		/** @this {GameObj}  */
		add() {
			this.onKeyPress("e", () => {
				this.shoot();
			});

			k.on("shoot", "npc", (npc) => {
				npc.jump();
			});
		},
		/** @this {GameObj}  */
		shoot() {
			const projectile = k.add([
				k.anchor("center"),
				k.circle(radius),
				k.color(k.RED),
				k.pos(this.pos.add(this.width / 2 + radius + 1, 0)),
				k.body({ gravityScale: 0 }),
				k.area({ restitution: 1 }),
				"projectile",
			]);
			projectile.applyImpulse(k.vec2(speed, 0));
			k.trigger("shoot", "npc");

			projectile.on("collide", (gameObject) => {
				projectile.destroy();
				if (gameObject.is("npc")) {
					gameObject.destroy();
				}
			});
		},
	};
}
