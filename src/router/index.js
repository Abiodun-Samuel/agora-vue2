import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const HomePage = () =>
  import(/* webpackChunkName: "signature" */ "@/views/HomePage.vue");
const NotarySessionPage = () =>
  import(/* webpackChunkName: "signature" */ "@/views/NotarySessionPage.vue");
const WaitingPage = () =>
  import(/* webpackChunkName: "signature" */ "@/views/WaitingPage.vue");
const NotFound = () =>
  import(/* webpackChunkName: "signature" */ "@/views/NotFound/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      title: "ToNote Notary",
      transitionName: "fade",
      metaTags: [
        {
          name: "description",
          content: "ToNote Notary Session",
        },
        {
          property: "og:description",
          content: "ToNote Notary Session",
        },
      ],
    },
  },
  {
    path: "/waiting-page",
    name: "WaitingPage",
    component: WaitingPage,
    meta: {
      title: "ToNote Notary | Waiting Page",
      transitionName: "fade",
      metaTags: [
        {
          name: "description",
          content: "ToNote Notary Session waiting page",
        },
        {
          property: "og:description",
          content: "ToNote Notary Session waiting page",
        },
      ],
    },
  },
  {
    path: "/notary-session",
    name: "NotarySession",
    component: NotarySessionPage,
    meta: {
      title: "ToNote Notary",
      transitionName: "fade",
      metaTags: [
        {
          name: "description",
          content: "ToNote Notary Session page",
        },
        {
          property: "og:description",
          content: "ToNote Notary Session page",
        },
      ],
    },
    children: [
      // {
      //   path: "",
      //   name: "document.dashboard",
      //   component: DocumentDashboard,
      //   meta: {
      //     title: "User | Document - ToNote",
      //     transitionName: "fade",
      //   },
      // },
    ],
  },

  // 404 Notfound page
  {
    path: "*",
    component: NotFound,
    meta: {
      title: "Error 404 | ToNote",
      transitionName: "slide",
      metaTags: [
        {
          name: "description",
          content: "The error 404 page of ToNote Notary Page.",
        },
        {
          property: "og:description",
          content: "The error 404 page of ToNote Notary Page.",
        },
      ],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
