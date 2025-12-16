import { getTimeUntilScan } from "../config";

const Timer = () => {
	const timer = document.createElement("button");
	timer.innerText = `${getTimeUntilScan() / 1000}`;
	timer.style.width = "100%";
	timer.style.aspectRatio = "1 / 1";
	timer.style.cursor = "pointer";

	const startTimer = startTimerInit(timer);
	const stopTimer = stopTimerInit(timer);

	return { timer, startTimer, stopTimer };
};

const startTimerInit = (button: HTMLButtonElement) => {
	return (e: Event) => {
		e.preventDefault();
		button.innerText = `${getTimeUntilScan() / 1000}`;
		const oneSecond = 1000;
		return setInterval(
			() => (button.innerText = `${+button.innerText - 1}`),
			oneSecond,
		);
	};
};

const stopTimerInit = (button: HTMLButtonElement) => {
	return (e: Event, timerIntervalID: number) => {
		e.preventDefault();
		clearInterval(timerIntervalID);
		button.innerText = `${getTimeUntilScan() / 1000}`;
	};
};

export default Timer;
