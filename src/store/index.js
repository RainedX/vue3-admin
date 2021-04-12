import { createStore } from "vuex";
import app from "./modules/app";
import permission from "./modules/permission";
import user from "./modules/user";

export default createStore({
  modules: {
    app,
    user,
    permission,
  },
  getters: {
    sidebar: (state) => state.app.sidebar,
    roles: (state) => state.user.roles,
    permissionRoutes: (state) => state.permission.routes,
  },
});
