<template>
  <div class="login-container">
    <!-- 左侧部分 -->
    <div class="left-side">
      <div class="welcome-text">
        <h1>欢迎登录</h1>
        <p class="sub-text">欢迎使用 InnoShare</p>
      </div>
    </div>

    <!-- 右侧登录表单部分 -->
    <div class="right-side">
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required placeholder="请输入用户名" />
        </div>
        <div>
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required placeholder="请输入密码" />
        </div>
        <button type="submit">登录</button>
        <p>没有账号？ <router-link to="/register">注册</router-link></p>

        <!-- 错误信息展示 -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';
import axios from 'axios';
import axiosInstance from '@/axiosConfig';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    // 模拟登录的用户信息
    const mockUser = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'John-Doe',
      token: 'mock-jwt-token-string',
    };

    const handleLogin = async () => {
      errorMessage.value = '';  // 清空之前的错误信息
      try {
    const response = await axiosInstance.get('/users/login', {
      params: {
        username: username.value,
        password: password.value,
      },
    });
    const { token, user } = response.data.data;

    // 将 Token 存储到 Cookie 中
    document.cookie = `token=${token}; path=/`;

    // 更新用户状态
    userStore.login({ token, user });

    // 跳转到认证页面
    router.push('/');
  } catch (error) {
    // 登录失败
    errorMessage.value = '用户名或密码错误';
  }

      // try {
      //   const response = await axios.post('/api/auth/login', {
      //     username: username.value,
      //     password: password.value
      //   });

      //   if (response.status === 200) {
      //     const { token, user } = response.data;
      //     userStore.login({ token, user });  // 假设你在 store 中有处理登录状态的逻辑
      //     router.push('/');  // 登录成功后跳转到首页
      //   }
      // } catch (error) {
      //   if (error.response && error.response.status === 401) {
      //     errorMessage.value = '用户名或密码错误';
      //   } else {
      //     errorMessage.value = '登录请求失败，请稍后再试';
      //   }
      // }
       // 在这里模拟登录逻辑
       if (username.value === mockUser.username && password.value === mockUser.password) {
        // 登录成功
        userStore.login({ token: mockUser.token, user: { username: mockUser.username, email: mockUser.email } });
        router.push('/verify');  // 登录成功后跳转到认证页面
      } else {
        // 登录失败
        errorMessage.value = '用户名或密码错误';
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin
    };
  }
});
</script>

<style scoped>
/* 整个页面容器 */
.login-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 高度占满整个视口 */
}

/* 左侧部分 */
.left-side {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;     /* 左侧内容居中 */
  text-align: center;
}

.welcome-text h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.sub-text {
  font-size: 20px;
  color: #888;
}

/* 右侧部分 */
.right-side {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;     /* 使表单垂直居中 */
  padding: 20px;
}

/* 表单样式 */
form {
  width: 100%;
  max-width: 400px;         /* 限制表单最大宽度 */
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 20px;
}

form label {
  font-size: 20px;
  color: #333;
}

form input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
