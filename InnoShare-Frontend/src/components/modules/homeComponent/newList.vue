<template>
  <div class="new-list">
    <div class="new-list-item"
         v-for="item in this.newPapers"
         :key="item">
      <paperComponent :message="item"/>
    </div>
  </div>


</template>

<script>
import paperComponent from "../../paperComponent.vue";
import axiosInstance from '../../../axiosConfig';
export default {
  name: "newList",
  components: {paperComponent},
  data(){
    return{
      newPapers:[],
      interval:60000,//1min
      intervalId: null,
    }
  },
  mounted() {
    if(this.getFromLocal())this.newPapers = JSON.parse(this.getFromLocal());
    else this.fetch().then(this.update);

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
        this.newPapers = JSON.parse(localData); // 解析 JSON 字符串
      }
      // 每隔一定时间获取新的数据
      this.intervalId=setInterval(() => {
        this.fetch();
        //console.log("获取new数据")
      }, this.interval);
    },
    async fetch() {
      const response = await axiosInstance.get('/api/recommendations/new');
      this.newPapers = response.data.papers;
      localStorage.setItem("newPapers", JSON.stringify(this.newPapers))
    },
    getFromLocal(){
      //从本地读取
      return localStorage.getItem("newPapers");
    }

  }
}
</script>

<style scoped>
.new-list{
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