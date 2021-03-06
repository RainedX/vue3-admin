import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import { components } from "@/config/element";
import "element-plus/lib/theme-chalk/index.css";
// 全局样式引入
import "@/styles/index.scss";
import "./permission.js";
// 指令
import permission from "@/directive/permission";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});
app.directive("permission", permission);
app
  .use(store)
  .use(router)
  .mount("#app");

// 按钮权限
// 面包蟹