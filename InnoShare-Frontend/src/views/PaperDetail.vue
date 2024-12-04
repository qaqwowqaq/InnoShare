<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

  <div class="container mx-auto py-8 px-4">
    <div class="border rounded-lg p-6 bg-white shadow-md mb-6">
      <!-- 标题与作者信息 -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ paperDetails.title }}</h1>
        <p class="text-gray-600">作者: {{ paperDetails.author }} | {{ paperDetails.institution }}</p>
      </div>

      <!-- 摘要与关键词 -->
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-3">摘要</h2>
        <p class="text-gray-800">{{ paperDetails.abstract }}</p>
        <div class="mt-3">
          <span class="text-gray-600 font-semibold">关键词:</span>
          <span class="text-blue-500" v-for="(keyword, index) in paperDetails.keywords" :key="index">
            {{ keyword }}{{ index < paperDetails.keywords.length - 1 ? ',' : '' }}
          </span>
        </div>
      </div>
    </div>

 <!-- 下载与引用 -->
 <div class="border mb-6 flex items-center space-x-6 p-4 rounded-lg bg-gray-50 shadow">
    <button 
      class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      @click="openPDFPreview"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m3.75 4.5v4.5m0-4.5a3 3 0 01-3-3v1.5m3 4.5a3 3 0 003-3v1.5M9 12h6" />
      </svg>
      <span>在线预览</span>
    </button>

    <button 
      class="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      @click="downloadPDF"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0 0V4m0 8l3-3m-6 0l3 3m9 5.25V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-1.75m9 5.25h3M6 21h3" />
      </svg>
      <span>PDF 下载</span>
    </button>

    <div class="text-sm text-gray-700">
      下载量: <span class="font-bold">{{ paperDetails.downloadCount }}</span>
      引用量: <span class="font-bold">{{ paperDetails.citationCount }}</span>
    </div>
  </div>

  <!-- PDF 预览弹窗 -->
  <div 
    v-if="showPDFPreview" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div 
      class="relative w-11/12 max-w-4xl bg-white rounded-lg shadow-lg p-6 mx-auto"
    >
      <!-- 关闭按钮 -->
      <button 
        class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        @click="closePDFPreview"
      >
        &times;
      </button>

      <!-- PDF 预览内容 -->
      <iframe 
        src="/path/to/your/pdf/document.pdf" 
        class="w-full h-[70vh] border rounded-lg" 
        title="PDF 预览"
      ></iframe>
    </div>
  </div>


    

    <!-- 引文网络 -->
    <div class="container mx-auto py-8 px-4">
    <!-- 导航栏 -->
    <nav class="flex justify-around mb-4 border-b-2">
      <button
        v-for="tab in tabs"
        :key="tab.type"
        class="py-2 px-4 hover:bg-gray-200"
        :class="{ 'font-bold border-b-4 border-blue-500': selectedTab === tab.type }"
        @click="changeTab(tab.type)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- ECharts 图表 -->
    <div id="citation-network" class="w-full h-96 mb-6"></div>

<!-- 文献列表 -->
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ tabTitle }}</h2>
  <ul class="space-y-2">
    <li 
      v-for="(paper, index) in filteredPapers"
      :key="paper.id"
      class="text-gray-700 text-sm"
    >
      <!-- 序号和文献信息 -->
      <a 
        :href="'/papers/' + paper.id" 
        target="_blank" 
        class="flex text-left items-center hover:text-blue-600 transition"
      >
        <span class="font-semibold">[{{ index + 1 }}]
          <span class="ml-2 font-medium">
          {{ paper.title }} {{ paper.author }}. {{ paper.institution }}
        </span></span>    
      </a>
    </li>
  </ul>
