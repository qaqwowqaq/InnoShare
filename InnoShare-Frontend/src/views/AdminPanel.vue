<template>
    <div class="admin-panel">
        <!-- <header> -->
            <!-- <h1>管理员看板</h1> -->
        <!-- </header> -->
        <aside>
            <nav>
                <ul>
                    <li><router-link to="/admin/data-statistics">查看数据统计</router-link></li>
                    <li><router-link to="/admin/user-review">审核用户认证</router-link></li>
                    <li><router-link to="/admin/user-management">管理用户数据</router-link></li>
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap'); /* 引入字体 */

.admin-panel {
    font-family: 'Noto Sans', sans-serif; /* 应用字体 */
    display: flex;
    height: 100vh;
}

header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #4a90e2 !important; /* 更换背景颜色并增加特异性 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important; /* 添加阴影 */
    color: #fff;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    z-index: 1000; /* 添加较高的z-index确保在最上层 */
}

header h1 {
    font-size: 24px; /* 调整标题大小 */
    font-weight: 600; /* 调整标题权重 */
}

aside {
    width: 240px;
    background-color: #f5f5f5;
    padding-top: 80px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 50px;
    position: fixed; /* 改为固定定位 */
    top: 0; /* 从顶部开始 */
    left: 0px; /* 对应原来的margin-left */
    z-index: 500; /* 确保在内容上方但在header下方 */
    height: 100vh; /* 占满整个视口高度 */
}

nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

li {
    margin: 10px 0;
    margin-left: 50px;
    width: 180px;
}

a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s !important; /* 添加过渡效果 */
    letter-spacing: 0.5px; /* 优化字间距 */
    display: block;
    padding: 15px;
    background-color: #e0e0e0;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    transition: background-color 0.3s, box-shadow 0.3s; /* 添加过渡效果 */
}

a:hover {
    /* color: #4a90e2 !important; 悬停时改变文字颜色 */
    font-weight: bold !important; /* 悬停时字体加粗 */
    background-color: #c0c0c0;
}

a.router-link-active:hover {
    background-color: #7fb3d5; /* 保持激活状态背景颜色 */
    color: #fff; /* 保持激活状态文字颜色 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 保持激活状态阴影 */
    font-weight: normal !important; /* 保持激活状态字体 */
}

.router-link-active {
    background-color: #7fb3d5; /* 调整激活状态背景颜色，降低饱和度 */
    color: #fff; /* 激活状态文字颜色 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 激活状态阴影 */
    font-weight: normal !important; /* 移除激活状态下的字体加粗 */
}

main {
    flex: 1;
    padding: 30px !important; /* 增加内边距 */
    margin-top: 60px;
    margin-left: 250px; /* 增加左边距，为固定定位的aside留出空间 */
    box-sizing: border-box;
    line-height: 1.6; /* 优化行高 */
    min-height: calc(100vh - 60px); /* 确保内容区域至少占满剩余视口高度 */
    overflow-y: auto; /* 允许内容区域滚动 */
}

@media (max-width: 768px) {
    .admin-panel {
        flex-direction: column;
    }
    
    aside {
        width: 100%;
        padding: 10px;
        position: static; /* 在移动端取消固定定位 */
        height: auto;
        z-index: 1;
    }
    
    nav ul {
        flex-direction: row;
        justify-content: space-around;
    }
    
    nav ul li {
        margin: 0;
        width: auto;
    }
    
    main {
        margin-left: 0;
        padding: 15px;
    }
}
</style>