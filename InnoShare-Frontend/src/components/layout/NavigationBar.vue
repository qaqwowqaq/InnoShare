<template>

  <header id="guideBar" >
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="200" height="100%" cursor="pointer" @click="guideTo('/home')">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#5797e3" />
            <stop offset="100%" style="stop-color:#9157a9" />
          </linearGradient>
        </defs>

        <text x="150" y="65" font-family="myFont, sans-serif" font-size="48" font-weight="600" text-anchor="middle" fill="url(#gradient)" transform="rotate(0 0 0)">
          <tspan dy="0">Inno</tspan>
          <tspan dy="0" style="fill: rgb(203,201,201)" ref="text-share">Share</tspan>
        </text>

        <path d="M70 75 Q150 85 230 75" fill="none" stroke="#34495e" stroke-width="2" />
      </svg>
      <div  class="searchTop" :style="{ visibility: isVisible ? 'visible' : 'hidden' }">
        <div id="searchBar">
          <button class="searchButton" @click = "handleSearch">
            <svg t="1725956324198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6176" width="18" height="18">
              <path d="M716.29895 806.808621C641.509798 862.822176 548.629446 896 448 896 200.576432 896 0 695.423565 0 448 0 200.576432 200.576432 0 448 0 695.423565 0 896 200.576432 896 448 896 548.629446 862.822176 641.509798 806.808621 716.29895L946.011456 855.501786C970.889978 880.380314 970.970976 920.635366 945.803174 945.803174 920.809619 970.79673 879.927322 970.436992 855.501786 946.011456L716.29895 806.808621ZM448 768C624.73112 768 768 624.73112 768 448 768 271.26888 624.73112 128 448 128 271.26888 128 128 271.26888 128 448 128 624.73112 271.26888 768 448 768Z"
                    style="fill: #2f2e2e" p-id="6177"></path>
            </svg>
          </button>
          <input v-model="searchQuery" placeholder="Search for all " @keypress="handleKeyPress"/>
          <div class="advance">
            <a ref="guideSearch" class="guideSearch" @click="jumpToSearch">高级检索</a>
          </div>
          <div class="downlist" ref="downlist" @click="expand()" >
            <div class="swapicon" >
              <span class="label">{{ selectType }}</span>
              <svg t="1731934960434" ref="expand" style="transition: 0.2s ease-out;" class="icon"  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="5008" width="14" height="14">
                <path d="M1003.69 234.2c-27.21-28.1-71.33-28.1-98.54 0L512.1 637.35 119.05 234.2c-27.21-28.1-71.33-28.1-98.54 0-27.21 28.1-27.21 73.65 0 101.74l440.57 452.22c0.57 0.63 1.07 1.29 1.66 1.9 13.63 14.07 31.5 21.09 49.36 21.07 17.86 0.02 35.73-7 49.36-21.07 0.59-0.61 1.1-1.27 1.66-1.9l440.57-452.22c27.21-28.09 27.21-73.65 0-101.74z" fill="#606060" p-id="5009"></path>
              </svg>

            </div>
            <div v-if="this.myStore.getIsOpen" class="dropdown-list">
              <div class="dropdown-item"
                   v-for="item in searchType"
                   :key="item"
                   @click="selectItem(item.name)">
                <div v-html="item.svg" class="typeSvg"></div>
                <label :class="item.name">{{ item.name }}</label>
              </div>
            </div>
          </div>

        </div>
      </div>
      <a ref="guideHome" class="guideHome" @click="guideTo('/home')">首页</a>
      <a ref="guideAbout" class="guideAbout" @click="jumpToSearch">
        <span>高级检索</span>
      </a>
      <!-- 将原来的 a 标签改为 div 包装器 -->
      <div class="login-wrapper" ref="loginWrapper">
        <a ref="guideLogin" class="guideLogin" @click="handleLoginWrapper">
          {{ this.useStore.isAuthenticated ? "个人中心" : "登录" }}
        </a>

        <!-- 添加下拉菜单 -->
        <div v-if="showUserMenu && useStore.isAuthenticated" class="user-dropdown">
          <div class="dropdown-item" @click="handlePersonalCenter">个人</div>
          <div class="dropdown-item" @click="confirmLogout">登出</div>
        </div>
      </div>

      <!-- 添加登出确认对话框 -->
      <div v-if="showLogoutConfirm" class="logout-confirm-modal">
        <div class="modal-content" style="color: black;">
          <p>确认要登出吗？</p>
          <div class="modal-buttons">
            <button @click="handleLogout">确认</button>
            <button @click="showLogoutConfirm = false">取消</button>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>

<script>

import {mainStore} from "../../store/modules/pageStyleStore.ts";
import {useUserStore} from "../../store/modules/user.ts"
import {watch} from "vue";
import {computed} from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosConfig.ts";

