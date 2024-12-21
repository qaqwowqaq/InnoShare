<template>
<div class="dataBackground">
  <div class="dataPage">
    <div class="dataPage_inner">
      <div class="preData1 preDara">
        <div class="preData1_inside">隐藏信息</div>
        <p>论文数量</p>
      </div>
      <div class="preData2 preData">
        科研人员数量
      </div>
      <div class="preData3 preData">
        专利数量
      </div>
      <div class="preData4 preData">
        科研机构数量(?)
      </div>
    </div>

    <div class="dataPage_inner3">
      <p class="text-center ">
        We've already converted
        <strong><span data-v-0abbdf5a="">2,238,589,639</span>
          files
        </strong>
        with a total size of
        <strong><span data-v-0abbdf5a="">17,577</span>
          TB</strong>.
      </p>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "dataPage",
  data(){
    return{
      data:[
        {

        },
      ]
    }
  },
  mounted() {

  },
  methods:{


  }
}
</script>

<style scoped>
.dataBackground {
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  background-image: url("../src/assets/BackgroundImg/databack1.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;

}
.dataPage,.dataPage_inner {
  background-color:#f9f9f9;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);



}
.dataPage{
  width: 96%;
  display: flex;
  flex-direction: column;

}
.dataPage_inner{
  height: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 创建 2 列 */
  grid-template-rows: repeat(2, 1fr); /* 创建 2 行 */
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
  gap: 30px;
  grid-column-gap: 60px;
  padding: 0 50px 10px 50px;
  box-shadow: 0px 6px 10px -9px rgba(163,163,163,1);
}

.dataPage_inner3 {
  width: 100%;
  height: 20%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.text-center{
  text-align: center;
  align-self: center;
  color: #919090;
  font-size: 1.4rem;
}
.preData1, .preData2, .preData3,.preData4{
  flex: 1;
  height: 100%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.28);
  border-radius: 2px;
  overflow: hidden;
}
.preData1:hover .preData1_inside{
  top: 65%;
}
.preData1_inside{
  width: 100%;
  position: relative;
  top: 100%;
  height: 100px;
  background-color: #abadaf;
  transition: all 0.5s;
}
</style>