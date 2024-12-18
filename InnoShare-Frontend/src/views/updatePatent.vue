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
      <div class="mt-auto pb-6"></div>
    </div>

    <!-- 内容区域 -->
    <div class="content p-4 bg-white overflow-y-auto" style="height: 100%; padding-left: 16%; width: 100%;">
      <section id="section1" class="mb-8 w-full flex flex-col space-y-10 items-center ">
        <div class="flex flex-col w-3/4 h-full">
          <h2 class="text-2xl font-semibold text-center text-blue-600 mb-6">更新专利</h2>

          <!-- 卡片包装表单 -->
          <el-card class="p-8 shadow-lg rounded-lg">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
              <!-- 专利ID（只读） -->
              <el-form-item label="专利ID">
                <el-input v-model="form.id" readonly />
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

              <!-- 分类 -->
              <el-form-item label="分类" prop="classification">
                <el-select v-model="form.classification" multiple placeholder="请选择分类领域">
                  <el-option v-for="option in classificationOptions" :key="option" :label="option" :value="option" />
                </el-select>
              </el-form-item>

              <!-- 结果链接 -->
              <el-form-item label="结果链接" prop="resultUrl">
                <el-input v-model="form.resultUrl" placeholder="请输入专利结果的链接" />
              </el-form-item>

              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary" @click="handleSubmit">更新</el-button>
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
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

const form = ref({
  id: '',
  title: '',
  assignee: '',
  author: '',
  creationDate: '',
  publicationDate: '',
  classification: [],
  resultUrl: '',
});

const classificationOptions = [
  "Agriculture",
  "Forestry",
  "Animal Husbandry",
  "Hunting",
  "Trapping",
  "Fishing",
];

const rules = {
  title: [{ required: true, message: '请输入专利标题', trigger: 'blur' }],
  assignee: [{ required: true, message: '请输入受让人名称', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
  creationDate: [{ required: true, message: '请选择创建日期', trigger: 'change' }],
  publicationDate: [{ required: true, message: '请选择出版日期', trigger: 'change' }],
  classification: [{ required: true, message: '请选择至少一个分类', trigger: 'change' }],
  resultUrl: [{ required: true, message: '请输入结果链接', trigger: 'blur' }],
};

const loadPatentData = async () => {
  const patentId = route.params.id;
  try {
    const response = await axios.get(`/api/academic/patent/get`, { params: { patentId } });
    const data = response.data;
    form.value = {
      id: data.id || '',
      title: data.title || '',
      assignee: data.assignee || '',
      author: data.auther || '',
      creationDate: data.creationDate || '',
      publicationDate: data.publicationDate || '',
      classification: data.classification || [],
      resultUrl: data.resultUrl || '',
    };
  } catch (error) {
    console.error('获取专利信息失败:', error);
    ElMessage.error('获取专利信息失败，请重试。');
  }
};

const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/academic/patent/update', form.value);
    ElMessage.success('专利更新成功！');
    router.push('/AchiManage');
  } catch (error) {
    console.error('更新专利失败:', error);
    ElMessage.error('更新专利失败，请重试。');
  }
};

// 在 onMounted 中调用
onMounted(() => {
  loadPatentData();
});
const resetForm = () => {
  loadPatentData(); // 重新加载表单数据
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
