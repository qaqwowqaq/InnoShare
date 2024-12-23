<template>
  <div class="fade-in">
    <div class="user-review">
      <table>
        <thead>
        <tr>
          <th><input type="checkbox" @change="toggleSelectAll" :checked="areAllSelected" /></th>
          <th>申请号</th>
          <th>申请人</th>
          <th>邮箱</th>
          <th>研究领域</th>
          <th>国籍</th>
          <th>联系电话</th>
          <th>申请时间</th>
          <th>审核状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="request in paginatedAuthRequests" :key="request.applicationId">
          <td><input type="checkbox" v-model="selectedRequests" :value="request.applicationId" /></td>
          <td>{{ request.applicationId }}</td>
          <td>{{ request.fullName }}</td>
          <td>{{ request.email }}</td>
          <td>{{ request.fieldOfStudy }}</td>
          <td>{{ request.nationality }}</td>
          <td>{{ request.phoneNumber }}</td>
          <td>{{ formatDate(request.createdAt) }}</td>
          <td>
                            <span class="status-tag" :class="getStatusClass(request.status)">
                                {{ getStatusText(request.status) }}
                            </span>
          </td>
          <td>
            <template v-if="request.status === 0">
              <button class="approve-button" @click="approveUser(request.applicationId)">通过</button>
              <button class="reject-button" @click="rejectUser(request.applicationId)">拒绝</button>
            </template>
            <template v-else>
              <span class="processed">已处理</span>
            </template>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="bulk-actions">
        <button class="approve-all-button" @click="approveAll">一键通过</button>
        <button class="reject-all-button" @click="rejectAll">一键拒绝</button>
      </div>
      <div class="pagination">
        <select v-model="pageSize" @change="handlePageSizeChange">
          <option v-for="option in pageSizeOptions" :key="option" :value="option">
            {{ option }}条/页
          </option>
        </select>
        <span>跳转到第</span>
        <input type="number" v-model.number="jumpPage" @keyup.enter="jumpToPage" min="1" :max="totalPages" />
        <span>页</span>
        <button @click="jumpToPage">跳转</button>
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>

    <!-- 修改拒绝原因对话框结构 -->
    <div v-if="showRejectModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">请输入拒绝原因</h3>
        <div class="modal-body">
                    <textarea
                        v-model="rejectReason"
                        placeholder="请详细说明拒绝原因，以帮助申请人了解问题所在"
                    ></textarea>
        </div>
        <div class="modal-buttons">
          <button @click="confirmReject" :disabled="!rejectReason.trim()">确定</button>
          <button @click="cancelReject">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import axiosInstance from '@/axiosConfig';

