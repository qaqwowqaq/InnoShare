<template>
  <div class="paperComponent">
    <div class="paper_title">
      <span class="paper_title_detail">
        {{ title }}
      </span>
    </div>
    <div class="paper_author">
      <span>
        {{ authorString }}
      </span>
    </div>
    <div class="paper_content">
      <span :title="this.content">
        {{ content }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "paperComponent",
  data(){
    return{
      title:"示例的论文题目是上帝但当时就是地级市",
      author:["author1","author2"],
      content:"个体报复社会事件频发是风险社会背景下个体力量膨胀的具体表现。此类事件的生成机理多为外部社会排斥引发个体的情感畸变,从而导致其行为极化,最终个体以表演式暴力个体报复社会事件频发是风险社会背景下个体力量膨胀的具体表现。此类事件的生成机理多为外部社会排斥引发个体的情感畸变,从而导致其行为极化,最终个体以表演式暴力寻求社会承认,展示自我的越轨过程。社会排斥必然会导致个体能力的剥夺与生活机会的限制,大致分为市场、政治参与、公共服务与社会关系等四种类型的排斥。而报复动机的形成是个体情感极化的结果,由社会排斥带来的某些负性情感体验经过环境的持续刺激趋向极端化。个体报复社会事件的发生并非偶然,由遭遇排斥到最终的个体报复行为经历了一个漫长的过程。因此,对于此类事件的预警与防控必须摒弃\"突发\"\"偶然\"的陈旧观念,树立过程控制的理念,在维持刚性社会结构的稳定与弹性社会心态的舒展中寻求柔性治理。",
      authorString:""
    }
  },
  mounted() {
    this.authorString=this.author.toLocaleString()
  },
  methods:{

  }
}
</script>

<style scoped>
.paperComponent{
  background-color: rgb(255, 255, 255);
  padding: 20px 30px 20px 30px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  transition: all .3s;
  -webkit-transition: all .3s;
  color: #232222;
  text-align: left;
  height: 220px;
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.paperComponent:hover{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.28);
}
.paper_title_detail{
  flex: 1;
  color: #4782b4;
  cursor: pointer;
}
.paper_title_detail:hover{
  text-decoration: underline;
  color: #224767;
}
.paper_author,.paper_title{
  flex: 1;
}
.paper_content{
  height: 150px;
  flex: 8;
  overflow: hidden; /* 隐藏超出部分 */
}
.paper_content span{
  display: inline-block;

  text-overflow: ellipsis; /* 超出部分用省略号表示 */
}
</style>