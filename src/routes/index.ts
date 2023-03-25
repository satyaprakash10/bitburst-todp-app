import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

//  Layouts
import defaultLayout from "@/layouts/default.vue";

//  Pages
import TodoList from "@/pages/TodoList.vue";
import BacklogList from "@/pages/BacklogList.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: defaultLayout,
    children: [
      {
        path: "/",
        component: TodoList,
        meta: { title: "Todo Page" },
      },
      {
        path: "/backlog",
        component: BacklogList,
        meta: { title: "Backlog Page" },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});
