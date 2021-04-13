import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

const Login = () => import("@/components/Login.vue");
const NotFound = () => import("@/components/NotFound.vue");
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  { path: "/login", component: Login, hidden: true },

  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "首页", icon: "el-icon-s-home", affix: true },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/btnauth",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/contentAuth/index.vue"),
        name: "BtnAuth",
        meta: { title: "按钮权限测试", icon: "el-icon-user" },
      },
    ],
  },
  {
    path: "/auth",
    component: Layout,
    meta: { roles: ['admin'] }, // 权限必须在这边限制住
    children: [
      {
        path: "index",
        component: () => import("@/views/routeAuth/index.vue"),
        name: "Auth",
        meta: { title: "页面权限测试", icon: "el-icon-user" },
      },
    ],
  },
  {
    path: "/charts",
    component: Layout,
    redirect: "noRedirect",
    name: "Charts",
    alwaysShow: true,
    meta: {
      title: "图表",
      icon: "el-icon-pie-chart",
    },
    children: [
      {
        path: "line",
        component: () => import("@/views/charts/index.vue"),
        name: "LineChart",
        meta: { title: "折线图", noCache: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
