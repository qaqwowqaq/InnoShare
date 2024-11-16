<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div class="mb-4">
        <h1 class="text-2xl font-bold text-gray-800">{{ paper.title }}</h1>
        <p class="text-gray-600 mt-2">{{ paper.authors }}</p>
      </div>
  
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-700">摘要</h2>
        <p class="text-gray-700 mt-2">{{ paper.abstract }}</p>
      </div>
  
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-700">引用</h2>
        <pre class="text-gray-700 bg-gray-100 p-4 rounded-md">{{ paper.citation }}</pre>
      </div>
  
      <div class="mt-6 flex justify-between">
        <button class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">下载PDF</button>
        <button class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">查看全文</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const paper = ref({
    title: '基于深度学习的自动驾驶技术研究',
    authors: '张三, 李四, 王五',
    abstract: '本研究探讨了自动驾驶技术中的深度学习方法，重点分析了卷积神经网络（CNN）在视觉识别中的应用...',
    citation: `张三, 李四, 王五. 基于深度学习的自动驾驶技术研究. 智能科技期刊, 2023. DOI: 10.1234/j.ste.2023.123456`,
  });
  </script>
  
  <style scoped>
  /* 可以添加一些局部样式，如果有需要的话 */
  </style>
  