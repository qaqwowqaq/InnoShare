<template>
  <div class="home" id="fullpage">
    <div class="section">
      <div class="backImage backImage1" ref="Img"></div>
      <div ref="search1" class="centerFlex">
        <div class="text--search">
          <div class="text1">
            SEARCH.
          </div>
          <div class="text2" style="display: flex;flex-direction: row;width: 100%;justify-content: space-between">
            Search everything you are interested in.
            <div class="advance-search" @click="jumpToSearch">
              高级检索
              <svg t="1733674527260" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10809" width="15" height="15"><path d="M810.607437 512c0 22.013817-8.4045 44.027634-25.170837 60.836634L360.049451 998.778394a85.879484 85.879484 0 0 1-121.54528 0 86.135458 86.135458 0 0 1 0-121.673267L603.140011 512 238.504171 146.937535a86.135458 86.135458 0 0 1 0-121.673267 85.879484 85.879484 0 0 1 121.54528 0l425.387149 425.899098c16.766337 16.809 25.170837 38.822817 25.170837 60.836634z" fill="#8a8a8a" p-id="10810"></path></svg>
            </div>
          </div>
          <div class="container---s-RT standard--OWAow padded--l0Z01 heroSearch--0FfMR">
            <div class="searchForm--XoxyI" >
              <button class="submit--EM+-q"  aria-label="Search for what you want" @click="handleSearch">
                <svg t="1725956324198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6176" width="16" height="16">
                  <path d="M716.29895 806.808621C641.509798 862.822176 548.629446 896 448 896 200.576432 896 0 695.423565 0 448 0 200.576432 200.576432 0 448 0 695.423565 0 896 200.576432 896 448 896 548.629446 862.822176 641.509798 806.808621 716.29895L946.011456 855.501786C970.889978 880.380314 970.970976 920.635366 945.803174 945.803174 920.809619 970.79673 879.927322 970.436992 855.501786 946.011456L716.29895 806.808621ZM448 768C624.73112 768 768 624.73112 768 448 768 271.26888 624.73112 128 448 128 271.26888 128 128 271.26888 128 448 128 624.73112 271.26888 768 448 768Z" fill="#666666" p-id="6177"></path>
                </svg>
              </button>
              <input v-model="searchQuery"  placeholder="Search for all " @keypress="handleKeyPress">
            </div>
            <div class="container--YKYLB">
              <div class="triggerWrapper--NACCC">
                <button  @click="changePaper" class="searchType" type="button">
                  <span class="label">{{ this.searchType[curType%2] }}</span>
                  <svg :style=" {transform: `rotate(${rotated*360}deg)`} " ref="swapicon" t="1731382656708" class="swapicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6994" width="16" height="16"><path d="M268.584571 963.031262l-75.408113-40.96322 209.417277-209.928519a63.905181 63.905181 0 0 1 90.361926 90.553641l-80.264907 80.584433a383.814515 383.814515 0 0 0 436.344573-553.866201 63.905181 63.905181 0 1 1 112.409213-60.901637 511.241446 511.241446 0 0 1-450.851049 755.487046 508.429618 508.429618 0 0 1-242.00892-60.965543zM61.979122 755.850667A511.752687 511.752687 0 0 1 754.902996 61.456973l75.408114 40.963221-228.07759 228.588831a63.969086 63.969086 0 0 1-90.425831-90.553641l99.05303-99.30865a383.87842 383.87842 0 0 0-436.344574 553.866201 63.905181 63.905181 0 1 1-112.409213 60.965542z" fill="#656f79" p-id="6995"></path></svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="section recommendPage" style="background-color: transparent">
      <div class="recommend">
        <div class="recommend-title" ref="recommend-title">
          <div ref="recTitle" class="initTitle" @click="changeTitle(1)">
            <h2>推荐</h2>
            <p>RECOMMEND</p>
          </div>
          <div ref="newTitle" @click="changeTitle(2)">
            <h2>最新</h2>
            <p>NEW</p>
          </div>
          <div ref="hotTitle" @click="changeTitle(3)">
            <h2>热门</h2>
            <p>HOT</p>
          </div>
        </div>
        <router-view class="all-list"  ref="all-list" />
      </div>
    </div>
    <!--数据信息
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
    -->
  </div>
