<template>
    <div class="fade-in">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>邮箱</th>
                        <th>姓名</th>
                        <th>机构</th>
                        <th>研究领域</th>
                        <th>认证情况</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user.id">
                        <td data-label="用户名">{{ user.username }}</td>
                        <td data-label="邮箱">{{ user.email }}</td>
                        <td data-label="姓名">{{ user.fullName }}</td>
                        <td data-label="机构">{{ user.institution }}</td>
                        <td data-label="研究领域">{{ user.fieldOfStudy }}</td>
                        <td data-label="认证情况">{{ user.isAuthenticated ? '已认证🥰' : '未认证😵' }}</td>
                        <td data-label="操作">
                            <button class="edit-button" @click="editUser(user)">修改</button>
                            <button class="delete-button" @click="deleteUser(user.id)">删除</button>
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
                    <div class="form-group">
                        <label>用户名:</label>
                        <input v-model="currentUser.username" />
                    </div>
                    <div class="form-group">
                        <label>邮  箱:</label>
                        <input v-model="currentUser.email" />
                    </div>
                    <div class="form-group">
                        <label>姓  名:</label>
                        <input v-model="currentUser.fullName" />
                    </div>
                    <div class="form-group">
                        <label>机  构:</label>
                        <input v-model="currentUser.institution" />
                    </div>
                    <div class="form-group">
                        <label>研究领域:</label>
                        <input v-model="currentUser.fieldOfStudy" />
                    </div>
                    <div class="form-group inline-label">
                        <label>认证情况:</label>
                        <div class="auth-options">
                            <label>
                                <input type="radio" v-model="currentUser.isAuthenticated" :value="true" />
                                是
                            </label>
                            <label>
                                <input type="radio" v-model="currentUser.isAuthenticated" :value="false" />
                                否
                            </label>
                        </div>
                    </div>
                    <button @click="updateUser">Save</button>
                    <button @click="cancelEdit">Cancel</button>
                </div>
            </div>

            <!-- 删除确认对话框 -->
            <div v-if="showDeleteModal" class="modal-overlay">
                <div class="modal-content">
                    <h2 class="modal-title">确认删除</h2>
                    <p>您确定要删除该用户吗？此操作无法撤销。</p>
                    <button @click="confirmDelete">确定</button>
                    <button @click="cancelDelete">取消</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

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
            useStaticData: true, // 添加用于切换数据源的标志
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
                // ...更多静态用户
            ],
            pageSizeOptions: [10, 20, 30, 50], // 添加分页选项
            jumpPage: 1, // 添加跳转页码
            showDeleteModal: false,
            deleteUserId: null,
        };
    },
    computed: {
        paginatedUsers() {
            const start = (this.page - 1) * this.limit;
            return this.users.slice(start, start + this.limit);
        },
        totalPages() {
            return Math.ceil(this.total / this.limit);
        },
    },
    watch: {
        page() {
            this.fetchUsers();
        },
    },
    methods: {
        fetchUsers() {
            if (this.useStaticData) {
                // 使用静态数据进行测试
                this.users = this.staticUsers;
                this.total = this.staticUsers.length;
            } else {
                axios
                    .get('/api/admin/users', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('admin-jwt-token'),
                        },
                        params: {
                            page: this.page,
                            limit: this.limit,
                            isAuthenticated: this.isAuthenticatedFilter,
                        },
                    })
                    .then((response) => {
                        this.users = response.data.users;
                        this.total = response.data.total;
                        this.limit = response.data.limit;
                        this.page = response.data.page;
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Failed to fetch users.');
                    });
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
            axios
                .post(
                    '/api/admin/users/update',
                    this.currentUser,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('admin-jwt-token'),
                        },
                    }
                )
                .then((response) => {
                    alert(response.data.message);
                    this.fetchUsers();
                    this.cancelEdit();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Failed to update user.');
                });
        },
        deleteUser(userId) {
            this.deleteUserId = userId;
            this.showDeleteModal = true;
        },
        confirmDelete() {
            axios.delete(`/api/admin/users/${this.deleteUserId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-jwt-token'),
                },
            })
            .then((response) => {
                alert('用户已删除。');
                this.fetchUsers();
                this.cancelDelete();
            })
            .catch((error) => {
                console.error(error);
                alert('删除用户失败。');
            });
        },
        cancelDelete() {
            this.showDeleteModal = false;
            this.deleteUserId = null;
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
            }
        },
        nextPage() {
            if (this.page < this.totalPages) {
                this.page++;
            }
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

.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.edit-button:hover {
    background-color: #45a049;
}

.delete-button:hover {
    background-color: #d32f2f;
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
</style>