import camCenter from "../components/camCenter";
import controller from "../components/controller";
import k from "../main";

export default function sc01() {
	k.setGravity(1200);

	const player = k.add([
		k.circle(20),
		k.pos(320, 240),
		k.body(),
		k.area(),
		controller(320),
		camCenter(),
		"player",
	]);

	k.add([
		k.rect(640, 20),
		k.pos(0, 460),
		k.color(k.GREEN),
		k.body({ isStatic: true }),
		k.area(),
		"world",
	]);

	player.onKeyPress("space", () => {
		player.jump();
	});

	player.onCollide("world", () => {
		player.color = k.RED;
	});

	player.onCollideEnd("world", (obj) => {
		player.color = k.WHITE;
	});
}
