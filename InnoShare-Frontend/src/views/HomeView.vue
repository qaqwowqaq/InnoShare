<template>
  <div class="home">

    <div ref="back1" class="backgroundImg" >

      <div ref="search1" class="centerFlex">
      <div class="text--search">
        <div class="text1">
          What can I say.
        </div>
        <div class="text2">

          Search everything you are interested.
        </div>
        <div class="container---s-RT standard--OWAow padded--l0Z01 heroSearch--0FfMR">
          <form class="searchForm--XoxyI" >
            <button class="submit--EM+-q" type="submit" aria-label="Search for what you want">
              <svg t="1725956324198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6176" width="16" height="16">
                <path d="M716.29895 806.808621C641.509798 862.822176 548.629446 896 448 896 200.576432 896 0 695.423565 0 448 0 200.576432 200.576432 0 448 0 695.423565 0 896 200.576432 896 448 896 548.629446 862.822176 641.509798 806.808621 716.29895L946.011456 855.501786C970.889978 880.380314 970.970976 920.635366 945.803174 945.803174 920.809619 970.79673 879.927322 970.436992 855.501786 946.011456L716.29895 806.808621ZM448 768C624.73112 768 768 624.73112 768 448 768 271.26888 624.73112 128 448 128 271.26888 128 128 271.26888 128 448 128 624.73112 271.26888 768 448 768Z" fill="#666666" p-id="6177"></path>
              </svg>
            </button>
            <input type="search" name="search" placeholder="Search for all images on Pixabay" value="">
          </form>
          <div class="container--YKYLB">
            <div class="triggerWrapper--NACCC">
              <button  @click="changePaper" class="searchType" type="button">
                <span class="label--Ngqjq">All images</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    </div>

    <div ref="back2"  class="backgroundImg2">
      <div ref="search2" class="centerFlex">
        <div class="text--search">
          <div class="text1" style="color: #dad3d3">
            What can I say.
          </div>
          <div class="text2" style="color: #dad3d3">

            Search everything you are interested.
          </div>
          <div class="container---s-RT standard--OWAow padded--l0Z01 heroSearch--0FfMR">
            <form class="searchForm--XoxyI" >
              <button class="submit--EM+-q" type="submit" aria-label="Search for what you want">
                <svg t="1725956324198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6176" width="16" height="16">
                  <path d="M716.29895 806.808621C641.509798 862.822176 548.629446 896 448 896 200.576432 896 0 695.423565 0 448 0 200.576432 200.576432 0 448 0 695.423565 0 896 200.576432 896 448 896 548.629446 862.822176 641.509798 806.808621 716.29895L946.011456 855.501786C970.889978 880.380314 970.970976 920.635366 945.803174 945.803174 920.809619 970.79673 879.927322 970.436992 855.501786 946.011456L716.29895 806.808621ZM448 768C624.73112 768 768 624.73112 768 448 768 271.26888 624.73112 128 448 128 271.26888 128 128 271.26888 128 448 128 624.73112 271.26888 768 448 768Z" fill="#666666" p-id="6177"></path>
                </svg>
              </button>
              <input type="search" name="search" placeholder="Search for all images on Pixabay" value="">
            </form>
            <div class="container--YKYLB">
              <div class="triggerWrapper--NACCC">
                <button  @click="changePaper2" class="searchType" type="button">
                  <span class="label--Ngqjq">All images</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div ref="back3" class="backgroundImg3">
      <div ref="search3" class="centerFlex">
        <div class="text--search">
          <div class="text1" style="color: #b9b7b7">
            What can I say.
          </div>
          <div class="text2" style="color: #dad3d3">

            Search everything you are interested.
          </div>
          <div class="container---s-RT standard--OWAow padded--l0Z01 heroSearch--0FfMR">
            <form class="searchForm--XoxyI" >
              <button  class="submit--EM+-q" type="submit" aria-label="Search for what you want">
                <svg t="1725956324198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6176" width="16" height="16">
                  <path d="M716.29895 806.808621C641.509798 862.822176 548.629446 896 448 896 200.576432 896 0 695.423565 0 448 0 200.576432 200.576432 0 448 0 695.423565 0 896 200.576432 896 448 896 548.629446 862.822176 641.509798 806.808621 716.29895L946.011456 855.501786C970.889978 880.380314 970.970976 920.635366 945.803174 945.803174 920.809619 970.79673 879.927322 970.436992 855.501786 946.011456L716.29895 806.808621ZM448 768C624.73112 768 768 624.73112 768 448 768 271.26888 624.73112 128 448 128 271.26888 128 128 271.26888 128 448 128 624.73112 271.26888 768 448 768Z" fill="#666666" p-id="6177"></path>
                </svg>
              </button>
              <input type="search" name="search" placeholder="Search for all images on Pixabay" value="">
            </form>
            <div class="container--YKYLB">
              <div class="triggerWrapper--NACCC">
                <button @click="changePaper3" class="searchType" type="button">
                  <span class="label--Ngqjq">All images</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div ref="content" class="content">
      <div class="flexStats">
        <div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',

  methods :{
    changePaper(){
      const back1=this.$refs.back1;
      const back2=this.$refs.back2;
      const back3=this.$refs.back3;
      const search1=this.$refs.search1;
      const search2=this.$refs.search2;
      const search3=this.$refs.search3;
      search1.style.transition='none';
      back2.style.transition='none';
      back3.style.transition='none';
      //back2变为第一个
      back2.style.zIndex='11';
      back2.style.left='0';
      back2.style.opacity='1'
      //back3变为背景第二个
      back3.style.zIndex='10';
      back3.style.left='15px';
      back3.style.opacity='0';
      //back1变为第三个
      back1.style.zIndex='9';
      back1.style.left='30px';
      back1.style.opacity='0';
      //type.style.visibility='true';
    },
    changePaper2(){
      const back1=this.$refs.back1;
      const back2=this.$refs.back2;
      const back3=this.$refs.back3;
      //back1变为第二个
      back1.style.zIndex='10';
      back1.style.left='15px';
      back1.style.opacity='0';
      //back2变为第三个
      back2.style.zIndex='9';
      back2.style.left='30px';
      back2.style.opacity='0'
      //back3变为背景第一个
      back3.style.zIndex='11';
      back3.style.left='0';
      back3.style.opacity='1'
    },
    changePaper3(){
      const back1=this.$refs.back1;
      const back2=this.$refs.back2;
      const back3=this.$refs.back3;
      //back1变为第一个
      back1.style.zIndex='11';
      back1.style.left='0';
      back1.style.opacity='1'
      //back2变为第二个
      back2.style.zIndex='10';
      back2.style.left='15px'
      back2.style.opacity='0'
      //back3变为第三个
      back3.style.zIndex='9';
      back3.style.left='30px';
      back3.style.opacity='0'

    }
  }
}


