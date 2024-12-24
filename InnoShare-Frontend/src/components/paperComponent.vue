<template>
  <div class="paperComponent">
    <div class="type_tag" style="position: absolute;">Paper</div>
    <div class="paper_title">
      <span class="paper_title_detail" @click="jump_detail">
        {{ title }}
      </span>

    </div>
    <div class="paper_author">
      <span class="paper_author_list" style="display: flex;flex-direction: row;column-gap: 10px;flex-wrap: wrap">
        <span v-for="item in this.author" @click="jumpToAuthor(item)" style="text-decoration: underline;
        cursor: pointer" class="author_hover">
          {{ item }}
        </span>
      </span>
    </div>
    <div class="paper_content">
      <!--
      <div v-html="this.content" :title="this.content" style="font-weight: 500">

      </div>
      -->
      <strong style="color: brown">Abstract:</strong>
      <span v-html="this.content" :title="this.text"  style="color: #656f79;font-size: 15px;font-weight: 400;font-style: italic" >

      </span>
    </div>
    <div class="paper_tag_like">
      <div class="paper_tag" style="" >
        <span v-for="(item,index) in tags"
              class="tag_text"
              :key="item"
              :style="{ backgroundColor: this.colors[index%2] }"
              @click="jumpToTag(item)">
          {{item}}
        </span>


      </div>
      <div class="paper_like">
        <div class="paper_like_like">
          <!-- > 下载量 <-->
          <div  ref="like" v-html="this.icons[0].svg" style="display: flex;align-items: center;justify-content: center;transition: 0.5s"></div>
          <span>{{this.formatNumber(this.likes)}}</span>
        </div>
        <div  class="paper_like_favor">
          <!-- > 引用量 <-->
          <div  ref="favor" v-html="this.icons[1].svg" style="display: flex;align-items: center;justify-content: center"></div>
          <span>{{ this.formatNumber(this.favors) }}</span>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
