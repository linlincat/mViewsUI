import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// import store from './store'

const app = createApp(App);

// 引入配置
/* 引入elementUI */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "vant/lib/index.css";
import Vant from "vant";

// import.meta.glob("./components/**/*.vue")
// Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块,匹配到的文件默认是懒加载的，通过动态导入实现
const requireComponent = import.meta.glob("./components/**/*.vue");
const getCurrentKey = (path: string): string => {
  const splitArrs = path.split("/");
  return splitArrs[splitArrs.length - 2];
};
for (const path in requireComponent) {
  const currentKey = getCurrentKey(path);
  console.log(path, "key");
  app.component(
    currentKey,
    defineAsyncComponent(() => import(path))
  );
}

import "@/permission";

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(Vant);

app.mount("#app");
