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
      interval:30000,//30秒更新一次
      intervalId: null,
    }
  },
  mounted() {
    //推荐列表15s更新一次
    this.update();
  },
  beforeDestroy() {
    // 组件销毁时清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods:{
    //获取推荐文档
    update(){
      // 使用本地缓存，如果存在就读取，否则设置定时获取数据
      const localData = this.getFromLocal();
      if (localData) {
        this.recPapers = JSON.parse(localData); // 解析 JSON 字符串
      }
      // 每隔一定时间获取新的数据
      this.intervalId=setInterval(() => {
        this.fetch();
        //console.log(this.intervalId+"获取rec数据")
      }, this.interval);
    },
    fetch(){
      axiosInstance.get('/api/recommendations/recommend').then((response)=>{
        //最新文档
        this.recPapers=response.data.papers;
        localStorage.setItem("recPapers",JSON.stringify(this.recPapers))
      });
    },
    getFromLocal(){
      //从本地读取
      return localStorage.getItem("recPapers");
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