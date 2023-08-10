import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import History from "../views/History.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/history",
    name: "history",
    component: History
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
