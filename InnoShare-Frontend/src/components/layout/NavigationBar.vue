<template>
  <header id="guideBar">
      <div>
        <svg viewBox="0 0 120 33" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" class="logoSvg">
          <path d="M9.059 7.279c4.417-.1 8.564 3.492 9.03 7.897.56 3.872-1.72 7.893-5.287 9.464-2.163 1.073-4.604.743-6.93.798H3.599v7.28H.002c.007-5.617-.014-11.234.01-16.85.12-4.186 3.545-7.932 7.682-8.49.45-.066.91-.1 1.365-.1v.001zm0 14.56c2.596.064 5.03-1.96 5.42-4.533.517-2.588-1.135-5.37-3.66-6.146-2.438-.866-5.372.272-6.564 2.575-.922 1.576-.594 3.434-.656 5.167v2.938h5.46v-.001zM19.826 7.191h3.557v18.16h-3.556V7.19l-.001.001zm14.25 11.42h.13l5.057 6.745h4.41l-6.874-9.34L42.895 7.2h-4.41l-4.28 6.225h-.128l-4.28-6.224h-4.41l6.095 8.818-6.873 9.336h4.41l5.057-6.744z" fill="currentColor" fill-rule="nonzero"></path><path d="M51.735 7.191c3.603-.07 7.06 2.29 8.394 5.624.694 1.55.683 3.264.66 4.926v7.61c-3.21-.01-6.422.022-9.636-.018-3.688-.18-7.065-2.87-8.12-6.404-.97-3.07-.166-6.635 2.116-8.932 1.703-1.763 4.123-2.827 6.583-2.803l.003-.003zm5.46 14.56c-.015-2.02.033-4.04-.028-6.058-.212-2.705-2.718-4.972-5.432-4.9-2.582-.064-5.015 1.937-5.42 4.492-.472 2.454.937 5.126 3.276 6.04 1.442.628 3.035.367 4.56.423h3.045l-.001.003zM71.628 7.279c4.262-.104 8.245 3.25 8.924 7.445.77 3.98-1.476 8.278-5.182 9.916-3.62 1.71-8.275.607-10.764-2.523-1.542-1.817-2.208-4.235-2.077-6.59V0h3.6v7.28h5.5l-.001-.001zm0 14.56c2.733.073 5.23-2.223 5.433-4.942.34-2.702-1.662-5.42-4.337-5.912-1.48-.204-2.982-.065-4.472-.11h-2.124c.022 2.054-.05 4.11.042 6.158.286 2.71 2.735 4.856 5.46 4.8l-.002.006zM91.13 7.191c3.604-.07 7.06 2.29 8.394 5.624.696 1.55.686 3.264.664 4.926v7.61c-3.21-.01-6.424.022-9.636-.018-3.69-.18-7.067-2.87-8.124-6.404-.97-3.07-.165-6.635 2.117-8.932 1.702-1.762 4.122-2.826 6.582-2.803l.003-.003zm5.46 14.56c-.016-2.02.032-4.04-.027-6.058-.208-2.705-2.715-4.972-5.43-4.9-2.58-.064-5.014 1.937-5.417 4.492-.474 2.454.936 5.126 3.274 6.04 1.44.628 3.033.367 4.556.423h3.045l-.001.003zm23.407-14.517c-.007 5.605.015 11.208-.01 16.81-.13 4.41-3.922 8.374-8.345 8.604-.84.044-1.682.016-2.523.022v-3.598c1.536-.007 3.178.15 4.537-.72 1.7-.955 2.78-2.878 2.743-4.822-3.19 2.574-8.136 2.44-11.238-.214-2.262-1.825-3.497-4.76-3.323-7.65v-8.43h3.6c.016 3.205-.034 6.413.026 9.617.195 2.587 2.46 4.797 5.055 4.926 2.674.276 5.306-1.74 5.77-4.383.203-1.48.067-2.984.108-4.476V7.239h3.6v-.005z" fill="currentColor" fill-rule="nonzero"></path>
        </svg>
        <div  class="searchTop" :style="{ visibility: isVisible ? 'visible' : 'hidden' }">
          <div id="searchBar">
            <button class="searchButton">
              <svg t="1725956324198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6176" width="16" height="16">
                <path d="M716.29895 806.808621C641.509798 862.822176 548.629446 896 448 896 200.576432 896 0 695.423565 0 448 0 200.576432 200.576432 0 448 0 695.423565 0 896 200.576432 896 448 896 548.629446 862.822176 641.509798 806.808621 716.29895L946.011456 855.501786C970.889978 880.380314 970.970976 920.635366 945.803174 945.803174 920.809619 970.79673 879.927322 970.436992 855.501786 946.011456L716.29895 806.808621ZM448 768C624.73112 768 768 624.73112 768 448 768 271.26888 624.73112 128 448 128 271.26888 128 128 271.26888 128 448 128 624.73112 271.26888 768 448 768Z" fill="#666666" p-id="6177"></path>
              </svg>
            </button>
            <input placeholder="Search for all " />
            <div class="advance">
              <a ref="guideHome" class="guideHome" @click="guideTo('/')">高级检索</a>
            </div>
            <div class="downlist" ref="downlist" @click="expand()" >
              <div class="swapicon" >
                <span class="label">{{ selectType }}</span>
                <svg t="1731934960434" ref="expand" style="transition: 0.2s ease-out;" class="icon"  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="5008" width="14" height="14">
                  <path d="M1003.69 234.2c-27.21-28.1-71.33-28.1-98.54 0L512.1 637.35 119.05 234.2c-27.21-28.1-71.33-28.1-98.54 0-27.21 28.1-27.21 73.65 0 101.74l440.57 452.22c0.57 0.63 1.07 1.29 1.66 1.9 13.63 14.07 31.5 21.09 49.36 21.07 17.86 0.02 35.73-7 49.36-21.07 0.59-0.61 1.1-1.27 1.66-1.9l440.57-452.22c27.21-28.09 27.21-73.65 0-101.74z" fill="#606060" p-id="5009"></path>
                </svg>

              </div>
              <div v-if="isOpen" class="dropdown-list">
                <div
                    class="dropdown-item"
                    v-for="item in searchType"
                    :key="item"
                    @click="selectItem(item)">
                  <label>{{ item }}</label>
                </div>
              </div>
            </div>

          </div>
        </div>
        <a ref="guideHome" class="guideHome" @click="guideTo('/')">首页</a>
        <a ref="guideAbout" class="guideAbout" @click="guideTo('/about')">关于我们</a>
        <a ref="guideLogin" class="guideLogin" @click="guideTo('/login')">{{ this.useStore.isAuthenticated?this.useStore.getUserInfo.username:"登录" }}</a>

      </div>
  </header>
