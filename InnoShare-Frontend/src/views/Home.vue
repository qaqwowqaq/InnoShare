<template>
  <div class="home min-h-screen bg-gray-50">
    <!-- 头部搜索区域 -->
    <div class="hero py-16 px-4 bg-white border-b shadow-md">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">学术成果分享平台</h1>
        <div class="search-box mb-8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索论文、专利、研究成果..."
            class="max-w-2xl mx-auto"
            :prefix-icon="Search"
          >
            <template #append>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 功能区域 -->
    <div class="features max-w-6xl mx-auto py-12 px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="feature-card text-center">
          <AcademicCapIcon class="icon" />
          <h3 class="text-lg font-semibold text-gray-900 mt-4">学术成果</h3>
          <p class="text-sm text-gray-500 mt-1">发布与浏览研究成果</p>
        </div>

        <div class="feature-card text-center">
          <DocumentTextIcon class="icon" />
          <h3 class="text-lg font-semibold text-gray-900 mt-4">专业文献</h3>
          <p class="text-sm text-gray-500 mt-1">获取最新研究文献</p>
        </div>

        <div class="feature-card text-center">
          <UserGroupIcon class="icon" />
          <h3 class="text-lg font-semibold text-gray-900 mt-4">学者社区</h3>
          <p class="text-sm text-gray-500 mt-1">连接全球研究者</p>
        </div>

        <div class="feature-card text-center">
          <ChartBarIcon class="icon" />
          <h3 class="text-lg font-semibold text-gray-900 mt-4">数据分析</h3>
          <p class="text-sm text-gray-500 mt-1">研究趋势与统计</p>
        </div>
      </div>
    </div>

    <!-- 最新成果展示 -->
    <div class="latest-works max-w-6xl mx-auto py-12 px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-900">最新研究成果</h2>
        <el-button 
          type="text" 
          @click="navigateToAchievements"
          class="text-blue-600 hover:text-blue-800"
        >
          查看更多
        </el-button>
      </div>
      <div class="bg-white rounded-lg shadow-sm">
        <AchievementList />
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="bg-white border-t mt-12">
      <div class="max-w-6xl mx-auto py-8 px-4 text-center text-sm text-gray-600">
        <p>&copy; 2024 学术分享平台 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  AcademicCapIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  MagnifyingGlassIcon as Search
} from '@heroicons/vue/24/outline';
import AchievementList from '@/components/modules/AchievementList.vue';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    });
  }
};

const navigateToAchievements = () => {
  router.push('/achievements');
};
</script>

<style scoped>
.hero {
  background-image: linear-gradient(to right, #4f46e5, #3b82f6);
  color: white;
}

.icon {
  width: 3rem;
  height: 3rem;
  color: #3b82f6;
  transition: transform 0.3s;
}

.icon:hover {
  transform: scale(1.1);
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}

.el-input {
  max-width: 100%;
}

.latest-works {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>