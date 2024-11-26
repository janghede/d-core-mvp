import { createApp } from "vue";
import App from "./App.vue";
import "@frontend/css/bootstrap.css";
import router from "./router/index";

const AppInstance = createApp(App);

AppInstance.use(router);

AppInstance.mount("#app");