</template>
<script>
import { mainStore } from "../store/modules/pageStyleStore.ts";
import paperComponent from "../components/paperComponent.vue";
import DataPage from "../components/modules/homeComponent/dataPage.vue";
import axiosInstance from '@/axiosConfig';
export default {
  name: "home",
  components: {
    DataPage,
    paperComponent
  },
  data() {
    return{
      index:0,
      rotated: 0,
      viewHeight: 0,
      pageNum: 2,
      currentPosition: 0,
      handlerWheel:null,
      sections:[

      ],
      curType:0,
      store: null,
      searchType:[
        "paper",
        "patents",
      ],//搜索类型论文专利等
      searchQuery:""
    }
  },
  setup() {
    const myStore = mainStore(); // 使用 Pinia store
    return { myStore }; // 返回 store 以便在模板中使用
  },
  watch:{
    //监听当前路由切换style
    '$route'(to, from) {
      console.log('路由变化:',from.path ," to " ,to.path);
      const rec=this.$refs.recTitle;
      const newRec=this.$refs.newTitle;
      const hot=this.$refs.hotTitle;
      if(to.path==='/home/recommend'){
        rec.style.borderColor=`initial`;
        newRec.style.borderColor=`transparent`;
        hot.style.borderColor=`transparent`;
      }else if(to.path==='/home/new'){
        rec.style.borderColor=`transparent`;
        newRec.style.borderColor=`initial`;
        hot.style.borderColor=`transparent`;
      }else if(to.path==='/home/hot'){
        rec.style.borderColor=`transparent`;
        newRec.style.borderColor=`transparent`;
        hot.style.borderColor=`initial`;
      }
    },
  },
  computed:{

  },
  mounted() {
    this.init();
    //初始时，获取基本数据
    this.myStore.changeStyle(0);//初始为透明背景
    this.viewHeight = document.documentElement.clientHeight;
    const container = this.$el.querySelector('.home');
    this.sections  = document.querySelectorAll(".section")
    this.currentPosition = 0;
    this.handlerWheel = this.throttle(this.scrollMove, 100);
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
      document.addEventListener('mousewheel', this.handlerWheel);
    } else {
      document.addEventListener('DOMMouseScroll', this.handlerWheel);
    }
    window.addEventListener('beforeunload', this.handleBeforeUnload);

  },

  beforeRouteLeave(to, from, next) {
    this.currentPosition=0;
    // 在路由切换之前移除事件监听器
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
      document.removeEventListener('mousewheel', this.handlerWheel);
    } else {
      document.removeEventListener('DOMMouseScroll', this.handlerWheel);
    }
    //清楚已经缓存的数据
    const savedRoute = localStorage.getItem('savedRoute');//存储到localStorage中
    if (savedRoute) {
      next(savedRoute); // 重定向到保存的路由
      localStorage.removeItem('savedRoute'); // 移除保存的路由
      return;
    } else {
      next(); // 继续导航
      return;
    }
    next(); // 继续路由切换
  },
  methods: {
    //
    //前端函数
    jumpToSearch(){
      //前往高级搜索界面筛选
      this.$router.push({
        path: '/search',
        query: {
          type: "paper",
          query: "default",//占位
          subject: `paper`, //  占位
          subjectLevel: 1,
          sortBy: '_score',
          order: 'desc',
          page: 0,
        }
      });
    },
    handleSearch(){
      if (this.searchQuery.trim() === '') {
        alert('请输入搜索内容');
        return;
      }
      // 跳转到 SearchResults 页面，并传递查询参数
      this.$router.push({
        path: '/search',
        query: {
          type: this.searchType[this.curType % 3],
          query: this.searchQuery,
          subject: '', // 可根据需要添加更多参数
          subjectLevel: 1,
          sortBy: '_score',
          order: 'desc',
          page: 0,
        }
      });
    },
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    },
    handleBeforeUnload(){
      this.currentPosition=0;
    },
    goDown() {
      //从搜索界面第一次向下滑会触发
      if (this.currentPosition > -this.viewHeight * (this.pageNum - 1)) {
        this.currentPosition -= this.viewHeight;
        this.updateContainerPosition();
      }
    },
    goUp() {
      //向上滑动回到搜索界面
      if (this.currentPosition < 0) {
        this.currentPosition += this.viewHeight;
        this.updateContainerPosition();

      }
    },
    updateContainerPosition() {
      const container = document.getElementById("fullpage")
      container.style.top = this.currentPosition + 'px';
      if(this.currentPosition!==0){
        this.myStore.changeStyle(1);
      }else {
        this.myStore.changeStyle(0);
      }
    },
    scrollMove(e) {
      this.myStore.changeOpen(false);//关闭下拉列表
      if (e.deltaY > 0) {
        this.goDown();
      }
      else if(e.deltaY<0) {
        this.goUp();
      }
    },
    throttle(fn, delay) {
      let baseTime = 0;
      return function () {
        const currentTime = Date.now();
        if (baseTime + delay < currentTime) {
          fn.apply(this, arguments);
          baseTime = currentTime;
        }
      };
    },
    init(){
      this.index=Math.floor(Math.random() * 9) + 1;
      //console.log(this.index)
      const image= document.getElementsByClassName("backImage");
      image.item(0).style.backgroundImage = "url(\'src/assets/BackgroundImg/back" + this.index + ".jpg\')";
    },
    changePaper() {
      this.rotated++;
      let randomInt =Math.floor(Math.random() * 9) + 1;

      while (this.index === randomInt){
        randomInt = Math.floor(Math.random() * 9) + 1;
      }
      this.index = randomInt;
      //console.log(this.index)
      const img = this.$refs.Img;
      //随机图片
      const image= document.getElementsByClassName("backImage");
      image.item(0).style.backgroundImage = "url(\'src/assets/BackgroundImg/back" + this.index + ".jpg\')";
      //切换搜索标签
      this.curType++;
    },
    changeTitle(type){
      if(type===1){

        this.$router.push({ path: '/home/recommend' });
      }else if(type===2){
        this.$router.push({ path: '/home/new' });
      }else {
        this.$router.push({ path: '/home/hot' });
      }
    }
  },


}
</script>

