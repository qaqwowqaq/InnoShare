<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <!-- 作者信息卡片 -->
      <div class="max-w-7xl mx-auto">
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div ref="chartRef" class="w-full h-[500px]"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axiosInstance from '@/axiosConfig';
  import * as echarts from 'echarts';
  
  const route = useRoute();
  const router = useRouter();
  const chartRef = ref(null);
  const authorInfo = ref({
    authorName: '',
    papers: [],
    coAuthors: []
  });
  
  const defaultAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=Expert';
  
  // 格式化日期
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  
  // 跳转到论文详情
  const navigateToPaper = (doi) => {
    router.push({ name: 'PaperDetail', params: { id: doi } });
  };
  
  // 初始化关系网络图
  const initNetworkChart = () => {
    if (!chartRef.value) return;
  
    const chart = echarts.init(chartRef.value);
    const option = {
      tooltip: {
        show: true
      },
      series: [{
        type: 'graph',
        layout: 'force',
        animation: true,
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12
        },
        force: {
          repulsion: 300,
          gravity: 0.1,
          edgeLength: 120
        },
        data: [
          {
            name: authorInfo.value.authorName,
            value: 60,
            itemStyle: {
              color: '#5470c6'
            },
            symbolSize: 60
          },
          ...authorInfo.value.coAuthors.map((author, index) => ({
            name: author,
            value: 40,
            itemStyle: {
              color: ['#91cc75', '#fac858', '#ee6666', '#73c0de'][index % 4]
            },
            symbolSize: 40
          }))
        ],
        links: authorInfo.value.coAuthors.map(author => ({
          source: authorInfo.value.authorName,
          target: author,
          lineStyle: {
            color: '#ccc',
            width: 2
          }
        }))
      }]
    };
  
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  };
  
  // 获取作者信息
  const fetchAuthorInfo = async (authorName) => {
    try {
      const response = await axiosInstance.get('/academic/portal/get', {
        params: { authorName }
      });
      authorInfo.value = response.data.data;
      nextTick(() => {
        initNetworkChart();
      });
    } catch (error) {
      console.error('Failed to fetch author info:', error);
    }
  };
  
  // 监听路由变化
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
  </script>