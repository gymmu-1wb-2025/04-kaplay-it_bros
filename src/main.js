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

k.scene("init", sc00);
k.scene("lvl-01", sc01);

k.go("init");

export default k;
