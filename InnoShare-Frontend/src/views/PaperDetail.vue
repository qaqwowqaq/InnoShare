<template>

  <div class="h-screen flex" style="">
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
        <div class=" flex flex-col w-3/4  shadow-2xl " style="background-color:whitesmoke;">
          <!-- 单篇论文展示 -->
          <div class="rounded-lg shadow-md overflow-hidden">
            <div class="p-4 leading-loose">
              <h3 class="text-xl font-medium mb-2">{{ paper.title }}</h3>
              <!-- 用来调试 -->
              <p v-if="!isPreviewOpen" class="text-lg text-gray-500 mb-2 text-left">
                <span class="font-bold  ">摘要：</span>{{ paper.abstract }}
              </p>
              <div class="flex flex-col items-start text-lg text-gray-500 text-left">
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

        <div class=" flex flex-col w-3/4  shadow-2xl z-1  " style="background-color:whitesmoke;">
          <div class="text-lg font-medium mb-2 p-4">
            <h3>论文关系网络拓扑图</h3>
          </div>
          <div ref="chartRef" class="tooltip" v-show="!isPreviewOpen" style="height: 400px; width: 100%;  z-index: 1;">
          </div> <!-- 使用echarts渲染图表 -->
        </div>
      </section>

      <section id="section3" class="mb-8 flex flex-col justify-start items-center w-full">


        <div class="text-left flex flex-col w-3/4  shadow-2xl  " style="height: 600px;background-color:whitesmoke;">

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
                <span v-if="paperData.references[ref.referenceId]" class="text-gray-600">
                  {{ paperData.references[ref.referenceId].citedTitle }}
                </span>
                <span v-else class="text-gray-600">加载中...</span>
                -
                <button @click="showSecondaryReferences(ref.referenceId)"
                  class="ml-2 text-gray-500 hover:text-blue-700">
                  查看二级参考文献
                </button>
              </li>
            </ul>

            <span v-else>加载中...</span>

          </div>

          <div v-if="currentSelection === 'secondary'">
            <!-- 显示加载中提示 -->
            <div v-if="selectedReferences.loading">Loading secondary citations...</div>

            <!-- 确保 selectedReferences.value 和 secondaryCitations 已经定义且是数组 -->
            <ul v-else-if="paperData.thisPaper.secondaryRefs ">
              
              <li v-for="(cit, index) in paperData.thisPaper.secondaryRefs" :key="index" class="mb-2">
                【{{ index + 1 }}】{{ cit.citedTitle }}
              </li>
            </ul>

            <!-- 如果没有二级参考文献 -->
            <div v-else><div>{{paperData.thisPaper.secondaryRefs}}</div>No secondary citations available.</div>
          </div>







          <!-- 共引文献 -->
          <div v-if="currentSelection === 'commonCitations'">
            <ul>
              <li v-for="(cit, index) in commonCitations" :key="index" class="mb-2">
                【{{ index + 1 }}】<span class="text-gray-600">{{ cit.citedTitle }}</span> -
                <button @click="showReferencesForCitation(cit)" class="ml-2 text-gray-500 hover:text-blue-700">
                  查看引用该文献的参考文献
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>




    </div>


  </div>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script setup>
import { ref, onMounted, nextTick, computed, watch, watchEffect, reactive } from "vue";
import PdfPreview from '@/components/PdfPreview/index.vue';
import { useRoute,useRouter } from 'vue-router';
const pdfUrl = ref();
import * as echarts from 'echarts'; // 引入echarts库
import { useTransition } from '@vueuse/core'
import axiosInstance from '@/axiosConfig';
const route = useRoute();
const doi = route.params.id;
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
  citation: '',
  citationSource: '',
  downloadSource: ''
});

