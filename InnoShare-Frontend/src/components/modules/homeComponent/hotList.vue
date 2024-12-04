<template>
  <div class="hot-list">

  </div>
</template>

<script>
export default {
  name: "hotList"
}
</script>

<style scoped>
.hot-list{
  margin-top: 60px;
  position: relative;
  height: 80%;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:20px;
  flex-wrap: wrap;
  overflow-x: auto;
  padding: 0 20px 0 20px;
}
</style>