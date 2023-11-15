/* eslint-disable no-undef */
import { defineConfig } from "vite";
import * as path from "path";

const LIB_NAME = "chordictionary";

export default defineConfig({
    base: "./",
    resolve: {
        alias: {
            "@scripts": path.resolve(__dirname, "./src/js"),
            "@partials": path.resolve(__dirname, "./src/scss/partials"),
            "@styles": path.resolve(__dirname, "./src/scss"),
            "@": path.resolve(__dirname, "./"),
            "~": path.resolve(__dirname, "./")
        }
    },
    build: {
        lib: {
            name: LIB_NAME,
            entry: path.resolve(__dirname, "./src/js/chordictionary.js"),
            formats: ["es", "cjs", "iife", "umd"],
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name == "style.css") {
                        return `${LIB_NAME}.css`;
                    }
                    return assetInfo.name;
                },
            }
        }
    }
});