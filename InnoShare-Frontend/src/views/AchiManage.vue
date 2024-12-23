<template>
  <div class="flex  " style="overflow: hidden;margin-top: 4%;">
    <!-- 左侧固定栏 -->
    <div class="sidebar bg-gray-800 text-white p-4 fixed flex flex-col justify-between "
      style="height: 96%; width: 16%;">
      <!-- 顶部部分 -->
      <div class="flex flex-col items-center space-y-4">
        <!-- 用户头像 -->
        <el-avatar :size="80" :src="userAvatar || ''" shape="circle" class="mb-4">
          {{ username.charAt(0).toUpperCase() }} <!-- 使用用户名的首字母 -->
        </el-avatar>
        <!-- 用户昵称 -->
        <div class="text-center font-semibold text-lg">{{ username }}</div>
      </div>

      <!-- 底部部分 -->
      <div class="mt-auto pb-6">

        <!-- 上传按钮 -->
        <el-button type="primary"
          class="w-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-blue-700"
          @click="handleUploadClick1">
          上传专利
        </el-button>
      </div>
      <div class="mt-1 pb-6">

        <!-- 上传按钮 -->
        <el-button type="primary"
          class="w-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-blue-700"
          @click="handleUploadClick">
          上传论文
        </el-button>
      </div>
    </div>
    <div class="flex-col" style="height:100%;padding-bottom: 20%; padding-left: 16%; width: 120%;overflow:auto;">
      <div>
        <el-menu :default-active="activeTab" class="fixed w-full el-menu-demo bg-gray-800 z-10" mode="horizontal"
          @select="handleTabChange">
          <el-menu-item style="color:darkgray; ;" index="section2">专利部分</el-menu-item>
          <el-menu-item style="color: darkgray;" index="section1">论文部分</el-menu-item>

        </el-menu>
      </div>
      <div class="content bg-white mt-20">



        <!-- 论文部分 -->
        <section v-if="activeTab === 'section1'" id="section1" class="w-full flex flex-col space-y-10 items-center ">
          <!-- 动态渲染每一页的卡片 -->
          <div v-for="(paper, index) in currentPapers" :key="index"
            class=" w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            style="background:whitesmoke;">
            <div class="p-6 ">
              <h3 class="h-2/5 text-xl font-semibold text-blue-600 hover:underline cursor-pointer"
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
              <slot name="paper-section"></slot>
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
        <!-- 专利部分 -->
        <section v-if="activeTab === 'section2'" id="section2" class="flex flex-col space-y-10 items-center"
          style="width: 100%;">
          <div class="w-4/5 flex flex-col px-8 h-full">
            <el-card class="p-8 shadow-lg rounded-lg" :row-class-name="rowClassName">
              <el-table :data="paginatedPatents" style="width: 100%; --row-height: 50px;">
                <!-- 各种列 --><!-- 操作列 -->
                <el-table-column prop="action" label="" label-class-name="centered-column">
                  <template #default="scope">
                    <div class="flex flex-col items-center space-y-2">
                      <!-- 设置按钮宽度，确保一致；去掉不必要的偏移 -->
                      <el-button type="primary" size="small"
                        style="width: 40px; text-align: center; padding-left: 0; padding-right: 0;"
                        @click="handleEdit1(scope.row)">
                        <i class="fas fa-edit"></i>
                      </el-button>

                      <el-button type="danger" size="small" style="width: 40px; text-align: center;margin-left: 0px;"
                        @click="handleDelete1(scope.row)">
                        <i class="fas fa-trash"></i>
                      </el-button>

                    </div>
                  </template>





                </el-table-column>
                <el-table-column prop="title" label="专利标题" width="150">
                  <template #default="{ row }">
                    <!-- 给 span 添加 link 类 -->
                    <span @click="goToPatentDetail(row.id)" class="link">
                      {{ row.title }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column prop="assignee" label="受让人" width="150"></el-table-column>
                <el-table-column prop="author" label="作者" width="150"></el-table-column>
                <el-table-column prop="creation_date" label="创作日期" width="120"></el-table-column>
                <el-table-column prop="publication_date" label="出版日期" width="120"></el-table-column>
                <el-table-column prop="result_url" label="专利链接">
                  <template #default="scope">
                    <a :href="scope.row.result_url" target="_blank" class="text-blue-500">查看详情</a>
                  </template>
                </el-table-column>
                <el-table-column prop="pdf_url" label="下载">
                  <template #default="scope">
                    <a :href="scope.row.pdf_url" target="_blank" class="text-blue-500" width="200">下载PDF</a>
                  </template>
                </el-table-column>
                <el-table-column prop="classification" label="分类" width="200"></el-table-column>

              </el-table>
            </el-card>
            <!-- 分页组件 -->
            <el-pagination background layout="prev, pager, next" :total="patents.length" :page-size="pageSize1"
              @current-change="handlePageChange1" :current-page="currentPage1" class="mt-6" />

          </div>
        </section>
      </div>

    </div>
  </div>

  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script setup lang="ts">
import axiosInstance from '@/axiosConfig';
import { ElMessageBox, ElMessage } from 'element-plus';
import { reactive, toRefs, ref, computed, onMounted, nextTick, Ref } from 'vue'
import { useRoute,useRouter } from "vue-router"; // Vue Router for navigation
// request function
const urlBase: string = '/users';
const route = useRoute();
const userId = route.params.userId;
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
  return null;
}
const userAvatar = ref('');
const username = ref('');

