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
      interval:60000,//1分钟更新一次
      intervalId: null,
    }
  },
  mounted() {
    this.update();
    // 每隔一定时间获取新的数据
    this.intervalId = setInterval(() => {
      this.fetch();
      console.log("获取hot数据")
    }, this.interval);
  },
  beforeDestroy() {
    // 组件销毁时清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods:{
    update(){
      // 使用本地缓存，如果存在就读取，否则设置定时获取数据
      const localData = this.getFromLocal();
      if (localData) {
        this.hotPapers = JSON.parse(localData); // 解析 JSON 字符串
      }
      else this.fetch();

    },
    fetch(){
      axiosInstance.get('/api/recommendations/hot').then((response)=>{
        //最热文档
        this.hotPapers=response.data.papers;
        localStorage.setItem("hotPapers",JSON.stringify(this.hotPapers))
      });
    },
    getFromLocal(){
      //从本地读取
      return localStorage.getItem("hotPapers");
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