// 获取论文基本信息
const fetchPaper = async (paperDoiValue) => {
  try {
    console.log("请求参数:", { paperDoi: doi });
    const response = await axiosInstance.get('/api/academic/getPaper', {
      params: {
        paperDoi: doi,
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
      citationSource: 21,
      // citationSource:response.data.data.paper.citationCount,
      downloadSource: response.data.data.paper.downloadCount
    };
    // 使用 MathJax 渲染公式
    // 使用 MathJax 渲染公式
    setTimeout(() => {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
      }
    }, 100);
    pdfUrl.value = response.data.data.paper.downloadUrl;
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
onMounted(() => {
  if (window.MathJax) {
    window.MathJax.Hub.Config({
      tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
    });
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
  }
});

// 获取引用信息
const buildReferenceTree = async (paperDoiValue) => {
  try {
    // 获取一级引用
    const response = await axiosInstance.get('/api/academic/getPaperReferences', {
      params: { paperDoi: doi, },
    });
    console.log('获取一级引用信息成功:', response.data);

    const references = response.data.data;
    console.log('一级引用信息:', references);

    // 获取二级引用的逻辑
    const secondaryRefs = await Promise.all(
      references.map(async (ref) => {
        try {
          // 通过一级引用的 citedPaperDoi 获取二级引用
          const secondaryResponse = await axiosInstance.get('/api/academic/getPaperReferences', {
            params: { paperDoi: ref.citedPaperDoi }, // 使用一级文献的 DOI 获取二级引用
          });
          console.log('获取二级引用信息成功:', secondaryResponse.data);
          // 返回二级引用的详细信息
          return secondaryResponse.data.data.map(secondaryRef => ({
            citingPaperDoi: ref.citedPaperDoi, // 引用该二级引用的论文的 DOI

            referenceId: secondaryRef.referenceId,
            citedPaperDoi: secondaryRef.citedPaperDoi,
            citedTitle: secondaryRef.citedTitle,
            createdAt: secondaryRef.createdAt,
            updatedAt: secondaryRef.updatedAt,
          }));
        } catch (secondaryError) {
          return []; // 如果获取二级引用失败，返回空数组
        }
      })
    );

    // 将所有二级引用平铺到一个数组中
    const allSecondaryRefs = secondaryRefs.flat();
    console.log('二级引用信息1:', allSecondaryRefs);

    // 获取引用论文的标题（citingTitle）
    const getCitingTitle = async (citingPaperDoi) => {
      try {
        const response = await axiosInstance.get('/api/academic/getPaper', {
          params: { paperDoi: citingPaperDoi },
        });
        return response.data.data.paper?.title || ''; // 返回引用论文的标题
      } catch (error) {
        console.error(`获取引用文献 ${citingPaperDoi} 的标题失败:`, error);
        return ''; // 如果获取失败，返回空字符串
      }
    };

    // 将二级引用信息关联到每个一级引用，并添加 citingTitle
    for (let ref of references) {
      ref.secondaryCitations = allSecondaryRefs
        .filter(secondary => secondary.citingPaperDoi === ref.citedPaperDoi)
        .map(async secondary => ({
          citingPaperDoi: secondary.citingPaperDoi,
          citingTitle: await getCitingTitle(secondary.citingPaperDoi), // 获取 citingTitle
          referenceId: secondary.referenceId,
          citedPaperDoi: secondary.citedPaperDoi,
          citedTitle: secondary.citedTitle,
          createdAt: secondary.createdAt,
          updatedAt: secondary.updatedAt
        }));
    }

    // 返回包含一级和二级引用的结果
    return {
      thisPaper: {
        id: doi, // 当前论文的 DOI
        primaryRefs: references.map(ref => ({
          citingPaperDoi: ref.citingPaperDoi,
          referenceId: ref.referenceId,
          citedPaperDoi: ref.citedPaperDoi,
          citedTitle: ref.citedTitle,
          createdAt: ref.createdAt,
          updatedAt: ref.updatedAt,
          secondaryCitations: ref.secondaryCitations, // 添加二级引用
        })),
        secondaryRefs: allSecondaryRefs, // 填充二级引用
      },
      references: references.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.referenceId]: cur,
        }),
        {}
      ),
    };
  } catch (error) {
    console.error('获取引用信息失败:', error);
    return { error: true, message: error.message || '未知错误', references: [], primaryRefs: [], secondaryRefs: [] }; // 默认返回空数组
  }
};






