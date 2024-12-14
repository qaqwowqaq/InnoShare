<template>
  <div class="h-screen flex" style="margin-top:100px">
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

    <div class="content p-4 bg-white overflow-y-auto" style="height: 100%; padding-left: 16%; width: 100%;">
      <section id="section1" class="mb-8 w-full flex flex-col space-y-10 items-center ">
        <div class=" flex flex-col  w-3/4 h-full">
        <h2 class="text-2xl font-semibold text-center text-blue-600 mb-6">上传论文</h2>

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

            <!-- 学科领域 -->
            <el-form-item label="学科领域" prop="subjects">
              <el-select v-model="form.subjects" multiple placeholder="请选择学科领域">
                <el-option label="Quantum Algebra (math.QA)" value="Quantum Algebra (math.QA)" />
                <el-option label="Category Theory (math.CT)" value="Category Theory (math.CT)" />
              </el-select>
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

            <!-- 创建时间 -->
            <el-form-item label="创建时间" prop="createdAt">
              <el-date-picker v-model="form.createdAt" type="datetime" placeholder="选择创建时间" />
            </el-form-item>

            <!-- 提交按钮 -->
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button @click="resetForm" class="ml-4">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card></div>
      </section>
    </div>
  </div>

  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, computed } from 'vue'
import { useRouter } from "vue-router"; // Vue Router for navigation
const router = useRouter();
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const form = ref({
  title: '',
  authors: '',
  abstract: '',
  subjects: [],
  file: null,
  publishedAt: '',
  downloadUrl: '',
  createdAt: '',
})

const rules = {
  title: [{ required: true, message: '请输入论文标题', trigger: 'blur' }],
  authors: [{ required: true, message: '请输入论文作者', trigger: 'blur' }],
  abstract: [{ required: true, message: '请输入论文摘要', trigger: 'blur' }],
  subjects: [{ required: true, message: '请选择学科领域', trigger: 'blur' }],
  file: [{ required: true, message: '请选择论文文件', trigger: 'change' }],
  publishedAt: [{ required: true, message: '请选择出版日期', trigger: 'change' }],
  downloadUrl: [{ required: true, message: '请输入论文下载链接', trigger: 'blur' }],
  createdAt: [{ required: true, message: '请选择创建时间', trigger: 'change' }],
}

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

const handleSubmit = () => {
  console.log('提交论文信息:', form.value)
  // 提交表单逻辑
}

const resetForm = () => {
  form.value = {
    title: '',
    authors: '',
    abstract: '',
    subjects: [],
    file: null,
    publishedAt: '',
    downloadUrl: '',
    createdAt: '',
  }
}

// 使用 TypeScript 类型断言
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  // 使用 'as const' 进行类型断言，确保 sizeList 为只读数组
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

.el-form-item .el-input, .el-form-item .el-select {
  text-align: left;
}
</style>