</div>



  </div>

    <div class="container mx-auto py-8 px-4">
    <!-- 核心文献推荐 -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">核心文献推荐</h2>

      <!-- 五部分在一行布局 -->
      <div class="flex space-x-6">
        <!-- 研究起点 -->
        <div class="flex-1 border rounded-lg p-6 bg-yellow-100">
          <div class="flex justify-center ">
    <h3 class="font-semibold text-lg mb-3 text-center w-full">研究起点</h3>
  </div>
          <div>
            <span 
              v-for="keyword in researchStartKeywords" 
              :key="keyword" 
              class="block bg-yellow-300 text-gray-700 py-1 px-2 rounded-full mb-2 cursor-pointer hover:bg-yellow-400"
              @click="showPapers(keyword)"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
        <!-- 研究来源 -->
        <div class="flex-1 border rounded-lg p-6 bg-orange-100">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-lg mb-3 w-full">研究来源</h3>
            
          </div>
          <div>
            <span 
              v-for="keyword in researchSourceKeywords" 
              :key="keyword" 
              class="block bg-orange-300 text-gray-700 py-1 px-3 rounded-full mb-2 cursor-pointer hover:bg-orange-400"
              @click="showPapers(keyword)"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
        <!-- 节点文献 -->
        <div class="flex-1 border rounded-lg p-6 bg-white">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-lg mb-3 w-full">节点文献</h3>
          </div>
          <div>
            <span 
              v-for="keyword in coreLiteratureKeywords" 
              :key="keyword" 
              class="block bg-gray-200 text-gray-700 py-1 px-3 rounded-full mb-2 cursor-pointer hover:bg-gray-300"
              @click="showPapers(keyword)"
            >
              {{ keyword }}
            </span>
          </div>
        </div>

        <!-- 研究分支 -->
        <div class="flex-1 border rounded-lg p-6 bg-blue-100">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-lg mb-3 w-full">研究分支</h3>
          </div>
          <div>
            <span 
              v-for="keyword in researchBranchKeywords" 
              :key="keyword" 
              class="block bg-blue-300 text-gray-700 py-1 px-3 rounded-full mb-2 cursor-pointer hover:bg-blue-400"
              @click="showPapers(keyword)"
            >
              {{ keyword }}
            </span>
          </div>
        </div>

        <!-- 研究去脉 -->
        <div class="flex-1 border rounded-lg p-6 bg-blue-200">
          <div class="flex items-center justify-between ">
              <h3 class="font-semibold text-lg mb-3  w-full">研究去脉</h3>

          </div>
          <div>
            <span 
              v-for="keyword in researchTrackbackKeywords" 
              :key="keyword" 
              class="block bg-blue-400 text-gray-700 py-1 px-3 rounded-full mb-2 cursor-pointer hover:bg-blue-500"
              @click="showPapers(keyword)"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐论文展示 -->
<div v-if="selectedKeyword" class="mt-8">
  <h3 class="text-xl font-semibold">推荐论文 (关键词: {{ selectedKeyword }})</h3>
  <ul class="space-y-4 mt-4">
    <li 
      v-for="(paper, index) in filteredPapers1" 
      :key="paper.id" 
      class="border-b pb-4 cursor-pointer hover:bg-gray-100"
    >
      <!-- 推荐论文条目 -->
      <a 
        :href="'/paper/' + paper.id" 
        target="_blank" 
        class="flex text-left items-start hover:text-blue-600 transition"
      >
        <span class="font-semibold mr-2">[{{ index + 1 }}]
          <span class="font-medium">
          {{ paper.title }} {{ paper.author }}. {{ paper.institution }}
        </span></span>
        
      </a>
    </li>
  </ul>
</div>

  </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

import * as echarts from "echarts";
const router = useRouter();
// 导航栏选项
// 导航栏选项
const tabs = [
  { type: "all", label: "所有引用关系" },
  { type: "references", label: "参考文献" },
  { type: "citations", label: "引证文献" },
  { type: "co-citations", label: "共引关系" },
  { type: "co-references", label: "同被引用" },
];

