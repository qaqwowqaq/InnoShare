import { createStore } from 'vuex'

export default createStore({
  state: {
    // 应用的全局状态
    navigationBar:0,
  },
  mutations: {
    UPDATE_VARIABLE(state, newValue) {
      state.navigationBar = newValue; // 修改共享变量
    }
  },
  actions: {
    changeStyle({ commit }, newValue) {
      commit('UPDATE_VARIABLE', newValue); // 提交 mutation
    }
  },
  getters: {
    navigationBar:(state)=>state.navigationBar,
},
  modules: {
  }
})
