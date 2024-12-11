<template>
  <div class="h-screen flex">
    <!-- 左侧固定栏 -->
    <div class="sidebar bg-gray-800 text-white p-4 fixed flex flex-col justify-between "
      style="height: 92%; width: 16%;">
      <!-- 顶部部分 -->
      <div class="flex flex-col items-center space-y-4">
        <!-- 用户头像 -->
        <el-avatar :size="80" :src="circleUrl" shape="circle" class="mb-4" />
        <!-- 用户昵称 -->
        <div class="text-center font-semibold text-lg">用户昵称</div>
      </div>

      <!-- 底部部分 -->
      <div class="mt-auto pb-6">
        <!-- 上传按钮 -->
        <el-button type="primary"
          class="w-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-blue-700"
          @click="handleUploadClick">
          上传论文
        </el-button>
      </div>
    </div>

    <div class="content p-4 bg-white overflow-y-auto" style="height: 92%; padding-left: 16%; width: 100%;">
      <section id="section1" class="mb-8 w-full flex flex-col space-y-8 items-center ">
        <!-- 动态渲染每一页的卡片 -->
        <div v-for="(paper, index) in currentPapers" :key="index"
          class=" w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          style="background-color:rgb(209.4, 236.7, 195.9);">
          <div  class="p-6 " >
            <h3  class="h-2/5 text-xl font-semibold text-blue-600 hover:underline cursor-pointer"
              @click="navigateToPaper(paper.doi)">
              {{ paper.title }}
            </h3>
            <div class="flex flex-col items-start text-sm text-gray-500 text-left">
              <p class="text-gray-500 text-sm mt-4 line-clamp-3">
                <span class="font-bold">摘要：</span>{{ paper.abstract }}
              </p>
              <p class="text-sm text-gray-600 mt-2">
                <span class="font-bold">作者：</span> <span class="font-medium">{{ paper.authors }}</span>
              </p>
              <p class="text-sm text-gray-600 mt-2">
                <span class="font-bold">出版时间：</span> <span class="font-medium">{{ paper.publishDate }}</span>
              </p>
              <p class="text-sm text-gray-600 mt-2">
                <span class="font-bold">上传时间：</span> <span class="font-medium">{{ paper.uploadDate }}</span>
              </p>
            </div>
          </div>
          <!-- 卡片底部横栏 -->
          <div class="flex justify-between items-center p-4 border-t border-gray-200">
            <!-- 左侧引用量和下载量 -->
            <div class="flex space-x-4">
              <div class="flex items-center text-gray-600">
                <i class="fas fa-paperclip mr-2"></i>
                <span>{{ paper.citations }}</span> <!-- 引用量 -->
              </div>
              <div class="flex items-center text-gray-600">
                <i class="fas fa-download mr-2"></i>
                <span>{{ paper.downloads }}</span> <!-- 下载量 -->
              </div>
            </div>
            <!-- 右侧更新和删除按钮 -->
            <div class="flex space-x-4">
              <button @click="handleUpdate(paper.doi)" class="text-gray-600 hover:text-blue-800">
                <i class="fas fa-edit"></i> 更新
              </button>
              <button @click="handleDelete(paper.doi)" class="text-gray-600 hover:text-red-800">
                <i class="fas fa-trash"></i> 删除
              </button>
            </div>
          </div>
        </div>
        <!-- 分页组件 -->
        <el-pagination background layout="prev, pager, next" :total="papers.length" :page-size="4"
          @current-change="handlePageChange" />
      </section>
    </div>
  </div>

  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script setup lang="ts">
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { reactive, toRefs, ref, computed, onMounted, nextTick, Ref } from 'vue'
import { useRouter } from "vue-router"; // Vue Router for navigation
// 假设每个paper是一个包含特定字段的对象
interface Paper {
  id: number;
  doi: string;
  title: string;
  authors: string;
  abstract: string;
  publishDate: string;
  uploadDate: string;
  citations: number;
  downloads: number;
}

const papers: Ref<Paper[]> = ref([]);



