import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        vue: '@vue/compat',
      },
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[name].[ext]'
        }
      }
    }
  });  
}