import k from "../main";

export default function followMouse() {
	return {
		id: "followMouse",
		update() {
			this.moveTo(k.mousePos());
		},
	};
}
