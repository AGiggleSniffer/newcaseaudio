import { AUDIO_URL, TIME_UNTIL_REFRESH, getTimeUntilScan } from "../config";

const StartButton = (
	refresh: HTMLElement,
	tbody: HTMLElement,
	timer: HTMLElement,
) => {
	const start = document.createElement("button");
	start.innerText = "Start Timer";
	start.style.width = "100%";
	start.style.aspectRatio = "1 / 1";
	start.style.cursor = "pointer";
	start.style.marginBottom = "5px";

	const startLoop = startLoopInit(start, refresh, timer, tbody);
	const stopLoop = stopLoopInit(start);

	return { start, startLoop, stopLoop };
};

const startLoopInit = (
	button: HTMLButtonElement,
	refresh: HTMLElement,
	timer: HTMLElement,
	tbody: HTMLElement,
) => {
	const caseSet = new Set<string>();
	return (e: Event) => {
		e.preventDefault();
		button.innerText = "Stop Timer";
		return setInterval(
			loop,
			getTimeUntilScan(),
			refresh,
			tbody,
			timer,
			caseSet,
		);
	};
};

const stopLoopInit = (button: HTMLButtonElement) => {
	return (e: Event, loopIntervalID: number) => {
		e.preventDefault();
		clearInterval(loopIntervalID);
		button.innerText = "Start Timer";
	};
};

const loop = (
	refresh: HTMLElement,
	tbody: HTMLElement,
	timer: HTMLElement,
	caseSet: Set<string>,
) => {
	const audio = new Audio(AUDIO_URL);

	refresh.click();
	console.log("refresh");
	timer.innerText = `${getTimeUntilScan() / 1000}`;

	setTimeout(() => {
		const intialLength = caseSet.size;

		tbody.querySelectorAll("tr").forEach((e) => {
			const tooltip = e.childNodes[2];
			if (tooltip instanceof HTMLElement) {
				caseSet.add(tooltip.dataset.tooltip ?? "");
			}
		});

		if (intialLength < caseSet.size) audio.play();

		console.log(caseSet);
	}, TIME_UNTIL_REFRESH);
};

export default StartButton;
