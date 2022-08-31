import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

Vue.use(VueRouter);

const HomePage = () =>
  import(/* webpackChunkName: "Homepage" */ "@/views/HomePage.vue");
const NotarySessionPage = () =>
  import(
    /* webpackChunkName: "Notarysessionpage" */ "@/views/NotarySessionPage.vue"
  );
const WaitingPage = () =>
  import(/* webpackChunkName: "waitingpage" */ "@/views/WaitingPage.vue");
const NotaryDashboardPage = () =>
  import(
    /* webpackChunkName: "Notarydashboardpage" */ "@/views/NotaryDashboardPage.vue"
  );
const NotFound = () =>
  import(/* webpackChunkName: "Notfound" */ "@/views/NotFound/NotFound.vue");
const NotaryRequest = () =>
  import(
    /* webpackChunkName: "RequestNotary" */ "@/views/NotaryRequestPage.vue"
  );

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      title: "Home | ToNote",
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
    path: "/notary-session/:sessionId",
    name: "NotarySession",
    component: NotarySessionPage,
    meta: {
      title: "Notary Session | ToNote ",
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
  {
    path: "/notary-request",
    name: "NotaryRequest",
    component: NotaryRequest,
    meta: {
      title: "Notary Request | ToNote",
      transitionName: "fade",
      metaTags: [
        {
          name: "description",
          content: "ToNote Notary Request",
        },
        {
          property: "og:description",
          content: "ToNote Notary Request",
        },
      ],
    },
  },
  {
    path: "/notary-dashboard",
    name: "NotaryDashboard",
    component: NotaryDashboardPage,
    meta: {
      title: "Notary Dashboard | ToNote",
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
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: "smooth",
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  /* ---------------------------------------------//? SEO Friendly META -------------------------------------------- */
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  // if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
