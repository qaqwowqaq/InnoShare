<template>
  <div class="h-screen flex mt-20 ">
    <!-- 左侧固定栏 -->
    <div class="sidebar bg-gray-800 text-white p-4 fixed flex flex-col justify-between "
         style="height: 92%; width: 16%;">
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

      </div>
    </div>

    <div class="content p-4 bg-white overflow-y-auto" style="height: 100%; padding-left: 16%; width: 100%;">

      <section id="section1" class="mb-8 w-full flex flex-col space-y-10 items-center ">
        <div class=" flex flex-col  w-3/4 h-full">
          <h2 class="text-2xl font-semibold text-center text-blue-600 mb-6">更新论文信息</h2>

          <!-- 卡片包装表单 -->
          <el-card class="p-8 shadow-lg rounded-lg">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
              <!-- 论文标题 -->
              <el-form-item label="论文标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入论文标题" />
              </el-form-item>

              <!-- 作者 -->
              <el-form-item label="作者" prop="authors">
                <el-input v-model="form.authors" placeholder="请输入作者（多个作者请用逗号分隔）" />
              </el-form-item>

              <!-- 摘要 -->
              <el-form-item label="摘要" prop="abstract">
                <el-input type="textarea" v-model="form.abstract" rows="4" placeholder="请输入论文摘要" />
              </el-form-item>

              <el-form-item label="学科领域">
                <!-- 只读显示学科领域 -->
                <el-tag v-for="subject in subjects" :key="subject" type="info" class="mr-2">
                  {{ subject }}
                </el-tag>
              </el-form-item>

              <!-- 论文文件 -->
              <el-form-item label="论文文件" prop="file">
                <el-upload class="upload-demo" action="#" :show-file-list="false" :on-change="handleFileChange"
                           :before-upload="beforeFileUpload">
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                </el-upload>
                <span v-if="form.file" class="text-sm text-gray-600">{{ form.file.name }}</span>
              </el-form-item>

              <!-- 出版日期 -->
              <el-form-item label="出版日期" prop="publishedAt">
                <el-date-picker v-model="form.publishedAt" type="date" placeholder="选择出版日期" />
              </el-form-item>

              <!-- 下载链接 -->
              <el-form-item label="下载链接" prop="downloadUrl">
                <el-input v-model="form.downloadUrl" placeholder="请输入论文下载链接" />
              </el-form-item>

              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary" @click="handleUpdate">更新</el-button>
                <el-button @click="resetForm" class="ml-4">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </section>
    </div>
  </div>

  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import { useRouter } from "vue-router"; // Vue Router for navigation
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosConfig';
const router = useRouter();
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
// 获取路由对象
const serverIP = 'http://113.44.223.168'
const userAvatar = ref('');
const username = ref('');


