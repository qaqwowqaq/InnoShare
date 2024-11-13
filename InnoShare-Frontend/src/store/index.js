import { createStore } from 'vuex'

export default createStore({
  state: {
    // 应用的全局状态
    count: 0
  },
  mutations: {
    // 修改状态的方法（同步）
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    // 异步操作后提交 mutation
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  },
  getters: {
    // 获取状态的派生值
    doubleCount(state) {
      return state.count * 2;
    }
  },
  modules: {
  }
})
