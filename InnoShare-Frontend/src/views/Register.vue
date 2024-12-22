<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <div class="register min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-blue-500">
    <h1 class="title text-4xl font-bold text-white mb-8">注册</h1>
    <form @submit.prevent="handleRegister" class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div class="mb-6">
        <label for="fullname" class="block text-gray-700 font-medium mb-2">用户名</label>
        <input 
          type="text" 
          id="fullname" 
          v-model="fullname" 
          required
          placeholder="请输入您的用户名"  
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-gray-700 font-medium mb-2">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="请输入八位数密码"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      <div class="mb-6">
        <label for="confirmPassword" class="block text-gray-700 font-medium mb-2">确认密码</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="confirmPassword" 
          required
          placeholder="请确认密码"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">注册</button>
      <p class="mt-4 text-center text-black">
        已有账号？ <router-link to="/login" class="text-indigo-400 hover:text-indigo-200">登录</router-link>
      </p>
    </form>
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
    
    const fullname = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');

    const handleRegister = async () => {
      if (password.value !== confirmPassword.value) {
        alert('密码不匹配!');
        return;
      }

      try {
        const response = await axiosInstance.post('/users/add', {
          
          username: fullname.value,
          password: password.value
        
      });

        if (response.status === 200) {
          alert('注册成功！');
          router.push('/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errorMessage.value = error.response.data.message;
        } else {
          errorMessage.value = '注册请求失败，请稍后再试';
        }
        alert(errorMessage.value);
      }
    };

    return {
      fullname,
      password,
      confirmPassword,
      handleRegister
    };
  }
});
</script>

<style scoped>
/* 这里不需要额外的样式，因为我们已经使用了 Tailwind CSS */
</style>