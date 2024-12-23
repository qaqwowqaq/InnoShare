<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

  <div class="flex min-h-screen bg-gray-100">
    <!-- 左侧筛选栏 加入padding适应导航栏 -->
    <aside :class="sidebarClass" class="relative  bg-white p-4 shadow-md transition-all duration-300 ease-in-out"
    style="padding-top: 100px">
      <!-- 图标 -->
      <div
          class="animate-pulse absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
          :class="{ 'rotate-180': isSidebarOpen }"
          @click="toggleSidebar"
      >
        <span class="text-2xl text-gray-500">&laquo;</span>
      </div>

      <h2 v-if="isSidebarOpen" class="text-lg font-semibold mb-4">筛选条件</h2>

      <div v-if="isSidebarOpen">
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
            <option value="">选择年份</option>
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

        <!-- 排序方式 -->
        <div class="mb-4">
          <label for="sortBy" class="block text-sm font-medium text-gray-700">排序方式</label>
          <select id="sortBy" v-model="filters.sortBy" class="w-full mt-1 p-2 border rounded">
            <option value="published_at">发表时间</option>
            <option value="">不排序</option>
          </select>
        </div>

        <!-- 排序顺序 -->
        <div class="mb-4" v-if="filters.sortBy">
          <label for="order" class="block text-sm font-medium text-gray-700">排序顺序</label>
          <select id="order" v-model="filters.order" class="w-full mt-1 p-2 border rounded">
            <option value="desc">降序</option>
            <option value="asc">升序</option>
          </select>
        </div>
      </div>
    </aside>

    <!-- 主内容区 加入paddingTop适应bar-->
    <main :class="mainClass" class="flex-1 p-6  transition-all duration-300 ease-in-out" style="margin-left:10px;margin-top: 100px">
      <h1 class="text-2xl font-bold mb-6">搜索结果</h1>

      <!-- 加载动画 -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <svg class="animate-spin h-10 w-10 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>

      <!-- 搜索结果卡片 -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >

        <div
            v-for="result in paginatedResults"
            :key="result.id || result.paper_id"
            @click="viewDetails(result)"
            class="bg-white rounded-lg mt-8 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer transform hover:scale-105 relative"
        >
          <!-- 标记类型 -->
          <div class="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">
            {{ searchType === 'patents' ? '专利' : '论文' }}
          </div>
          <h2 class="text-xl font-semibold text-gray-800 truncate">{{ result.title }}</h2>
          <p class="text-sm text-gray-600 mt-2">
            {{ getAuthors(result.author || result.assignee) }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ searchType === 'patents' ? formatDate(result.publication_date) : formatDate(result.published_at) }}
          </p>
          <!-- 摘要部分（仅论文） -->

          <p v-if="searchType === 'paper'" class="text-sm text-gray-400 italic mt-2">
            <strong>Abstract:</strong> <span v-html="getAbstract(result.abstract_text)"></span>
          </p>
          <!-- 标签部分 -->
          <div class="mt-4 flex flex-wrap justify-center gap-6">
            <span
                v-for="(tag, index) in getTags(result).slice(0, 3)"
                :key="index"
                class="px-3 py-1 text-xs text-white rounded-full"
                :style="getTagStyle(index)"
            >
              {{ tag }}
            </span>
            <span v-if="getTags(result).length > 3" class="px-3 py-1 text-xs text-gray-600 rounded-full">
              ...
            </span>
          </div>
        </div>
      </div>



      <!-- 分页控件 -->
      <div
          v-if="!loading && totalPages > 1"
          class=" bottom-4   p-3
              shadow-lg flex  justify-center items-center space-x-4
              bg-white rounded-full max-w-md mx-auto"
      >
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-100 text-gray-800 rounded-full
                hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          上一页
        </button>
        <!-- 添加页码输入和跳转 -->
        <div class="flex items-center space-x-2">
          <input type="number" 
                v-model="targetPage" 
                class="w-16 px-2 py-1 text-center border rounded-lg"
                min="1"
                :max="totalPages"/>
          <span class="text-gray-700">/ {{ totalPages }}</span>
          <button @click="jumpToPage"
                  class="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            跳转
          </button>
        </div>
        <button
            @click="nextPage"
            :disabled="!isLastBatchPage && currentPage === totalPages"
            :class="[
      'px-4 py-2 rounded-full transition-colors',
      isLastBatchPage 
        ? 'bg-red-500 text-white hover:bg-red-600' 
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      'disabled:opacity-50'
    ]"
        >
          下一页 
        </button>
      </div>
    </main>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch,nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../axiosConfig'; // 引入配置好的 Axios 实例
