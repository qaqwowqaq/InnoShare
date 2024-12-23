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

    <!-- 内容区域 -->
    <div class="content p-4 bg-white overflow-y-auto" style="height: 100%; padding-left: 16%; width: 100%;">
      <section id="section1" class="mb-8 w-full flex flex-col space-y-10 items-center ">
        <div class="flex flex-col w-3/4 h-full">
          <h2 class="text-2xl font-semibold text-center text-blue-600 mb-6">上传专利</h2>

          <!-- 卡片包装表单 -->
          <el-card class="p-8 shadow-lg rounded-lg">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
              <!-- 专利ID -->
              <el-form-item label="专利ID" prop="id">
                <el-input v-model="form.id" placeholder="请输入专利ID" />
              </el-form-item>

              <!-- 专利标题 -->
              <el-form-item label="专利标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入专利标题" />
              </el-form-item>

              <!-- 受让人 -->
              <el-form-item label="受让人" prop="assignee">
                <el-input v-model="form.assignee" placeholder="请输入受让人名称" />
              </el-form-item>

              <!-- 作者 -->
              <el-form-item label="作者" prop="author">
                <el-input v-model="form.author" placeholder="请输入作者（多个作者请用逗号分隔）" />
              </el-form-item>

              <!-- 创建日期 -->
              <el-form-item label="创建日期" prop="creationDate">
                <el-date-picker v-model="form.creationDate" type="date" placeholder="选择创建日期" />
              </el-form-item>

              <!-- 出版日期 -->
              <el-form-item label="出版日期" prop="publicationDate">
                <el-date-picker v-model="form.publicationDate" type="date" placeholder="选择出版日期" />
              </el-form-item>

              <!-- 专利摘要 -->
              <el-form-item label="摘要" prop="abstract">
                <el-input type="textarea" v-model="form.abstract" rows="4" placeholder="请输入专利摘要" />
              </el-form-item>

              <!-- 分类 -->
              <el-form-item label="分类" prop="classification">
                <el-select
                    v-model="form.classification"
                    multiple
                    filterable
                    allow-create
                    @create="handleCreateCategory"
                    placeholder="请选择或输入分类领域"
                >
                  <el-option
                      v-for="option in predefinedCategories"
                      :key="option"
                      :label="option"
                      :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 结果链接 -->
              <el-form-item label="结果链接" prop="resultUrl">
                <el-input v-model="form.resultUrl" placeholder="请输入专利结果的链接" />
              </el-form-item>

              <!-- 输入PDF文件地址 -->
              <el-form-item label="PDF文件地址" prop="fileUrl">
                <el-input v-model="form.fileUrl" placeholder="请输入PDF文件的URL地址" />
              </el-form-item>

              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
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
import axiosInstance from '@/axiosConfig';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
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
    userAvatar.value = serverIP + '/' + response.data.data.avatarURL || '';  // 默认空字符串
    console.log('用户名', username.value);
    console.log('头像', userAvatar.value);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

onMounted(async () => {
  const userId = route.params.id;
  const userDetails = await getUserDetails(userId.toString());
  console.log(userDetails);
});
// 路由和表单处理的基本设置
const router = useRouter();
const form = ref({
  id: '',
  title: '',
  assignee: '',
  author: '',
  creationDate: '',
  publicationDate: '',
  abstract: '',
  classification: [] as string[], // 分类字段是一个字符串数组
  resultUrl: '',
  fileUrl: '', // 新增字段用于存储PDF文件的URL
});

const predefinedCategories = [
  "技术", "工程", "医疗", "化学", "其他"
];

// 表单验证规则
const rules = {
  id: [{ required: true, message: '请输入专利ID', trigger: 'blur' }],
  title: [{ required: true, message: '请输入专利标题', trigger: 'blur' }],
  assignee: [{ required: true, message: '请输入受让人名称', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
  creationDate: [{ required: true, message: '请选择创建日期', trigger: 'change' }],
  publicationDate: [{ required: true, message: '请选择出版日期', trigger: 'change' }],
  abstract: [{ required: true, message: '请输入专利摘要', trigger: 'blur' }],
  classification: [{ required: true, message: '请选择至少一个分类', trigger: 'change' }],
  resultUrl: [{ required: true, message: '请输入结果链接', trigger: 'blur' }],
  fileUrl: [{ required: true, message: '请输入PDF文件的URL地址', trigger: 'blur' }],
};

// 处理用户输入的自定义分类
const handleCreateCategory = (newCategory: string) => {
  if (!form.value.classification.includes(newCategory)) {
    form.value.classification.push(newCategory); // 将自定义分类添加到分类数组中
  }
};
import { useRoute } from 'vue-router';
const route = useRoute();
const userid = route.params.id;
// 提交表单数据
const handleSubmit = async () => {
  const { id, title, assignee, author, creationDate, publicationDate, abstract, classification, resultUrl, fileUrl } = form.value;

  // 将日期字符串转换为 Date 对象，确保与后端接口匹配
  const formattedCreationDate = new Date(creationDate);
  const formattedPublicationDate = new Date(publicationDate);

  // 创建 PatentStd 对象
  const patentStd = {
    id,
    title,
    assignee,
    author,
    creationDate: formattedCreationDate,
    publicationDate: formattedPublicationDate,
    abstractText: abstract,
    classification,
    resultUrl,
    pdfUrl: fileUrl, // 使用用户输入的 PDF URL
    timeline: [] // 目前没有提供时间线数据，可以根据需要修改
  };

  // 创建专利请求对象，并将 PatentStd 对象赋值给 patentRequest
  const uploadPatentRequest = {
    userId: Number(userid), // 假设当前用户的 ID 是 1
    patent: patentStd, // 将 PatentStd 对象传递给 patentRequest
  };

  try {
    const response = await axiosInstance.post('/academic/patent/upload', uploadPatentRequest);
    console.log('专利上传成功：', response);
    ElMessage.success('专利上传成功！');
    console.log('跳转到用户管理页面',userid);
    router.push({ name: 'AchiManage' , params: { userId: userid } });
  } catch (error) {
    console.error('专利上传失败:', error);
    ElMessage.error('专利上传失败，请重试。');
  }
};


// 重置表单
const resetForm = () => {
  form.value = {
    id: '',
    title: '',
    assignee: '',
    author: '',
    creationDate: '',
    publicationDate: '',
    abstract: '',
    classification: [],
    resultUrl: '',
    fileUrl: '', // 清空文件地址
  };
};
</script>

<style scoped>
/* 自定义样式 */
.el-form-item {
  margin-bottom: 20px;
}

.el-card {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-select {
  text-align: left;
}
</style>
