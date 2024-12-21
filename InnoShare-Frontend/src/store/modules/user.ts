import { defineStore } from 'pinia';

interface UserInfo {
  userId: number;
  username: string;
  password: string;
  isVerified: boolean;
  salt: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  isAdmin:boolean;
}

interface UserState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return {
      isAuthenticated: storedUserInfo ? true : false,
      userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    };
  },
  actions: {
    /**
     * 保存用户信息到 store 和 localStorage
     * @param userInfo 完整的用户信息对象
     */
    saveUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
      this.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    /**
     * 登录操作，设置认证状态并保存用户信息
     * @param userInfo 完整的用户信息对象
     */
    login(userInfo: UserInfo) {
      this.isAuthenticated = true;
      this.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('login', this.userInfo?.userId);
    },
    /**
     * 登出操作，清除认证状态和用户信息
     */
    logout() {
      this.isAuthenticated = false;
      this.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    /**
     * 更新用户信息的部分字段
     * @param updatedInfo 用户信息的部分更新字段
     */
    updateUserInfo(updatedInfo: Partial<UserInfo>) {
      if (this.isAuthenticated && this.userInfo) {
        this.userInfo = { ...this.userInfo, ...updatedInfo };
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      }
    },
  },
  getters: {
    /**
     * 获取用户ID
     * @param state 当前状态
     * @returns 用户ID或 undefined
     */
    getUserId(state): number | undefined {
      return state.userInfo?.userId;
    },
    /**
     * 获取认证状态
     * @param state 当前状态
     * @returns 是否认证
     */
    getIsAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
    /**
     * 获取完整的用户信息
     * @param state 当前状态
     * @returns 用户信息或 null
     */
    getUserInfo(state): UserInfo | null {
      return state.userInfo;
    },
    /**
     * 获取用户名
     * @param state 当前状态
     * @returns 用户名或 undefined
     */
    getUsername(state): string | undefined {
      return state.userInfo?.username;
    },
    /**
     * 获取用户头像URL
     * @param state 当前状态
     * @returns 用户头像URL或 undefined
     */
    getAvatarUrl(state): string | undefined {
      return state.userInfo?.avatarUrl;
    },
    /**
     * 获取用户认证状态
     * @param state 当前状态
     * @returns 是否认证
     */
    getIsVerified(state): boolean | undefined {
      return state.userInfo?.isVerified;
    },

    /**
     * 获取用户是否为管理员
     * @param state 当前状态
     * @returns 是否为管理员
     */
    getIsAdmin(state): boolean | undefined {
      return state.userInfo?.isAdmin;
    }
  },
});