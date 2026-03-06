import camCenter from "../components/camCenter";
import controller from "../components/controller";
import fear from "../components/fear";
import hunt from "../components/hunt";
import jump from "../components/jump";
import scare from "../components/scare";
import shoot from "../components/shoot";
import k from "../main";

/**
 * @typedef {import("kaplay").GameObj} GameObj
 */

export default function level01() {
	let /** @type {GameObj} */ player = null;

	return () => {
		k.setGravity(1600);

		player = k.add([
			k.rect(50, 50),
			k.pos(100, 100),
			k.area({ restitution: 0.2 }),
			k.body(),
			k.color(k.BLUE),
			k.offscreen({ destroy: true }),
			k.anchor("center"),
			k.health(1, 5),
			shoot(),
			camCenter(),
			controller(),
			scare(),
			jump(),
			"player",
		]);
		player.on("hurt", () => {
			console.log(player.hp);
		});

		player.on("death", () => {
			player.destroy();
		});

		k.add([
			k.rect(50, 50),
			k.pos(1000, 100),
			k.area(),
			k.body(),
			k.color(k.RED),
			k.offscreen({ destroy: false }),
			k.anchor("center"),
			k.health(1, 1),
			hunt(),
			fear(),
			"npc",
			{
				speed: 2,
			},
		]);

		k.add([
			k.rect(640, 20),
			k.pos(0, 460),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		k.add([
			k.rect(640, 20),
			k.pos(680, 460),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		k.add([
			k.rect(60, 180),
			k.pos(580, 280),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		k.add([
			k.rect(120, 60),
			k.pos(k.width() - 60, k.height() - 20),
			k.anchor("botright"),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		player.onDestroy(() => {
			alert("Game Over");
		});
	};
}
