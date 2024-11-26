import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SmartTableView from "../views/SmartTableView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/SmartTable", name: "SmartTableView", component: SmartTableView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