<style scoped>
@font-face {
  font-family: 'myFont';
  src: url('../assets/AlimamaFangYuanTiVF-Thin.woff2') format('woff2'),
  url('../assets/AlimamaFangYuanTiVF-Thin.woff') format('woff');
  font-display: swap;
}
.fp-overflow{
  height: 100%;
}
.home {
  width: 100%; /* 设置宽度为 100% */
  height: 100vh; /* 设置高度为 100% */
  position: relative;
  top: 0;
  transition: all 1000ms ease;
  touch-action: none;

}
.home::-webkit-scrollbar {
  scrollbar-width: none;
  display: none; /* Safari 和 Chrome */
}
.section{
  height: 100vh; /* 确保每个部分占满整个视口 */
  width: 100%; /* 确保宽度为100% */
  position: relative; /* 如果需要定位 */
}
.section p{
  margin: 0;
}
.backImage{
  width: 100%;
  height: 100%;
  background-size: cover;

  position: absolute;
  box-shadow: 1px 4px 4px -5px rgb(128, 125, 125);
  border-radius: 0 0 5px 5px;
  opacity: 1;
  transition: 0.5s ease-in;

}
.backImage1{
  height: 100%;
  background-image: url('../assets/BackgroundImg/back1.jpg');
  filter: brightness(0.7);
}
.backImage2 {
  background-color: transparent;
}
.backImage3 {
  background-color: transparent;
  width: 100%;


}
.backImage4 {
  background-color: transparent;

}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(33, 32, 32, 0.37), rgba(48, 48, 52, 0.78));
}
.centerFlex {
  transition: 0.5s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  height: 100%;
  padding: 0 32px;
}

