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
              <a ref="guideSearch" class="guideSearch" @click="guideTo('/search')">高级检索</a>
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
      searchType:[
        {
          name:"paper",
          svg:`<svg t="1732975468563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15598" width="20" height="20"><path d="M575.428 897.188H158.91a32.099 32.099 0 0 1-32.1-32.099V158.911a32.099 32.099 0 0 1 32.1-32.1h545.683c17.719 0 32.1 14.38 32.1 32.1a32.099 32.099 0 0 0 64.197 0 96.297 96.297 0 0 0-96.297-96.298H158.911a96.297 96.297 0 0 0-96.298 96.298v706.178a96.297 96.297 0 0 0 96.298 96.298h416.517a32.099 32.099 0 0 0 0-64.199z" p-id="15599" fill="#707070"></path><path d="M512 287.307a32.099 32.099 0 0 0-32.099-32.1H223.109a32.099 32.099 0 0 0 0 64.199H479.9a32.099 32.099 0 0 0 32.099-32.1zM479.901 479.9a32.099 32.099 0 0 0-32.1-32.1H223.11a32.099 32.099 0 0 0 0 64.199h224.693a32.099 32.099 0 0 0 32.099-32.099zM223.109 672.495a32.099 32.099 0 0 0 0 64.198h128.396a32.099 32.099 0 0 0 0-64.198H223.109z m641.98-48.148h-66.38c24.33-67.922 66.38-192.948 66.38-208.644a160.495 160.495 0 0 0-320.99 0c0 20.126 39.963 140.176 65.9 208.644h-65.9a96.297 96.297 0 0 0-96.297 96.297v32.099a96.297 96.297 0 0 0 96.297 96.297h320.99a96.297 96.297 0 0 0 96.298-96.297v-32.1a96.297 96.297 0 0 0-96.298-96.296z m-222.221-98.77c-19.42-55.948-34.57-105.252-34.57-109.874a96.297 96.297 0 1 1 192.593 0c0 6.323-52.353 158.954-70.553 208.644h-51.359c-8.025-20.223-22.47-59.448-36.111-98.77z m254.32 227.166a32.099 32.099 0 0 1-32.099 32.099H544.1a32.099 32.099 0 0 1-32.099-32.1v-32.098a32.099 32.099 0 0 1 32.099-32.1h320.99a32.099 32.099 0 0 1 32.1 32.1v32.099z" p-id="15600"
            fill="#707070"></path></svg>`,
        },
        {
          name:"patent",
          svg:`<svg viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="2395" width="20" height="20"><path d="M236.226143 434.149934l17.187451-21.475104-22.149463 5.565762-11.665691-20.698414-10.511401 31.81766-28.892027 14.316054 19.735483 4.78498-4.945639 28.625968 23.37129-26.264177 23.370267 8.762571L236.226143 434.149934 236.226143 434.149934zM165.985382 571.71094l-29.492708 39.746236-38.138622 6.329149 23.370267 25.488511-21.528316 43.757596 38.156018-30.211069 27.01119 26.257014 1.859347-42.120306 33.261545-27.02961-35.054377-1.642406L165.985382 571.71094 165.985382 571.71094zM337.116971 321.242422l11.128455 6.387477 4.945639-15.966647 17.143449-13.547551-13.485129-2.361791 0-12.716626-14.147208 16.731056-19.113313 3.190669 6.743588 12.660344-11.68411 16.685008L337.116971 321.242422 337.116971 321.242422zM409.112702 459.580117l-52.92949 16.672728-24.610514-46.896076-16.009625 66.831105-56.631812 29.389354 44.926212 10.356882-10.422374 67.590398 43.677778-56.471153 51.752688 15.909341-18.536168-52.462862L409.112702 459.580117 409.112702 459.580117zM318.087569 757.775636l-7.426133-48.437176-25.829272 39.693024-52.374858-1.540076 33.260521 35.000142-20.884656 46.142923 46.781466-23.851221 35.05847 33.372062-2.464121-50.146097 45.565778-20.650319L318.087569 757.775636 318.087569 757.775636zM486.543212 121.31909l-97.562013 801.681612 105.343233 2.219551-2.574638-803.901163C488.338091 116.835985 486.543212 121.31909 486.543212 121.31909L486.543212 121.31909zM816.810171 202.928782c0 0-82.105996-52.521191-237.605559-15.656585 0 0 198.689225-18.948561 248.78211 132.883473 0 0 34.591843 154.038282-83.770915 272.41025 0 0-85.546352 94.934163-142.617162 118.371968L525.633508 104.634082c0 0-6.033413-9.978259-6.033413 5.605671l0 806.120714c0 0 92.421946-32.386618 101.069907-48.037063l-12.109806-100.501972c0 0 254.016321-127.271662 305.814034-338.261027C914.439722 429.559383 962.846198 274.337135 816.810171 202.928782L816.810171 202.928782zM816.810171 202.928782"
            fill="#707070" p-id="2396"></path></svg>`,
        },
        {
          name: "project",
          svg:`<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3832" width="20" height="20"><path d="M510.0032 492.9536c-12.16 0-24.3456-2.3808-35.9424-7.1168L71.7824 300.5952c-11.3408-4.6336-18.816-15.5648-19.072-27.8016s6.784-23.4496 17.92-28.544l400.1536-183.296a100.1728 100.1728 0 0 1 82.7648-0.3072l398.1056 178.8416c11.1616 5.0176 18.2784 16.1792 18.1248 28.416s-7.5776 23.2192-18.8672 27.9296l-404.3264 189.7216a94.26944 94.26944 0 0 1-36.5824 7.3984zM160.64 270.592l336.7424 158.3872a33.0496 33.0496 0 0 0 25.5232-0.1024l338.9952-162.3808-333.5424-149.8112a38.6688 38.6688 0 0 0-32 0.128L160.64 270.592z" fill="#707070" p-id="3833"></path><path d="M510.1568 722.7648c-14.4896 0-28.9536-3.3536-42.1632-10.0864L68.3264 509.0816c-8.576-4.3776-15.0784-12.2624-16.9472-21.6832a30.7072 30.7072 0 0 1 15.0272-32.8192l189.6704-106.9568c19.5584-11.0336 44.3136-4.1216 55.3472 15.4368l10.2144 18.1248-175.1808 98.7904L495.872 657.92a31.5392 31.5392 0 0 0 28.672-0.0512l354.0224-181.9136-175.9488-100.736 10.3424-18.0736c11.1616-19.4816 35.968-26.2144 55.4496-15.0784l189.7984 108.672c9.7792 5.6064 15.6928 16.1024 15.4368 27.3664s-6.656 21.4784-16.6656 26.624l-404.352 207.7696a92.53376 92.53376 0 0 1-42.4704 10.2656z" fill="#707070" p-id="3834"></path><path d="M512.2048 975.9744c-4.7872 0-9.5744-1.1264-13.952-3.3536L70.2464 754.5856c-8.576-4.3776-15.0784-12.2624-16.9472-21.7088a30.72512 30.72512 0 0 1 15.0272-32.8192l192.1536-108.3648c18.176-10.24 41.2416-3.8144 51.4816 14.3616l11.6224 20.608-175.1808 98.7904 363.7504 185.2928 368.3584-189.2608-175.9488-100.736 11.7504-20.5312c10.368-18.1248 33.4592-24.3968 51.584-14.0288l192.2816 110.08c9.7792 5.6064 15.6928 16.1024 15.4368 27.3664a30.72 30.72 0 0 1-16.6656 26.624l-432.6656 222.3104a31.0272 31.0272 0 0 1-14.08 3.4048z"
            fill="#707070" p-id="3835"></path></svg>`,
        },
        {
          name:"literature",
          svg:`<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9162" width="20" height="20"><path d="M644.096 820.224h284.16c26.112 0 47.104-17.408 47.104-38.912V194.048c0-21.504-20.992-38.912-47.104-38.912h-342.528l-70.656 58.368-71.168-58.368h-343.04c-26.112 0-47.104 17.408-47.104 38.912v587.264c0 21.504 20.992 38.912 47.104 38.912h284.16c27.136 35.328 74.752 58.88 129.536 58.88 54.272 0 101.888-23.552 129.536-58.88z m-129.536 0c-41.472 0-75.776-25.6-81.408-58.88H124.928v-547.84H419.84l59.392 49.152v312.832c0 16.384 15.872 29.184 35.328 29.184 19.456 0 35.328-13.312 35.328-29.184v-312.32l59.392-49.152h294.912v547.84h-308.224c-5.632 32.768-39.936 58.368-81.408 58.368z" p-id="9163"
            fill="#707070"></path></svg>`,
        }
        ],//搜索类型论文专利等
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
    '$route'(to, from) {
      // 当路由变化时执行的代码
      console.log('当前路由:', to.path);
      const toHome=this.$refs.guideHome;
      const toAbout=this.$refs.guideAbout;
      const toLogin=this.$refs.guideLogin;
      if(to.path==="/home/recommend"){
        toHome.style.borderColor=`initial`;
        toAbout.style.borderColor=`transparent`;
        toLogin.style.borderColor=`transparent`;
      }else if(to.path==="/about") {
        toHome.style.borderColor=`transparent`;
        toAbout.style.borderColor=`initial`;
        toLogin.style.borderColor=`transparent`;
      }else if(to.path==="/login"){
        toHome.style.borderColor=`transparent`;
        toAbout.style.borderColor=`transparent`;
        toLogin.style.borderColor=`initial`;
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

  },

  methods: {
    guideTo(path){
      if(path.includes("/home")&&this.myStore.getNavigationBar===0){
        this.myStore.changeStyle(0);
      }else if(!this.$route.path.includes("/home")&&path.includes("/home")){
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
.guideAbout,.guideHome,.guideLogin{
  border-style: solid;
  border-color: transparent;
  border-width: 0px 0px 2px;
  padding: 20px 0px;
  transition: 0.2s;
}

* {
  box-sizing: border-box;
}
</style>