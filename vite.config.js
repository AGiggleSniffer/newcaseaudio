import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const userscriptMetadata = `\
// ==UserScript==
// @name         New Case Audio
// @tag          audio
// @namespace    http://tampermonkey.net/
// @version      2025-11-26
// @description  Audio output when a new case is detected
// @author       Chris
// @match        https://necam.servicenowservices.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=servicenowservices.com
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/index.user.js
// @updateURL    https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/index.user.js
// ==/UserScript==
`;

export default defineConfig({
    plugins: [
        tailwindcss(),
        {
            // A custom plugin named 'userscript-metadata-plugin'
            name: "userscript-metadata-plugin",

            // Use the 'renderChunk' hook provided by Rollup/Vite
            renderChunk(code, chunk, options) {
                console.log(`[Vite Plugin] Applying metadata to chunk: ${chunk.name}`);
                // Prepend the metadata block to the generated JavaScript code
                return userscriptMetadata + "\n" + code;
            },
        },
    ],
    build: {
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
