export default function findElements() {
	let sidebar: HTMLElement | null = null,
		cases: HTMLElement | null = null,
		refresh: HTMLElement | null = null;

	const element = document.querySelector("[app-id]");
	if (!element) {
		console.warn("Could not find app element");
		return { sidebar, cases, refresh };
	}

	const eleStack: Element[] = [element];
	while (eleStack.length) {
		const ele = eleStack.pop();
		if (ele == undefined) continue;

		try {
			if (!sidebar) sidebar = ele.querySelector("sn-canvas-toolbar");
			if (!cases) cases = ele.querySelector("tbody");
			if (!refresh) {
				const check = ele.querySelector(
					"sn-record-list-declarative-actions-wrapper",
				)?.shadowRoot?.childNodes[0];

				if (!(check instanceof HTMLElement)) {
					throw new TypeError("Not HTMLElement");
				}

				refresh = check?.shadowRoot?.childNodes[0].childNodes[0]
					.childNodes[0].childNodes[0] as HTMLElement;
			}
		} catch (e) {
			if (!(e instanceof TypeError)) console.warn(e);
			else console.error(e);
		}

		if (!sidebar || !cases || !refresh) {
			ele?.shadowRoot?.childNodes.forEach((e) => {
				if (e instanceof HTMLElement) eleStack.push(e);
			});
			ele?.childNodes.forEach((e) => {
				if (e instanceof HTMLElement) eleStack.push(e);
			});
		} else break;
	}
	return { sidebar, cases, refresh };
}
