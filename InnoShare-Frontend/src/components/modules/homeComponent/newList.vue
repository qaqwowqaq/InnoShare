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
    }
  },
  mounted() {
    this.update();
  },
  methods:{
    update(){
      axiosInstance.get('/api/recommendations/new').then((response)=>{
        //最新文档
          this.newPapers=response.data.papers;

      });

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