<template>

  <div class="recommend-list">
    <paperComponent/>
    <paperComponent/>
    <paperComponent/>
    <paperComponent/>
    <paperComponent/>
  </div>
</template>

<script>
import paperComponent from "../../paperComponent.vue";
export default {
  name: "recommendList",
  components:{
    paperComponent
  },

}
</script>

<style scoped>
.recommend-list{
  margin-top: 80px;
  position: relative;
  height: 80%;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:20px;
  flex-wrap: wrap;
  overflow-x: auto;
  padding: 0px 20px 40px 20px;
}

</style>