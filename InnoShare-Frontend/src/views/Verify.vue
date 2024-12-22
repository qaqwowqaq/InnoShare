<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <div class="min-h-screen mt-12 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- 顶部标题区域 -->
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
        <h1 class="text-3xl font-bold text-white text-center">实名认证 & 学术认证</h1>
        
        <!-- 状态显示 -->
        <div class="mt-4 flex justify-center items-center space-x-4">
          <span class="px-4 py-1 rounded-full text-sm font-medium" 
                :class="{
                  'bg-yellow-100 text-yellow-700': status === '待审核',
                  'bg-green-100 text-green-700': status === '通过',
                  'bg-red-100 text-red-700': status === '未通过'
                }">
            状态：{{ status }}
          </span>
          <span v-if="status === '未通过'" 
                class="text-red-100 text-sm">
            {{ reason }}
          </span>
        </div>
      </div>

      <!-- 认证方式选择 -->
      <div class="flex justify-center space-x-4 p-6 bg-gray-50">
        <button @click="isInvitationCode = false"
                :class="!isInvitationCode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-6 py-2 rounded-full transition duration-300 hover:shadow-md">
          个人申请认证
        </button>
        <button @click="isInvitationCode = true"
                :class="isInvitationCode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-6 py-2 rounded-full transition duration-300 hover:shadow-md">
          邀请码申请认证
        </button>
      </div>

      <!-- 表单内容 -->
      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        <!-- 基本信息部分 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="fullName" class="block text-sm font-medium text-gray-700">姓名 *</label>
            <input type="text" id="fullName" v-model="fullName" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
            <input type="email" id="email" v-model="email"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          <div class="space-y-2">
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">手机号</label>
            <input type="tel" id="phoneNumber" v-model="phoneNumber"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          <div class="space-y-2">
            <label for="nationality" class="block text-sm font-medium text-gray-700">国籍 *</label>
            <input type="text" id="nationality" v-model="nationality" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          <div class="space-y-2">
            <label for="idNumber" class="block text-sm font-medium text-gray-700">身份证号/护照号 *</label>
            <input type="text" id="idNumber" v-model="idNumber" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          <div class="space-y-2">
            <label for="fieldOfStudy" class="block text-sm font-medium text-gray-700">研究领域 *</label>
            <input type="text" id="fieldOfStudy" v-model="fieldOfStudy" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>

          <div v-if="!isInvitationCode" class="space-y-2">
            <label for="institution" class="block text-sm font-medium text-gray-700">机构</label>
            <input type="text" id="institution" v-model="institution"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>
        </div>

        <!-- 文件上传部分 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            上传文件 *<span class="text-xs text-gray-500">(学籍证明、手持护照/身份证半身照)</span>
          </label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label for="documents" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>上传文件</span>
                  <input id="documents" ref="fileInput" type="file" class="sr-only" @change="handleFileChange" required multiple>
                </label>
                <p class="pl-1">或拖放文件</p>
              </div>
              <p class="text-xs text-gray-500">
                支持ZIP、RAR格式
              </p>
              <p v-if="files.length" class="text-sm text-blue-500">
                已选择 {{ files.length }} 个文件
              </p>
            </div>
          </div>
        </div>

        <!-- 邀请码部分 -->
        <div v-if="isInvitationCode" class="space-y-6">
          <div class="space-y-2">
            <label for="invitor" class="block text-sm font-medium text-gray-700">邀请者 *</label>
            <input type="text" id="invitor" v-model="invitor" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>
          <div class="space-y-2">
            <label for="invitationCode" class="block text-sm font-medium text-gray-700">邀请码 *</label>
            <input type="text" id="invitationCode" v-model="invitationCode" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-center">
          <button type="submit"
                  class="inline-flex justify-center py-3 px-12 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105">
            提交认证
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';
import axiosInstance from '@/axiosConfig';

