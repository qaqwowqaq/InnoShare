<template>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<div class="login-container bg-gradient-to-r from-blue-200 to-blue-500">
    <!-- 左侧部分的修改 -->
  <div class="left-side w-full sm:w-1/2 h-full flex justify-center items-center relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
      <!-- 修改SVG尺寸和位置 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        class="w-96 h-96 absolute transform -translate-x-1/2 -translate-y-1/2"
      >
        <circle cx="250" cy="250" r="200" stroke="rgba(255, 255, 255, 0.4)" stroke-width="10" fill="none" />
        <circle
          cx="250"
          cy="250"
          r="200"
          stroke="rgba(255, 255, 255, 0.7)"
          stroke-width="10"
          fill="none"
          stroke-dasharray="1000"
          stroke-dashoffset="0"
          class="circle-animation"
        />
      </svg>
    </div>

    <!-- 优化文字样式 -->
    <div class="relative z-20 text-center">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate__animated animate__fadeIn animate__delay-1s mb-4">
        InnoShare
      </h1>
      <p class="text-xl font-light text-white opacity-80 animate__animated animate__fadeIn animate__delay-2s tracking-wider">
        创新分享，知识无界
      </p>
    </div>
  </div>

    <!-- 右侧登录表单部分 -->
    <div class="right-side w-full sm:w-1/2 h-full flex justify-center items-center p-6 sm:p-12">
      <form @submit.prevent="handleLogin" class="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
         <!-- 添加标题和切换按钮 -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold text-gray-800">
      {{ isAdmin ? '管理员登录' : '用户登录' }}
    </h2>
    <button 
      type="button"
      @click="toggleLoginType"
      class="text-sm text-indigo-600 hover:text-indigo-800 underline"
    >
      切换到{{ isAdmin ? '用户' : '管理员' }}登录
    </button>
  </div>
        <div>
          <label for="username" class="block text-gray-700 font-medium">用户名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="请输入用户名"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-medium">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="请输入密码"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>

        <button type="submit" class="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
          登录
        </button>

        <p class="text-sm mt-4 text-center">
          没有账号？ <router-link to="/register" class="text-indigo-500 hover:text-indigo-700">注册</router-link>
        </p>

        <!-- 错误信息展示 -->
        <p v-if="errorMessage" class="text-red-500 text-center mt-3 text-sm">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';
import axiosInstance from '@/axiosConfig';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const isAdmin = ref(false);
    
    const toggleLoginType = () => {
      isAdmin.value = !isAdmin.value;
      errorMessage.value = ''; // 切换时清除错误信息
    };

    const handleLogin = async () => {
      errorMessage.value = '';
      try {
        let response;
    
        if (isAdmin.value) {
          // 管理员登录使用 POST 请求
          response = await axiosInstance.post('/admin/login', null, {
            params: {
            username: username.value,
            password: password.value
        }
      });
        } else {
          // 普通用户登录使用 GET 请求
          response = await axiosInstance.get('/users/login', {
            params: {
              username: username.value,
              password: password.value,
            },
          });
        }

        if (response.data.success) {
          console.log('登录成功:', response.data.message);
          const userData = response.data.data;
          
          userStore.saveUserInfo({
            userId: userData.userId,
            username: userData.username,
            password: userData.password,
            isVerified: userData.isVerified,
            salt: userData.salt,
            avatarUrl: userData.avatarUrl,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            isAdmin: isAdmin.value // 添加管理员标识
          });

          userStore.login(userStore.userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo));

          // 根据用户类型跳转到不同页面
          if (isAdmin.value) {
            router.push('/admin');
          } else {
            router.push(userData.isVerified ? '/' : '/');
          }
        } else {
          errorMessage.value = '登录失败，请检查用户名和密码';
          console.error('登录失败:', response.data.message);
        }
      } catch (error) {
        console.error('登录失败:', error);
        errorMessage.value = '登录失败，请稍后重试';
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
      isAdmin,
      toggleLoginType
    };
  }
});
</script>

<style scoped>
/* 整个页面容器 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #cbdfff 0%, #3f61d3 100%);
}

/* 左侧部分样式 */
.left-side {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.9) 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 玻璃拟态效果 */
.left-side::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  z-index: 0;
}


.left-side svg {
  animation: spin 10s linear infinite;
}

/* 添加切换按钮样式 */
.toggle-button {
  transition: all 0.3s ease;
}

.toggle-button:hover {
  transform: scale(1.05);
}



/* SVG 动画效果 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 文字样式 */
.left-side h1 {
  font-size: 3.2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
  animation: fadeInUp 1s ease-out;
}

.left-side p {
  font-size: 1.2rem;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 3px;
  animation: fadeInUp 1s ease-out 0.5s;
  opacity: 0;
  animation-fill-mode: forwards;
}

/* 文字动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 左侧SVG圆环动画 */
.circle-animation {
  animation: dash 4s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 800;
  }
  50% {
    stroke-dashoffset: 200;
  }
  100% {
    stroke-dashoffset: 800;
  }
}
/* 表单样式 */
form {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s ease;
}

form input,
form button {
  transition: all 0.3s ease;
}

form input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

/* 错误信息 */
.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  text-align: center;
  animation: shake 0.5s ease-in-out;
}

/* 错误信息抖动动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}
</style>