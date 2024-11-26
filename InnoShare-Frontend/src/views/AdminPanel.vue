<template>
    <div class="admin-panel">
        <header>
            <h1>管理员看板</h1>
        </header>
        <aside>
            <nav>
                <ul>
                    <li><router-link to="/admin/user-review">审核用户认证</router-link></li>
                    <li><router-link to="/admin/user-management">管理用户数据</router-link></li>
                    <li><router-link to="/admin/data-statistics">查看数据统计</router-link></li>
                </ul>
            </nav>
        </aside>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    name: 'AdminPanel'
}
</script>

<style scoped>
.admin-panel {
    display: flex;
    height: 100vh;
}

header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #3f51b5;
    color: #fff;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
}

aside {
    width: 200px;
    background-color: #f5f5f5;
    padding-top: 80px;
    box-sizing: border-box;
}

main {
    flex: 1;
    padding: 20px;
    margin-top: 60px;
    margin-left: 200px;
    box-sizing: border-box;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 10px 0;
}

a {
    text-decoration: none;
    color: #333;
}
</style>