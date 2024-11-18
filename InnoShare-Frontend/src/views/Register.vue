<!--suppress ALL -->
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
      <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const handleRegister = () => {
      // For simplicity, assume registration is always successful
      userStore.login({
        username: username.value,
        email: email.value
      });
      router.push('/');
    };

    return {
      username,
      email,
      password,
      handleRegister
    };
  }
});
</script>

<style scoped>
.register {
  text-align: center;
}
</style>
