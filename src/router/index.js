import Vue from "vue";
import VueRouter from "vue-router";
import NotarySession from "../views/NotarySession.vue";
import HomePage from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:appid/:channel/:token/:uid",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/notary-session",
    name: "Notary",
    component: NotarySession,
  },
  // {
  //   path: "/notary_session/:appid/:channel/:token/:uid",
  //   name: "Notary",
  //   component: NotarySession,
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
