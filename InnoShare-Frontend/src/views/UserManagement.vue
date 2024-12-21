<template>
    <div class="fade-in">
        <div class="table-container">
            <!-- 添加筛选按钮组 -->
            <div class="filter-controls">
                <button 
                    class="filter-button" 
                    :class="{ active: isAuthenticatedFilter === null }"
                    @click="setFilter(null)"
                >
                    全部用户
                </button>
                <button 
                    class="filter-button" 
                    :class="{ active: isAuthenticatedFilter === true }"
                    @click="setFilter(true)"
                >
                    已认证用户
                </button>
                <button 
                    class="filter-button" 
                    :class="{ active: isAuthenticatedFilter === false }"
                    @click="setFilter(false)"
                >
                    未认证用户
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>姓名</th>
                        <th>邮箱</th>
                        <th>电话</th>
                        <th>机构</th>
                        <th>研究领域</th>
                        <th>国籍</th>
                        <th>经验值</th>
                        <th>认证状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user.userId">
                        <td data-label="用户ID">{{ user.userId }}</td>
                        <td data-label="用户名">{{ user.username }}</td>
                        <td data-label="姓名">{{ user.fullName || '未填写' }}</td>
                        <td data-label="邮箱">{{ user.email || '未填写' }}</td>
                        <td data-label="电话">{{ user.phoneNumber || '未填写' }}</td>
                        <td data-label="机构">{{ user.institution || '未填写' }}</td>
                        <td data-label="研究领域">{{ user.fieldOfStudy || '未填写' }}</td>
                        <td data-label="国籍">{{ user.nationality || '未填写' }}</td>
                        <td data-label="经验值">{{ user.experience || '0' }}</td>
                        <td data-label="认证状态">
                            <span :class="['status-badge', user.isVerified ? 'verified' : 'unverified']">
                                {{ user.isVerified ? '已认证' : '未认证' }}
                            </span>
                        </td>
                        <td data-label="操作" class="action-buttons">
                            <div class="button-container">
                                <button class="edit-button" @click="editUser(user)" title="编辑">
                                    <i class="el-icon-edit"></i>
                                    <span>编辑</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination controls -->
            <div class="pagination">
                <select v-model="limit" @change="handlePageSizeChange">
                    <option v-for="option in pageSizeOptions" :key="option" :value="option">
                        {{ option }}条/页
                    </option>
                </select>
                <span>跳转到第</span>
                <input type="number" v-model.number="jumpPage" @keyup.enter="jumpToPage" min="1" :max="totalPages" />
                <span>页</span>
                <button @click="jumpToPage">跳转</button>
                <button @click="prevPage" :disabled="page <= 1">上一页</button>
                <span>第 {{ page }} 页，共 {{ totalPages }} 页</span>
                <button @click="nextPage" :disabled="page >= totalPages">下一页</button>
            </div>

            <!-- Edit User Modal -->
            <div v-if="showEditModal" class="modal-overlay">
                <div class="modal-content">
                    <h2 class="modal-title">修改用户信息</h2>
                    <div class="form-groups-container">
                        <div class="form-group">
                            <label>用户ID:</label>
                            <input v-model="currentUser.userId" disabled class="disabled-input" />
                        </div>
                        <div class="form-group">
                            <label>姓名:</label>
                            <input v-model="currentUser.fullName" />
                        </div>
                        <div class="form-group">
                            <label>国籍:</label>
                            <input v-model="currentUser.nationality" />
                        </div>
                        <div class="form-group">
                            <label>手机号:</label>
                            <input v-model="currentUser.phoneNumber" type="tel" />
                        </div>
                        <div class="form-group">
                            <label>邮箱:</label>
                            <input v-model="currentUser.email" type="email" />
                        </div>
                        <div class="form-group">
                            <label>机构:</label>
                            <input v-model="currentUser.institution" />
                        </div>
                        <div class="form-group">
                            <label>研究领域:</label>
                            <input v-model="currentUser.fieldOfStudy" />
                        </div>
                        <div class="form-group">
                            <label>经验值:</label>
                            <input v-model="currentUser.experience" type="number" min="0" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="save-button" @click="updateUser">保存</button>
                        <button class="cancel-button" @click="cancelEdit">取消</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axiosInstance from '@/axiosConfig';

