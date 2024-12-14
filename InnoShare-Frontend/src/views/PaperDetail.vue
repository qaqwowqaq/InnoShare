<template>

  <div class="h-screen flex" style="margin-top: 100px;">
    <!-- 左侧固定栏 -->

    <div class="sidebar bg-gray-800 text-white p-4 fixed flex flex-col justify-between "
      style="height: 92%; width: 16%;">
      <!-- 顶部部分 -->
      <div>

        <!-- 研究主题 -->
        <div class="study-subjects text-left">
          <h3 class="text-2xl font-bold mb-4 text-center">研究主题</h3>
          <ul class="overflow-y-auto h-80 fixxed custom-scrollbar border border-gray-200 rounded-md p-2 ">
            <li v-for="subject in subjects" :key="subject.link" class="mb-5 ">
              <a :href="subject.link" class="text-gray-300 hover:text-blue-600 underline">
                {{ subject.name }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- 底部部分 -->
      <div>
        <!-- 下载量和引用量 -->
        <div class="mb-6">
          <el-card class="mb-4">
            <el-statistic :title="'下载量'" :value="downloadValue" value-style="font-size: 1.5rem; color: #409eff;" />
          </el-card>

          <el-card>
            <el-statistic :title="'引用量'" :value="citationValue" value-style="font-size: 1.5rem; " />
          </el-card>
        </div>
        <!-- 操作按钮 -->
        <div class="space-y-3">
          <button
            class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-black w-full flex justify-between items-center"
            @click="openPreview">
            <i class="fas fa-eye mr-2"></i>
            在线预览
          </button>
          <button class=" text-white px-4 py-2 rounded hover:bg-black w-full flex justify-between items-center"
            @click="downloadPDF">
            <i class="fas fa-download mr-2"></i>
            下载论文
          </button>

        </div>

        <!-- PDF 预览窗口 -->
        <div v-if="isPreviewOpen" class=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div class="bg-white w-11/12 md:w-3/4 h-4/5 rounded-lg shadow-lg flex flex-col">
            <!-- 标题栏 -->
            <div class="p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-700">PDF 预览</h2>
              <button @click="closePreview" class="text-gray-600 hover:text-gray-800">
                ×
              </button>
            </div>

            <!-- PDF 内容区域 -->
            <div class="flex-1 overflow-auto p-4 bg-gray-200">
              <PdfPreview :src="pdfUrl" theme="light" page-scale="page-fit" @loaded="onLoaded" />
            </div>

            <!-- 加载中提示 -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧瀑布流内容 -->
    <div class="content  p-4 bg-white overflow-y-auto " style="height: 92%; padding-left: 16%; width: 100%;">
      <section id="section1" class="mb-8 flex justify-center items-center w-full">
        <div class=" flex flex-col w-3/4 max-w-screen-md shadow-2xl bg-green-100">
          <!-- 单篇论文展示 -->
          <div class="rounded-lg shadow-md overflow-hidden">
            <div class="p-4 leading-loose">
              <h3 class="text-lg font-medium mb-2">{{ paper.title }}</h3>
              <!-- 用来调试 -->
              <p v-if="!isPreviewOpen" class="text-sm text-gray-500 mb-2 text-left">
                <span class="font-bold  ">摘要：</span>{{ paper.abstract }}
              </p>
              <div class="flex flex-col items-start text-sm text-gray-500 text-left">
                <div>
                  <span class="font-bold">作者：</span>
                  <span>{{ paper.author }}</span>
                </div>
                <div>
                  <span class="font-bold">出版时间：</span>
                  <span>{{ paper.publishedDate }}</span>
                </div>
              </div>
            </div>
            <div class="p-4 border-t border-gray-200 flex justify-end">
              <!-- 修改后的按钮，用于复制引用链接到剪贴板 -->
              <button @click="copyToClipboard"
                class="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer">
                引用 <i class="fas fa-quote-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="section2" class=" mb-8 flex justify-center items-center w-full">

        <div class=" flex flex-col w-3/4 max-w-screen-md shadow-2xl z-1  bg-green-100">
          <div class="text-lg font-medium mb-2 p-4">
            <h3>论文关系网络拓扑图</h3>
          </div>
          <div ref="chartRef" class="tooltip" v-show="!isPreviewOpen" style="height: 400px; width: 100%;  z-index: 1;">
          </div> <!-- 使用echarts渲染图表 -->
        </div>
      </section>

      <section id="section3" class="mb-8 flex flex-col justify-start items-center w-full">


        <div class="text-left flex flex-col w-3/4 max-w-screen-md shadow-2xl  bg-green-100" style="height: 400px;">

          <!-- 导航栏 -->
          <div class="bg-gray-500 w-full">
            <button v-for="(item, index) in navItems" :key="index"
              class="px-4 py-2 text-white  bg-gray-500 hover:bg-gray-700 focus:outline-none"
              :class="{ 'bg-gray-700': currentSelection === item.name }" @click="setSelection(item.name)">
              {{ item.label }}
            </button>
          </div>
          <!-- 本篇论文参考文献 -->
          <div v-if="currentSelection === 'paper'">
            <ul v-if="paperData.thisPaper.primaryRefs.length > 0">
              <li v-for="(ref, index) in paperData.thisPaper.primaryRefs" :key="index" class="mb-2">
                【{{ index + 1 }}】
                <span v-if="paperData.references[ref]" class="text-gray-600">{{ paperData.references[ref].id }}</span>
                <span v-else class="text-gray-600">加载中...</span>
                -
                <button @click="showSecondaryReferences(ref)" class="ml-2 text-gray-500 hover:text-blue-700">
                  查看二级参考文献
                </button>
              </li>
            </ul>
            <span v-else>加载中...</span>

          </div>

          <!-- 二级参考文献 -->
          <div v-if="currentSelection === 'secondary'">
            <ul>
              <li v-for="(cit, index) in selectedReferences.secondaryCitations" :key="index" class="mb-2">
                【{{ index + 1 }}】{{ cit }}
              </li>
            </ul>
          </div>

          <!-- 共引文献 -->
          <div v-if="currentSelection === 'commonCitations'">
            <ul>
              <li v-for="(cit, index) in commonCitations" :key="index" class="mb-2">
                【{{ index + 1 }}】<span class="text-gray-600">{{ cit }}</span> -
                <button @click="showReferencesForCitation(cit)" class="ml-2 text-gray-500 hover:text-blue-700">
                  查看引用该文献的参考文献
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="section4" class="mb-8 flex flex-col justify-start items-center w-full">
        <div class="text-left   max-w-screen-md shadow-2xl bg-green-100" style="height: 400px;width: 80%;">
          <div class="flex justify-between mx-auto w-full max-w-screen-lg">
            <div v-for="(subjects, category, index) in categorizedSubjects" :key="category">
              <div class="flex h-full">
                <el-card class=" px-12 card-container">

                  <div slot="header" class="text-center">
                    <h2 class="text-xl font-medium">
                      {{ category === 'researchStart'
                        ? '研究起点'
                        : category === 'researchSource'
                          ? '研究来源'
                          : '研究领域' }}
                    </h2>
                  </div>
                  <el-list class="center-list" style="height:300px;">
                    <el-list-item v-for="subject in subjects" :key="subject.name" class="list-item">
                      <el-link :href="subject.link" target="_blank">{{ subject.name }}</el-link>
                    </el-list-item>
                  </el-list><!-- 添加箭头 -->

                </el-card>
                <div v-if="category !== 'paper'" class=" " style=' position: relative; width:0;height:400px;'>

                  <div class="arrow arrow-right">

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



    </div>


  </div>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script  setup>
import { ref, onMounted, nextTick, computed, watch, watchEffect, reactive } from "vue";
import PdfPreview from '@/components/PdfPreview/index.vue';
import { useRoute,useRouter } from 'vue-router';
const pdfUrl = ref();
import * as echarts from 'echarts'; // 引入echarts库
import { useTransition } from '@vueuse/core'
import axios from 'axios';
import axiosInstance from "@/axiosConfig";
// 定义响应式的 `paper` 和 `paperData`
const renderedAbstract = ref('');
const subjects = ref([]);
const paperData = ref({
  thisPaper: {
    id: '',
    primaryRefs: [],
    secondaryRefs: [],
  },
  references: {},
});
const paper = ref({
  id: '',
  title: '',
  abstract: '',
  author: '',
  publishedDate: '',
  citation: ''
});
const router = useRouter();
const route = useRoute();
const paperDoi = ref(null);  
// 获取论文基本信息
const fetchPaper = async (paperDoiValue) => {
  try {
    console.log("请求参数:", { paperDoi: paperDoiValue });
    const response = await axiosInstance.get('/api/academic/getPaper', {
      params: {
        paperDoi: paperDoiValue,
      },
    });
    console.log('获取论文基本信息成功:', response.data.data.paper);
    paper.value = {
      id: response.data.data.paper.doi,
      title: response.data.data.paper.title,
      abstract: response.data.data.paper.abstractText,
      author: response.data.data.paper.author,
      publishedDate: new Date(response.data.data.paper.createdAt).toLocaleDateString('zh-CN'),
      citation: `[1]${response.data.data.paper.author}.${response.data.data.paper.title}[J/OL].arXiv, ${response.data.data.paper.createdAt}.${response.data.data.paper.doi}.`,
    };
    // 使用 MathJax 渲染公式
    setTimeout(() => {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
      }
    }, 100);
    pdfUrl.value = response.data.data.paper.downloadUrl;
    console.log('pdfUrl:', pdfUrl.value);
    console.log('获取论文基本信息成功:', paper.value);
    // 获取并处理学科信息
    subjects.value = response.data.data.paper.subjects.map(subject => {
      return {
        name: subject,
        link: `/subjects/${subject.toLowerCase().replace(/\s+/g, '-').replace(/\(.*\)/, '')}`,
      };
    });
    console.log('学科信息:', subjects.value);
  } catch (error) {
    console.error('获取论文基本信息失败:', error);
  }
};

