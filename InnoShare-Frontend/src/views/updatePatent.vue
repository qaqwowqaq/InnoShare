<template>
  <div class="h-screen flex mt-20 ">
    <!-- 左侧固定栏 -->
    <div class="sidebar bg-gray-800 text-white p-4 fixed flex flex-col justify-between " style="height: 92%; width: 16%;">
      <!-- 顶部部分 -->
      <div class="flex flex-col items-center space-y-4">
        <!-- 用户头像 -->
        <el-avatar :size="80" :src="circleUrl" shape="circle" class="mb-4" />
        <!-- 用户昵称 -->
        <div class="text-center font-semibold text-lg">用户昵称</div>
      </div>

      <!-- 底部部分 -->
      <div class="mt-auto pb-6"></div>
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
                <el-input v-model="form.id" :disabled="isEdit" placeholder="请输入专利ID" />
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";

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

// 用于判断是查看还是编辑模式
const isEdit = ref(false);
const route = useRoute();
// 假设使用 DOI 获取专利 ID（根据实际情况替换）
const patentId = route.params.id; // 这里需要从 URL 或其他方式获取 patentId

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

// 请求专利数据
const fetchPatentData = async () => {
  try {
    const response = await axiosInstance.get(`/academic/patent/get`, { params: { patentId } });
    const patentData = response.data.data;  // 假设返回的数据结构正确

    // 填充表单数据
    form.value.id = patentData.id;
    form.value.title = patentData.title;
    form.value.assignee = patentData.assignee;
    form.value.author = patentData.author;
    form.value.creationDate = patentData.creationDate;
    form.value.publicationDate = patentData.publicationDate;
    form.value.abstract = patentData.abstractText;
    form.value.classification = patentData.classification;
    form.value.resultUrl = patentData.resultUrl;
    form.value.fileUrl = patentData.pdfUrl; // 将 PDF URL 填充到表单中

    // 设置为编辑模式
    isEdit.value = true;
  } catch (error) {
    console.error('获取专利信息失败:', error);
    ElMessage.error('获取专利信息失败，请重试。');
  }
};

// 提交表单数据
const handleSubmit = async () => {
  const { id, title, assignee, author, creationDate, publicationDate, abstract, classification, resultUrl, fileUrl } = form.value;

  const formattedCreationDate = new Date(creationDate);
  const formattedPublicationDate = new Date(publicationDate);

  const patent = {
    id,
    title,
    assignee,
    author,
    creationDate: formattedCreationDate,
    publicationDate: formattedPublicationDate,
    abstractText: abstract,
    classification,
    resultUrl,
    pdfUrl: fileUrl,
    timeline: [] // 可以根据需要修改
  };



  try {
    const response = await axiosInstance.post('/academic/patent/update', patent); // 更新专利数据

    console.log('专利上传成功：', response);
    ElMessage.success('专利更新成功！');
    router.push('/AchiManage/:1');
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
    fileUrl: '',
  };
};

// 页面加载时调用 fetchPatentData
onMounted(() => {
  fetchPatentData();
});
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
