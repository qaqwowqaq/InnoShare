
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://113.44.223.168:8888', // 确认这里的baseURL是否正确
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
        // 移除全局的 Authorization 头部
    }
});

export default axiosInstance;