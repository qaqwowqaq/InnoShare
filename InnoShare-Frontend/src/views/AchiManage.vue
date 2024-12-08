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
          class="w-3/4 h-72 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          style="background-color:rgb(209.4, 236.7, 195.9);">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-blue-600 hover:underline cursor-pointer"
              @click="navigateToPaper(paper.id)">
              {{ paper.title }}
            </h3>
            <div class="flex flex-col items-start text-sm text-gray-500 text-left">
              <p class="text-gray-500 text-sm mt-4 line-clamp-3">
                <span class="font-bold">摘要：</span>{{ paper.abstract }}
              </p>
              <p class="text-sm text-gray-600 mt-2">
                <span class="font-bold">作者：</span> <span class="font-medium">{{ paper.authors.join(", ") }}</span>
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
              <button @click="handleUpdate(paper.id)" class="text-gray-600 hover:text-blue-800">
                <i class="fas fa-edit"></i> 更新
              </button>
              <button @click="handleDelete(paper.id)" class="text-gray-600 hover:text-red-800">
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
import { reactive, toRefs, ref, computed } from 'vue'
import { useRouter } from "vue-router"; // Vue Router for navigation

// 模拟论文数据
const papers = ref([
  {
    id: 1,
    title: "Understanding AI: A Comprehensive Guide",
    authors: ["John Doe", "Jane Smith"],
    abstract: '分析乙烯利（ETH）、乙烯利抑制剂1-甲基环丙烯（1-MCP）和半胱氨酸（CYS）对橡胶树胶乳产量和主要品质指标的影响，并计算剂量阈值为生产提供依据，采用优化的正交实验设计分析三因素（ETH，1-MCP，CYS），四水平（三种试剂各四个浓度）共14个处理橡胶树割面，测定橡胶树胶乳产量、干含、分子量、塑性初值、塑性保持率和门尼粘度等关键指标，并分析指标之间的相关性。结果表明，14个处理橡胶树后产量、干含等均存在显著差异。相关分析表明数均分子量与重均分子量、门尼粘度正相关，相关系数分别为0.71和0.83，与多分散性负相关，相关系数为-0.91。塑性初值与门尼粘度正相关，相关系数为0.73。多分散性与门尼粘度负相关，相关系数-0.89。分别建立了以干含等指标为核心的回归方程，计算出的乙烯利的最高浓度是0.15%，1-MCP的最高浓度是1.08，CYS的浓度是0.41。优化的正交试验方法可有效的计算排胶调节剂的阈值，为后续实验提供理论和实践指导。',
    publishDate: "2023-05-12",
    uploadDate: "2023-07-20",
    imageUrl: "https://via.placeholder.com/300x200?text=AI+Paper", // 使用占位图
    citations: 120, // 引用量
    downloads: 450, // 下载量
  },
  {
    id: 2,
    title: "Autonomous Vehicles: The Future of Transportation",
    authors: ["Alice Johnson", "Bob Lee"],
    abstract: "This research focuses on autonomous vehicle technology, challenges, and future directions...",
    publishDate: "2022-11-15",
    uploadDate: "2023-01-10",
    imageUrl: "https://via.placeholder.com/300x200?text=AV+Paper",
    citations: 98, // 引用量
    downloads: 390, // 下载量
  },
  {
    id: 3,
    title: "Quantum Computing for Beginners",
    authors: ["Charlie Wang", "David Kim"],
    abstract: "An introductory paper on quantum computing, its principles, and potential future applications...",
    publishDate: "2023-03-22",
    uploadDate: "2023-04-05",
    imageUrl: "https://via.placeholder.com/300x200?text=Quantum+Paper",
    citations: 98, // 引用量
    downloads: 390, // 下载量
  },
  {
    id: 4,
    title: "Machine Learning in Healthcare",
    authors: ["Eva Adams", "George Miller"],
    abstract: '分析乙烯利（ETH）、乙烯利抑制剂1-甲基环丙烯（1-MCP）和半胱氨酸（CYS）对橡胶树胶乳产量和主要品质指标的影响，并计算剂量阈值为生产提供依据，采用优化的正交实验设计分析三因素（ETH，1-MCP，CYS），四水平（三种试剂各四个浓度）共14个处理橡胶树割面，测定橡胶树胶乳产量、干含、分子量、塑性初值、塑性保持率和门尼粘度等关键指标，并分析指标之间的相关性。结果表明，14个处理橡胶树后产量、干含等均存在显著差异。相关分析表明数均分子量与重均分子量、门尼粘度正相关，相关系数分别为0.71和0.83，与多分散性负相关，相关系数为-0.91。塑性初值与门尼粘度正相关，相关系数为0.73。多分散性与门尼粘度负相关，相关系数-0.89。分别建立了以干含等指标为核心的回归方程，计算出的乙烯利的最高浓度是0.15%，1-MCP的最高浓度是1.08，CYS的浓度是0.41。优化的正交试验方法可有效的计算排胶调节剂的阈值，为后续实验提供理论和实践指导。',
    publishDate: "2023-06-18",
    uploadDate: "2023-08-03",
    imageUrl: "https://via.placeholder.com/300x200?text=ML+Paper",
    citations: 98, // 引用量
    downloads: 390, // 下载量
  },
  {
    id: 5,
    title: "AI and Ethics: A Critical Review",
    authors: ["Simon Lee", "David Kim"],
    abstract: "An in-depth look at the ethical considerations surrounding AI technologies...",
    publishDate: "2023-09-05",
    uploadDate: "2023-10-15",
    citations: 98, // 引用量
    downloads: 390, // 下载量
  },
  {
    id: 6,
    title: "Blockchain Technology and its Applications",
    authors: ["Rita Li", "James Wang"],
    abstract: "Exploring blockchain technology and its application in various industries, including finance and healthcare...",
    publishDate: "2023-02-10",
    uploadDate: "2023-04-07",
    citations: 98, // 引用量
    downloads: 390, // 下载量
  },
]);
const currentPage = ref(1); // 当前页码
const pageSize = 4; // 每页显示数量

// 计算当前页应该显示的数据
const currentPapers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = currentPage.value * pageSize;
  return papers.value.slice(startIndex, endIndex);
});

// 分页变化时触发的函数
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const router = useRouter();

// 导航到论文详细页面
const navigateToPaper = (paperId: number) => {
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
  // 在这里处理上传论文逻辑
};
// 处理更新按钮点击事件
const handleUpdate = (paperId: number) => {
  console.log(`Updating paper with ID: ${paperId}`);
  // 你可以在这里添加更新的逻辑
};

// 处理删除按钮点击事件
const handleDelete = (paperId: number) => {
  console.log(`Deleting paper with ID: ${paperId}`);
  // 你可以在这里添加删除的逻辑
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
