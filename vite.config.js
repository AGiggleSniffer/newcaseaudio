import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import packageJson from "./package.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const userscriptMetadata = `\
// ==UserScript==
// @name         New Case Audio
// @tag          audio
// @namespace    http://tampermonkey.net/
// @version      ${packageJson.version}
// @description  Audio output when a new case is detected
// @author       Chris
// @match        https://necam.servicenowservices.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=servicenowservices.com
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/main.user.js
// @updateURL    https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/main.user.js
// ==/UserScript==
`;

export default defineConfig({
	plugins: [
		{
			name: "userscript-metadata-plugin",
			generateBundle(options, bundle) {
				for (const fileName in bundle) {
					const file = bundle[fileName];
					// Ensure we are only modifying the code file, not an asset like a source map
					if (file.type === "chunk") {
						// Prepend the metadata to the code content
						file.code = userscriptMetadata + "\n" + file.code;
					}
				}
			},
		},
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			name: "NewCaseAudio",
			// the proper extensions will be added
			fileName: "new-case-audio",
		},
		rollupOptions: {
			output: {
				// Ensure the JS filename always stays the same, ignoring hashing
				entryFileNames: `[name].user.js`,
				chunkFileNames: `[name].user.js`,
				assetFileNames: `[name].[ext]`,
			},
		},
		emptyOutDir: true,
	},
});
