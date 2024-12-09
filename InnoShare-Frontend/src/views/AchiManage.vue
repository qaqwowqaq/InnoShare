<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <div class="p-8 bg-gray-100 min-h-screen">
      <!-- 筛选和排序 -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-semibold mb-4">学术成果管理</h2>
        <form class="grid grid-cols-4 gap-4">
          <!-- 关键词筛选 -->
          <div>
            <label for="keyword" class="block text-sm font-medium text-gray-700">关键词</label>
            <input 
              v-model="filters.keyword"
              type="text" 
              id="keyword" 
              placeholder="按标题、作者或关键词" 
              class="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
  
          <!-- 类别筛选 -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">类别</label>
            <select 
              v-model="filters.category"
              id="category" 
              class="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">全部类别</option>
              <option value="Computer Science">计算机科学</option>
              <option value="Marketing">市场营销</option>
            </select>
          </div>
  
          <!-- 标签筛选 -->
          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700">标签</label>
            <input 
              v-model="filters.tags" 
              type="text" 
              id="tags" 
              placeholder="输入标签（用逗号分隔）" 
              class="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
  
          <!-- 排序选项 -->
          <div>
            <label for="sortBy" class="block text-sm font-medium text-gray-700">排序方式</label>
            <select 
              v-model="filters.sortBy"
              id="sortBy" 
              class="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="downloadCount">按下载次数</option>
              <option value="citationCount">按引用次数</option>
            </select>
          </div>
        </form>
        <button 
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          @click="applyFilters"
        >
          筛选
        </button>
      </div>
  
      <!-- 学术成果表格 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-200 text-left">
              <th class="px-4 py-2">序号</th>
              <th class="px-4 py-2">标题</th>
              <th class="px-4 py-2">类别</th>
              <th class="px-4 py-2">标签</th>
              <th class="px-4 py-2">上传时间</th>
              <th class="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(achievement, index) in achievements" 
              :key="achievement.id" 
              class="hover:bg-gray-100"
            >
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ achievement.title }}</td>
              <td class="border px-4 py-2">{{ achievement.category }}</td>
              <td class="border px-4 py-2">{{ achievement.tags.join(', ') }}</td>
              <td class="border px-4 py-2">{{ new Date(achievement.uploadedAt).toLocaleString() }}</td>
              <td class="border px-4 py-2">
                <button 
                  class="text-blue-500 hover:underline"
                  @click="downloadFile(achievement.fileUrl)"
                >
                  下载
                </button>
                |
                <button 
                  class="text-red-500 hover:underline"
                  @click="deleteAchievement(achievement.id)"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- 分页组件 -->
      <div class="flex justify-between items-center mt-6">
        <button 
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400" 
          @click="prevPage"
          :disabled="page === 1"
        >
          上一页
        </button>
        <span>第 {{ page }} 页 / 共 {{ totalPages }} 页</span>
        <button 
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400" 
          @click="nextPage"
          :disabled="page === totalPages"
        >
          下一页
        </button>
      </div>
    </div>
  </template>
 <script setup>
 import { ref } from 'vue';
 
 // 静态数据（模拟 API 响应）
 const page = ref(1);
 const pageSize = ref(10);
 const totalPages = ref(5);  // 假设总共5页
 const achievements = ref([
   {
     id: '1',
     title: 'Artificial Intelligence in Healthcare',
     description: 'A study on the application of AI in healthcare.',
     category: 'Computer Science',
     fileUrl: 'https://example.com/file1.pdf',
     tags: ['AI', 'Healthcare'],
     uploadedAt: '2023-08-16T12:34:56Z',
     uploadedBy: 'user1',
   },
   {
     id: '2',
     title: 'Marketing Strategies for Consumer Behavior',
     description: 'A comprehensive analysis of marketing strategies.',
     category: 'Marketing',
     fileUrl: 'https://example.com/file2.pdf',
     tags: ['Marketing', 'Consumer Behavior'],
     uploadedAt: '2023-09-05T09:20:10Z',
     uploadedBy: 'user2',
   },
   {
     id: '3',
     title: 'Data Science Applications in Business',
     description: 'Exploring data science applications for business optimization.',
     category: 'Business',
     fileUrl: 'https://example.com/file3.pdf',
     tags: ['Data Science', 'Business'],
     uploadedAt: '2023-10-12T14:50:30Z',
     uploadedBy: 'user3',
   },
   // 更多模拟数据
 ]);
 
 // 筛选和排序
 const filters = ref({
   keyword: '',
   category: '',
   tags: '',
   sortBy: 'downloadCount',
   order: 'desc',
 });
 
 // 模拟的筛选功能
 const applyFilters = () => {
   page.value = 1;
   // 这里可以根据需要更新数据，如过滤或排序，实际开发中可调用 API
 };
 
 // 分页操作
 const prevPage = () => {
   if (page.value > 1) {
     page.value--;
   }
 };
 
 const nextPage = () => {
   if (page.value < totalPages.value) {
     page.value++;
   }
 };
 
 // 下载文件（模拟）
 const downloadFile = (fileUrl) => {
   window.open(fileUrl, '_blank');
 };
 
 // 删除学术成果（模拟）
 const deleteAchievement = (id) => {
   const index = achievements.value.findIndex(ach => ach.id === id);
   if (index !== -1) {
     achievements.value.splice(index, 1);  // 删除
   }
 };
 
 // 初始加载数据（模拟）
 applyFilters();
 </script>
 