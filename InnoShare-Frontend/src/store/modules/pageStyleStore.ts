import { get } from 'http';
import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', {
    state: () => ({
        // 应用的全局状态
        navigationBar: 0,
        isAtHome: 0,//在主页下滑时状态栏才变化？
        isOpen:false,//下拉列表是否打开
        isShow: false, // 是否显示登出列表
    }),
    actions: {
        changeStyle(newValue: number) {
            this.navigationBar = newValue; // 在主页则修改状态
        },
        changeOpen(newValue) {
            this.isOpen = newValue; // 在主页则修改状态
        },
        changeIsShow(newValue) {
            this.isShow = newValue; // 在主页则修改状态
        },
    },
    getters: {
        getNavigationBar: (state) => state.navigationBar,
        getIsAtHome:(state)=> state.isAtHome,
        getIsOpen:(state)=> state.isOpen,
        getIsShow:(state)=> state.isShow,
    }
})