export default {
  name: "NavigationBar",
  data(){
    return{
      isVisible: false,
      selectType:"paper",
      searchType:[
        {
          name:"paper",
          svg:`<svg t="1732975468563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15598" width="20" height="20"><path d="M575.428 897.188H158.91a32.099 32.099 0 0 1-32.1-32.099V158.911a32.099 32.099 0 0 1 32.1-32.1h545.683c17.719 0 32.1 14.38 32.1 32.1a32.099 32.099 0 0 0 64.197 0 96.297 96.297 0 0 0-96.297-96.298H158.911a96.297 96.297 0 0 0-96.298 96.298v706.178a96.297 96.297 0 0 0 96.298 96.298h416.517a32.099 32.099 0 0 0 0-64.199z" p-id="15599" fill="#707070"></path><path d="M512 287.307a32.099 32.099 0 0 0-32.099-32.1H223.109a32.099 32.099 0 0 0 0 64.199H479.9a32.099 32.099 0 0 0 32.099-32.1zM479.901 479.9a32.099 32.099 0 0 0-32.1-32.1H223.11a32.099 32.099 0 0 0 0 64.199h224.693a32.099 32.099 0 0 0 32.099-32.099zM223.109 672.495a32.099 32.099 0 0 0 0 64.198h128.396a32.099 32.099 0 0 0 0-64.198H223.109z m641.98-48.148h-66.38c24.33-67.922 66.38-192.948 66.38-208.644a160.495 160.495 0 0 0-320.99 0c0 20.126 39.963 140.176 65.9 208.644h-65.9a96.297 96.297 0 0 0-96.297 96.297v32.099a96.297 96.297 0 0 0 96.297 96.297h320.99a96.297 96.297 0 0 0 96.298-96.297v-32.1a96.297 96.297 0 0 0-96.298-96.296z m-222.221-98.77c-19.42-55.948-34.57-105.252-34.57-109.874a96.297 96.297 0 1 1 192.593 0c0 6.323-52.353 158.954-70.553 208.644h-51.359c-8.025-20.223-22.47-59.448-36.111-98.77z m254.32 227.166a32.099 32.099 0 0 1-32.099 32.099H544.1a32.099 32.099 0 0 1-32.099-32.1v-32.098a32.099 32.099 0 0 1 32.099-32.1h320.99a32.099 32.099 0 0 1 32.1 32.1v32.099z" p-id="15600"
            fill="#707070"></path></svg>`,
        },
        {
          name:"patents",
          svg:`<svg viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="2395" width="20" height="20"><path d="M236.226143 434.149934l17.187451-21.475104-22.149463 5.565762-11.665691-20.698414-10.511401 31.81766-28.892027 14.316054 19.735483 4.78498-4.945639 28.625968 23.37129-26.264177 23.370267 8.762571L236.226143 434.149934 236.226143 434.149934zM165.985382 571.71094l-29.492708 39.746236-38.138622 6.329149 23.370267 25.488511-21.528316 43.757596 38.156018-30.211069 27.01119 26.257014 1.859347-42.120306 33.261545-27.02961-35.054377-1.642406L165.985382 571.71094 165.985382 571.71094zM337.116971 321.242422l11.128455 6.387477 4.945639-15.966647 17.143449-13.547551-13.485129-2.361791 0-12.716626-14.147208 16.731056-19.113313 3.190669 6.743588 12.660344-11.68411 16.685008L337.116971 321.242422 337.116971 321.242422zM409.112702 459.580117l-52.92949 16.672728-24.610514-46.896076-16.009625 66.831105-56.631812 29.389354 44.926212 10.356882-10.422374 67.590398 43.677778-56.471153 51.752688 15.909341-18.536168-52.462862L409.112702 459.580117 409.112702 459.580117zM318.087569 757.775636l-7.426133-48.437176-25.829272 39.693024-52.374858-1.540076 33.260521 35.000142-20.884656 46.142923 46.781466-23.851221 35.05847 33.372062-2.464121-50.146097 45.565778-20.650319L318.087569 757.775636 318.087569 757.775636zM486.543212 121.31909l-97.562013 801.681612 105.343233 2.219551-2.574638-803.901163C488.338091 116.835985 486.543212 121.31909 486.543212 121.31909L486.543212 121.31909zM816.810171 202.928782c0 0-82.105996-52.521191-237.605559-15.656585 0 0 198.689225-18.948561 248.78211 132.883473 0 0 34.591843 154.038282-83.770915 272.41025 0 0-85.546352 94.934163-142.617162 118.371968L525.633508 104.634082c0 0-6.033413-9.978259-6.033413 5.605671l0 806.120714c0 0 92.421946-32.386618 101.069907-48.037063l-12.109806-100.501972c0 0 254.016321-127.271662 305.814034-338.261027C914.439722 429.559383 962.846198 274.337135 816.810171 202.928782L816.810171 202.928782zM816.810171 202.928782"
            fill="#707070" p-id="2396"></path></svg>`,
        },

      ],//搜索类型论文专利等
      searchQuery:"",
      showUserMenu:false,
      showLogoutConfirm:false,
    }

  },
  setup() {
    const myStore = mainStore(); // 使用 Pinia store
    const useStore =useUserStore();
    const router = useRouter();
    const userDashboardPath = computed(() => (useStore.isAuthenticated ? `/userDashboard/${useStore.getUserId}` : "/login"));
    return { myStore, useStore, userDashboardPath, router };

  },
  computed: {

  },
  watch:{
    '$route'(to, from) {
      // 当路由变化时执行的代码
      console.log('当前路由:', to.path);
      const toHome=this.$refs.guideHome;
      const toAbout=this.$refs.guideAbout;
      const toLogin=this.$refs.guideLogin;
      const bar=document.getElementById("guideBar");
      if(to.path==="/register"){
        bar.style.display="none";//注册界面隐藏导航栏
      }else {
        bar.style.display="initial";
        if(to.path==="/home/recommend"||to.path==="/home/new"||to.path==="/home/hot"){
          toHome.style.borderColor=`initial`;
          toAbout.style.borderColor=`transparent`;
          toLogin.style.borderColor=`transparent`;
        }else if(to.path==="/search") {
          toHome.style.borderColor=`transparent`;
          toAbout.style.borderColor=`initial`;
          toLogin.style.borderColor=`transparent`;
        }else if(to.path==="/login"){
          toHome.style.borderColor=`transparent`;
          toAbout.style.borderColor=`transparent`;
          toLogin.style.borderColor=`initial`;

        }
        else {
          toHome.style.borderColor=`transparent`;
          toAbout.style.borderColor=`transparent`;
          toLogin.style.borderColor=`transparent`;
          //this.myStore.changeStyle(0);
        }
      }



    },

  },
  mounted() {
    watch(() => this.myStore.getNavigationBar,
        (newValue, oldValue) => {
          setTimeout(() => {
            this.update(newValue);
          }, 200);
        });
    watch(() => this.myStore.getIsOpen,
        (newValue, oldValue) => {
          this.changeExpand();
        });
// 添加点击外部关闭下拉菜单的处理
    document.addEventListener('click', (e) => {
      const loginWrapper = this.$refs.loginWrapper;
      if (loginWrapper && !loginWrapper.contains(e.target)) {
        this.showUserMenu = false;
      }
    });
  },

  methods: {
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
    guideTo(path){
      if(path.includes("/home")&&this.myStore.getNavigationBar===0){
        this.myStore.changeStyle(0);
      }else if(!this.$route.path.includes("/home")&&path.includes("/home")){
        this.update(0);
        this.myStore.changeStyle(0);
      }else if(path==="/login"){
        this.myStore.changeStyle(0);
      }
      else {
        this.myStore.changeStyle(1);
      }
      this.$router.push(path);
    },
    handleSearch() {
      if (this.searchQuery.trim() === '') {
        alert('请输入搜索内容');
        return;
      }
      // 跳转到 SearchResults 页面，并传递查询参数
      this.$router.push({
        path: '/search',
        query: {
          type: this.selectType==="paper"?"paper":"patents",
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
    update(newvalue){
      const header = document.getElementById('guideBar');
      const header2 = this.$refs["text-share"];
      const searchBar = document.getElementById('searchBar');
      const home = this.$refs.guideHome;
      const about = this.$refs.guideAbout;
      const login = this.$refs.guideLogin;
      if (newvalue===1) { // 改变状态
        header.style.backgroundColor = 'rgb(255,255,255)'; // 改变为有色背景
        this.isVisible = true;
        header.style.color = 'rgba(28,30,30,0.85)';
        header2.style.fill = 'rgba(28,30,30,0.85)';
        searchBar.style.backgroundColor= 'rgba(245,245,245,0.85)';
        if(home&&about){
          home.style.color =  'rgba(28,30,30,0.85)';
          about.style.color = 'rgba(28,30,30,0.85)';
          login.style.color = 'rgba(28,30,30,0.85)';
        }
      } else {
        this.isVisible = false;
        header.style.color = 'rgba(255,255,255,0.88)';
        header2.style.fill = 'rgb(203,201,201)';
        header.style.backgroundColor = 'transparent'; // 恢复透明背景
        if(home&&about){
          home.style.color =  'rgba(252,249,249,0.85)';
          about.style.color = 'rgba(252,249,249,0.85)';
          login.style.color = 'rgba(252,249,249,0.85)';
        }

      }
    },
    handleLoginClick() {
      if (this.useStore.isAuthenticated) {
        // 已登录，导航到个人中心
        this.guideTo(`/userDashboard/${this.useStore.getUserId}`);
      } else {
        // 未登录，导航到登录页
        this.guideTo('/login');
      }
    },
    expand(){
      //展开
      this.myStore.changeOpen(!this.myStore.getIsOpen);
      const down =this.$refs.downlist;
      const expand=this.$refs.expand;
      if(this.myStore.getIsOpen){
        expand.style.transform=`rotate(180deg)`;
        down.style.backgroundColor="rgba(222, 219, 219, 0.73)";
      }else {
        expand.style.transform=`rotate(0deg)`;
        down.style.backgroundColor="rgb(235, 238, 238)";
      }
    },
    changeExpand(){
      const down =this.$refs.downlist;
      const expand=this.$refs.expand;
      if(this.myStore.getIsOpen){
        expand.style.transform=`rotate(180deg)`;
        down.style.backgroundColor="rgba(222, 219, 219, 0.73)";
      }else {
        expand.style.transform=`rotate(0deg)`;
        down.style.backgroundColor="rgb(235, 238, 238)";
      }
    },
    selectItem(item){
      this.selectType=item;
    },
    handleLoginWrapper() {
      if (this.useStore.isAuthenticated) {
        this.showUserMenu = !this.showUserMenu;
      } else {
        this.guideTo('/login');
      }
    },

    handlePersonalCenter() {
      this.showUserMenu = false;
      // 导航到个人中心,如果是管理员登录导航到admin
      if (this.useStore.getIsAdmin) {
        this.guideTo('/admin');
      } else {
        this.guideTo(`/userDashboard/${this.useStore.getUserId}`);
      }
    },

    confirmLogout() {
      this.showUserMenu = false;
      this.showLogoutConfirm = true;
    },

    async handleLogout() {
      try {
        await axiosInstance.get('/users/logout');
        this.useStore.logout();
        this.showLogoutConfirm = false;
        this.guideTo('/login');
      } catch (error) {
        console.error('登出失败:', error);
        alert('登出失败，请稍后重试');
      }
    }
  },



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
  align-items: center;
  /*height: 66px;*/
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  color: rgb(235, 238, 238);
  transition:  0.5s ease-out;
  position: fixed; /* 设置为固定定位 */
  z-index: 10000; /* 提高 z-index 以确保在最上层 */
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

.searchButton {
  transition: 0.2s ease;
}

.searchButton:hover {
  transform: rotate(90deg);
  fill: #000000;
}
.searchButton:hover svg{

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
  align-items: center;
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
  margin-left: 16px;
  cursor: pointer;
  height: 18px;
  width: 18px;
  padding: 0;
}
.searchTop div button svg{

}

.advance{
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 10px;
  margin-right: 5px;
  height: 21px;
  overflow: hidden;
}
.advance a{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
}
.advance a:hover{
  color: #4782b4;
}

.downlist{
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  background-color: rgb(235, 238, 238);
  gap: 7px;
  cursor: pointer;
  height: 100%;
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
  background-color: rgb(245, 245, 245);
  top: 45px;
  box-shadow: 0 0 0 1px rgba(14,19,24,.07),0 2px 18px rgba(14,19,24,.25);
  padding: 12px;
  /*margin-top: 7px;*/
}
.dropdown-item {
  width: 100%;
  padding: 12px 6px 12px 6px;
}
.dropdown-item:hover {
  color: #4782b4;

}
.dropdown-item .typeSvg{
  margin-right: 15px;
}
.dropdown-item label{
  text-align: center;
  cursor: pointer;
}
.paper{
  padding: 0 20px 0 0;
}
.login-wrapper {
  position: relative;
  display: inline-block;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 120px;
}

.user-dropdown .dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  color: #333;
}

.user-dropdown .dropdown-item:hover {
  background-color: #f5f5f5;
  color: #4782b4;
}

.logout-confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.logout-confirm-modal .modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-buttons button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #4782b4;
  color: white;
}

.modal-buttons button:last-child {
  background-color: #f5f5f5;
  color: #333;
}

.modal-buttons button:hover {
  opacity: 0.9;
}
.guideAbout,.guideHome,.guideLogin{
  border-style: solid;
  border-color: transparent;
  border-width: 0px 0px 2px;
  padding: 20px 0px;
  transition: 0.2s;
}
.guideLogin{]
  padding: 20px 0px 24px 0px;
  margin-left: 10px;
}
.guideAbout span{
  height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
}
* {
  box-sizing: border-box;
}
</style>