export default {
  name: 'UserReview',
  data() {
    return {
      authRequests: [
        {
          id: '1',
          userId: 'user1',
          fullName: '薛爷爷',
          institution: '清华大学',
          fieldOfStudy: '清华拳',
          documents: [
            'https://storage.example.com/auth-documents/doc1.pdf'
          ],
          requestedAt: '2023-10-16T12:34:56Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: 'user2',
          fullName: '张三',
          institution: '北京航空航天大学',
          fieldOfStudy: '软件工程',
          documents: [
            'https://storage.example.com/auth-documents/doc2.pdf'
          ],
          requestedAt: '2023-10-17T09:21:30Z',
          status: 'pending'
        },
      ],
      useStaticData: false, // 添加用于切换数据源的标志
      showRejectModal: false,
      rejectReason: '',
      currentRequestId: null,
      selectedRequests: [], // 用于存储选中的请求ID
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的项数
      pageSizeOptions: [10, 20, 30, 50], // 每页条目数选项
      jumpPage: null, // 跳转的页数
      total: 0, // 添加总数记录
    };
  },
  computed: {
    paginatedAuthRequests() {
      // 直接返回数组，因为后端已经处理了分页
      return this.authRequests;
    },
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    areAllSelected() {
      return this.paginatedAuthRequests.length > 0 && this.paginatedAuthRequests.every(req => this.selectedRequests.includes(req.id));
    },
  },
  methods: {
    async fetchUsers() {
      if (this.useStaticData) {
        // 使用静态数据进行测试

      } else {
        try {
          const response = await axiosInstance.get('/admin/auth-requests', {
            params: {
              status: 0,
              page: this.currentPage,
              limit: this.pageSize,
            },
          });

          console.log('获取到的认证申请:', response.data);
          // 更新数据
          this.authRequests = response.data.data.applications;
          this.total = response.data.data.total;
          this.pageSize = response.data.data.limit || this.pageSize;

          // 排序处理
          this.authRequests.sort((a, b) => a.applicationId - b.applicationId);
        } catch (error) {
          console.error('获取认证申请失败:', error);
          this.$message.error('获取认证申请失败');
        }
      }
    },
    approveUser(authRequestId) {
      // 发送批准请求
      axiosInstance
          .post(`/admin/auth-requests/${authRequestId}`, null, {
            params: {
              status: 1,
              reason: "1"
            }
          })
          .then(response => {
            console.log('批准成功:', response.data);
            // 更新请求的状态为已批准
            const request = this.authRequests.find(req => req.id === authRequestId);
            this.$message.success('批准成功');
            if (request) {
              request.status = 1;
            }
          })
          .catch(error => {
            console.error('批准失败:', error);
            alert('批准失败: ' + error.message);
          });
    },
    rejectUser(authRequestId) {
      // 显示拒绝原因输入对话框
      this.showRejectModal = true;
      this.currentRequestId = authRequestId;
    },
    confirmReject() {
      if (!this.rejectReason.trim()) {
        alert('请填写拒绝原因。');
        return;
      }
      // 发拒绝请求
      axiosInstance.post(`/admin/auth-requests/${this.currentRequestId}`, null, {
        params: {
          status: 2,
          reason: this.rejectReason
        }
      })
          .then(response => {
            console.log('拒绝成功:', response.data);
            // 更新请求的状态为已拒绝并添加拒绝原因
            const request = this.authRequests.find(req => req.id === this.currentRequestId);
            if (request) {
              request.status = 2;
              request.reason = this.rejectReason;
            }
            // 重置对话框状态
            this.showRejectModal = false;
            this.rejectReason = '';
            this.currentRequestId = null;
            this.$message.success('拒绝成功');
          })
          .catch(error => {
            console.error('拒绝失败:', error);
            alert('拒绝失败: ' + error.message);
          });
    },
    cancelReject() {
      // 取消拒绝操作
      this.showRejectModal = false;
      this.rejectReason = '';
      this.currentRequestId = null;
    },
    approveAll() {
      if (this.selectedRequests.length === 0) {
        alert('请至少选择一项进行批准。');
        return;
      }
      this.selectedRequests.forEach(id => {
        this.approveUser(id);
      });
      this.selectedRequests = [];
    },
    rejectAll() {
      if (this.selectedRequests.length === 0) {
        alert('请至少选择一项进行拒绝。');
        return;
      }
      this.selectedRequests.forEach(id => {
        this.rejectUser(id);
      });
      this.selectedRequests = [];
    },
    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedRequests = this.paginatedAuthRequests.map(req => req.id);
      } else {
        this.selectedRequests = [];
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchUsers(); // 直接获取新数据
        this.selectedRequests = []; // 清空选择
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchUsers(); // 直接获取新数据
        this.selectedRequests = []; // 清空选择
      }
    },
    handlePageSizeChange() {
      this.currentPage = 1;
      this.fetchUsers();
      this.selectedRequests = []; // 清空选择
    },
    jumpToPage() {
      if (this.jumpPage >= 1 && this.jumpPage <= this.totalPages) {
        this.currentPage = this.jumpPage;
        this.jumpPage = null;
        this.fetchUsers(); // 获取新数据
        this.selectedRequests = []; // 清空选择
      } else {
        this.$message.warning('请输入有效的页数');
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getStatusText(status) {
      const statusMap = {
        0: '待审核',
        1: '已通过',
        2: '已拒绝'
      };
      return statusMap[status] || '未知状态';
    },
    getStatusClass(status) {
      const classMap = {
        0: 'status-pending',
        1: 'status-approved',
        2: 'status-rejected'
      };
      return classMap[status] || '';
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
:global(body) {
  background-color: #f0f0f0; /* 浅灰色 */
}

.user-review {
  padding: 20px; /* 保持一致的内边距 */
  text-align: center;
  margin: 0 auto;
  max-width: 1500px;
  background-color: #ffffff; /* 白色 */
  margin-top: 30px;
  margin-left: 0px; /* 向左移动10px */
  margin-right: 0px;
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto; /* 表格在父级中居中 */
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
  padding: 12px 8px;
  color: #606266;
}

th {
  background-color: #fafafa;
  color: #606266;
  font-weight: 500;
  padding: 12px 8px;
}

tr:hover {
  background-color: #f5f7fa;
}

button {
  margin-right: 5px;
}

.approve-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.reject-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.approve-button:hover {
  background-color: #45a049;
}

.reject-button:hover {
  background-color: #d32f2f;
}

/* 添加模态对话框的样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 改为使用视口宽度 */
  height: 100vh; /* 改为使用视口高度 */
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s;
  z-index: 9999; /* 添加较高的 z-index 确保在最上层 */
}

.modal-content {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 500px; /* 增加宽度 */
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  animation: slideIn 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中对齐内容 */
}

.modal-title {
  width: 100%;
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 1.5em;
  color: #333;
}

.modal-body {
  width: 100%; /* 确保body占据全宽 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content textarea {
  width: 93%; /* 相对于modal-body的宽度 */
  height: 120px;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  resize: none;
  font-size: 14px;
  margin-bottom: 15px;  /* 增加底部间距 */
  transition: border-color 0.3s;
}

.modal-content textarea:focus {
  outline: none;
  border-color: #409EFF;
  box-shadow: 0 0 5px rgba(64,158,255,0.2);
}

.modal-content .char-count {
  width: 90%; /* 与textarea同宽 */
  text-align: right;
  color: #909399;
  font-size: 12px;
  margin-bottom: 200px;
}

.modal-buttons {
  display: flex;
  justify-content: center; /* 按钮居中 */
  gap: 15px;
  width: 100%;
}

.modal-buttons button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.modal-buttons button:first-child {
  background-color: #409EFF;
  color: white;
}

.modal-buttons button:last-child {
  background-color: #909399;
  color: white;
}

.modal-buttons button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.modal-buttons button:not(:disabled):hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-50px); }
  to { transform: translateY(0); }
}

