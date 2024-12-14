<template>
  <div class="register">
    <h1 class="title">注册</h1>  <!-- 将标题放在注册表单上方 -->
    <form @submit.prevent="handleRegister">
      <div>
        <label for="fullname">用户名</label>
        <input 
          type="text" 
          id="fullname" 
          v-model="fullname" 
          required
          placeholder="请输入您的用户名"  
        />
      </div>

      <!-- 合并Email和Phone输入框 -->
      <!-- <div>
        <label for="contact">电子邮箱/手机号</label>
        <input 
          type="text" 
          id="contact" 
          v-model="contact" 
          required 
          placeholder="请输入您的电子邮箱或手机号"
        />
      </div> -->

      <div>
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="请输入八位数密码"
        />
      </div>

      <div>
        <label for="confirmPassword">确认密码</label>
        <input 
          type="password" 
          d="confirmPassword" 
          v-model="confirmPassword" 
          required
          placeholder="请确认密码"
        />
      </div>

      <button type="submit">注册</button>
      <p>已有账号？ <router-link to="/login">登录</router-link></p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';
import axios from 'axios';  // 导入axios
import axiosInstance from '@/axiosConfig';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const fullname = ref('');
    // const contact = ref(''); // 用来存储 Email 或 Phone 的输入
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');  // 存储错误信息

    const handleRegister = async () => {
      // 校验密码是否匹配
      if (password.value !== confirmPassword.value) {
        alert('密码不匹配!');
        return;
      }

      // 校验输入的联系信息是邮箱还是手机号
      // let isEmail = false;
      // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      // const phonePattern = /^[0-9]{10,11}$/;  // 根据你的需求调整手机号格式

      // if (emailPattern.test(contact.value)) {
      //   isEmail = true;
      // } else if (phonePattern.test(contact.value)) {
      //   isEmail = false;
      // } else {
      //   alert('请输入有效的电子邮箱或手机号');
      //   return;
      // }

      // 注册请求
      try {
        const response = await axiosInstance.get('/users/add', {
          username: fullname.value,
          // contact: contact.value,
          password: password.value
        });

        // 如果注册成功，跳转到登录页面
        if (response.status === 201) {
          alert('注册成功！');
          router.push('/login');  // 跳转到登录页面
        }
      } catch (error) {
        // 错误处理
        if (error.response && error.response.status === 400) {
          errorMessage.value = error.response.data.message;  // 捕获返回的错误信息
        } else {
          errorMessage.value = '注册请求失败，请稍后再试';
        }
        alert(errorMessage.value);  // 显示错误信息
      }
    };
    return {
      fullname,
      // contact,
      password,
      confirmPassword,
      handleRegister
    };
  }
});
</script>

<style scoped>
.register {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;  /* 改为纵向排列 */
  padding: 20px;
  box-sizing: border-box;
}

.title {
  margin-bottom: 20px;  /* 给标题添加间距 */
  font-size: 2rem;  /* 增大标题字体 */
}

form {
  width: 100%;
  max-width: 400px; /* 限制表单的最大宽度 */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

div {
  margin-bottom: 15px;
}

input {
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 95%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
}
</style>
