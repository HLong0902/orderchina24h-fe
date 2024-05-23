import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return defineConfig({
		define: {
			"process.env": env,
		},
		resolve: {
			alias: {
				vue: "@vue/compat",
			},
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		plugins: [
			vue(),
			ckeditor5({
				theme: require.resolve("@ckeditor/ckeditor5-theme-lark"),
			}),
		],
		root: "./",
		build: {
			rollupOptions: {
				input: path.join(__dirname, "./index.html"),
				assetFileNames: "[name].[ext]",
			},
		},
	});
};