import mk from 'markdown-it-mathjax';
import MarkdownIt from "markdown-it/lib/index.mjs"; // 使用 MathJax 插件解析数学公式
export default {
  name: "paperComponent",
  props:{
    message:{},
  },
  data(){
    return{
      title:"test",
      author:[],
      content:"",
      text:"",
      tags:[],//标签
      likes:1182,//下载量
      favors:1002,//引用量
      views:0,//阅读量,
      colors:["rgba(76,175,80,0.91)","rgba(33,150,243,0.89)"],
      icons:[
          //包括下载，浏览次数展示
        {
          name:"liked",
          svg:`<svg t="1734747910912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17872" width="21" height="21"><path d="M896 800a80 80 0 0 1-80 80H208a80 80 0 0 1-80-80V616a40 40 0 0 1 80 0V752a48 48 0 0 0 48 48h512a48 48 0 0 0 48-48v-136a40 40 0 0 1 80 0V800z" fill="#333333" p-id="17873"></path><path d="M480 160m40 0l0 0q40 0 40 40l0 368q0 40-40 40l0 0q-40 0-40-40l0-368q0-40 40-40Z" fill="#009944" p-id="17874"></path><path d="M354.176 458.176a40 40 0 0 1 56.576 0l147.072 147.072a40 40 0 0 1-56.576 56.576l-147.072-147.072a40 40 0 0 1 0-56.576z" fill="#009944" p-id="17875"></path><path d="M701.824 458.176a40 40 0 0 1 0 56.576l-147.072 147.072a40 40 0 0 1-56.576-56.576l147.072-147.072a40 40 0 0 1 56.576 0z" fill="#009944" p-id="17876"></path></svg>`,
        },
        {
          name:"like",
          svg: `<svg t="1734663423106" class="icon" viewBox="0 0 1536 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14678" id="mx_n_1734663423107" width="21" height="21"><path d="M540.444444 56.888889A199.111111 199.111111 0 1 1 341.333333 256 199.111111 199.111111 0 0 1 540.444444 56.888889z m-341.333333 568.888889A199.111111 199.111111 0 1 1 0 824.888889 199.111111 199.111111 0 0 1 199.111111 625.777778z m796.444445-56.888889a199.111111 199.111111 0 1 1-199.111112 199.111111 199.111111 199.111111 0 0 1 199.111112-199.111111z m341.333333-568.888889A199.111111 199.111111 0 1 1 1137.777778 199.111111 199.111111 199.111111 0 0 1 1336.888889 0z" fill="#1296db" p-id="14679"></path><path d="M1336.888889 398.222222A199.111111 199.111111 0 1 1 1536 199.111111 199.111111 199.111111 0 0 1 1336.888889 398.222222z m0-284.444444A85.333333 85.333333 0 1 0 1422.222222 199.111111 85.333333 85.333333 0 0 0 1336.888889 113.777778z m-341.333333 853.333333a199.111111 199.111111 0 1 1 199.111111-199.111111 199.111111 199.111111 0 0 1-199.111111 199.111111z m0-284.444444a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m-455.111112-227.555556A199.111111 199.111111 0 1 1 739.555556 256 199.111111 199.111111 0 0 1 540.444444 455.111111z m0-284.444444A85.333333 85.333333 0 1 0 625.777778 256 85.333333 85.333333 0 0 0 540.444444 170.666667z m-341.333333 853.333333A199.111111 199.111111 0 1 1 398.222222 824.888889 199.111111 199.111111 0 0 1 199.111111 1024z m0-284.444444A85.333333 85.333333 0 1 0 284.444444 824.888889 85.333333 85.333333 0 0 0 199.111111 739.555556z" fill="#1296db" p-id="14680"></path><path d="M1100.913778 645.859556l-40.220445-40.220445 227.555556-284.444444 40.277333 40.220444z m-438.385778-227.555556l40.220444-40.220444 227.555556 227.555555-40.220444 40.220445zM204.8 665.6l227.555556-284.444444 45.511111 34.133333-227.555556 284.444444z"
                fill="#1296db" p-id="14681"></path></svg>`,
        },
        // {
        //   name:"favored",
        //   svg:`<svg t="1733841817472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="45948" id="mx_n_1733841817472" width="17" height="17"><path d="M801.131795 0.000492H222.879036c-30.493484 0.041846-54.476703 29.50444-54.509196 65.156808V993.209807c0 10.680596 4.735992 20.708394 12.740409 26.332507l0.257476 0.178708c8.515923 5.832359 19.19652 5.693528 27.59872-0.376123L512 800.369288l303.03257 218.975119c8.488354 6.131681 19.299904 6.211435 27.857674 0.1984 8.004417-5.624113 12.740408-15.651911 12.740408-26.332507V65.164192c-0.032492-35.65926-24.015711-65.121854-54.498365-65.1637z" fill="#707070" p-id="45949"></path><path d="M222.889867 15.754311h578.231097-0.010831c21.001809 0.029046 38.741101 21.8215 38.766208 49.417266V993.209807c0 5.755067-2.431996 10.905088-6.043558 13.44293-3.057225 2.147935-6.527988 2.121842-9.574875-0.078769L512 780.933507 199.741108 1006.575937c-3.04541 2.200119-6.516665 2.225227-9.573891 0.077785-3.611071-2.537842-6.043559-7.687863-6.043558-13.44293V65.164192c0.025108-27.588874 17.764399-49.380835 38.766208-49.409881z"
        //         fill="#f4ea29" p-id="45950" data-spm-anchor-id="a313x.search_index.0.i23.75313a812D8vY0" class="selected"></path></svg>`,
        // },
        // {
        //   name:"favor",
        //   svg:`<svg t="1733841850685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="46212" id="mx_n_1733841850686" width="17" height="17"><path d="M801.131795 0.000492H222.879036c-30.493484 0.041846-54.476703 29.50444-54.509196 65.156808V993.209807c0 10.680596 4.735992 20.708394 12.740409 26.332507l0.257476 0.178708c8.515923 5.832359 19.19652 5.693528 27.59872-0.376123L512 800.369288l303.03257 218.975119c8.488354 6.131681 19.299904 6.211435 27.857674 0.1984 8.004417-5.624113 12.740408-15.651911 12.740408-26.332507V65.164192c-0.032492-35.65926-24.015711-65.121854-54.498365-65.1637z" fill="#707070" p-id="46213"></path><path d="M222.889867 15.754311h578.231097-0.010831c21.001809 0.029046 38.741101 21.8215 38.766208 49.417266V993.209807c0 5.755067-2.431996 10.905088-6.043558 13.44293-3.057225 2.147935-6.527988 2.121842-9.574875-0.078769L512 780.933507 199.741108 1006.575937c-3.04541 2.200119-6.516665 2.225227-9.573891 0.077785-3.611071-2.537842-6.043559-7.687863-6.043558-13.44293V65.164192c0.025108-27.588874 17.764399-49.380835 38.766208-49.409881z"
        //         fill="#707070" p-id="46214"></path></svg>`,
        // },
        {
          name:"view",
          svg: `<svg t="1733810249729" class="icon" viewBox="0 0 1823 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1513" width="24" height="24"><path d="M911.5727 0A1116.676558 1116.676558 0 0 0 0 512a1116.676558 1116.676558 0 0 0 911.5727 512 1116.676558 1116.676558 0 0 0 911.572701-512A1116.676558 1116.676558 0 0 0 911.5727 0z" fill="#DAD6CA" p-id="1514"></path><path d="M873.590504 303.857567a227.893175 227.893175 0 0 0-97.994065 22.789317A75.964392 75.964392 0 0 1 668.486647 432.997033 227.893175 227.893175 0 1 0 873.590504 303.857567z" fill="#C1BCB2" p-id="1515"></path><path d="M911.5727 264.356083a227.893175 227.893175 0 0 0-97.994065 22.789318A75.964392 75.964392 0 0 1 706.468843 395.014837 227.893175 227.893175 0 1 0 911.5727 264.356083z" fill="#4B5160" p-id="1516"></path></svg>`,
        }
      ]
    }
  },
  mounted() {
    this.author=this.message.author.split(", ").map((author, index, array) => {
      return index === array.length - 1 ? author.trim() : author.trim() + ',';
    });
    this.title=this.message.title;
    //处理标签格式
    if(this.message.subject.match(/\((.*?)\)/)){
      //存在括号
      this.tags=[this.message.subject.match(/\((.*?)\)/)[1].split('.')[0],
        this.message.subject.split(' (')[0]];
    }else {
      //不存在括号的内容，处理为一个标签
      this.tags=this.message.subject.trim();
    }

    this.text=this.message.abstractText;
    this.content=this.handleMath(this.message.abstractText);
    this.tag=this.message.subject;
    this.likes=this.message.downloadCount;
    this.favors=this.message.citationCount;
  },
  methods:{
    jumpToTag(tag){
      this.$router.push({
        path: '/search',
        query: {
          type: "paper",
          query: "default",
          subject: `${tag}`, // 可根据需要添加更多参数
          subjectLevel: 1,
          sortBy: '_score',
          order: 'desc',
          page: 1,
        }
      });
    },
    jumpToAuthor(name){
      this.$router.push({
        name: 'AuthorDetail',
        params: { name: name.split(',')[0] }
      });
    },
    handleMath(abstractText){
      {
        if (!abstractText) return '';
        const truncated = abstractText.length > 250 ? abstractText.slice(0, 250) + '...' : abstractText;
        if (window.MathJax) {
          window.MathJax.Hub.Config({
            tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
          });
          window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
        }
        return truncated;
      }
    },
    formatNumber(num) {
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'w+'; // 万级别
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k+'; // 千级别
      } else if(num===null){
        return "0";
      } else {
        return num.toString(); // 小于千的直接返回
      }
    },
    jump_detail(){
      this.$router.push({
          path:`/paper/${this.message.paperId}`,
          query: {
            id: this.message.paperId
          }
      });
    }
  },


}
</script>