// 获取论文和引用信息，分别处理
const fetchPaperData = async (paperDoiValue) => {
  try {
    // 调用 `buildReferenceTree` 获取引用信息
    const { thisPaper, references } = await buildReferenceTree(paperDoiValue);
    console.log('引用信息1:', thisPaper, references);
    // 更新 `paperData` 中的引用信息
    paperData.value = {
      thisPaper: {
        id: thisPaper.id, // 使用 `thisPaper` 中的 id
        primaryRefs: thisPaper.primaryRefs, // 使用 `primaryRefs` 中的完整引用信息
        secondaryRefs: thisPaper.secondaryRefs, // 二级引用目前为空，可以后续填充
      },
      references, // 包含所有引用文献的字典
    };

    console.log('引用信息已更新:', paperData.value);
  } catch (error) {
    console.error('获取引用信息失败:', error);
  }
};


// 加载 primaryRefs 数据的异步操作
async function loadPrimaryRefs() {
  // 假设你从 paperData 中获取 primaryRefs
  if (paperData.value && paperData.value.thisPaper) {
    // 等待 primaryRefs 加载完毕
    await Promise.all(
      paperData.value.thisPaper.primaryRefs.map(async (refId) => {
        const ref = paperData.value.references[refId];
        return ref;  // 获取每个引用
      })
    );
  }
}



