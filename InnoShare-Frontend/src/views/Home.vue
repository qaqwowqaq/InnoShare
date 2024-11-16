<template>
    <div class="container mx-auto p-6">
      <!-- 页面标题 -->
      <header class="text-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">学术成果展示平台</h1>
        <p class="text-lg text-gray-600 mt-2">浏览最新的学术研究成果</p>
      </header>
  
      <!-- 搜索框 -->
      <div class="mb-6">
        <input
          type="text"
          placeholder="搜索学术论文..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <!-- 学术成果列表 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 ease-in-out"
        >
          <h3 class="text-xl font-semibold text-gray-800">论文标题 1</h3>
          <p class="text-sm text-gray-600 mt-2">作者: 张三, 李四</p>
          <p class="text-sm text-gray-500 mt-4">摘要：本研究探讨了自动驾驶技术中的深度学习方法...</p>
          <button class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            查看详情
          </button>
        </div>
  
        <div
          class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 ease-in-out"
        >
          <h3 class="text-xl font-semibold text-gray-800">论文标题 2</h3>
          <p class="text-sm text-gray-600 mt-2">作者: 王五, 赵六</p>
          <p class="text-sm text-gray-500 mt-4">摘要：该论文研究了图像识别中的深度学习模型...</p>
          <button class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            查看详情
          </button>
        </div>
  
        <div
          class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 ease-in-out"
        >
          <h3 class="text-xl font-semibold text-gray-800">论文标题 3</h3>
          <p class="text-sm text-gray-600 mt-2">作者: 李四, 王五</p>
          <p class="text-sm text-gray-500 mt-4">摘要：本论文分析了智能交通系统中的数据处理技术...</p>
          <button class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            查看详情
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Vue 3's setup syntax (composition API)
  // You can add reactive variables or methods here if needed in the future
  </script>
  
  <style scoped>
  /* 这里可以添加 Home.vue 特定的样式 */
  </style>
  