import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth";

const whiteList = ["/login", "auth-rediect"];

// 1.有token刷新页面的时候，store的roles为空数组，hasRoles为false
// 2.修改token刷新页面dispatch("user/getInfo")请求reject
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const { roles } = await store.dispatch("user/getInfo");
          store.dispatch("permission/generateRoutes", roles);
          next({ ...to, replace: true });
        } catch (error) {
          console.log("permission:", error);
          await store.dispatch("user/resetToken");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
