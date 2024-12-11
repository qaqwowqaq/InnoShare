<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <div class="flex min-h-screen mt-12 bg-gray-100">
 <!-- 左侧栏 -->
<aside :class="sidebarClass" class="relative bg-white p-4 shadow-md transition-all duration-300 ease-in-out">
  <!-- 图标 -->
  <div class="animate-pulse absolute top-1/2 right-0 transform -translate-y-1/2  cursor-pointer" :class="{ 'rotate-180': isSidebarOpen }" @click="toggleSidebar">
    <span  class="text-2xl text-gray-500"   
    >
      &laquo; <!-- 左侧箭头样式（书名号）-->
    </span>
  </div>

  <h2 v-show="isSidebarOpen" class="text-lg font-semibold mb-4">筛选条件</h2>


  <!-- 筛选条件内容 -->
  <div v-show="isSidebarOpen">
      <!-- 作者筛选 -->
      <div class="mb-4">
        <label for="authors" class="block text-sm font-medium text-gray-700">作者</label>
        <select id="authors" v-model="filters.author" class="w-full mt-1 p-2 border rounded">
          <option value="">选择作者</option>
          <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
        </select>
      </div>

      <!-- 日期筛选 -->
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">发表日期</label>
        <select id="date" v-model="filters.date" class="w-full mt-1 p-2 border rounded">
          <option value="">选择日期</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <!-- 关键词筛选 -->
      <div class="mb-4">
        <label for="keywords" class="block text-sm font-medium text-gray-700">关键词</label>
        <input
          id="keywords"
          v-model="filters.keywords"
          class="w-full mt-1 p-2 border rounded"
          placeholder="输入关键词"
        />
      </div>

      <!-- 学科领域筛选 -->
      <div class="mb-4">
        <label for="fields" class="block text-sm font-medium text-gray-700">学科领域</label>
        <select id="fields" v-model="filters.field" class="w-full mt-1 p-2 border rounded">
          <option value="">选择领域</option>
          <option v-for="field in fields" :key="field" :value="field">{{ field }}</option>
        </select>
      </div>
    </div>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 p-6">
      <h1 class="text-2xl font-bold mb-6">搜索结果</h1>

      <!-- 搜索结果卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="result in filteredResults"
          :key="result.id"
          @click="viewDetails(result.id)"
          class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 cursor-pointer transform hover:scale-105 relative"
        >
       
          <!-- 论文卡片的边角效果 -->
          <div class="absolute top-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 transform rotate-45 -translate-x-1 translate-y- rounded-lg">
            学术论文
          </div>
          <h2 class="text-xl font-semibold text-gray-800">{{ result.title }}</h2>
          <p class="text-sm text-gray-600 mt-2">{{ result.authors }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ result.year }}</p>
           <!-- 标签部分 -->
          <div class="mt-4 flex justify-center space-x-10">
            <span
              v-for="(tag, index) in result.tags.slice(0, 3)"
              :key="index"
              class="px-3 py-1 text-xs text-white  rounded-full"
              :style="{
                backgroundColor: index === 0 ? '#4CAF50' : (index === 1 ? '#2196F3' : '#FFC107')
              }"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- 固定底部分页控件 -->
      <div class="fixed bottom-0 left-0 right-0  p-4 shadow-lg flex justify-center items-center space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          上一页
        </button>
        <span class="px-4 py-2 text-gray-700">页 {{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          下一页
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchResults",
  data() {
    return {
      isSidebarOpen: true,
      currentPage: 1,
      results: [
        {
          id: 1,
          title: "An Analysis of Machine Learning Models",
          authors: "John Doe, Jane Smith",
          year: 2023,
          tags: ["机器学习", "数据分析", "人工智能"],
        },
        {
          id: 2,
          title: "Exploring Blockchain Applications",
          authors: "Alice Brown, Bob Green",
          year: 2022,
          tags: ["区块链", "金融科技", "智能合约"],
        },
        {
          id: 3,
          title: "Advances in Quantum Computing",
          authors: "Charlie White, Daisy Blue",
          year: 2021,
          tags: ["量子计算", "量子算法", "量子通信"],
        },
        // 更多数据...
      ],
      filters: {
        author: "",
        date: "",
        keywords: "",
        field: "",
      },
      authors: ["John Doe", "Alice Brown", "Charlie White"], // 示例作者
      years: [2021, 2022, 2023],
      fields: ["计算机科学", "人工智能", "区块链"], // 示例领域
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredResults.length / 10);
    },
    sidebarClass() {
      return this.isSidebarOpen ? 'w-64' : 'w-16 transform '; // 动态宽度
    },
    filteredResults() {
      let filtered = this.results;

      // 筛选条件
      if (this.filters.author) {
        filtered = filtered.filter((result) =>
          result.authors.includes(this.filters.author)
        );
      }
      if (this.filters.date) {
        filtered = filtered.filter((result) => result.year === this.filters.date);
      }
      if (this.filters.keywords) {
        filtered = filtered.filter((result) =>
          result.title.includes(this.filters.keywords)
        );
      }
      if (this.filters.field) {
        filtered = filtered.filter((result) => result.title.includes(this.filters.field));
      }

      // 分页
      const start = (this.currentPage - 1) * 10;
      return filtered.slice(start, start + 10);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    viewDetails(id: number) {
      console.log(`View details for result ${id}`);
      // 在这里加入跳转到详情页的逻辑
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // 切换展开状态
    },
    
  },
});
</script>

<style scoped>
/* 自定义样式 */
/* 旋转效果 */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
