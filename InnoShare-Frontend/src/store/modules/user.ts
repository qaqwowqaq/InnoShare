import { defineStore } from 'pinia';

interface UserState {
  isAuthenticated: boolean;
  userInfo: {
    username: string;
    email: string;
  } | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    userInfo: null
  }),
  actions: {
    login(user: { username: string; email: string }) {
      this.isAuthenticated = true;
      this.userInfo = user;
    },
    logout() {
      this.isAuthenticated = false;
      this.userInfo = null;
    },
    updateUserInfo(user: { username: string; email: string }) {
      if (this.isAuthenticated) {
        this.userInfo = user;
      }
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  }
});