export default {
  data() {
    return {
      fullName: '',
      email: '',
      phoneNumber: '',
      nationality: '',
      idNumber: '',
      fieldOfStudy: '',
      institution: '',
      files: [],
      invitor: '',
      isInvitationCode: false,
      status: '待审核', // 认证状态（待审核/已通过/未通过）
      reason: '', // 只有在未通过时显示
    };
  },
  methods: {
    // 文件选择事件
    handleFileChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.files = Array.from(event.target.files);
        console.log('选中的文件:', this.files);
      } else {
        this.files = [];
        alert('未选择任何文件！');
      }
    },

    async handleSubmit() {
// 1. 创建 FormData 对象
      const formDataObj = new FormData();

// 2. 添加普通字段到 FormData
      const formData = {
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        nationality: this.nationality,
        idNumber: this.idNumber,
        fieldOfStudy: this.fieldOfStudy,
        institution: this.isInvitationCode ? undefined : this.institution,
        invitationCode: this.isInvitationCode ? this.invitationCode : undefined,
      };

      for (const key in formData) {
        if (formData[key] !== undefined) {
          formDataObj.append(key, formData[key]);
        }
      }

// 3. 添加文件到 FormData
      if (this.files && this.files.length > 0) {
        for (let i = 0; i < this.files.length; i++) {
          formDataObj.append('documents', this.files[i]); // 后端字段名为 documents
        }
      } else {
        alert('请上传文件！');
        return;
      }

// 调试 FormData 内容
      for (const pair of formDataObj.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      try {
        // 根据认证方式选择接口
        const endpoint = this.isInvitationCode ? '/users/verifyByCode' : '/users/verify';

        // 4. 发送请求
        const response = await axiosInstance.post(endpoint, formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data', // 必须设置为 multipart/form-data
          },
        });

        // 5. 处理响应
        if (response.status === 200 && response.data.success) {
          alert('认证成功！');
          this.status = '通过';
          this.reason = '';
        } else {
          this.status = '未通过';
          this.reason = response.data.message || '认证失败';
          alert(`认证失败：${this.reason}`);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('服务器返回的错误详情:', error);
          this.errorMessage = error.response.data.message || '认证失败，请检查输入';
          alert(`认证失败：${this.errorMessage}`);
        } else if (error.code === 'ERR_NETWORK') {
          this.errorMessage = '网络错误，请稍后再试';
          alert(this.errorMessage);
        } else {
          this.errorMessage = '未知错误，请联系管理员';
          alert(this.errorMessage);
        }
        this.status = '未通过';
      }
    }

  },
};
</script>

<style scoped>
.verify-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 50px 20px 20px; /* 增加顶部 padding */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  min-height: 100vh; /* 保证高度充足 */
  box-sizing: border-box;
}

.title {
  margin-top: 0;
  padding-top: 20px;
  text-align: center;
  position: relative;
  z-index: 10;
}

.status {
  margin-bottom: 20px;
}

.status-text {
  font-size: 16px;
  color: #333;
}

.status-reason {
  font-size: 14px;
  color: #e74c3c;
  margin-top: 10px;
}

.auth-method {
  margin-bottom: 20px;
}

.auth-method button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.auth-method button:hover {
  background-color: #0056b3;
}

/* 提交按钮的样式 */
.verify-container button.submit-button {
  width: 25%;            /* 设置按钮宽度为 25% */
  display: block;         /* 确保按钮是块级元素 */
  margin: 20px auto;      /* 居中显示 */
}

.verify-container button.submit-button:hover {
  background-color: #0056b3;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.verify-container label {
  font-size: 14px;
  color: #555;
  width: 150px; /* 固定标签的宽度 */
  text-align: right; /* 标签右对齐 */
}

.verify-container input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  flex-grow: 1;
  text-align: left;
}

.verify-container button {
  padding: 10px 15px;  /* 缩小按钮的内边距 */
  font-size: 14px;      /* 调整字体大小 */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 25%;

}

.verify-container button:hover {
  background-color: #0056b3;
}
</style>