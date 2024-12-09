<template>
    <div class="fade-in">  <!-- 修改这里：添加外层容器并应用动画类 -->
        <div class="user-review fade-in">
            <div class="bulk-actions">
                <button class="approve-all-button" @click="approveAll">一键通过</button>
                <button class="reject-all-button" @click="rejectAll">一键拒绝</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" @change="toggleSelectAll" :checked="areAllSelected" />
                        </th>
                        <th>用户名</th>
                        <th>机构</th>
                        <th>研究领域</th>
                        <th>申请时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="request in paginatedAuthRequests" :key="request.id">
                        <td data-label="选择">
                            <input type="checkbox" v-model="selectedRequests" :value="request.id" />
                        </td>
                        <td data-label="用户名">{{ request.fullName }}</td>
                        <td data-label="机构">{{ request.institution }}</td>
                        <td data-label="研究领域">{{ request.fieldOfStudy }}</td>
                        <td data-label="申请时间">{{ request.requestedAt }}</td>
                        <td data-label="操作">
                            <button class="approve-button" @click="approveUser(request.id)">批准</button>
                            <button class="reject-button" @click="rejectUser(request.id)">拒绝</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        <div v-if="showRejectModal" class="modal-overlay">
            <div class="modal-content">
                <h3>输入拒绝原因</h3>
                <textarea v-model="rejectReason" placeholder="请输入拒绝原因"></textarea>
                <button @click="confirmReject">确定</button>
                <button @click="cancelReject">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
            useStaticData: true, // 添加用于切换数据源的标志
            showRejectModal: false,
            rejectReason: '',
            currentRequestId: null,
            selectedRequests: [], // 用于存储选中的请求ID
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示的项数
            pageSizeOptions: [10, 20, 30, 50], // 每页条目数选项
            jumpPage: null, // 跳转的页数
        };
    },
    computed: {
        paginatedAuthRequests() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.authRequests.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.authRequests.length / this.pageSize);
        },
        areAllSelected() {
            return this.paginatedAuthRequests.length > 0 && this.paginatedAuthRequests.every(req => this.selectedRequests.includes(req.id));
        },
    },
    methods: {
        fetchUsers() {
            if (this.useStaticData) {
                // 使用静态数据进行测试
                
            } else {
                axios
                    .get('/api/admin/auth-requests', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('admin-jwt-token'),
                        },
                        params: {
                            page: this.page,
                            limit: this.limit,
                        },
                    })
                    .then((response) => {
                        this.authRequests = response.data.authRequests;
                    })
                    .catch((error) => {
                        console.error('获取认证申请失败:', error);
                        alert('Failed to fetch users.');
                    });
            }
        },
        approveUser(authRequestId) {
            // 发送批准请求
            axios.put(`/api/admin/auth-requests/${authRequestId}`, {
                status: 'approved'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
            })
            .then(response => {
                console.log('批准成功:', response.data);
                // 更新请求的状态为已批准
                const request = this.authRequests.find(req => req.id === authRequestId);
                if (request) {
                    request.status = 'approved';
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
            axios.put(`/api/admin/auth-requests/${this.currentRequestId}`, {
                status: 'rejected',
                reason: this.rejectReason
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
            })
            .then(response => {
                console.log('拒绝成功:', response.data);
                // 更新请求的状态为已拒绝并添加拒绝原因
                const request = this.authRequests.find(req => req.id === this.currentRequestId);
                if (request) {
                    request.status = 'rejected';
                    request.reason = this.rejectReason;
                }
                // 重置对话框状态
                this.showRejectModal = false;
                this.rejectReason = '';
                this.currentRequestId = null;
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
                this.selectedRequests = [];
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.selectedRequests = [];
            }
        },
        handlePageSizeChange() {
            this.currentPage = 1;
            // 如果需要，可以重新获取数据
        },
        jumpToPage() {
            if (this.jumpPage >= 1 && this.jumpPage <= this.totalPages) {
                this.currentPage = this.jumpPage;
                this.jumpPage = null;
                this.selectedRequests = [];
            } else {
                alert('请输入有效的页数。');
            }
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
}

th,
td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
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
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    animation: slideIn 0.3s;
}

.modal-content h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.5em;
}

.modal-content textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    font-size: 1em;
}

.modal-content button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
}

.modal-content button:first-of-type {
    background-color: #f44336;
    color: white;
}

.modal-content button:last-of-type {
    background-color: #ccc;
    color: #333;
}

.modal-content button:first-of-type:hover {
    background-color: #d32f2f;
}

.modal-content button:last-of-type:hover {
    background-color: #b3b3b3;
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
    justify-content: center; /* 居中显示按钮 */
    margin-bottom: 10px;
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
</style>