</template>

<script>

import {mainStore} from "../../store/modules/pageStyleStore.ts";
import {useUserStore} from "../../store/modules/user.ts"
import {watch} from "vue";
export default {
  name: "NavigationBar",
  data(){
    return{
      isVisible: false,
      selectType:"paper",
      searchType:["paper","patent","project","literature"],//搜索类型论文专利等
      isOpen:false,

    }

  },
  setup() {
    const myStore = mainStore(); // 使用 Pinia store
    const useStore =useUserStore();
    return { myStore,useStore }; // 返回 store 以便在模板中使用
  },
  computed: {

  },
  watch:{

  },
  mounted() {
    watch(() => this.myStore.getNavigationBar,
        (newValue, oldValue) => {
          setTimeout(() => {
            this.update(newValue);
          }, 500);
        });
  },

  methods: {
    guideTo(path){
      if(path==="/"&&this.myStore.getNavigationBar===0){
        this.myStore.changeStyle(0);
      }else if(this.$route.path!=="/"&&path==="/"){
        this.update(0);
        this.myStore.changeStyle(0);
      }
      else {
        this.myStore.changeStyle(1);
      }
      this.$router.push(path);
    },
    update(newvalue){
      const header = document.getElementById('guideBar');
      const searchBar = document.getElementById('searchBar');
      const home = this.$refs.guideHome;
      const about = this.$refs.guideAbout;
      const login = this.$refs.guideLogin;
      if (newvalue===1) { // 改变状态
        header.style.backgroundColor = 'rgb(255,255,255)'; // 改变为有色背景
        this.isVisible = true;
        header.style.color = 'rgba(28,30,30,0.85)';
        searchBar.style.backgroundColor= 'rgba(245,245,245,0.85)';
        if(home&&about){
          home.style.color =  'rgba(28,30,30,0.85)';
          about.style.color = 'rgba(28,30,30,0.85)';
          login.style.color = 'rgba(28,30,30,0.85)';
        }
      } else {
        this.isVisible = false;
        header.style.color = 'rgba(255,255,255,0.88)';
        header.style.backgroundColor = 'transparent'; // 恢复透明背景
        if(home&&about){
          home.style.color =  'rgba(252,249,249,0.85)';
          about.style.color = 'rgba(252,249,249,0.85)';
          login.style.color = 'rgba(252,249,249,0.85)';
        }

      }
    },
    expand(){
      this.isOpen=!this.isOpen;
      const down =this.$refs.downlist;
      const expand=this.$refs.expand;
      if(this.isOpen){
        expand.style.transform=`rotate(180deg)`;
        down.style.backgroundColor="rgba(222, 219, 219, 0.73)";
      }else {
        expand.style.transform=`rotate(0deg)`;
        down.style.backgroundColor="rgb(235, 238, 238)";
      }
    },
    selectItem(item){
      this.selectType=item;
    }
  }

}