const selectedTab = ref("all");
const tabTitle = ref("所有引用关系");

// 示例文献和引用关系数据
const citationData = {
  nodes: [
    { id: "current", name: "节点文献", category: 0, value: 10 },
    { id: "ref1", name: "参考文献1", category: 1, value: 5 },
    { id: "ref2", name: "参考文献2", category: 1, value: 5 },
    { id: "cite1", name: "引证文献1", category: 2, value: 5 },
    { id: "cite2", name: "引证文献2", category: 2, value: 5 },
    { id: "co1", name: "共引文献1", category: 3, value: 5 },
    { id: "co2", name: "共引文献2", category: 3, value: 5 },
    { id: "coref1", name: "同被引文献1", category: 4, value: 5 },
    { id: "coref2", name: "同被引文献2", category: 4, value: 5 },
  ],
  links: [
    { source: "current", target: "ref1" },
    { source: "current", target: "ref2" },
    { source: "cite1", target: "current" },
    { source: "cite2", target: "current" },
    { source: "ref1", target: "co1" },
    { source: "ref2", target: "co2" },
    { source: "ref1", target: "coref1" },
    { source: "ref2", target: "coref2" },
  ],
};

// 动态过滤后的文献列表
const filteredPapers = ref([]);

// 切换导航栏选项
const changeTab = (type) => {
  selectedTab.value = type;
  tabTitle.value = tabs.find((tab) => tab.type === type)?.label || "文献列表";

  // 根据选项更新图表链接
  const newLinks =
    type === "all"
      ? citationData.links
      : citationData.links.filter((link) => {
          if (type === "references") return link.source === "current";
          if (type === "citations") return link.target === "current";
          if (type === "co-citations") return link.target.startsWith("co");
          if (type === "co-references") return link.target.startsWith("coref");
        });

  updateChart({ nodes: citationData.nodes, links: newLinks });

  // 根据选项更新文献列表
  const nodeIds =
    type === "all"
      ? citationData.nodes.map((node) => node.id)
      : newLinks.map((link) =>
          type === "references" || type === "co-references"
            ? link.target
            : link.source
        );

  filteredPapers.value = citationData.nodes
    .filter((node) => nodeIds.includes(node.id))
    .map((node) => ({
      id: node.id,
      title: node.name,
      author: `作者 ${node.id}`, // 模拟数据
      institution: `机构 ${node.id}`, // 模拟数据
    }));
};

// 初始化 ECharts 图表
let chartInstance;
const initChart = () => {
  const container = document.getElementById("citation-network");
  chartInstance = echarts.init(container);

  const options = {
  tooltip: {},
  legend: {
    data: ["节点文献", "参考文献", "引证文献", "共引关系", "同被引文献"],
    bottom: 0,
  },
  series: [
    {
      type: "graph",
      layout: "force",
      force: {
        repulsion: 200, // 增大排斥力以防止重叠
        edgeLength: [50, 200], // 调整边的长度范围
        gravity: 0.1, // 调整重力参数，让节点自然分布
      },
      data: citationData.nodes.map((node) => ({
        ...node,
        symbolSize: node.value * 2, // 根据节点值动态调整大小
        itemStyle: {
          borderColor: "#333",
          borderWidth: 1,
        },
      })),
      links: citationData.links,
      categories: [
        { name: "节点文献" },
        { name: "参考文献" },
        { name: "引证文献" },
        { name: "共引关系" },
        { name: "同被引文献" },
      ],
      roam: true, // 允许缩放和平移
      focusNodeAdjacency: true, // 高亮与节点相关的边
      lineStyle: {
        color: "source", // 根据 source 节点颜色设置边的颜色
        curveness: 0.3, // 设置边的曲率
      },
      label: {
        show: true,
        position: "right",
        formatter: "{b}", // 显示节点名称
      },
    },
  ],
};
chartInstance.setOption(options);

};

