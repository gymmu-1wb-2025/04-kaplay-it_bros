import k from "../main";
export default function scare() {
	return {
		id: "scare",
		add() {
			this.onKeyPress("enter", () => {
				k.trigger("scare", "fearfull");
				console.log("Scare enemies");
			});
		},
	};
}
