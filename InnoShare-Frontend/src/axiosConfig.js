
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://113.44.223.168:8888', // 确认这里的baseURL是否正确
    timeout: 100000,
    withCredentials: true,
});

export default axiosInstance;