const buildReferenceTree = async (paperDoiValue) => {
  try {
    console.log('请求的论文 DOI:', paperDoiValue); // 确保 DOI 值正确
    const response = await axiosInstance.get('/api/academic/getPaperReferences', {
      params: { paperDoi: paperDoiValue.value },
    });
    console.log('获取引用信息成功:', response.data);

    if (response.data.data ) {
      const references = response.data.data;
      console.log('引用信息:', references);
      paperData.value = {
        thisPaper: {
          id: paperDoiValue.value || "", // 防止 undefined
          primaryRefs:references.map((ref) => ref.referenceId), // 使用 referenceId
          secondaryRefs: [], // 可填充二级引用
        },
        references: references.reduce(
          (acc, cur) => ({ ...acc, [cur.referenceId]: cur }), // 使用 referenceId 作为键
          {},
        ),
        
      };
      console.log('paperData:', paperData.value.references)
    } else {
      console.error('论文数据格式不正确');
    }
    return response.data; // 返回引用数据
  } catch (error) {
    console.error('获取引用信息失败:', error);
    return { error: true, message: error.message || '未知错误', references: [], primaryRefs: [] };
  }
};


// 获取论文和引用信息，分别处理
const fetchPaperData = async (paperDoiValue) => {
  try {
    const { references, primaryRefs } = await buildReferenceTree(paperDoiValue);
    // 更新 `paperData` 中的引用信息
    paperData.value = {
      thisPaper: {
        id: paper.value.id, // 使用 `paper` 中的 id
        primaryRefs: primaryRefs,
        secondaryRefs: [], // 可填充二级引用
      },
      references,
    };
    console.log('引用信息已更新:', paperData.value);
  } catch (error) {
    console.error('获取引用信息失败:', error);
  }
};

