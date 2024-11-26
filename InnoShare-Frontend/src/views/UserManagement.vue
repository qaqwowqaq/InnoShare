<template>
    <div class="user-review">
        <h1>用户信息管理</h1>
        <el-table :data="users" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"/>
            <el-table-column prop="name" label="Name"/>
            <el-table-column prop="email" label="Email"/>
            <el-table-column prop="role" label="Role"/>
            <el-table-column label="Actions" width="180">
                <template #default="scope">
                    <el-button size="mini" @click="editUser(scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" title="Edit User">
            <el-form :model="form">
                <el-form-item label="Name">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="form.email"/>
                </el-form-item>
                <el-form-item label="Role">
                    <el-input v-model="form.role"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserReview',
    data() {
        return {
            users: [],
            dialogVisible: false,
            form: {
                id: null,
                name: '',
                email: '',
                role: ''
            }
        };
    },
    methods: {
        fetchUsers() {
            // Fetch user data from API
            // Example: axios.get('/api/users').then(response => {
            //   this.users = response.data;
            // });
        },
        editUser(user) {
            this.form = { ...user };
            this.dialogVisible = true;
        },
        deleteUser(user) {
            // Delete user API call
            // Example: axios.delete(`/api/users/${user.id}`).then(() => {
            //   this.fetchUsers();
            // });
        },
        submitForm() {
            // Update user API call
            // Example: axios.put(`/api/users/${this.form.id}`, this.form).then(() => {
            //   this.dialogVisible = false;
            //   this.fetchUsers();
            // });
        }
    },
    created() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
.user-review {
    padding: 20px;
}
</style>