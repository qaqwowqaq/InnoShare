<template>
    <!-- 导航栏 -->
    <NavigationBar  />
    <!-- 路由视图 -->
     
      <router-view />

</template>


<script type="ts">
import NavigationBar from "./components/layout/NavigationBar.vue";
export default {
  components: { NavigationBar }
}
</script>

<style>
@font-face {
  font-family: 'myFont';
  src: url('./assets/AlimamaFangYuanTiVF-Thin.woff2') format('woff2'),
    url('./assets/AlimamaFangYuanTiVF-Thin.woff') format('woff');
  font-display: swap;
}

#app {
  width: 100%;
  height: 100%;
  font-family: myFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding:0;
  background-color: white;
  overflow: auto; /* 子页面显示滚动条用的，勿删 */
}

body {
  margin: 0;
  display: block;
  overflow: hidden;
  overflow-x: auto;
  min-width: 1000px;
  line-height: 1.5;
  padding: 0;
  height: 100vh;
}

.scroll-container::-webkit-scrollbar {
  height: 0;
  display: none;

}

.scroll-container::-webkit-scrollbar-thumb {
  background: #c9c8c8;
  /* 滚动条颜色 */
  border-radius: 5px;
  /* 圆角 */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #969696;
}
</style>