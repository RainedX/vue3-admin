import request from "@/utils/request";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(),
  username: "",
  avatar: "",
  introduction: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, username) => {
    state.username = username;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;

    return new Promise((resolve, reject) => {
      request({
        url: "/user/login",
        method: "post",
        data: { username: username.trim(), password: password },
      })
        .then((response) => {
          const { data } = response;
          // 存放令牌状态
          commit("SET_TOKEN", data.token);
          // 存入cookie
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      request({
        url: "/user/info",
        method: "post",
        data: { token: state.token },
      })
        .then((response) => {
          const { data } = response;
          const { roles, name, avatar, introduction } = data;

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ dispatch }) {
    dispatch("resetToken");
    dispatch("permission/resetRoutes", null, { root: true });
  },
  // 清除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      // 清除cookie
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
