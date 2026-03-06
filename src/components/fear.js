import k from "../main";

export default function fear() {
	return {
		id: "fear",
		add() {
			this.tag("fearfull");
			this.on("scare", () => {
				console.log("Running in fear");
				this.speed = -Math.abs(this.speed);
				k.wait(1, () => {
					this.speed = Math.abs(this.speed);
				});
			});
		},
	};
}