import MarkdownIt from 'markdown-it';
import mk from 'markdown-it-mathjax'; // 使用 MathJax 插件解析数学公式
import { renderMath } from "@/types/math";
import { c } from "vite/dist/node/types.d-aGj9QkWt";


export default defineComponent({
  name: "SearchResults",
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 修改初始状态
    const batchSize = ref(100); // 每批数据大小
    const hasNextBatch = ref(true); // 是否还有下一批数据
    const currentBatch = ref<number>(0); // 当前批次
    const isLastBatchPage = computed(() => {
      return page.value === totalPages.value && hasNextBatch.value;
    });

    // 基础查询参数
    const searchType = ref<string>(route.query.type as string || 'patents'); // 'patents' 或 'achievements'
    const query = ref<string>(route.query.query as string || '');
    const subject = ref<string>(route.query.subject as string || '');
    const subjectLevel = ref<number>(Number(route.query.subjectLevel) || 1);
    const page = ref<number>(Number(route.query.page) || 1);
    const limit = ref<number>(100); // 后端请求限制为50

    const displayLimit = 6; // 前端每页展示6个结果
    const results = ref<Array<any>>([]);
    const totalResults = ref<number>(0);

    const authors = ref<string[]>([]);
    const years = ref<number[]>([]);
    const fields = ref<string[]>([]); // 动态提取

    const filters = ref({
      author: "",
      date: "",
      keywords: "",
      field: "",
      sortBy: "", // 空表示不排序
      order: "desc", // 默认降序
    });

    const isSidebarOpen = ref<boolean>(true);
    const loading = ref<boolean>(false);


    // 获取搜索结果
    const fetchSearchResults = async () => {
      loading.value = true;
      try {
        const apiPath = searchType.value === 'patents' ? '/search/patents' : '/search/achievements';

        // 构建动态的查询参数
        const params: Record<string, any> = {
          query: query.value,
          limit: limit.value, // 设置为50
        };


        const response = await axiosInstance.get(apiPath, {
          
          params
        });

        console.log('API 返回数据:', response.data); // 调试用

        // 根据类型处理返回数据
        if (searchType.value === 'patents') {
          // 处理专利数据
          const fetchedResults = response.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            assignee: item.assignee,
            author: item.author,
            publication_date: item.publication_date,
            tags: item.classification || [],
            result_url: item.result_url,
            pdf_url: item.pdf_url,
          }));
          results.value = fetchedResults;
          totalResults.value = fetchedResults.length;
          if(fetchedResults.length < batchSize.value){
            hasNextBatch.value = false;
          }
        } else {
          // 处理论文数据
          const fetchedResults = response.data.map((item: any) => ({
            paper_id: item.paper_id,
            title: item.title,
            author: item.author,
            published_at: item.published_at,
            download_url: item.download_url,
            doi: item.doi,
            tags: [...(item.subject1 || []), ...(item.subject2 || [])],
            abstract_text: item.abstract_text || '',
          }));
          results.value = fetchedResults;
          totalResults.value = fetchedResults.length;
          if(fetchedResults.length < batchSize.value){
            hasNextBatch.value = false;
          }
        }

        // 提取作者列表
        extractAuthors();

        // 动态提取学科领域
        extractFields();

        // 等待DOM更新后触发MathJax

      } catch (error) {
        console.error('获取搜索结果时出错:', error);
      } finally {
        loading.value = false;
      }
    };

    // 提取作者列表用于筛选
    const extractAuthors = () => {
      const authorSet = new Set<string>();
      results.value.forEach(result => {
        const authorStr = result.author || result.assignee;
        if (authorStr) {
          authorStr.split(',').forEach((author: string) => {
            authorSet.add(author.trim());
          });
        }
      });
      authors.value = Array.from(authorSet);
    };

    // 动态提取学科领域
    const extractFields = () => {
      const fieldSet = new Set<string>();
      if (searchType.value === 'patents') {
        results.value.forEach(result => {
          const classifications = result.tags || [];
          classifications.forEach((cls: string) => fieldSet.add(cls));
        });
      } else {
        results.value.forEach(result => {
          const subjects = result.tags || [];
          subjects.forEach((sub: string) => fieldSet.add(sub));
        });
      }
      fields.value = Array.from(fieldSet).sort();
    };

    // 格式化日期
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('zh-CN');
    };

    // 获取标签列表
    const getTags = (result: any) => {
      return result.tags || [];
    };

    // 获取标签样式
    const getTagStyle = (index: number) => {
      const colors = ['#4CAF50', '#2196F3', '#FFC107'];
      return { backgroundColor: colors[index % colors.length] };
    };

    // 获取摘要，前50字符加省略号
    const getAbstract = (abstractText: string) => {
      if (!abstractText) return '';
      const truncated = abstractText.length > 300 ? abstractText.slice(0, 300) + '...' : abstractText;
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
        });
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
      }
      return truncated;
    };

    // 翻页方法
    const prevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
      }
    };

    const nextPage = async () => {
      if (isLastBatchPage.value) {
        // 如果是批次的最后一页，加载新数据
        console.log('加载新数据...');
        loading.value = true;
        try {
          const apiPath = searchType.value === 'patents' ? '/search/patents' : '/search/achievements';
          const params = {
            query: query.value,
            limit: limit.value,
            page: currentBatch.value + 1 // 使用批次号
          };

          const response = await axiosInstance.get(apiPath, { params });
          console.log('加载新数据:', response.data);
          
          // 处理新数据
          let newResults = [];
          if (searchType.value === 'patents') {
            newResults = response.data.map((item: any) => ({
              id: item.id,
              title: item.title,
              assignee: item.assignee,
              author: item.author,
              publication_date: item.publication_date,
              tags: item.classification || [],
              result_url: item.result_url,
              pdf_url: item.pdf_url,
            }));
            if(newResults.length < batchSize.value){
              hasNextBatch.value = false;
            }
          } else {
            newResults = response.data.map((item: any) => ({
              paper_id: item.paper_id,
              title: item.title,
              author: item.author,
              published_at: item.published_at,
              download_url: item.download_url,
              doi: item.doi,
              tags: [...(item.subject1 || []), ...(item.subject2 || [])],
              abstract_text: item.abstract_text || '',
            }));
            if(newResults.length < batchSize.value){
              hasNextBatch.value = false;
            }
          }

          // 更新数据和状态
          results.value = [...results.value, ...newResults];
          currentBatch.value++;
          page.value++;    
          // 更新筛选条件数据
          extractAuthors();
          extractFields();
        } catch (error) {
          console.error('加载新数据失败:', error);
        } finally {
          loading.value = false;
        }
      } else {
        // 普通翻页
        page.value++;
      }
    };

    // 更新路由以反映当前的搜索状态
    const updateRoute = () => {
      router.push({
        path: '/search',
        query: {
          type: searchType.value,
          query: query.value,
          subject: subject.value,
          subjectLevel: subjectLevel.value,
          page: page.value,
          limit: limit.value,
        }
      });
    };

    // 查看详情跳转
    const viewDetails = (result: any) => {
      if (searchType.value === 'patents') {
        router.push({ name: "PatentDetail", params: { id: result.id } });
      } else {
        router.push({ name: "PaperDetail", params: { id: result.doi } });
      }
    };

    // 添加监听器
    watch(page, (newVal) => {
      targetPage.value = newVal;
    });

    // 切换侧边栏
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    // 监听路由变化以重新获取数据
    watch(() => route.query, (newQuery) => {
      searchType.value = (newQuery.type as string) || 'patents';
      query.value = (newQuery.query as string) || '';
      subject.value = (newQuery.subject as string) || '';
      subjectLevel.value = Number(newQuery.subjectLevel) || 1;
      page.value = Number(newQuery.page) || 1;
      limit.value = 100; // 固定为50
      results.value = [];
      fetchSearchResults();
    }, { immediate: true });

    // 计算过滤后的结果并按排序方式排序
    const filteredResults = computed(() => {
      let filtered = results.value.filter(result => {
        // 过滤作者
        if (filters.value.author && !(
            (result.author && result.author.includes(filters.value.author)) ||
            (result.assignee && result.assignee.includes(filters.value.author))
        )) {
          return false;
        }
        // 过滤日期
        if (filters.value.date) {
          const date = searchType.value === 'patents' ? result.publication_date : result.published_at;
          const year = new Date(date).getFullYear();
          if (year !== Number(filters.value.date)) {
            return false;
          }
        }
        // 过滤关键词
        if (filters.value.keywords) {
          const keywords = filters.value.keywords.toLowerCase();
          if (!result.title.toLowerCase().includes(keywords)) {
            return false;
          }
        }
        // 过滤学科领域
        if (filters.value.field) {
          if (!result.tags.includes(filters.value.field)) {
            return false;
          }
        }
        return true;
      });

      // 排序
      if (filters.value.sortBy === 'published_at') {
        filtered = filtered.sort((a, b) => {
          const dateA = searchType.value === 'patents' ? new Date(a.publication_date) : new Date(a.published_at);
          const dateB = searchType.value === 'patents' ? new Date(b.publication_date) : new Date(b.published_at);
          if (filters.value.order === 'asc') {
            return dateA.getTime() - dateB.getTime();
          } else {
            return dateB.getTime() - dateA.getTime();
          }
        });
      }

      return filtered;
    });

    // 分页后的结果
    const paginatedResults = computed(() => {
      const start = (page.value - 1) * displayLimit;
      const end = start + displayLimit;
      return filteredResults.value.slice(start, end);
    });

    // 计算总页数
    const totalPages = computed(() => {
      return Math.min(Math.ceil(filteredResults.value.length / displayLimit), 100);
    });

    // 判断是否有下一页
    const hasNextPage = computed(() => {
      return page.value < totalPages.value;
    });

    // 获取作者，最多显示三个，超出显示...
    const getAuthors = (authorsStr: string) => {
      const authorsArray = authorsStr.split(',').map(author => author.trim());
      if (authorsArray.length <= 3) {
        return authorsArray.join(', ');
      } else {
        return authorsArray.slice(0, 3).join(', ') + '...';
      }
    };

    // 在 setup 中添加
    const targetPage = ref(1);

    const jumpToPage = () => {
      const pageNum = parseInt(targetPage.value.toString());
      if (pageNum && pageNum >= 1 && pageNum <= totalPages.value) {
        page.value = pageNum;
      } else {
        alert('请输入有效的页码！');
      }
    };

    onMounted(() => {
      // 生成年份列表
      const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const yearsArray = [];
        for (let y = currentYear; y >= 2000; y--) {
          yearsArray.push(y);
        }
        return yearsArray;
      };

      years.value = generateYears();


      fetchSearchResults();

      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
        });
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
      }
    });

    return {
      isSidebarOpen,
      sidebarClass: computed(() => isSidebarOpen.value ? 'w-64' : 'w-16'),
      mainClass: computed(() => isSidebarOpen.value ? 'ml-64' : 'ml-16'),
      filters,
      authors,
      years,
      fields,
      paginatedResults, // 使用分页后的结果
      totalPages,
      currentPage: page,
      searchType,
      prevPage,
      nextPage,
      viewDetails,
      toggleSidebar,
      formatDate,
      getTags,
      getTagStyle,
      getAuthors,
      getAbstract,
      loading,
      hasNextPage,
      totalResults,
      limit,
      router,
      isLastBatchPage,
      currentBatch,
      hasNextBatch,
      batchSize,
      jumpToPage,
      targetPage,

    };
  },
});
</script>

<style scoped>
/* 自定义样式 */
/* 旋转效果 */
.rotate-180 {
  transform: rotate(180deg);
}

.grid {
  min-height: calc(100vh - 200px); /* 调整合适的高度 */
  padding-bottom: 60px; /* 为分页控件留出空间 */
}

/* 让主容器支持滚动 */
main {
  overflow-y: auto;
  height: calc(100vh - 64px); /* 减去导航栏高度 */
  position: relative;
}

/* 修改分页控件样式 */
.sticky {
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 10;
  border-top: 1px solid #eee;
}

/* 侧边栏宽度调整 */
/* Tailwind已经提供了w-64和w-16，所以不需要额外定义 */
</style>