// 获取指定用户详细信息
const getUserDetails = async (userId: string) => {
  try {
    // 发起 GET 请求
    const response = await axiosInstance.get(`/users/${userId}`, {

    })
    //get(`/users/${userId}`, { headers });

    console.log("用户信息", response.data);
    // 从返回的数据中提取用户名和头像
    username.value = response.data.data.username || '';  // 默认空字符串
    userAvatar.value = serverIP + "/" + response.data.data.avatarURL || '';  // 默认空字符串
    console.log('用户名', username.value);
    console.log('头像', userAvatar.value);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

onMounted(async () => {
  // const userId = 1;
  const userDetails = await getUserDetails(userId.toString());
  console.log(userDetails);
});
const route = useRoute();
// 从路由参数中获取 DOI
const doi = route.params.id;
const userId = route.params.userId;
console.log('DOI:', doi);
const subjects = ref<string[]>([]); // 单独管理 subjects
// 明确声明 form 类型
const form = ref<{
  title: string;
  authors: string;
  abstract: string;
  file: { name: string } | null; // file 可能是 null 或文件对象
  publishedAt: string;
  downloadUrl: string;
  createdAt?: string; // 可选属性
}>({
  title: '',
  authors: '',
  abstract: '',
  file: null,
  publishedAt: '',
  downloadUrl: '',
})

const rules = {
  title: [{ required: true, message: '请输入论文标题', trigger: 'blur' }],
  authors: [{ required: true, message: '请输入论文作者', trigger: 'blur' }],
  abstract: [{ required: true, message: '请输入论文摘要', trigger: 'blur' }],
  file: [{ required: true, message: '请选择论文文件', trigger: 'change' }],
  publishedAt: [{ required: true, message: '请选择出版日期', trigger: 'change' }],
  downloadUrl: [{ required: true, message: '请输入论文下载链接', trigger: 'blur' }],
}
const existingPaper = ref({
  title: "",
  authors: "",
  abstract: "",
  file: { name: "" },
  publishedAt: "",
  downloadUrl: "",
  createdAt: ""
})
// 获取数据的函数
const fetchPaper = async () => {
  try {
    console.log('获取论文数据...', doi);
    const response = await axiosInstance.get('/academic/getPaper', {
      params: { paperDoi: doi } // 你可以替换为动态的 DOI 或其他参数
    });
    console.log('获取论文数据成功:', response.data.data);
    // 假设接口返回的 paper 数据结构与你的 existingPaper 相匹配
    existingPaper.value = {
      title: response.data.data.paper.title,
      authors: response.data.data.paper.author,
      abstract: response.data.data.paper.abstractText || "",
      file: { name: response.data.data.paper.file?.name || "" },
      publishedAt: new Date(response.data.data.paper.createdAt).toLocaleDateString('zh-CN'),
      downloadUrl: response.data.data.paper.downloadUrl,
      createdAt: new Date(response.data.data.paper.createdAt).toLocaleDateString('zh-CN'),
    };
    subjects.value = response.data.data.paper.subjects; // 初始化不可修改的 subjects
    console.log('获取论文数据成功:', existingPaper.value);
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
onMounted(async () => {
  // 获取论文数据后再更新 form 的值
  await fetchPaper(); // 确保异步数据获取完成
  form.value = existingPaper.value; // 直接赋值，避免浅拷贝

  setTimeout(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
    }
  }, 100);
  console.log('更新后的 form:', form.value);
});

const handleFileChange = (file: any) => {
  form.value.file = file
}

const beforeFileUpload = (file: File) => {
  const isPDF = file.type === 'application/pdf'
  if (!isPDF) {
    alert('只能上传PDF文件!')
  }
  return isPDF
}
let pdoi: string = '';
if (typeof doi === 'string') {
  pdoi = doi.split("/arXiv.").pop() || ''; // 提取 DOI 编号（2401.01098）
}
const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');  // 保证月是两位数
  const day = String(parsedDate.getDate()).padStart(2, '0');  // 保证日是两位数
  return `${year}-${month}-${day}`;
};
// 更新论文的函数
const handleUpdate = async () => {
  // 在提交时设置创建时间为当前时间
  form.value.createdAt = new Date().toISOString();


  const formattedDate = formatDate(form.value.publishedAt);  // 输出 "2024-12-01"
  console.log(formattedDate);
  // 构建更新请求体
  const updatePaperRequest = {
    userId: Number(userId), // 假设当前用户的 ID 是 1
    paperRequest: {
      title: form.value.title,
      author: form.value.authors,
      abstractText: form.value.abstract,
      subjects: subjects.value,
      publishedAt: formattedDate,
      doi: pdoi, // 使用从 DOI 地址提取的部分
      downloadUrl: form.value.downloadUrl,
      references: [],  // 即使没有引用，也需要传递空数组
    }
  };

  console.log('更新论文信息:', updatePaperRequest);

  // 调用 API 更新论文信息
  try {
    const response = await axiosInstance.post('/academic/update', updatePaperRequest);
    console.log('论文更新成功:', response.data);

    // 显示成功弹窗
    ElMessage.success('论文更新成功！');

    // 跳转到 /AchiManage 页面
    router.push({ name: "AchiManage", params: { userId: userId } });
  } catch (error) {
    console.error('更新论文失败:', error);

    // 显示错误弹窗
    ElMessage.error('更新论文失败，请重试。');
  }
};

const resetForm = () => {
  form.value = {
    title: '',
    authors: '',
    abstract: '',
    file: null,
    publishedAt: '',
    downloadUrl: '',
    createdAt: '', // 清空创建时间
  }
}

// 使用 TypeScript 类型断言
const state = reactive({
  circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { sizeList } = toRefs(state)

</script>


<style scoped>
/* 自定义样式 */


.upload-demo i {
  margin-right: 10px;
}

.el-form-item {
  margin-bottom: 20px;
}

/* 卡片内容左对齐 */
.el-card {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-select {
  text-align: left;
}
</style>