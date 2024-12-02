import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SmartTableView from "../views/SmartTableView.vue";
import SendObjectView from "../views/SendObject.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/SmartTable", name: "SmartTableView", component: SmartTableView },
  { path: "/SendObject", name: "SendObjectView", component: SendObjectView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
