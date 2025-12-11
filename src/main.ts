import "./style.css";

(function () {
  "use strict";

  const time2start = 5000;
  console.log(`Waiting ${time2start / 1000} seconds to start...`);
  setTimeout(main, time2start);
})();

const AUDIO_URL =
  "https://dw.zobj.net/download/v1/bIhGBewc6ZkspxCSDinGP9RFZDTmSQ3aydiirpCl22grL9AXh3Q7zi7Zx8tqM5bzBWyDuSBRgjAi0oZvYJ3-fGzkmY2F0ChxpxrQplO9aaVZjMY2SeT_WD9BWCfw/?a=&c=72&f=arc_probe.mp3&special=1764697421-9X3DBzgUwkBYR1umAkIktfg9dQepMu5f4Rru3fVJQwo%3D";
const TIME_UNTIL_SCAN = 60000;
const TIME_UNTIL_REFRESH = 2000;

function main() {
  const { sidebar, cases, refresh } = findElements();

  if (!sidebar || !cases || !refresh) {
    console.warn("Could not find all elements");
    return;
  }

  const newBtn = document.createElement("button");
  newBtn.innerText = "Start Timer";
  (sidebar as HTMLElement).shadowRoot
    ?.querySelector("div.sn-canvas-toolbar-group")
    ?.appendChild(newBtn);

  const cachedCases = new Set<string>();
  const audio = new Audio(AUDIO_URL);
  newBtn.onclick = loop(cachedCases, cases, newBtn, refresh, audio);
}

function findElements() {
  let sidebar: HTMLElement | null = null,
    cases: HTMLElement | null = null,
    refresh: HTMLElement | null = null;

  const results = {
    sidebar,
    cases,
    refresh,
  };

  const element = document.querySelector("[app-id]");
  if (!element) {
    console.warn("Could not find app element");
    return results;
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

        if (!(check instanceof HTMLElement)) continue;

        refresh = check?.shadowRoot?.childNodes[0].childNodes[0]
          .childNodes[0].childNodes[0] as HTMLElement;
      }
    } catch (e) {
      if (!(e instanceof TypeError)) console.warn(e);
    }

    if (!sidebar || !cases) {
      ele?.shadowRoot?.childNodes.forEach((e) => {
        if (e instanceof HTMLElement) eleStack.push(e);
      });
      ele?.childNodes.forEach((e) => {
        if (e instanceof HTMLElement) eleStack.push(e);
      });
    } else break;
  }
  return results;
}

function loop(
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

        tbody.querySelectorAll("tr")
          .forEach((e) => {
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