// 组件挂载时执行初始化 MathJax
onMounted(() => {
  if (window.MathJax) {
    window.MathJax.Hub.Config({
      tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
    });
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
  }
});

// 动态监听 `route.query` 的变化，并触发数据加载
watchEffect(async () => {
  paperDoi.value = route.query.id ? decodeURIComponent(route.query.id) : null;

  if (paperDoi.value) {
    console.log('论文DOI:', paperDoi.value);

    try {
      // 加载论文基本信息
      await fetchPaper(paperDoi.value);
      // 加载引用信息
      await fetchPaperData(paperDoi.value);
      // 更新图表数据
      updateChartData();
      console.log('论文数据:', paper.value);
    } catch (error) {
      console.error('数据加载失败:', error);
    }
  } else {
    console.error('未获取到有效的论文 DOI');
  }
});



// 组件挂载时执行
onMounted(async () => {
  console.log('论文DOI:', paperDoi.value);
  // 先获取论文基本信息
  await fetchPaper(paperDoi.value);

  await fetchPaperData(paperDoi);
  updateChartData();
  console.log('论文数据:', paper.value);
});


//下载与统计
const downloadSource = ref(0)
const citationSource = ref(0)

// 动态过渡效果，分别对下载量和引用量进行设置
const downloadValue = useTransition(downloadSource, {
  duration: 1500,
  type: 'number',
})
const citationValue = useTransition(citationSource, {
  duration: 1500,
  type: 'number',
})