.text--search {
  width: 100%;
  max-width: 940px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: none;

}
.text1 {
  font-size: 56px;
  line-height: 48px;
}
.text2 {
  font-size: 16px;
}
.text1,.text2 {
  transition: 0.8s;
  margin: 0 0 10px 5px;
  font-family: myFont,sans-serif;
  color: #efecec;
}


.container---s-RT.padded--l0Z01.standard--OWAow {
  background-color: #fff;
}
.container---s-RT.standard--OWAow {
  background-color: #f7f7f7;
  border: 1px solid #f7f7f7;
}
.container---s-RT.padded--l0Z01 {
  height: 56px;
  border-radius: 56px;
}
.heroSearch--0FfMR {
  box-shadow: 0 16px 40px rgba(25, 27, 38, .08);
}
.container---s-RT {
  height: 40px;
  border-radius: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  transition: 0.5s;
}
.container---s-RT:hover {
  box-shadow:
      0px 0px 30px rgba(154, 151, 151, 0.85)
;
}
.submit--EM\+-q {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 24px;
}
.container---s-RT .searchForm--XoxyI {
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  padding-left: 24px;
}
.container---s-RT .searchForm--XoxyI input:placeholder-shown {
  text-overflow: ellipsis;
}

.container---s-RT .searchForm--XoxyI input {
  flex: auto;
  padding: 8px;
  border: none;
  background: none;
  margin: 0;
  min-width: 30px;
  font-size: 18px;
}
.searchType {
  transition: 1.0s;
  background: transparent;
  color: #ffffff;
  border: none;
  margin-right: 8px;
  border-radius: 56px;
  display: flex; /* 使用 flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer;
  flex-direction: row;
  gap: 5px;
  padding: 0;
}
.searchType span {
  flex: 3;
  margin: 0 0 5px 10px;
}
.swapicon {
  flex: 1;
  transition: 1.0s;
  transform: rotate(0deg);
}


.type---search div {
  flex: auto;
  font-family: myFont,sans-serif;
}

.flexStats div {
  flex: auto;
  margin: 0 20px 0 20px;
  height: 100%;
  background: #ffffff;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #656f79;
}
.triggerWrapper--NACCC {
  display: flex;
  justify-content: center;
  margin-right: 10px;
}
.container--YKYLB {
  display: flex;
  justify-content: center;
  height: 100%;
  border-radius: 56px;
}
.label{
  font-family: myFont,sans-serif;
  font-size: 24px;
  color: #656f79;
  transition: 0.5s;
}


.recommendPage ,.dataPage ,.otherPage{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.recommend,.data,.other {
  height: 100%;
  background-color: rgba(246, 246, 248, 0.47);
  width: 99%;

}
.data{
  width: 100%;
}
.data,.other {
  height: 100%;
  margin-top: 0;
}
input {
  /* 取消搜索栏边框 */
  outline: none;

}
.recommend{
  display: flex;
  align-items: center;
  justify-content: center;

}
.recommend-title h2{
  margin: 0;
}
.recommend-title p{
  font-size: 14px;
}
.recommend-title .initTitle{
  padding-right: 5px;
  border: solid black;
  border-width: 0 4px 0 0;
}
.recommend-title div{
  padding-right: 5px;
  border: solid transparent;
  border-width: 0 4px 0 0;
  transition: 0.2s;
}
.recommend-title div:hover {
  cursor: pointer;

}
.recommend-title{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 21px 0px 16px -18px rgba(219,219,219,0.69);
  padding: 0 5px 0 0;
  gap:10px;
  /*transform: translateX(-100px);*/
}
.all-list{

  /*transform: translateX(-100px);*/
}

.advance-search {
  color: #1c1e1e;
  align-self: center;
  margin-right: 20px;
  padding: 0 6px 0 10px;
  border-radius: 12px;
  background-color: #efecec;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
}
.advance-search svg{
  transition: 0.3s;
}

.advance-search:hover{
  box-shadow:
      0px 0px 10px rgba(154, 151, 151, 0.85);
}
.advance-search:hover svg{
  transform: translateX(3px);
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

</style>