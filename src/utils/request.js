import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/store";

// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers["X-Token"] = "this is token";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      ElMessage.error({
        message: res.message || "Error",
        duration: 2 * 1000,
      });

      // 50008: 非法令牌
      if (res.code === 50008) {
        // 重新登录
        ElMessageBox.confirm("您已登出, 请重新登录", "确认", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          })
          .catch(() => {})
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error);
    ElMessage({
      message: error.message,
      type: "error",
      duration: 2 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