</script>

<style scoped>





#guideBar {
  padding: 0 32px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  border-width: 0 0 0 0;
  /*position: absolute;*/
  width: 100%;
  min-width: 1000px;
  margin: 0 ;
  position: fixed;
  align-items: center;
  height: 64px;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  color: rgb(235, 238, 238);
  transition:  0.5s ease-out;
}
#guideBar>*{
  max-width: 1800px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 32px;
  justify-content: space-between;
}
#guideBar a:not(.advance a) {
  font-weight: bold;
  font-size: 20px;
  color: rgba(252,249,249,0.85);
  flex: 1;
  text-decoration: none;
}
#guideBar a:hover{
  cursor: pointer;
}
.logoSvg {
  height: 32px;
}
.searchTop {
  flex: 6;
  height: 40px;
  justify-content: center;
  display: flex;
  flex-direction: row;
  position: relative;
}

.searchTop div:not(.swapicon,.downlist,.dropdown-list,.advance) {
  display: flex;
  flex-direction: row;
  width: 85%;
  border-radius: 20px;
}


.searchTop div input {
  flex: 8;
  height: 40px;
  border-width: 0;
  outline: none;
  background-color: transparent;
  caret-color: rgb(16, 15, 15);
}
.searchTop div input::placeholder {
  padding-left: 2px;
}
.searchTop div button{
  border: none;
  background-color: transparent;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
}
.searchTop div button svg{
  margin-top: 5px;
}

.advance{
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 10px;
  margin-right: 5px;
}
.advance a:hover{
  color: #4782b4;
}

.downlist{
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8px;
  border-radius: 20px;
  background-color: rgb(235, 238, 238);
  gap: 7px;
  cursor: pointer;
}

.swapicon {

  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px 0 15px;
}
.swapicon span{
  margin: 0 2px 3px 2px;
  font-size: 18px;
  cursor: pointer;
}
.swapicon svg {
  margin: 2px 5px 0 10px;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color:rgb(255,255,255);
  top: 45px;

  /*margin-top: 7px;*/
}
.dropdown-item label{
  text-align: center;
  cursor: pointer;
}


* {
  box-sizing: border-box;
}
</style>