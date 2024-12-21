<template>
  <div class="recommend-list">
    <div class="recommend-list-item"v-for="item in this.recPapers"
         :key="item">
      <paperComponent :message="item"/>
    </div>
  </div>

</template>

<script>
import paperComponent from "../../paperComponent.vue";
import axiosInstance from '../../../axiosConfig';
export default {
  name: "recommendList",
  components:{
    paperComponent
  },
  data(){
    return{
      recPapers:[],
    }
  },
  mounted() {
    //推荐列表1分钟更新一次
    this.getRecommend();
  },
  methods:{
    //获取推荐文档
    getRecommend(){
      axiosInstance.get('/api/recommendations/recommend').then((response)=>{
        this.recPapers=response.data.papers;
        console.log(response.data)

      });
    }
  }
}
</script>

<style scoped>
.recommend-list{
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