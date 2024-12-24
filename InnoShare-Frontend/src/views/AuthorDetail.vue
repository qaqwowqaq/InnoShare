<template>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <div class="mt-16 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <!-- 作者信息卡片 -->
      <div class="max-w-7xl mx-auto ">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          <div class="relative px-6 pb-8">
            <!-- 头像 -->
            <div class="relative -mt-16 mb-8 flex justify-center">
              <div class="relative">
                <img 
                  :src="defaultAvatar"
                  class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  alt="Author avatar"
                />
              </div>
            </div>
            <!-- 作者名称 -->
            <h1 class="text-center text-3xl font-bold text-gray-900 mb-8">
              {{ authorInfo.authorName }}
            </h1>
          </div>
        </div>
  
        <!-- 论文列表和关系网络 -->
        <div class=" grid grid-cols-1 lg:grid-cols-2 gap-8 " style="min-height: 500px;">
          <!-- 论文列表 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">发表论文</h2>
            <div class="space-y-4">
              <div v-for="paper in authorInfo.papers" 
                   :key="paper.doi" 
                   class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
                   @click="navigateToPaper(paper.doi)">
                <h3 class="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {{ paper.title }}
                </h3>
                <p class="text-sm text-gray-600 mt-2">
                  {{ paper.author }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  发布日期: {{ formatDate(paper.publishedAt) }}
                </p>
              </div>
            </div>
          </div>
  
          <!-- 专家关系网络图 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">合作关系网络</h2>
            <div ref="networkChart" class="w-full h-full" style="min-height: 400px;"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect ,nextTick,onUnmounted} from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axiosInstance from '@/axiosConfig';
  import * as echarts from 'echarts';
  
  const route = useRoute();
  const router = useRouter();
  const networkChart = ref(null); // 更改ref名称
  let chart = null;
  const authorInfo = ref({
    authorName: '',
    papers: [],
    coAuthors: []
  });
  
  const defaultAvatar = 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png';
  
  // 格式化日期
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  
  // 跳转到论文详情
  const navigateToPaper = (doi) => {
    router.push({ name: 'PaperDetail', params: { id: doi } });
  };
  
  const resizeHandler = () => {
  if (chart) {
    chart.resize();
  }
};

const initNetworkChart = () => {

  if (!networkChart.value) return;

  if (chart) {
    chart.dispose();
    console.log('chart disposed');
  }

  chart = echarts.init(networkChart.value);
  const option = {
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    series: [{
      type: 'graph',
      layout: 'force',
      animation: true,
      draggable: true,
      roam: true,
      label: {
        show: true,
        position: 'right',
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold'
      },
      force: {
        repulsion: 1000,
        gravity: 0.1,
        edgeLength: 200,
        layoutAnimation: true
      },
      data: [
        {
          name: authorInfo.value.authorName,
          value: 100,
          itemStyle: {
            color: '#3b82f6',
            borderColor: '#2563eb',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(59, 130, 246, 0.5)'
          },
          symbolSize: 80,
          symbol: 'circle'
        },
        ...authorInfo.value.coAuthors.map((author, index) => ({
          name: author,
          value: 60,
          itemStyle: {
            color: [
              '#10b981',
              '#f59e0b',
              '#ef4444',
              '#6366f1'
            ][index % 4],
            borderWidth: 1,
            borderColor: '#fff'
          },
          symbolSize: 50,
          symbol: 'circle'
        }))
      ],
      links: authorInfo.value.coAuthors.map(author => ({
        source: authorInfo.value.authorName,
        target: author,
        lineStyle: {
          color: '#94a3b8',
          width: 2,
          curveness: 0.3,
          opacity: 0.7
        },
        symbol: ['none', 'arrow'],
        symbolSize: [5, 8]
      })),
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 4
        }
      }
    }]
  };

  console.log('option:', option);

  chart.setOption(option);
  window.addEventListener('resize', resizeHandler);
};

const fetchAuthorInfo = async (authorName) => {
  try {
    const response = await axiosInstance.get('/academic/portal/get', {
      params: { authorName }
    });
    authorInfo.value = response.data.data;
    await nextTick();
    initNetworkChart();
  } catch (error) {
    console.error('获取作者信息失败:', error);
  }
};

watchEffect(() => {
  const authorName = route.params.name;
  if (authorName) {
    fetchAuthorInfo(authorName);
  }
});

onMounted(() => {
  const authorName = route.params.name;
  if (authorName) {
    fetchAuthorInfo(authorName);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
  if (chart) {
    chart.dispose();
  }
});
</script>

<style scoped>
.network-chart {
  transition: all 0.3s ease;
}
</style>