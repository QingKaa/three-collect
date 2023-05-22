import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: '/material',
    name: 'material',
    component: () => import('../views/material/material.vue')
  },
  {
    path: '/font',
    name: 'font',
    component: () => import('../views/font/font.vue')
  },
  {
    path: '/lights',
    name: 'lights',
    component: () => import('../views/lights/lights.vue')
  },
  {
    path: '/shadows',
    name: 'shadows',
    component: () => import('../views/shadows/shadows.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
