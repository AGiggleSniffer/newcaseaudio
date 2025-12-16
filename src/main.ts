"use strict";
import { setTimeUntilScan, TIME_UNTIL_START } from "./config";
import findElements from "./findElements";
import { OptionsButton, StartButton, Timer, UIWrapper } from "./components";

console.warn(`Waiting ${TIME_UNTIL_START / 1000} seconds to start...`);
setTimeout(main, TIME_UNTIL_START);

function main() {
	const { sidebar, cases, refresh } = findElements();

	if (!sidebar || !cases || !refresh) {
		console.warn("Could not find all elements");
		console.log({ sidebar, cases, refresh });
		return;
	}

	const { timer, startTimer, stopTimer } = Timer();
	const { start, startLoop, stopLoop } = StartButton(refresh, cases, timer);
	const { wrapper: options, saveButton, input } = OptionsButton();

	let loopIntervalID: number;
	let timerIntervalID: number;

	start.onclick = (e) => {
		if (start.innerText === "Start Timer") {
			timerIntervalID = startTimer(e);
			loopIntervalID = startLoop(e);
		} else {
			stopTimer(e, timerIntervalID);
			stopLoop(e, loopIntervalID);
		}
	};

	timer.onclick = (e) => {
		e.preventDefault();
		const isVisible = options.checkVisibility();

		if (isVisible) {
			options.style.display = "none";
		} else {
			options.style.display = "";
		}
	};

	saveButton.onclick = (e) => {
		e.preventDefault();
		stopTimer(e, timerIntervalID);
		stopLoop(e, loopIntervalID);

		console.log(input?.value);
		setTimeUntilScan(Number(input?.value) * 1000);

		timerIntervalID = startTimer(e);
		loopIntervalID = startLoop(e);

		options.style.display = "none";
	};

	const wrapper = UIWrapper();
	wrapper.appendChild(start);
	wrapper.appendChild(timer);
	wrapper.appendChild(options);

	sidebar.shadowRoot
		?.querySelector("div.sn-canvas-toolbar-group")
		?.appendChild(wrapper);
}
