<template>
  <div id="app">
    <h1>Welcome to the Platform</h1>
    <!-- 全局的布局，导航栏等可以放在这里 -->
    <router-view>  </router-view><!-- 路由视图，根据路由动态渲染组件 -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style>
/* 可以放一些全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