.bulk-actions {
  display: flex;
  justify-content: flex-start; /* 改为左对齐 */
  margin-bottom: 10px;
  margin-top: 15px;
}

.approve-all-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.reject-all-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.approve-all-button:hover {
  background-color: #45a049;
}

.reject-all-button:hover {
  background-color: #d32f2f;
}

.pagination {
  display: flex;
  justify-content: center; /* 居中显示分页 */
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination select {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc; /* 添加浅色边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.pagination input {
  width: 60px; /* 缩小宽度 */
  padding: 5px;
  margin: 0 10px;
  border: 1px solid #ccc; /* 添加边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.pagination span {
  margin: 0 5px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:not(:disabled) {
  background-color: #2d94d4;
  color: white;
}

.pagination button:not(:disabled):hover {
  background-color: #1b6ea9;
}

@media (max-width: 768px) {
  .user-review {
    padding: 10px;
    margin-left: 0;
    margin-right: 0;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    display: none;
  }

  tr {
    margin-bottom: 15px;
  }

  td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  .bulk-actions {
    flex-direction: column;
  }

  .bulk-actions button {
    width: 100%;
    margin-bottom: 10px;
  }

  .status-tag {
    display: inline-block;
    margin: 4px 0;
  }
}

.fade-in {
  animation: fadeInPage 1s ease-out;
}

@keyframes fadeInPage {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加状态标签样式 */
.status-tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.status-approved {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-rejected {
  background-color: #fff1f0;
  color: #f5222d;
  border: 1px solid #ffa39e;
}

.processed {
  color: #999;
  font-style: italic;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>