export default {
    name: 'UserManagement',
    data() {
        return {
            users: [],
            page: 1,
            limit: 10,
            total: 0,
            isAuthenticatedFilter: null,
            showEditModal: false,
            currentUser: {},
            useStaticData: false, // 添加用于切换数据源的标志
            staticUsers: [
                {
                    id: 'user1',
                    username: '麒麒',
                    email: 'qiqi@example.com',
                    fullName: '刘宇麒',
                    institution: '北航软件学院',
                    fieldOfStudy: '软件工程',
                    isAuthenticated: true
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
                {
                    id: 'user2',
                    username: '544',
                    email: '544@example.com',
                    fullName: '刘浩',
                    institution: '北航附小',
                    fieldOfStudy: '太极拳',
                    isAuthenticated: false
                },
            ],
            pageSizeOptions: [10, 20, 30, 50], // 添加分页选项
            jumpPage: 1, // 添加跳转页码
        };
    },
    computed: {
        paginatedUsers() {
            // 直接返回users数组，因为后端已经处理了分页
            return this.users;
        },
        totalPages() {
            return Math.ceil(this.total / this.limit);
        },
    },
    methods: {
        async fetchUsers() {
            if (this.useStaticData) {
                // 使用静态数据进行测试
                this.users = this.staticUsers;
                this.total = this.staticUsers.length;
            } else {
                try {
                    const response = await axiosInstance.get('/admin/users', {
                        params: {
                            page: this.page,
                            limit: this.limit,
                            isAuthenticated: this.isAuthenticatedFilter,
                        },
                    });
                    console.log('获取到的数据:', response.data);
                    // 直接更新整个用户数组
                    this.users = response.data.data.userResponses;
                    this.total = response.data.data.total;
                    this.limit = response.data.data.limit || this.limit;
                    // 不需要更新 page，因为已经在 watch 中处理
                } catch (error) {
                    console.error('获取用户列表失败:', error);
                    this.$message.error('获取用户列表失败');
                }
            }
        },
        // 弹出编辑用户的对话框
        editUser(user) {
            this.currentUser = { ...user };
            this.showEditModal = true;
        },
        cancelEdit() {
            this.showEditModal = false;
            this.currentUser = {};
        },
        updateUser() {
            const updatedUser = {
                id: this.currentUser.userId,
                fullName: this.currentUser.fullName,
                email: this.currentUser.email,
                phoneNumber: this.currentUser.phoneNumber,
                institution: this.currentUser.institution,
                fieldOfStudy: this.currentUser.fieldOfStudy,
                nationality: this.currentUser.nationality,
                experience: this.currentUser.experience,
            };

            axiosInstance
                .post('/admin/users/update', updatedUser)
                .then((response) => {
                    console.log('更新用户成功:', response.data);
                    alert(response.data.message);
                    this.$message.success('用户信息更新成功');
                    this.fetchUsers();
                    this.showEditModal = false;
                })
                .catch((error) => {
                    console.log('更新用户失败:', error);
                    this.$message.error('更新失败: 该用户尚未认证');
                });
        },
        handlePageSizeChange() {
            this.page = 1;
            this.fetchUsers();
        },
        jumpToPage() {
            if (this.jumpPage >= 1 && this.jumpPage <= this.totalPages) {
                this.page = this.jumpPage;
                this.jumpPage = null; // 清空输入框
            }
        },
        prevPage() {
            if (this.page > 1) {
                this.page--;
                this.fetchUsers(); // 直接调用获取数据
            }
        },
        nextPage() {
            if (this.page < this.totalPages) {
                this.page++;
                this.fetchUsers(); // 直接调用获取数据
            }
        },
        // 添加筛选方法
        setFilter(value) {
            this.isAuthenticatedFilter = value;
            this.page = 1; // 重置页码
            this.fetchUsers(); // 重新获取数据
        },
    },
    created() {
        this.fetchUsers();
    },
};
</script>

<style scoped>

table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto; /* 表格在父级中居中 */
    background-color: #ffffff; /* 添加纯白色背景 */
}

