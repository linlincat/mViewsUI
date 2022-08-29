import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite"; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
// import { resolve } from "path"; // 主要用于alias文件路径别名
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: ["axios"],
  },
  // 打包配置
  build: {
    target: "modules",
    outDir: "dist", //指定输出路径
    assetsDir: "assets", // 指定生成静态资源的存放路径
    minify: "terser", // 混淆器，terser构建后文件体积更小
  },
  // 本地运行配置，及反向代理配置
  server: {
    hmr: true, // 热更新
    open: true, //服务启动时自动在浏览器中打开应用
    port: 8080,
    host: true, // 0.0.0.0
    cors: true, // 默认启用并允许任何源
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      "/api": {
        target: "http://1.1.1.1:3000", //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// function pathResolve(dir) {
//   return resolve(__dirname, ".", dir);
// }
