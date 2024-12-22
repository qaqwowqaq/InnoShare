// src/axiosConfig.ts
import axios from 'axios';
import { useUserStore } from './store/modules/user';
// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: '', // 后端接口的基础 URL
  timeout: 10000, // 请求超时时间
  withCredentials: true, // 携带 cookie
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 从 cookie 中获取 token 并添加到请求头中
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token 过期，跳转到登录页面
            // 登出操作
            const userStore = useUserStore();
            userStore.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;