// 组件挂载时执行初始化 MathJax
onMounted(() => {
  if (window.MathJax) {
    window.MathJax.Hub.Config({
      tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
    });
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
  }
});
const paperDoi = ref(null);  
// 动态监听 `route.query` 的变化，并触发数据加载
watchEffect(async () => {
  console.log('路由变化:', route.query.id);
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


const downloadSource = ref(0)
const citationSource = ref(0)
const downloadValue = ref(0);
const citationValue = ref(0);

// 组件挂载时执行
onMounted(async () => {
  paperDoi.value = route.params.id ? decodeURIComponent(route.params.id) : null;
  console.log('论文DOI:', paperDoi.value);
  // 先获取论文基本信息
  //下载与统计


  await fetchPaper(paperDoi.value);
console.log("21321321321",paper.value.downloadSource,paper.value.citationSource);
// 动态过渡效果，分别对下载量和引用量进行设置
  // 动态过渡效果，分别对下载量和引用量进行设置
  downloadValue.value = useTransition(paper.value.downloadSource, {
    duration: 1500,
    type: 'number',
  });
  citationValue.value = useTransition(paper.value.citationSource, {
    duration: 1500,
    type: 'number',
  });
  await fetchPaperData(paperDoi.value);
  console.log('论文数据:', paper.value);
});




// 设置目标值
// 定义 chartRef 引用
const chartRef = ref(null);
const currentSelection = ref('paper'); // 控制显示哪个部分
const selectedReferences = ref({}); // 存储当前选中的参考文献
// 计算共引文献的函数
async function findCommonCitations(primaryRefs, references) {
  const commonCitations = new Set();

  // 遍历所有一级引用
  for (const ref of primaryRefs) {
    // 获取二级引用，等待 Promise 完成
    const secondaryCitations = await ref.secondaryCitations;

    // 遍历该一级引用的所有二级引用
    for (const citIdPromise of secondaryCitations) {
      // 确保 citId 是一个已解析的对象
      const citId = await citIdPromise;
      let isCommon = false;
      // 遍历其他一级引用，检查是否有相同的 citedPaperDoi
      for (const otherRef of primaryRefs) {
        if (ref !== otherRef && citId.citedPaperDoi === otherRef.citedPaperDoi) {
          isCommon = true;
          break; // 找到相同的共引文献，跳出循环
        }
      }

      // 如果存在共引文献，则添加到 commonCitations 集合中
      if (isCommon) {
        commonCitations.add(citId);
      }
    }
  }

  // 返回共引文献的数组
  return Array.from(commonCitations);
}




// 响应式变量保存共引文献列表
const commonCitations = ref([]);

// 初始化图表配置
const chartOptions = {

  tooltip: {

    extraCssText: 'z-index:1',
    show: true,
    formatter: `{b}` // 显示节点的名称
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      symbol: 'circle', // 设置节点为圆形（球形）
      symbolSize: 40, // 设置球的大小
      itemStyle: { color: '#ff9f43' }, // 设置节点颜色
      label: {
        show: false,
        color: 'black' // 设置默认名称颜色为黑色
      }, // 默认不显示名称
      data: [],
      links: [],
      roam: true,
      force: { repulsion: 1000 }
    }
  ]
};
onMounted(async () => {
  try {
    // 先获取论文基本信息
    await fetchPaper(paperDoi);

    // 获取论文的引用信息
    await fetchPaperData(paperDoi);
    // 等待 primaryRefs 加载完成
    await loadPrimaryRefs();

    console.log(paper.value.downloadSource, paper.value.citationSource);
    // 动态过渡效果，分别对下载量和引用量进行设置
    downloadValue.value = useTransition(paper.value.downloadSource, {
      duration: 1500,
      type: 'number',
    });

    citationValue.value = useTransition(paper.value.citationSource, {
      duration: 1500,
      type: 'number',
    });


    // 确保 paperData 被更新后才执行后续操作
    console.log('论文数据:', paperData.value);

    // 确保 paperData 有值后再进行图表的初始化
    if (paperData.value && paperData.value.thisPaper) {
      // 计算共引文献
      commonCitations.value = await findCommonCitations(
        paperData.value.thisPaper.primaryRefs,
        paperData.value.references
      );
      console.log('共引文献1111:', commonCitations.value);
      // 初始化节点和边的数据
      const nodes = [];
      const links = [];

      // 添加本篇论文节点
      nodes.push({
        name: paper.value.title, value: 10, symbolSize: 50,
        itemStyle: { color: '#f39c12' },
        label: {
          show: true,
          color: 'black' // 设置默认名称颜色为黑色
        } // 默认不显示名称
      });

      // 添加一级参考文献节点
      if (paperData.value.thisPaper.primaryRefs && paperData.value.thisPaper.primaryRefs.length > 0) {
        paperData.value.thisPaper.primaryRefs.forEach(async ref => {
          nodes.push({ name: ref.citedTitle, value: 30 });
          links.push({ source: paper.value.title, target: ref.citedTitle });

          // 添加二级参考文献节点
          // 添加二级参考文献节点
          if (ref.secondaryCitations && ref.secondaryCitations.length > 0) {
            // 使用 for...of 循环，确保支持异步操作
            for (const citId of ref.secondaryCitations) {
              try {
                // 确保 citId 已解析为实际值
                const resolvedCitId = await citId;  // 等待 citId 被解析

                // 输出已解析的 citId 内容
                console.log('2133二级参考文献:', resolvedCitId);
                console.log('2133二级参考文献的标题:', resolvedCitId.citedTitle);
                console.log('2133引用的标题:', resolvedCitId.citingTitle);

                // 检查节点是否存在，若不存在则添加
                if (!nodes.some(node => node.name === resolvedCitId.citedTitle)) {
                  nodes.push({ name: resolvedCitId.citingTitle, value: 20 });
                }

                // 添加链接
                links.push({ source: resolvedCitId.citedTitle, target: ref.citedTitle });
                console.log('2133二级参考文献的链接:', { source: resolvedCitId.citedTitle, target: ref.citedTitle });
              } catch (error) {
                console.error('处理二级参考文献时出错:', error);
              }
            }
          }

        });
      }

      // 检查是否有共引文献，如果有才进行处理
      if (commonCitations.value && commonCitations.value.length > 0) {

        //  console.log('共引文献列表:', commonCitations.value); // 打印所有共引文献
        commonCitations.value.forEach(async (citId) => {
          // 确保 citId 已解析并且有 citedTitle
          const citIdResolved = citId;  // 如果 citId 是 Promise，解析它
          //  console.log('当前 citId:', citIdResolved);  // 输出 citId 对象
          //   console.log('citedTitle:', citIdResolved.citedTitle);  // 输出 citedTitle

          if (citIdResolved && citIdResolved.citedTitle) {
            //  console.log('共引文献2222:', citIdResolved.citingTitle);

            // 如果 nodes 中没有该共引文献的节点，则添加
            if (!nodes.some(node => node.name === citIdResolved.citedTitle)) {
              nodes.push({ name: citIdResolved.citedTitle, value: 25 });
            }
            // 共引文献链接到所有包含该共引文献的一级参考文献
            for (const ref of paperData.value.thisPaper.primaryRefs) {

              const secondaryCitations = await Promise.all(ref.secondaryCitations);
              //console.log('二级参考文献345:', ref);
              if (secondaryCitations) {
                // console.log('共引文献:', secondaryCitations);

                // 如果 secondaryCitations 是 Promise，则需要等待它解析


                // 判断是否有 secondaryCitation 的 citedTitle 和 citId 的 citedTitle 相同
                const isCommon = await secondaryCitations.some(async (secondary) => {
                  const resolvedSecondary = await secondary;  // 解析每个 Promise
                  //   console.log('解析后的二级参考文献:', resolvedSecondary);
                  return resolvedSecondary.citingPaperDoi === citIdResolved.citingPaperDoi;  // 进行比较
                });
                if (isCommon) {
                  links.push({ source: citIdResolved.citedTitle, target: ref.citedTitle });
                  //  console.log('共引文献的链接:', { source: citIdResolved.citedTitle, target: ref.citedTitle });
                }
              }
            }
          }
        });
      }


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
      console.log('Chart options:', JSON.stringify(chartOptions));

      // 绑定点击事件
      chartInstance.on('click', (params) => {
        if (params.dataType === 'node') {
          const clickedNode = params.data.name;

          if (paperData.value.thisPaper.primaryRefs.includes(clickedNode)) {
            // 点击一级参考文献
            showSecondaryReferences(clickedNode);
          } else if (commonCitations.value.includes(clickedNode)) {
            // 点击共引文献
            showReferencesForCitation(clickedNode);
          }
        }
      });
    }
  } catch (error) {
    console.error('加载论文数据失败:', error);
  }
});



//论文信息
//文献列表
// 导航按钮项
const navItems = [
  { name: 'paper', label: '一级参考文献' },
  { name: 'secondary', label: '二级参考文献' },
  { name: 'commonCitations', label: '共引文献' }
];
// 设置当前选择的参考文献类型
async function setSelection(selection) {
  currentSelection.value = selection;

  if (selection === 'secondary') {
    try {
      console.log('paperData:', paperData.value);
      console.log('thisPaper:', paperData.value?.thisPaper);

      if (paperData.value?.thisPaper) {
        console.log('primaryRefs:', paperData.value.thisPaper.primaryRefs);

        // 在加载前先将 loading 设置为 true
        selectedReferences.loading = true;

        // 使用 Promise.all 来并行请求每个参考文献的二级引用
        const secondaryCitations = await Promise.all(
          paperData.value.thisPaper.primaryRefs.flatMap(async refId => {
            const ref = paperData.value.references[refId.referenceId];
            console.log('一级参考文献:', ref);

            if (ref && ref.secondaryCitations) {
              console.log('二级参考文献:', ref.secondaryCitations);

              // 等待二级引用的 Promise 解析
              const resolvedSecondaryCitations = await Promise.all(ref.secondaryCitations);
              return resolvedSecondaryCitations; // 返回解析后的二级引用
            } else {
              return [];
            }
          })
        );

        // 扁平化二级引用数组并设置到 selectedReferences.value
        selectedReferences.value = {
          secondaryCitations: secondaryCitations.flat() || [] // 确保它是一个空数组
        };
        // 确保视图更新后再执行
       // 在 DOM 更新后执行回调
       nextTick(() => {
          console.log('更新后的二级参考文献:', selectedReferences.value.secondaryCitations);
        });
        console.log('二级参考文献121:', selectedReferences.value.secondaryCitations);

        // 数据加载完成后，将 loading 设置为 false
        selectedReferences.loading = false;

      } else {
        console.error('paperData 或 thisPaper 为 null');
      }
    } catch (error) {
      console.error('处理二级参考文献时发生错误:', error);
      selectedReferences.loading = false; // 发生错误时也停止加载状态
    }
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
console.log("000"+selectedReferences.value);
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
  background-color: mintcream;
  ;
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
  background-color: rgba(35, 31, 31, 0.9);
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