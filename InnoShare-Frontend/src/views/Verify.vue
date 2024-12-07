<template>
  <div>
    <div class="verify-container">
      <h1 class="title">实名认证&学术认证</h1>

      <!-- 状态显示 -->
      <div class="status">
        <p class="status-text">状态：<span>{{ status }}</span></p>
        <p v-if="status === '未通过'" class="status-reason">原因：{{ reason }}</p>
      </div>

      <!-- 认证方式选择 -->
      <div class="auth-method">
        <button @click="isInvitationCode = false">个人申请认证</button>
        <button @click="isInvitationCode = true">邀请码申请认证</button>
      </div>

      <!-- 表单内容 -->
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="fullName">*姓名：</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="fullName" 
            required 
            placeholder="请输入您的姓名" 
          />
        </div>

        <div class="form-item">
          <label for="email">邮箱：</label>
          <input 
            type="text" 
            id="email" 
            v-model="email" 
            placeholder="请输入您的邮箱" 
          />
        </div>

        <div class="form-item">
          <label for="phoneNmber">手机号：</label>
          <input 
            type="text" 
            id="phoneNumber" 
            v-model="phoneNumber" 
            placeholder="请输入您的手机号" 
          />
        </div>

        <div class="form-item">
          <label for="nationality">*国籍：</label>
          <input 
            type="text" 
            id="nationality" 
            v-model="nationality" 
            required
            placeholder="请输入您的国籍"
          />
        </div>

        <div class="form-item">
          <label for="idNumber">*身份证号/护照号：</label>
          <input 
            type="text" 
            id="idNumber" 
            v-model="idNumber" 
            required 
            placeholder="请输入您的身份证或护照号" 
          />
        </div>

        <div class="form-item">
          <label for="fieldOfStudy">*研究领域：</label>
          <input 
            type="text" 
            id="fieldOfStudy" 
            v-model="fieldOfStudy" 
            required
            placeholder="请输入您的学术领域"
          />
        </div>

        <div v-if="!isInvitationCode" class="form-item">
          <label for="institution">机构：</label>
          <input 
            type="text" 
            id="institution" 
            v-model="institution" 
            placeholder="请输入您的工作/学习机构"
          />
        </div>

        <!-- 上传文件部分 -->
        <div class="form-item">
          <label for="documents">*上传压缩文件（1.学籍证明, 2.手持护照/身份证半身照）</label>
          <input 
            type="file" 
            id="documents" 
            ref="fileInput" 
            @change="handleFileChange" 
            required
          />
          <span v-if="files.length">已选择 {{ files.length }} 个文件</span>
        </div>

        <div v-if="isInvitationCode" class="form-item">
            <label for="invitationCode">*邀请者：</label>
            <input 
              type="text" 
              id="invitor" 
              v-model="invitor" 
              required
              placeholder="请输入邀请者"
            />
          </div>

          <div v-if="isInvitationCode" class="form-item">
            <label for="invitationCode">*邀请码：</label>
            <input 
              type="text" 
              id="invitationCode" 
              v-model="invitationCode" 
              required
              placeholder="请输入邀请码"
            />
          </div>

          <button type="submit" class="submit-button">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
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
      isInvitationCode: false,
      status: '未通过', // 认证状态（待审核/已通过/未通过）
      reason: '信息填写不完整', // 只有在未通过时显示
    };
  },
  methods: {
    handleSubmit() {
      // 处理表单提交的逻辑
      console.log('提交表单');
    },
    handleFileChange(event) {
      this.files = event.target.files;
    },
  },
};
</script>

<style scoped>
.verify-container {
  max-width: 800px; /* 限制最大宽度 */
  margin: 20px auto; /* 居中 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff; /* 设置背景颜色 */
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