const fetchPapers = async () => {
  try {
    const response = await axios.get('/api/academic/allPaper', {
      params: { userId: 1 }, // 传递 userId 参数
    });
    console.log('获取论文数据成功:', response.data.data);

    if (response.data.success) {
      papers.value = response.data.data.map((item: { paper: { doi: any; title: any; author: any; abstractText: any; subjects: any; publishedAt: any; downloadUrl: any; }; }, index: number) => ({
        id: index, // 当前文献的序号作为 id
        doi: item.paper.doi,
        title: item.paper.title,
        authors: item.paper.author,
        abstract: item.paper.abstractText,
        publishDate: item.paper.publishedAt,
        uploadDate: "2023-07-20", // 固定日期或根据需要更新
        citations: 120, // 引用量
        downloads: 450, // 下载量
      }));
      console.log('papers:', papers.value);  // 调试打印
      // 使用 MathJax 渲染公式
      setTimeout(() => {
        if (window.MathJax) {
          window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
        }
      }, 100);

      console.log('获取论文数据成功1:', papers.value);
    } else {
      console.error('获取论文数据失败:', response.data.message);
    }
  } catch (error) {
    console.error('获取论文数据失败:', error);
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
// 格式化日期
const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// 组件挂载时获取数据
onMounted(() => {
  fetchPapers();
});

const currentPage = ref(1); // 当前页码
const pageSize = 4; // 每页显示数量

// 计算当前页应该显示的数据
const currentPapers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = currentPage.value * pageSize;
  console.log('currentPapers:', papers.value.slice(startIndex, endIndex)); // 添加调试信息
  return papers.value.slice(startIndex, endIndex);
});

// 分页变化时触发的函数
const handlePageChange = (page: number) => {
  currentPage.value = page;
  nextTick(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
    }
  });
};

const router = useRouter();

// 导航到论文详细页面
const navigateToPaper = (paperId: string) => {
  router.push({ name: "paper-detail", params: { id: paperId } }); // 假设你在路由中有名为 paper-detail 的页面

};
// 使用 TypeScript 类型断言
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  // 使用 'as const' 进行类型断言，确保 sizeList 为只读数组
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl, sizeList } = toRefs(state)
// 点击上传论文按钮时的处理函数
const handleUploadClick = () => {
  console.log("上传论文按钮被点击");
  // 跳转到上传论文页面
  router.push({ name: 'UploadPaper' });
};
// 处理更新按钮点击事件
const handleUpdate = (paperId:string) => {
  console.log(`Updating paper with ID: ${paperId}`);
  // 跳转到更新论文页面，传递 paperId 参数
  router.push({ name: 'UpdatePaper', params: { id:paperId } });
};

// 处理删除按钮点击事件

const handleDelete = async (paperDoi: string) => {
  try {
    // 询问是否确认删除
    const result = await ElMessageBox.confirm(
      '您确定要删除这篇论文吗？',
      '确认删除',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    // 如果用户点击了"删除"
    if (result === 'confirm') {
      console.log(`Deleting paper with DOI: ${paperDoi}`);
      const response = await axios.get('/api/academic/delete', {
        params: {
          userId: 1, // 当前用户 ID
          paperDoi: paperDoi, // 要删除的论文 DOI
        },
      });

      if (response.data.success) {
        console.log('Paper deleted successfully');
        // 删除成功后重新请求论文数据
        await fetchPapers();  // 重新获取论文列表，更新页面

        // 显示成功消息
        ElMessage.success('论文删除成功');
      } else {
        console.error('Failed to delete paper:', response.data.message);
        ElMessage.error('删除论文失败，请重试');
      }
    }
  } catch (error) {
    console.error('Error occurred while deleting paper:', error);
    ElMessage.error('删除操作失败');
  }
};



</script>

<style scoped>
.demo-basic {
  text-align: center;
}

.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.demo-basic .block {
  flex: 1;
}

.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.el-button {
  font-size: 1rem;
  /* 适当减小字体 */
  padding: 10px 20px;
  /* 设置适当的内边距 */
  border-radius: 12px;
  /* 圆角设计 */
  background: linear-gradient(135deg, #6189b0, #207eca);
  /* 渐变色按钮 */
  border: none;
  /* 移除边框 */
  color: rgb(244, 238, 238);
  transition: all 0.3s ease-in-out;
  /* 增加按钮过渡效果 */
}

.el-button:hover {
  background: linear-gradient(135deg, #2a89d6, #452c96);
  /* 悬停时反转渐变色 */
  box-shadow: 0 4px 10px rgba(208, 46, 46, 0.2);
  /* 增加阴影效果 */
}

.el-button:focus {
  box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.5);
  /* 点击时添加焦点阴影 */
}

/* 卡片样式 */
.card {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  /* 放大效果 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /* 增加阴影 */
}


.card-body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.card-footer {
  padding-top: 1rem;
  font-size: 0.875rem;
  text-align: right;
}

.card-footer span {
  font-weight: 500;
}




.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