<style scoped>

.paperComponent{
  position: relative;
  background-color: rgb(249, 250, 249);
  padding: 20px 30px 20px 30px;
  /*color: #f1df2f;*/
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  transition: all 0.5s;
  color: #232222;
  text-align: left;
  height: 220px;
  width: 610px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.paperComponent:hover{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.28);
  transform: translateY(-3px);
}
.type_tag{
  position: absolute;
  transform: rotateZ(45deg);
  left: 606px;
  top: 8px;
  padding: 0 20px 0 20px;
  background-color: #413434;
  color: white;
  clip-path: polygon(29% 0, 71% 0, 100% 100%, 0 100%);
}
.paper_title_detail{
flex: 1;
color: #4782b4;
cursor: pointer;
text-overflow: ellipsis; /* 超出部分用省略号表示 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.paper_title_detail:hover{
  text-decoration: underline;
  color: #224767;
}
.paper_author,.paper_title{
  flex: 1;
}
.paper_author_list{
  display: flex;
  flex-flow: nowrap;
  column-gap: 10px;
  height: 25.5px;
  flex-wrap: wrap;
  overflow: hidden;
}
.paper_author_list span{
  height: 26px;
  text-wrap: none;
  color: rgba(19,19,19,0.89);
  transition: 0.5s;
}
.paper_author_list span:hover{
  color: #7a7777;
}
.paper_content{
  display: flex;
  flex-direction:row ;
  height: 150px;
  flex: 10;
  overflow: hidden; /* 隐藏超出部分 */
}

.paper_content span{
  padding: 0;
  margin: 0;
  height: 100%;
  display: inline-block;
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.paper_content div p{
  padding: 0;
  margin: 0;
}
.paper_tag_like{
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.paper_like {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.paper_like_like,.paper_like_favor,.paper_like_view{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /*width: 60px;*/
  gap: 2px;
  cursor: pointer;
}
.paper_like span{
  font-size: 10px;
}
.paper_tag{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
}
.tag_text{
  background-color: rgba(255, 223, 64, 0.68);
  padding: 4px 15px 4px 15px;
  border-radius: 15px;
  font-weight:600;
  cursor: pointer;
  transition: 0.5s;
  font-size: 10px;
  color: rgba(255,255,255,1);
  box-shadow:  0 50px 100px -20px rgba(50,50,93,0.25), 0 30px 60px -30px rgba(0,0,0,0.3),inset 0 -2px 6px 0 rgba(10,37,64,0.35);
  border-color: transparent;
  border-width: 1px;
  border-style: solid;
}
.tag_text:hover{

  border: #575656 1px solid;
}

</style>