// 设置目标值
downloadSource.value = 1234
citationSource.value = 567
// 定义 chartRef 引用
const chartRef = ref(null);
const currentSelection = ref('paper'); // 控制显示哪个部分
const selectedReferences = ref({}); // 存储当前选中的参考文献
// const paperData = {
//   thisPaper: {
//     id: 'paper1',
//     primaryRefs: ['ref1', 'ref2', 'ref3'],
//     secondaryRefs: []
//   },
//   references: {
//     ref1: {
//       id: 'ref1',
//       secondaryCitations: ['cit1', 'cit2']
//     },
//     ref2: {
//       id: 'ref2',
//       secondaryCitations: ['cit2', 'cit3']
//     },
//     cit1: { id: 'cit1' },
//     cit2: { id: 'cit2' },
//     cit3: { id: 'cit3' },
//     ref3: {
//       id: 'ref3',
//       secondaryCitations: ['cit4']
//     },
//   }
// };

// 定义一个计算共引文献的函数
function findCommonCitations(primaryRefs, references) {
  const commonCitations = new Set();

  for (const refId of primaryRefs) {
    const secondaryCitations = references[refId].secondaryCitations;
    for (const citId of secondaryCitations) {
      let isCommon = false;
      for (const otherRefId of primaryRefs) {
        if (refId !== otherRefId && references[otherRefId].secondaryCitations.includes(citId)) {
          isCommon = true;
          break;
        }
      }
      if (isCommon) {
        commonCitations.add(citId);
      }
    }
  }

  return Array.from(commonCitations);
}

// 响应式变量保存共引文献列表
const commonCitations = ref([]);

// 初始化图表配置
const chartOptions = {

  tooltip: {
    extraCssText: 'z-index:1',
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      data: [],
      links: [],
      roam: true,
      label: { show: true },
      force: { repulsion: 1000 }
    }
  ]
};

// 组件挂载后，初始化图表数据
const updateChartData = () =>{
  // 计算共引文献
  if (paperData.thisPaper && paperData.thisPaper.primaryRefs && paperData.thisPaper.primaryRefs.length > 0)
    commonCitations.value = findCommonCitations(paperData.thisPaper.primaryRefs, paperData.references);
  // 初始化节点和边的数据
  const nodes = [];
  const links = [];

  // 添加本篇论文节点
  nodes.push({ name: 'paper1', value: 10, symbolSize: 50 });

  // 添加一级参考文献节点
  if (paperData.thisPaper && paperData.thisPaper.primaryRefs && paperData.thisPaper.primaryRefs.length > 0)
    paperData.thisPaper.primaryRefs.forEach(refId => {
      const ref = paperData.references[refId];
      nodes.push({ name: ref.id, value: 30 });
      links.push({ source: 'paper1', target: ref.id });

      // 添加二级参考文献节点
      ref.secondaryCitations.forEach(citId => {
        if (!nodes.some(node => node.name === citId)) {
          nodes.push({ name: citId, value: 20 });
        }
        links.push({ source: ref.id, target: citId });
      });
    });
  // 添加共引文献的节点和边
  commonCitations.value.forEach(citId => {
    // 检查节点是否已存在，如果存在则跳过
    if (!nodes.some(node => node.name === citId)) {
      nodes.push({ name: citId, value: 25 }); // 共引文献节点
    }

    // 共引文献链接到所有包含该共引文献的一级参考文献
    paperData.thisPaper.primaryRefs.forEach(refId => {
      const ref = paperData.references[refId];
      if (ref.secondaryCitations.includes(citId)) {
        links.push({ source: citId, target: ref.id });
      }
    });
  });
  // 设置图表的节点和边
  chartOptions.series[0].data = nodes;
  chartOptions.series[0].links = links;

  // 初始化echarts图表
  const chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(chartOptions);

  // 调整图表大小
  nextTick(() => {
    if (chartInstance) {
      chartInstance.resize();
    }

  });

  // 打印chartOptions的内容，确保配置正确
  console.log(JSON.stringify(chartOptions));
};


