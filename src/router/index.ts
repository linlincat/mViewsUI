import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/home",
      component: () => import("@/views/index.vue"),
      children: [
        {
          //  首页
          path: "/home",
          name: "Home",
          component: () => import("@/views/home/index.vue"),
        },
      ],
    },
  ],
});

export default router;
