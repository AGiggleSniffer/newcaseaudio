import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
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