//论文信息
//文献列表
// 导航按钮项
const navItems = [
  { name: 'paper', label: '一级参考文献' },
  { name: 'secondary', label: '二级参考文献' },
  { name: 'commonCitations', label: '共引文献' }
];

// 设置当前选择的参考文献类型
function setSelection(selection) {
  currentSelection.value = selection;
  if (selection === 'secondary') {
    // 点击“二级参考文献”时显示所有二级文献
    selectedReferences.value = {
      secondaryCitations: paperData.thisPaper.primaryRefs.flatMap(refId =>
        paperData.references[refId].secondaryCitations
      )
    };
  }
}
function setSelection1(selection, refId) {
  currentSelection.value = selection;

}

// 显示二级参考文献
function showSecondaryReferences(refId) {
  selectedReferences.value = paperData.references[refId];
  setSelection1('secondary', refId);
}

// 显示共引文献
function showCommonCitations() {
  setSelection1('commonCitations', refId);
}

// 显示共引文献引用的一级参考文献
function showReferencesForCitation(citId) {
  const refsForCitation = paperData.thisPaper.primaryRefs.filter(refId =>
    paperData.references[refId].secondaryCitations.includes(citId)
  );
  console.log('共引文献引用的一级参考文献:', refsForCitation);
}

// 更新图表的点击事件
onMounted(() => {
  const chartInstance = echarts.init(chartRef.value);

  chartInstance.on('click', (params) => {
    if (params.dataType === 'node') {
      const clickedNode = params.data.name;

      if (paperData.thisPaper.primaryRefs.includes(clickedNode)) {
        // 点击一级参考文献
        showSecondaryReferences(clickedNode);
      } else if (commonCitations.value.includes(clickedNode)) {
        // 点击共引文献
        showCommonCitations();
      }
    }
  });

  chartInstance.setOption(chartOptions);
});
// const paper = ref({

//   id: 1,
//   title: '乙烯利调控橡胶树胶乳产量和品质的阈值分析 ',
//   abstract: '分析乙烯利（ETH）、乙烯利抑制剂1-甲基环丙烯（1-MCP）和半胱氨酸（CYS）对橡胶树胶乳产量和主要品质指标的影响，并计算剂量阈值为生产提供依据，采用优化的正交实验设计分析三因素（ETH，1-MCP，CYS），四水平（三种试剂各四个浓度）共14个处理橡胶树割面，测定橡胶树胶乳产量、干含、分子量、塑性初值、塑性保持率和门尼粘度等关键指标，并分析指标之间的相关性。结果表明，14个处理橡胶树后产量、干含等均存在显著差异。相关分析表明数均分子量与重均分子量、门尼粘度正相关，相关系数分别为0.71和0.83，与多分散性负相关，相关系数为-0.91。塑性初值与门尼粘度正相关，相关系数为0.73。多分散性与门尼粘度负相关，相关系数-0.89。分别建立了以干含等指标为核心的回归方程，计算出的乙烯利的最高浓度是0.15%，1-MCP的最高浓度是1.08，CYS的浓度是0.41。优化的正交试验方法可有效的计算排胶调节剂的阈值，为后续实验提供理论和实践指导。',
//   author: '刘明洋  杨洪  樊松乐  郭冰冰  代龙军  ',
//   publisher: '农业农村部橡胶树生物学与遗传资源利用重点实验室/省部共建国家重点实验室培育基地-海南省热带作物栽培生理学重点实验室/中国热带农业科学院橡胶研究所',
//   publishedDate: '2024-12-06 11:12:23',
//   citation: '[1]刘明洋,杨洪,樊松乐,等.乙烯利调控橡胶树胶乳产量和品质的阈值分析[J/OL].森林工程,1-10[2024-12-07].http://kns.cnki.net/kcms/detail/23.1388.S.20241205.1715.002.html.'
//   // 添加更多论文数据
// });
// 复制引用链接到剪贴板

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(paper.value.citation);
    alert('引用链接已复制到剪贴板！');
  } catch (err) {
    console.error('复制失败:', err);
    alert('复制失败，请尝试手动复制。');
  }
};
// 主题列表
// const subjects = ref([
//   { name: '人工智能', link: '/subjects/ai' },
//   { name: '机器学习', link: '/subjects/ml' },
//   { name: '自然语言处理', link: '/subjects/nlp' },
//   { name: '人工智能', link: '/subjects/ai' },
//   { name: '机器学习', link: '/subjects/ml' },
//   { name: '自然语言处理', link: '/subjects/nlp' },

