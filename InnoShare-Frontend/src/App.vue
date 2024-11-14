<template>
    <NavigationBar />
    <router-view  />
</template>


<script type="ts">
import NavigationBar from "./components/NavigationBar.vue";
export default {
  components: {NavigationBar}
}
</script>

<style>
@font-face {
  font-family: 'myFont';
  src: url('./assets/AlimamaDaoLiTi.woff2') format('woff2'),
  url('./assets/AlimamaDaoLiTi.woff') format('woff');
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
  background-color: white;
}
body {
  margin: 0;
  display: block;
  overflow: hidden;
  padding: 0;
  height: 100vh;
}
::-webkit-scrollbar {
  display: none;
}


</style>