import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default ({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    return defineConfig({
        define: {
            "process.env": env,
        },
        resolve: {
            alias: {
                vue: "@vue/compat",
            },
        },
        plugins: [vue()],
        root: "./",
        build: {
            rollupOptions: {
                input: path.join(__dirname, "./index.html"),
                assetFileNames: '[name].[ext]'
            },
        },
    });
};
