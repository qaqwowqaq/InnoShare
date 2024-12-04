<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </form>
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      // For simplicity, assume any username/password is correct
      userStore.login({
        username: username.value,
        email: `${username.value}@example.com`
      });
      router.push('/');
    };

    return {
      username,
      password,
      handleLogin
    };
  }
});
</script>

<style scoped>
.login {
  text-align: center;
}
</style>
