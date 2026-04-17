import k from "../main";

export default function camCenter() {
	return {
		id: "camCenter",
		update() {
			let { x, y } = this.pos;
			x = Math.max(k.width() / 2 - 100, x);
			y = Math.min(y, k.height() / 2 + 100);
			k.setCamPos(x, y);
		},
	};
}