th,
td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
}

/* 更新分页样式以匹配 UserReview.vue */
.pagination {
    display: flex;
    justify-content: center; /* 居中显示分页 */
    margin-top: 20px;
    align-items: center;
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
    background-color: #2d94d4;
    color: white;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
    background-color: #1b6ea9;
}

.edit-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
}

.edit-button:hover {
    background-color: #45a049;
}

.table-container {
    background-color: #ffffff; /* 纯白色背景 */
    padding: 20px; /* 内边距 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    max-width: 1200px; /* 最大宽度 */
    margin: 0 auto; /* 居中显示 */
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    padding-top: 50px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto; /* 表格在父级中居中 */
}

th,
td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
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
    border: 1px solid #ccc; /* 加边框 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    border-radius: 8px; /* 圆角 */
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
    background-color: #2d94d4;
    color: white;
}

.pagination button:disabled {
    cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
    background-color: #1b6ea9;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-in-out;
    z-index: 1000;
}

.modal-content {
    background: #f9f9f9;
    padding: 25px;
    border-radius: 12px;
    width: 450px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease-in-out;
    position: relative;
}

.modal-content h2.modal-title {
    font-weight: bold;
    text-align: center;
}

.modal-content h2 {
    margin-bottom: 20px;
    color: #333;
    font-family: 'Arial', sans-serif;
}

.modal-content .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.modal-content .form-group label {
    width: 120px;
    text-align: right;
    margin-right: 10px;
    white-space: nowrap;
    font-weight: bold;
}

