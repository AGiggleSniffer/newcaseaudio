"use strict";
import { AUDIO_URL, TIME_UNTIL_START } from "./config";
import findElements from "./findElements";
import loop from "./loop";
import Button from "./components/Button";

console.warn(`Waiting ${TIME_UNTIL_START / 1000} seconds to start...`);
setTimeout(main, TIME_UNTIL_START);

function main() {
	const { sidebar, cases, refresh } = findElements();

	if (!sidebar || !cases || !refresh) {
		console.warn("Could not find all elements");
		console.log({ sidebar, cases, refresh });
		return;
	}

	const newBtn = Button();
	(sidebar as HTMLElement).shadowRoot
		?.querySelector("div.sn-canvas-toolbar-group")
		?.appendChild(newBtn);

	const cachedCases = new Set<string>();
	const audio = new Audio(AUDIO_URL);
	newBtn.onclick = loop(cachedCases, cases, newBtn, refresh, audio);
}
