import kaplay from "kaplay";
import sc00 from "./scenes/sc-00";
import sc01 from "./scenes/sc-01";

const k = kaplay({
	height: 480,
	width: 640,
	canvas: document.getElementById("game-canvas"),
	background: "#82b4b4",
	global: false,
	debug: true,
	debugKey: "r",
});

k.setGravity(1200);

k.add([k.circle(20), k.pos(320, 240), k.body(), k.area()]);
k.add([
	k.rect(640, 20),
	k.pos(0, 460),
	k.color(k.GREEN),
	k.body({ isStatic: true }),
	k.area(),
]);

export default k;
