import k from "../main";

export default function loadingScene() {
	return () => {
		k.add([
			k.text("Drücke die Leertaste um\ndas Spiel zu starten."),
			k.pos(k.width() / 2, k.height() / 2),
			k.anchor("center"),
		]);

		k.onKeyPress("space", () => {
			k.go("level-01");
		});
	};
}
