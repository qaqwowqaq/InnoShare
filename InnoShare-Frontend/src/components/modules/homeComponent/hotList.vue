<template>
  <div class="hot-list">
    <div class="hot-list-item"
         v-for="item in this.hotPapers"
         :key="item">
      <paperComponent :message="item"/>
    </div>
  </div>
</template>

<script>
import paperComponent from "../../paperComponent.vue";
import axiosInstance from '../../../axiosConfig';
export default {
  name: "hotList",
  components: {paperComponent},
  data(){
    return{
      hotPapers:[],
    }
  },
  mounted() {
    this.update();
  },
  methods:{
    update(){
      axiosInstance.get('/api/recommendations/hot').then((response)=>{
        //最新文档
        this.hotPapers=response.data.papers;
        console.log(response.data)

      });

    }

  }
}
</script>

<style scoped>
.hot-list{
  margin-top: 60px;
  position: relative;
  height: 80%;
  width:100%;
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(5, auto);
  flex-direction: column;
  justify-content: start;
  gap:20px;
  flex-wrap: wrap;
  overflow-x: auto;
  padding: 20px 20px 40px 20px;
}
</style>