import { TIME_UNTIL_REFRESH, TIME_UNTIL_SCAN } from "./config";

export default function loop(
	caseSet: Set<string>,
	tbody: HTMLElement,
	button: HTMLElement,
	refresh: HTMLElement,
	audio: HTMLAudioElement,
) {
	return () => {
		button.innerText = "60";

		const oneSecond = 1000;
		setInterval(() => {
			button.innerText = `${Number(button.innerText) - 1}`;
		}, oneSecond);

		setInterval(() => {
			button.innerText = "60";
			refresh.click();
			console.log("refresh");

			setTimeout(() => {
				const intialLength = caseSet.size;

				tbody.querySelectorAll("tr").forEach((e) => {
					const tooltip = e.childNodes[2];
					if (tooltip instanceof HTMLElement) {
						caseSet.add(tooltip.dataset.tooltip ?? "");
					}
				});

				if (intialLength < caseSet.size) {
					audio.play();
				}
				console.log(caseSet);
			}, TIME_UNTIL_REFRESH);
		}, TIME_UNTIL_SCAN);

		(button as HTMLButtonElement).disabled = true;
	};
}
