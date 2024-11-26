<template>
    <div class="user-review">
        <h1>用户认证审核</h1>
        <table>
            <thead>
                <tr>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <button @click="approveUser(user.id)">批准</button>
                        <button @click="rejectUser(user.id)">拒绝</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'UserReview',
    data() {
        return {
            users: [],
        };
    },
    methods: {
        fetchUsers() {
            // 获取待审核的用户列表（这里使用模拟数据）
            this.users = [
                { id: 1, username: 'user1', email: 'user1@example.com' },
                { id: 2, username: 'user2', email: 'user2@example.com' },
            ];
        },
        approveUser(userId) {
            // 执行批准操作
            console.log(`批准用户 ${userId}`);
            // 从列表中移除已处理的用户
            this.users = this.users.filter(user => user.id !== userId);
        },
        rejectUser(userId) {
            // 执行拒绝操作
            console.log(`拒绝用户 ${userId}`);
            // 从列表中移除已处理的用户
            this.users = this.users.filter(user => user.id !== userId);
        },
    },
    mounted() {
        this.fetchUsers();
    },
};
</script>

<style scoped>
.user-review {
    padding: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th,
td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
}
button {
    margin-right: 5px;
}
</style>