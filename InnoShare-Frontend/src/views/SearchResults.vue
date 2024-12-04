<template>
  <div class="container">
    <!-- 左侧栏 -->
    <aside class="sidebar" :class="{'collapsed': isCollapsed}">
      <button class="collapse-btn" @click="toggleSidebar">{{ isCollapsed ? '展开' : '收起' }}</button>

      <!-- 作者筛选 -->
      <div class="filter">
        <label for="authors" class="filter-label">作者</label>
        <select id="authors" v-model="filters.author" class="filter-input">
          <option value="">选择作者</option>
          <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
        </select>
      </div>

      <!-- 日期筛选 -->
      <div class="filter">
        <label for="date" class="filter-label">发表日期</label>
        <select id="date" v-model="filters.date" class="filter-input">
          <option value="">选择日期</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <!-- 关键词筛选 -->
      <div class="filter">
        <label for="keywords" class="filter-label">关键词</label>
        <input
          id="keywords"
          v-model="filters.keywords"
          class="filter-input"
          placeholder="输入关键词"
        />
      </div>

      <!-- 学科领域筛选 -->
      <div class="filter">
        <label for="fields" class="filter-label">学科领域</label>
        <select id="fields" v-model="filters.field" class="filter-input">
          <option value="">选择领域</option>
          <option v-for="field in fields" :key="field" :value="field">{{ field }}</option>
        </select>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <h1 class="page-title">搜索结果</h1>

      <!-- 搜索结果卡片 -->
      <div class="results">
        <div
          v-for="result in filteredResults"
          :key="result.id"
          class="result-card"
        >
          <h2 class="result-title">{{ result.title }}</h2>
          <p class="result-authors">{{ result.authors }}</p>
          <p class="result-year">{{ result.year }}</p>
          <button
            class="view-details-btn"
            @click="viewDetails(result.id)"
          >
            查看详情
          </button>
        </div>
      </div>

      <!-- 分页控件 -->
      <div class="pagination">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          上一页
        </button>
        <span class="pagination-info">页 {{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
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
      currentPage: 1,
      isCollapsed: false,  // 控制左侧栏是否折叠
      results: [
        {
          id: 1,
          title: "An Analysis of Machine Learning Models",
          authors: "John Doe, Jane Smith",
          year: 2023,
        },
        {
          id: 2,
          title: "Exploring Blockchain Applications",
          authors: "Alice Brown, Bob Green",
          year: 2022,
        },
        {
          id: 3,
          title: "Advances in Quantum Computing",
          authors: "Charlie White, Daisy Blue",
          year: 2021,
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
    toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;  // 切换左侧栏的显示状态
  },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    viewDetails(id: number) {
      console.log(`View details for result ${id}`);
    },
  },
});
</script>

<style scoped>
/* 容器 */
.container {
  display: flex;
  margin-top: 3rem;
  min-height: 100vh;
  background-color: #f7fafc;
}

/* 左侧栏 */
.sidebar {
  width: 20%;
  background-color: #ffffff;
  padding: 20px;
  margin-top:3rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
/* 左侧栏折叠状态的样式 */
.sidebar.collapsed {
  width: 60px; /* 收起时宽度变小 */
}

.collapse-btn {
  display: block;
  margin-bottom: 1rem;
  background-color: #3182ce;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.sidebar-title {
  display: none; /* 收起时隐藏标题 */
}

/* 当左侧栏展开时 */
.sidebar:not(.collapsed) .sidebar-title {
  display: block;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.filter {
  margin-bottom: 1.25rem;
  margin-right: 1.25rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  margin-right:1.25rem;
}

.filter-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
}

/* 主内容区 */
.main-content {
  flex-grow: 1;
  padding: 30px;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

/* 搜索结果 */
.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.result-card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.result-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.result-authors,
.result-year {
  font-size: 0.875rem;
  color: #666;
}

.view-details-btn {
  margin-top: 1rem;
  background-color: #3182ce;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-details-btn:hover {
  background-color: #2b6cb0;
}

/* 分页 这里最好固定位置*/
.pagination {
  display: flex;
  justify-content: center;

  position: fixed;
  bottom: 20px;
  width: 80%;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  background-color: #edf2f7;
}

.pagination-btn:hover {
  background-color: #cbd5e0;
}

.pagination-info {
  padding: 0.5rem 1rem;
  color: #2d3748;
}
</style>