.modal-content .form-group input[type="text"],
.modal-content .form-group input[type="email"] {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-content label.inline-label {
    display: flex;
    align-items: center;
    white-space: nowrap; /* 防止“认证情况”换行 */
}

.modal-content .inline-label {
    justify-content: center;
    align-items: center; /* 垂直居中对齐 */
}

.modal-content .inline-label label {
    width: 120px;
    text-align: right;
    margin-right: 10px;
    font-weight: bold;
    white-space: nowrap; /* 防止换行 */
}

.modal-content .auth-options {
    display: flex;
    gap: 5px; /* 缩短“是”和“否”之间的间距 */
}

.modal-content .auth-options label {
    display: flex;
    align-items: center;
    font-weight: normal;
}

.modal-content .auth-options input[type="radio"] {
    margin-right: 5px;
}

.modal-content label.inline-label input[type="checkbox"] {
    margin-left: 10px;
    transform: scale(1.2);
}

.modal-content button {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    font-family: 'Arial', sans-serif;
}

.modal-content button:first-of-type {
    background-color: #f44336;
    color: white;
    margin-right: 10px;
}

.modal-content button:last-of-type {
    background-color: #e0e0e0;
    color: #333;
}

.modal-content button:first-of-type:hover {
    background-color: #d32f2f;
}

.modal-content button:last-of-type:hover {
    background-color: #d5d5d5;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
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

@media (max-width: 768px) {
    .table-container {
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
    
    .pagination {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .pagination select, .pagination input, .pagination button {
        width: 100%;
        margin: 5px 0;
    }
    
    .modal-content {
        width: 90%;
    }
}

.info-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    text-align: left;
}

.username {
    font-size: 16px;
    font-weight: bold;
    color: #409EFF;
}

.fullname {
    font-size: 14px;
    color: #606266;
}

.contact-info i {
    margin-right: 8px;
    color: #909399;
}

.academic-info, .personal-info {
    text-align: left;
}

.academic-info strong, .personal-info strong {
    color: #606266;
    margin-right: 4px;
}

.status-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 13px;
    font-weight: 500;
}

.verified {
    background-color: #f0f9eb;
    color: #67c23a;
    border: 1px solid #b3e19d;
}

.unverified {
    background-color: #fef0f0;
    color: #f56c6c;
    border: 1px solid #fab6b6;
}

.action-buttons {
    height: 100%;  /* 确保单元格高度与其他列一致 */
    padding: 8px !important;  /* 统一内边距 */
    vertical-align: middle;  /* 垂直居中 */
}

.button-container {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
}

.action-buttons button {
    display: inline-flex;
    align-items: center;      /* 垂直居中 */
    justify-content: center;  /* 水平居中 */
    min-width: 60px; /* 减小最小宽度 */
    height: 28px;  /* 稍微降低按钮高度 */
    padding: 0 8px; /* 减小内边距 */
    border: none;
    border-radius: 4px;
    font-size: 12px; /* 稍微减小字体大小 */
    transition: all 0.3s;
    cursor: pointer;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 3px;  /* 减小图标和文字之间的间距 */
}

.edit-button {
    background-color: #409EFF;
}

.action-buttons button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.edit-button:hover {
    background-color: #66b1ff;
}

.action-buttons button i {
    font-size: 12px; /* 减小图标大小 */
    margin: 0;  /* 移除原有的 margin */
}

.action-buttons button span {
    line-height: 1;
    display: inline-block;  /* 确保文字块状显示 */
}

/* 修改表格单元格样式 */
td {
    height: 50px; /* 统一所有单元格高度 */
    line-height: 1.5;
    vertical-align: middle;
}

/* 调整表格列宽 */
th:last-child,
td:last-child {
    min-width: 100px; /* 减小操作列宽度 */
    width: 100px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .info-group {
        width: 100%;
    }
    
    td::before {
        width: 40%;
    }
    
    .background-info {
        padding: 8px;
    }
}

/* 更新表格样式以适应更多列 */
table {
    font-size: 14px;
}

th, td {
    padding: 12px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
}

.action-buttons {
    white-space: nowrap;
    min-width: 90px;
}

/* 响应式调整 */
@media (max-width: 1400px) {
    .table-container {
        overflow-x: auto;
    }
    
    table {
        min-width: 1200px;
    }
}

@media (max-width: 768px) {
    td::before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 40%;
        padding-left: 10px;
        text-align: left;
        font-weight: bold;
    }
    
    .action-buttons {
        justify-content: flex-end;
        padding-right: 10px;
    }
}

/* 编辑对话框样式更新 */
.modal-content {
    width: 500px;
    max-height: 80vh;
    overflow-y: auto;
}

.form-groups-container {
    margin-right: 50px;
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 10px;
    margin-bottom: 20px;
    margin-left: -5px;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

.form-group label {
    width: 100px;
    text-align: right;
    margin-right: 15px;
    flex-shrink: 0;
    color: #606266;
}

.form-group input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: all 0.3s;
}

.form-group input:focus {
    border-color: #409EFF;
    outline: none;
    box-shadow: 0 0 0 2px rgba(64,158,255,0.2);
}

.disabled-input {
    background-color: #f5f7fa;
    cursor: not-allowed;
    color: #909399;
}

.auth-options {
    flex: 1;
    display: flex;
    gap: 20px;
}

.auth-options label {
    width: auto;
    margin-right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.modal-footer {
    display: flex;
    justify-content: center;
    gap: 15px;
    padding-top: 10px;
    border-top: 1px solid #ebeef5;
}

.save-button, .cancel-button {
    padding: 8px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
}

.save-button {
    background-color: #409EFF;
    color: white;
}

.save-button:hover {
    background-color: #66b1ff;
}

.cancel-button {
    background-color: #909399;
    color: white;
}

.cancel-button:hover {
    background-color: #a6a9ad;
}

/* 添加筛选按钮组样式 */
.filter-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    padding: 0px;;
}

.filter-button {
    padding: 8px 16px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: white;
    color: #606266;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-button.active {
    background-color: #409EFF;
    color: white;
}

.filter-button:hover {
    background-color: #66b1ff;
    color: white;
}
</style>