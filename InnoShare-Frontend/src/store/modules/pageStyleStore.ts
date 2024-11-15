import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', {
    state: () => ({
        // 应用的全局状态
        navigationBar: 0,
    }),
    actions: {
        changeStyle(newValue) {
            this.navigationBar = newValue; // 直接修改状态
        }
    },
    getters: {
        getNavigationBar: (state) => state.navigationBar,
    }
})