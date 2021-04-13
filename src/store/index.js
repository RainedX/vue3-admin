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
    username: (state) => state.user.username,
    sidebar: (state) => state.app.sidebar,
    roles: (state) => state.user.roles,
    settings: state => state.app.settings,
    permissionRoutes: (state) => state.permission.routes,
  },
});
