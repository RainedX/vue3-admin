import { constantRoutes, asyncRoutes } from "@/router";
import router from "@/router";

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

export const filterAsyncRoutes = (asyncRoutes, roles) => {
  const res = [];
  
  asyncRoutes.forEach(route => {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles);
      }
      res.push(route);
    }
  })
  return res;
};

const state = {
  routes: [],
  addRoutes: [],
  removeRoutes: [], // 用于删除动态路由
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  SET_REMOVE_ROUTES: (state, routes) => {
    state.removeRoutes = routes;
  },
};
const actions = {
  generateRoutes({ commit, dispatch }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }

      commit("SET_ROUTES", accessedRoutes);
      dispatch("addRoutes", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
  addRoutes({ commit }, accessedRoutes) {
    const removeRoutes = [];
    accessedRoutes.forEach(route => {
      const removeRoute = router.addRoute(route);
      removeRoutes.push(removeRoute);
    });
    commit("SET_REMOVE_ROUTES", removeRoutes);
  },
  resetRoutes({ commit, state }) {
    // 重置路由为初始状态，用户切换角色时需要用到
    state.removeRoutes.forEach(fn => fn());
    // 路由数据重置
    commit("SET_ROUTES", []);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
