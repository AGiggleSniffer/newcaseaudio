export const AUDIO_URL =
	"https://dw.zobj.net/download/v1/bIhGBewc6ZkspxCSDinGP9RFZDTmSQ3aydiirpCl22grL9AXh3Q7zi7Zx8tqM5bzBWyDuSBRgjAi0oZvYJ3-fGzkmY2F0ChxpxrQplO9aaVZjMY2SeT_WD9BWCfw/?a=&c=72&f=arc_probe.mp3&special=1764697421-9X3DBzgUwkBYR1umAkIktfg9dQepMu5f4Rru3fVJQwo%3D";

export const TIME_UNTIL_START = 5000;

export const TIME_UNTIL_REFRESH = 2000;

let time_until_scan = 60000;
export const getTimeUntilScan = () => time_until_scan;
export const setTimeUntilScan = (newTime: number) =>
	(time_until_scan = newTime);
