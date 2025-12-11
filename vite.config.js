import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const userscriptMetadata = `\
// ==UserScript==
// @name         New Case Audio (test)
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
            name: "userscript-metadata-plugin",
            // Use the generateBundle hook
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