// 获取指定用户详细信息
const getUserDetails = async (userId: string) => {
  try {
    // 获取 token
    const token = getCookie('token');
    console.log('Token:', token); // 检查 Token 是否正确
    console.log('Token:', document.cookie);
    console.log('Token:', localStorage.getItem('admin-jwt-token'));
    // 如果 token 存在，将其添加到 Authorization 请求头
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // 发起 GET 请求
    const response = await axiosInstance.get(`/users/${userId}`, {

    })
    //get(`/users/${userId}`, { headers });

    console.log("用户信息", response.data);
    // 从返回的数据中提取用户名和头像
    username.value = response.data.data.username || '';  // 默认空字符串
    userAvatar.value = response.data.data.avatarURL || '';  // 默认空字符串
    console.log('用户名', username.value);
    console.log('头像', userAvatar.value);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

onMounted(async () => {
  const userDetails = await getUserDetails(userId.toString());
  console.log(userDetails);
});

// 当前激活的导航选项
const activeTab = ref('section2');
// 行样式函数
const rowClassName = () => {
  // 这里只用到了 row，没有 rowIndex
  return 'custom-row';
};

// 专利部分的数据结构和初始化数据
interface Patent {
  id: string;
  title: string;
  assignee: string;
  author: string;
  creation_date: string;
  publication_date: string;
  result_url: string;
  pdf_url: string;
  classification: string[];
  abstractText?: string | null;
  timeline?: string[] | null;
}

// 专利数据
const patents = ref<Patent[]>([

]);
// 获取专利数据并更新
const fetchPatents = async (userId: number) => {
  try {
    const response = await axiosInstance.get('/academic/patent/all', {
      params: { userId }
    });

    if (response.data.success) {
      // 格式化返回的数据
      const formattedPatents = response.data.data.patents.map((patent: any) => ({
        id: patent.id,
        title: patent.title,
        assignee: patent.assignee,
        author: patent.author,
        creation_date: new Date(patent.creationDate).toISOString().split('T')[0], // 格式化日期
        publication_date: new Date(patent.publicationDate).toISOString().split('T')[0], // 格式化日期
        result_url: patent.resultUrl,
        pdf_url: patent.pdfUrl,
        classification: patent.classification, // 直接使用分类数组
        abstractText: patent.abstractText || '', // 如果没有摘要，使用空字符串
        timeline: patent.timeline || [] // 如果没有时间线，使用空数组
      }));

      // 更新 patents 数据
      patents.value = formattedPatents;
    } else {
      console.error('专利数据获取失败:', response.data.message);
    }
  } catch (error) {
    console.error('获取专利数据时出错:', error);
  }
};
onMounted(() => {
  fetchPatents(Number(userId)); // 传递 userId
});
// 分页状态
const currentPage1 = ref(1); // 当前页
const pageSize1 = 4; // 每页显示的条目数

// 当前页显示的数据
const paginatedPatents = computed(() => {
  const startIndex = (currentPage1.value - 1) * pageSize1;
  const endIndex = currentPage1.value * pageSize1;
  return patents.value.slice(startIndex, endIndex);
});
// 分页切换时更新当前页
const handlePageChange1 = (newPage: number) => {
  currentPage1.value = newPage;

};
// 切换导航选项时的逻辑
const handleTabChange = (tab: string) => {
  activeTab.value = tab;
  nextTick(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
    }
  });
};
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
    const response = await axiosInstance.get('/academic/allPaper', {
      params: { userId: userId }, // 传递 userId 参数
    });
    console.log('获取论文数据成功:', response.data.data);

    if (response.data.success) {
      papers.value = response.data.data.map((item: { paper: {
[x: string]: any; doi: any; title: any; author: any; abstractText: any; subjects: any; publishedAt: any; downloadUrl: any; 
}; }, index: number) => ({
        id: index, // 当前文献的序号作为 id
        doi: item.paper.doi,
        title: item.paper.title,
        authors: item.paper.author,
        abstract: item.paper.abstractText,
        publishDate: new Date(item.paper.publishedAt).toISOString().split('T')[0],
        uploadDate: new Date(item.paper.updatedAt).toISOString().split('T')[0], // 固定日期或根据需要更新
        citations: item.paper.citationCount||0, // 引用量
        downloads: item.paper.downloadCount, // 下载量
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
  router.push({ name: "PaperDetail", params: { id: paperId } }); // 假设你在路由中有名为 paper-detail 的页面

};
const goToPatentDetail = (patentId: string) => {
  router.push({ name: "PatentDetail", params: { id: patentId } }); // 假设你在路由中有名为 paper-detail 的页面

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
  router.push({ name: 'UploadPaper' , params: { id: userId } });
};
const handleUploadClick1 = () => {
  console.log("上传论文按钮被点击");
  // 跳转到上传论文页面
  router.push({ name: 'UploadPatent' , params: { id: userId }});
};
// 处理更新按钮点击事件
const handleUpdate = (paperId: string) => {
  console.log(`Updating paper with ID: ${paperId}`);
  // 跳转到更新论文页面，传递 paperId 参数
  router.push({ name: 'UpdatePaper', params: { id: paperId, userId: userId } });
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
      const response = await axiosInstance.get('/academic/delete', {
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


// 修改专利
const handleEdit1 = (patent: Patent) => {
  console.log('修改专利:', patent);
  // 这里可以打开弹窗编辑专利内容，或者跳转到修改页面
  router.push({ name: 'UpdatePatent', params: { id: patent.id, userId: userId} });
};

// 删除专利
const handleDelete1 = (patent: Patent) => {
  console.log('删除专利:', patent);

  // 弹出确认框
  ElMessageBox.confirm(`确定要删除专利 "${patent.title}" 吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        // 调用删除接口
        const userId = 2; // 假设当前用户的 ID 是 2
        const patentId = patent.id;

        // 调用删除接口
        const response = await axiosInstance.get('/academic/patent/delete', {
          params: {
            userId: 1, // 当前用户 ID
            patentId: patentId, // 要删除的论文 DOI
          },
        });

        // 判断是否删除成功
        if (response.data.success) {
          // 从列表中删除
          patents.value = patents.value.filter((item) => item.id !== patent.id);
          ElMessage.success('删除成功');
        } else {
          ElMessage.error('删除失败，请重试');
        }
      } catch (error) {
        console.error('删除专利失败:', error);
        ElMessage.error('删除专利失败，请重试');
      }
    })
    .catch(() => {
      ElMessage.info('删除已取消');
    });
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

.custom-row {
  height: 50px;
  /* 行高 */
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


/* 给 .link 添加样式 */
.link {
  cursor: pointer;
  /* 鼠标悬停时显示为手形光标 */
  color: #409EFF;
  /* 默认字体颜色为蓝色 */
  text-decoration: underline;
  /* 添加下划线 */
}

/* 鼠标悬停时改变颜色 */
.link:hover {
  color: #007bff;
  /* 悬停时改变颜色 */
  text-decoration: none;
  /* 鼠标悬停时去掉下划线 */
}

/* 鼠标点击时的效果 */
.link:active {
  color: #0056b3;
  /* 点击时的颜色 */
  text-decoration: none;
  /* 点击时去掉下划线 */
}


.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
