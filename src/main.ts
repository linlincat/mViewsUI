import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// import store from './store'

const app = createApp(App);

import Home from "./components/sliderassembly/index.vue";

// 引入配置
/* 引入elementUI */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "vant/lib/index.css";
import Vant from "vant";
// const requireComponent = import.meta.glob("./components/**/*.vue");

const requireComponent = import.meta.glob("./components/**/*.vue");
console.log("requireComponent:---", requireComponent);
// let modules = {};
const getCurrentKey = (path: string): string => {
  return path;
};
for (const path in requireComponent) {
  const currentKey = getCurrentKey(path);
  console.log(path, "key");
  // app.component("sliderassembly", requireComponent[path]);
  // app.component("sliderassembly", () => import(path));
  app.component(
    "sliderassembly",
    defineAsyncComponent(() => import(path))
  );
  // app.component("sliderassembly", requireComponent[path]);
  // const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, "$2");
  // modules = { ...modules, ...requireComponent[path] };
}

// console.log(modules, "==== modules");
import "@/permission";

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(Vant);

app.mount("#app");
