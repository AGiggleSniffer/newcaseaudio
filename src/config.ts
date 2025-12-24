const AUDIO_URL =
	"https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/arc_probe.mp3";

export const AUDIO = new Audio(AUDIO_URL);

export const TIME_UNTIL_START = 5000;

export const TIME_UNTIL_REFRESH = 2000;

let time_until_scan = 60000;
export const getTimeUntilScan = () => time_until_scan;
export const setTimeUntilScan = (newTime: number) =>
	(time_until_scan = newTime);