// 更新图表
const updateChart = (data) => {
  chartInstance.setOption({
    series: [
      {
        data: data.nodes,
        links: data.links,
      },
    ],
  });
};

// 初始化
onMounted(() => {
  initChart();
  changeTab("all"); // 初始化为显示所有引用关系
});

const researchStartKeywords = ['社交焦虑', '中介作用', '消费者', '大学生自尊', '外显/内隐自尊', '错失恐惧', '性别差异', '老年化'];
const researchSourceKeywords = ['消费者', '元分析', '测量工具', '因果关系', 'Facebook', '信号检测论', '代际变迁'];
const coreLiteratureKeywords = ['营销干预策略', '有效性探索', '情感导向', '认知导向', '次优食品', '食品营销'];
const researchBranchKeywords = ['新领域探索', '延伸研究'];
const researchTrackbackKeywords = ['理论修正', '实践追溯'];

// 模拟推荐论文数据
const papers = [
  { id: 1, title: '次优食品营销干预策略的有效性探究', author: '刘红波 等', institution: '贵州大学管理学院' },
  { id: 2, title: '社交焦虑对消费者行为的影响', author: '张三', institution: '北京大学' },
  { id: 3, title: '消费者心理特征与购买意图', author: '李四', institution: '清华大学' },
  { id: 4, title: '基于元分析的社交媒体广告效果', author: '王五', institution: '复旦大学' },
];
const selectedKeyword = ref('');
const filteredPapers1 = ref(papers);

const showPapers = (keyword) => {
  selectedKeyword.value = keyword;
  // 根据关键词过滤推荐论文，实际开发中应根据API返回的论文数据来动态加载
  filteredPapers1.value = papers.filter(paper => paper.title.includes(keyword));
};
// 跳转到对应论文详情页面
const navigateToPaper = (id) => {
  router.push(`/paper/${id}`);
};

// 定义论文详细信息
const paperDetails = ref({
  id: "1",
  title: "次优食品营销干预策略的有效性探究：来自元分析的证据",
  author: "刘红波 等",
  institution: "贵州大学管理学院",
  abstract: "本研究通过元分析的方法探讨了次优食品营销干预策略的有效性。研究发现，消费者的购买意愿和行为受多种因素影响，包括价格、包装和宣传等。",
  keywords: ["次优食品", "营销干预策略", "消费者行为"],
  downloadUrl: "https://kns.cnki.net/reader/flowpdf?invoice=fYpH4uBhsIzZh65oHkpv1RoSDAmHQzx737l62BLgSNZUWmxmuxUsiO0SQjIlxJUhUXv1BP05RNCe5otzvOPlBsm6gqJOTi2j6pu3k2JdsSYDh4r7aKAskL6%2B%2F5Es%2Fxp7hkmClWTqhzilZk0Gj82BBd1M47b3cFWMThKE6z9tLNg%3D&platform=NZKPT&product=CJFQ&filename=JJYJ202407005&tablename=cjfdlast2024&type=JOURNAL&scope=trial&dflag=pdf&pages=&language=CHS&trial=&nonce=2CF83CB9AA8F49A9A11211234EAE1134&cflag=pdf",  // PDF 下载地址
  downloadCount: 350,                // 下载次数
  citationCount: 50                  // 引用次数
});

// 控制 PDF 预览弹窗的显示
const showPDFPreview = ref(false);

// 打开 PDF 预览
const openPDFPreview = () => {
  showPDFPreview.value = true;
};

// 关闭 PDF 预览
const closePDFPreview = () => {
  showPDFPreview.value = false;
};

// 下载 PDF 文件
const downloadPDF = () => {
  window.open(paperDetails.value.downloadUrl, "_blank");
};
</script>


<style scoped>
.container {
  max-width: 800px;
}
.container {
  max-width: 1200px;
}

.flex {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

span {
  transition: background-color 0.3s ease;
}
#citation-network {
  width: 100%;
  height: 400px;
}
</style>