//   // 可以继续添加更多主题
// ]);

//下载paper
const downloadPDF = async () => {
  try {
    // 使用 fetch 获取文件数据
    const response = await fetch(pdfUrl.value);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 将响应转换为 Blob
    const blob = await response.blob();

    // 创建一个隐式下载链接
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "paper.pdf"; // 设置下载文件名
    document.body.appendChild(link);
    link.click();

    // 移除链接并释放 Blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("下载失败：", error);
  }
};

// 预览窗口
const isPreviewOpen = ref(false);
const loading = ref(false);


const openPreview = () => {
  isPreviewOpen.value = true;
  loading.value = true;
};

const closePreview = () => {
  isPreviewOpen.value = false;
  nextTick(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
    }
  });
};

const onLoaded = () => {
  loading.value = false;
};

//推荐页面

// 去除重复项，并计算每个类别的subjects
const uniqueSubjects = computed(() => {
  const seen = new Set();
  return subjects.value.filter((subject) => {
    if (seen.has(subject.name)) {
      return false;
    }
    seen.add(subject.name);
    return true;
  });
});

// 将主题分配到三个类别（研究起点、研究来源、本文）
const categorizedSubjects = computed(() => {
  const result = {
    researchStart: [],
    researchSource: [],
    paper: []
  };

  // 假设我们简单地平均分配主题到三个类别（实际应用中应根据需求调整）
  const subjectsArray = Array.from(uniqueSubjects.value);
  const chunkSize = Math.ceil(subjectsArray.length / 3);

  for (let i = 0; i < subjectsArray.length; i += chunkSize) {
    result.researchStart.push(...subjectsArray.slice(i, i + chunkSize));
    if (i + chunkSize < subjectsArray.length) {
      result.researchSource.push(...subjectsArray.slice(i + chunkSize, i + 2 * chunkSize));
    }
    if (i + 2 * chunkSize < subjectsArray.length) {
      result.paper.push(...subjectsArray.slice(i + 2 * chunkSize, i + 3 * chunkSize));
    }
  }

  return result;
});
</script>

<style scoped>
/* 美化加载器 */
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Edge */
}

.custom-scrollbar {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

/* 卡片的过渡动画效果 */
.el-card {
  background-color: rgb(162, 232, 209);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.el-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}



/* 卡片样式 */
.card-container {
  width: 100%;
  /* 使卡片宽度平均分布 */
  transition: transform 0.5s ease-in-out;
}

.card-container:hover {
  transform: scale(1.05);
  /* 鼠标悬停时，卡片略微放大 */
}

/* 水平和垂直居中列表内容 */
.center-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.list-item {
  margin: 10px 0;
  /* 给每个列表项添加一些垂直间距 */
}

/* 箭头的样式 */
.arrow {
  position: absolute;
  top: 50%;
  /* 垂直居中 */
  width: 0;
  height: 25px;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 25px solid rgba(0, 0, 0, 0.9);
  /* 设置箭头颜色 */
  transition: all 0.3s ease-in-out;
  margin-top: -22px;
}



/* 箭头尾巴 */
.arrow::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -60px;
  /* 调整尾巴的位置 */
  width: 50px;
  /* 设置尾巴长度 */
  height: 20px;
  /* 设置尾巴宽度 */
  background-color: rgba(0, 0, 0, 0.9);
  /* 设置尾巴颜色 */
  transform: translateY(-50%);
  box-shadow: 6px 12px 25px rgba(0, 0, 0, 0.5);
  /* 给箭头加重阴影并调整透明度 */
}

/* 右侧箭头 */
.arrow-right {
  left: 100%;
  /* 右侧位置 */
  margin-left: 26px;
  /* 调整箭头与卡片之间的距离 */
}
</style>