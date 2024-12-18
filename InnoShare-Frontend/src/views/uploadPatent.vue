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

              <!-- 专利PDF文件 -->
              <el-form-item label="专利PDF文件" prop="file">
                <el-upload class="upload-demo" action="#" :show-file-list="false" :on-change="handleFileChange"
                  :before-upload="beforeFileUpload">
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                </el-upload>
                <span v-if="form.file" class="text-sm text-gray-600">{{ form.file?.name }}</span>
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
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { Store } from 'vuex';

const router = useRouter();
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

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
  file: null as File | null, // 确保 file 是 File 或 null
});

const predefinedCategories = [
  "技术", "工程", "医疗", "化学", "其他"
];

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
  file: [{ required: true, message: '请选择专利文件', trigger: 'change' }],
};

const handleFileChange = (file: any) => {
  form.value.file = file;
};

const beforeFileUpload = (file: File) => {
  const isPDF = file.type === 'application/pdf';
  if (!isPDF) {
    alert('只能上传PDF文件!');
  }
  return isPDF;
};

// 处理用户输入的自定义分类
const handleCreateCategory = (newCategory: string) => {
  if (!form.value.classification.includes(newCategory)) {
    form.value.classification.push(newCategory); // 将自定义分类添加到分类数组中
  }
};

const handleSubmit = async () => {
  const uploadPatentRequest = {
    userId: 1, // 假设当前用户的 ID 是 1
    patentRequest: {
      id: form.value.id,
      title: form.value.title,
      assignee: form.value.assignee,
      author: form.value.author,
      creationDate: form.value.creationDate,
      publicationDate: form.value.publicationDate,
      abstract: form.value.abstract,
      classification: form.value.classification, // 分类为数组
      resultUrl: form.value.resultUrl,
    },
  };

  try {
    const response = await axiosInstance.post('/api/academic/patent/upload', uploadPatentRequest);
    ElMessage.success('专利上传成功！');
    router.push('/AchiManage');
  } catch (error) {
    console.error('专利上传失败:', error);
    ElMessage.error('专利上传失败，请重试。');
  }
};

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
    file: null,
  };
};
</script>

<style scoped>
/* 自定义样式 */
.upload-demo i {
  margin-right: 10px;
}

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