</script>
<style scoped>
@font-face {
  font-family: 'myFont';
  src: url('../assets/AlimamaDaoLiTi.woff2') format('woff2'),
  url('../assets/AlimamaDaoLiTi.woff') format('woff');
  font-display: swap;
}
.home {
  width: 100%;
  height: 2000px;
}

.backgroundImg {
  width: 100%;
  background-color: #c9c6c6;
  background-image: url('../assets/BackgroundImg/back3.jpg');
  display: flex;
  flex-direction: row;
  z-index: 11;
}
.backgroundImg2 {
  /*left: 15px;*/
  width: 100%;
  background-image: url('../assets/BackgroundImg/back5.png');
  z-index: 9;
}
.backgroundImg3 {
  /*left: 30px;*/
  width: 100%;
  background-image: url('../assets/BackgroundImg/back5.jpg');
  z-index: 8;
}
.backgroundImg,.backgroundImg2,.backgroundImg3{
  transition: none;
  position: absolute;
  background-size: cover;
  box-shadow: 1px 4px 4px -5px rgb(128, 125, 125);
  min-height: 705px;
  border-radius: 0 0 5px 5px;
}


.backgroundImg .centerFlex {
  width: 100%;
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
  min-height: 600px;
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
  font-size: 32px;
  line-height: 48px;
  margin: 0 0 10px 5px;
  font-family: myFont,sans-serif;
}
.text2 {
  font-size: 14px;
  color: #1a1a1a;
  margin: 0 0 10px 5px;
  font-family: myFont,sans-serif;
}
.text1,.text2 {
  transition: 0.8s;
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
  padding: 0 0 0 24px;
  border-radius: 56px;
}
.heroSearch--0FfMR {
  box-shadow: 0 16px 40px rgba(25, 27, 38, .08);
}
.container---s-RT {
  padding: 0 0 0 8px;
  height: 40px;
  border-radius: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  transition: 0.5s;
}
.container---s-RT:hover {
  //box-shadow: 1px 10px 9px -4px rgba(150, 150, 150, 0.76);
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
}
.searchType {
  transition: 1.0s;
  background: transparent;
  color: #ffffff;
  border: none;
  margin-right: 8px;
  border-radius: 56px;

  cursor: pointer;
}
.searchType span {
  padding-left: 10px;
}


.type---search {
  position: relative;
  z-index: 12;
  background: transparent;
  width: 400px;
  min-height: 50px;
  left: 50%;
  transform: translate(-50%,0);
  display: flex;

  top: 300px;
}
.type---search div {
  flex: auto;
  font-family: myFont,sans-serif;
}

.content {
  position: relative;
  top: 480px;
  height: 200px;
  background-color: #b5d2e0;
  z-index: 7;
  transition: 0.5s;
}
.move-up {
  transform: translateY(-15px);
}
.flexStats {
  display: flex;
  width: 100%;
  height: 100%;
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
}
.container--YKYLB {
  display: flex;
  justify-content: center;
  height: 100%;
  border-radius: 56px;
  background-color: rgba(54, 105, 143, 0.89);
  width: 13%;
}


input {
  /* 取消搜索栏边框 */
  outline: none;

}

</style>
