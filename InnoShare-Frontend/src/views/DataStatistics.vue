<template>
    <div class="statistic fade-in">
        <div class="statistics-cards">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in statisticsCards" :key="item.label">
                    <el-card 
                        shadow="hover" 
                        class="stat-card"
                        :class="{ 'clickable': item.route }"
                        @click="handleCardClick(item.route)"
                    >
                        <div class="card-content">
                            <div class="card-value">
                                <i :class="item.icon"></i>
                                <span class="card-number">{{ item.value }}</span>
                            </div>
                            <div class="card-label">{{ item.label }}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="chart-container">
                    <div id="active-users-chart" style="width: 100%; height: 400px;"></div>
                    <h3 class="chart-title">过去四周新增用户</h3>
                </div>
                <!-- 添加新的图表容器 -->
                <div class="chart-container">
                    <div id="user-trends-chart" style="width: 100%; height: 300px;"></div>
                    <h3 class="chart-title">新增用户趋势</h3>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="chart-container">
                    <div id="new-users-chart" style="width: 100%; height: 400px;"></div>
                    <h3 class="chart-title">过去四周活跃用户</h3>
                </div>
                <!-- 添加新的图表容器 -->
                <div class="chart-container">
                    <div id="active-users-trends-chart" style="width: 100%; height: 300px;"></div>
                    <h3 class="chart-title">活跃用户趋势</h3>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="chart-container">
                    <div id="papers-patents-chart" style="width: 100%; height: 400px;"></div>
                    <h3 class="chart-title">论文与专利总量</h3>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="chart-container">
                    <div id="browse-download-chart" style="width: 100%; height: 400px;"></div>
                    <h3 class="chart-title">总浏览量与下载量</h3>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'DataStatistics',
    data() {
        return {
            useTestData: true, // 添加测试开关
            stats: {},
            statisticsCards: [],
            papersPercentage: 0,
            patentsPercentage: 0,
        };
    },
    mounted() {
        this.fetchStatistics();
    },
    methods: {
        fetchStatistics() {
            if (this.useTestData) {
                // 使用静态测试数据
                this.stats = {
                    totalUsers: 100,
                    authenticatedUsers: 50,
                    pendingAuthRequests: 10,
                    totalPapers: 5000,
                    totalPatents: 2000,
                    totalBrowse: 80000,
                    totalDownloads: 40000,
                    dailyActiveUsers: 200,
                    weeklyActiveUsers: 1000,
                    monthlyActiveUsers: 5000,
                    dailyNewUsers: 20,
                    weeklyNewUsers: 100,
                    monthlyNewUsers: 500,
                    // 添加最近四周数据
                    recentFourWeeksNewUsers: [
                        { week: "Week 1", new_user_count: 25 },
                        { week: "Week 2", new_user_count: 40 },
                        { week: "Week 3", new_user_count: 35 },
                        { week: "Week 4", new_user_count: 50 }
                    ],
                    recentFourWeeksActiveUsers: [
                        { week: "Week 1", active_user_count: 100 },
                        { week: "Week 2", active_user_count: 50 },
                        { week: "Week 3", active_user_count: 90 },
                        { week: "Week 4", active_user_count: 70 }
                    ]
                };
                this.updateCharts();
            } else {
                this.$axios.get('/api/admin/statistics', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.adminToken}`
                    }
                })
                    .then(response => {
                        this.stats = response.data.data;
                        this.updateCharts();
                    })
                    .catch(() => {
                        this.$message.error("获取统计信息失败！");
                    });
            }
        },
        updateCharts() {
            this.prepareStatisticsCards();
            this.calculatePercentages();
            this.$nextTick(() => {
                this.showActiveUsersChart();
                this.showNewUsersChart();
                this.showBrowseDownloadChart();
                this.showUserTrendsChart();
                this.showActiveUsersTrendsChart(); 
                this.showPapersPatentsChart();
            });
        },
        prepareStatisticsCards() {
            this.statisticsCards = [
                { 
                    label: '总用户数', 
                    value: this.stats.totalUsers, 
                    icon: 'el-icon-user-solid',
                    route: '/admin/user-management'  // 添加路由
                },
                { 
                    label: '认证用户数', 
                    value: this.stats.authenticatedUsers, 
                    icon: 'el-icon-s-custom'
                },
                { 
                    label: '待认证申请数', 
                    value: this.stats.pendingAuthRequests, 
                    icon: 'el-icon-s-claim',
                    route: '/admin/user-review'  // 添加路由
                },
                { 
                    label: '总文献数', 
                    value: this.stats.totalPapers + this.stats.totalPatents, 
                    icon: 'el-icon-document'
                }
            ];
        },
        handleCardClick(route) {
            if (route) {
                this.$router.push(route);
            }
        },
        calculatePercentages() {
            let total = this.stats.totalPapers + this.stats.totalPatents;
            this.papersPercentage = ((this.stats.totalPapers / total) * 100).toFixed(2);
            this.patentsPercentage = ((this.stats.totalPatents / total) * 100).toFixed(2);
        },
        showActiveUsersChart() {
            let chart = echarts.init(document.getElementById('active-users-chart'));
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: this.stats.recentFourWeeksNewUsers.map(item => item.week),
                    axisLabel: {
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '新增用户数'
                },
                series: [{
                    data: this.stats.recentFourWeeksNewUsers.map(item => item.new_user_count),
                    type: 'line',
                    smooth: true,
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        color: '#409EFF'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(64,158,255,0.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(64,158,255,0.1)'
                        }])
                    }
                }]
            };
            chart.setOption(option);
        },
        showNewUsersChart() {
            let chart = echarts.init(document.getElementById('new-users-chart'));
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: this.stats.recentFourWeeksActiveUsers.map(item => item.week),
                    axisLabel: {
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '活跃用户数'
                },
                series: [{
                    data: this.stats.recentFourWeeksActiveUsers.map(item => item.active_user_count),
                    type: 'line',
                    smooth: true,
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        color: '#67C23A'  // 使用绿色区分新增用户图表
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(103,194,58,0.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(103,194,58,0.1)'
                        }])
                    }
                }]
            };
            chart.setOption(option);
        },
        showBrowseDownloadChart() {
            let chart = echarts.init(document.getElementById('browse-download-chart'));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '0%'
                },
                series: [{
                    name: '访问统计',
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{total|' + (this.stats.totalBrowse + this.stats.totalDownloads) + '}\n{name|总量}',
                        rich: {
                            total: {
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: '#606266'
                            },
                            name: {
                                fontSize: 14,
                                color: '#909399',
                                padding: [4, 0]
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        { 
                            value: this.stats.totalBrowse, 
                            name: '总浏览量',
                            itemStyle: { color: '#67C23A' }
                        },
                        { 
                            value: this.stats.totalDownloads, 
                            name: '总下载量',
                            itemStyle: { color: '#409EFF' }
                        }
                    ]
                }]
            };
            chart.setOption(option);
        },
        // 添加新的图表方法
        showUserTrendsChart() {
            let chart = echarts.init(document.getElementById('user-trends-chart'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['日新增', '周新增', '月新增'],
                    axisLabel: {
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '用户数'
                },
                series: [{
                    data: [
                        this.stats.dailyNewUsers,
                        this.stats.weeklyNewUsers,
                        this.stats.monthlyNewUsers
                    ],
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#bed7f4' },    // 更浅的蓝色开始
                            { offset: 0.5, color: '#89b9f1' },  // 中间过渡色
                            { offset: 1, color: '#6ca6ed' }     // 更柔和的蓝色结束
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#89b9f1' },
                                { offset: 0.7, color: '#6ca6ed' },
                                { offset: 1, color: '#bed7f4' }
                            ])
                        }
                    },
                    label: {
                        show: true,
                        position: 'top'
                    }
                }]
            };
            chart.setOption(option);
        },
        // 添加新的活跃用户趋势图表方法
        showActiveUsersTrendsChart() {
            let chart = echarts.init(document.getElementById('active-users-trends-chart'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['日活跃', '周活跃', '月活跃'],
                    axisLabel: {
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '用户数'
                },
                series: [{
                    data: [
                        this.stats.dailyActiveUsers,
                        this.stats.weeklyActiveUsers,
                        this.stats.monthlyActiveUsers
                    ],
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#95e1d3' },    // 柔和的青绿色开始
                            { offset: 0.5, color: '#81c8bc' },  // 中间过渡色
                            { offset: 1, color: '#68b7a8' }     // 柔和的绿色结束
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#81c8bc' },
                                { offset: 0.7, color: '#68b7a8' },
                                { offset: 1, color: '#95e1d3' }
                            ])
                        }
                    },
                    label: {
                        show: true,
                        position: 'top'
                    }
                }]
            };
            chart.setOption(option);
        },
        showPapersPatentsChart() {
            let chart = echarts.init(document.getElementById('papers-patents-chart'));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '0%'
                },
                series: [{
                    type: 'pie',
                    radius: ['40%', '65%'],  // 调整半径
                    center: ['50%', '50%'],   // 调整中心点位置
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{total|' + (this.stats.totalPapers + this.stats.totalPatents) + '}\n{name|总量}',
                        rich: {
                            total: {
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: '#606266'
                            },
                            name: {
                                fontSize: 14,
                                color: '#909399',
                                padding: [4, 0]
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        { 
                            value: this.stats.totalPapers, 
                            name: '论文',
                            itemStyle: { color: '#67C23A' }
                        },
                        { 
                            value: this.stats.totalPatents, 
                            name: '专利',
                            itemStyle: { color: '#409EFF' }
                        }
                    ]
                }]
            };
            chart.setOption(option);
        },
    },
};
</script>

<style scoped>
.statistic {
    padding: 20px;
    text-align: center;
    margin-top: 0; /* 移除顶部边距，因为header已经提供了空间 */
    padding-top: 30px; /* 添加内边距代替边距 */
    margin-left: 0; /* 移除左边距，因为main已经提供了正确的缩进 */
    margin-right: 0; /* 移除右边距 */
    position: relative; /* 添加相对定位 */
    z-index: 1; /* 确保在header和aside下方 */
    border-radius: 8px;
    /* 圆角 */
    font-size: 14px;
}

@media (max-width: 768px) {
    .statistic {
        margin-top: 20px; /* 在移动端添加一些顶部间距 */
        padding: 10px;
        font-size: 12px;
    }

    .info-detail p {
        font-size: 12px;
    }
}

.statistics-cards {
    margin-bottom: 50px;
}

.statistics-cards .stat-card {
    background: linear-gradient(135deg, #409EFF 0%, #36D1DC 100%);
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    transform: scale(1);  /* 添加初始缩放值 */
    transition: all 0.5s ease;
    overflow: hidden;
    position: relative;
    animation: cardAppear 0.6s ease forwards;
    opacity: 0;
    transform-origin: center center;
}

@keyframes cardAppear {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.statistics-cards .stat-card:hover {
    transform: scale(1.02);  /* 改为与图表容器相同的放大比例 */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);  /* 统一阴影效果 */
}

.statistics-cards .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    z-index: 1;
}

.statistics-cards .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: white;
    position: relative;
    z-index: 2;
}

.statistics-cards .card-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
}

.statistics-cards .card-content i {
    font-size: 36px;
    color: white;
    margin-bottom: 10px;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.statistics-cards .stat-card:hover .card-content i {
    transform: scale(1.1);
}

.statistics-cards .card-number {
    font-size: 36px;
    font-weight: 600;
    margin: 10px 0;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.1);
}

.statistics-cards .card-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin-top: auto;
    font-weight: 500;
    letter-spacing: 0.5px;
}

/* 为每个卡片设置不同的渐变色 */
.statistics-cards .el-col:nth-child(1) .stat-card {
    background: linear-gradient(135deg, #36D1DC 0%, #5B86E5 100%);
    animation-delay: 0.1s;
}

.statistics-cards .el-col:nth-child(2) .stat-card {
    background: linear-gradient(135deg, #FF9966 0%, #FF5E62 100%);
    animation-delay: 0.2s;
}

/* 修改第3和第4个卡片的渐变色，降低饱和度 */
.statistics-cards .el-col:nth-child(3) .stat-card {
    background: linear-gradient(135deg, #67B26F 0%, #4ca2cd 100%);
    animation-delay: 0.3s;
}

/* 修改第4个卡片（总论文数）的渐变色为更柔和的蓝紫色调 */
.statistics-cards .el-col:nth-child(4) .stat-card {
    background: linear-gradient(135deg, #7F7FD5 0%, #86A8E7 100%);
    animation-delay: 0.4s;
}

.statistics-cards .stat-card.clickable {
    cursor: pointer;
}

.statistics-cards .stat-card.clickable:hover {
    transform: scale(1.02) translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.chart-container {
    margin-bottom: 30px;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    transform: scale(1);
    transition: all 0.3s ease;
    transform-origin: center center;
    cursor: pointer; /* 添加鼠标指针样式 */
}

/* 添加悬停效果 */
.chart-container:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 1; /* 确保悬停时在其他图表之上 */
}

.chart-title {
    margin-top: 0;  /* 修改这里：添加一个较小的上边距 */
    margin-bottom: 0;  /* 确保下边距为0 */
    padding: 0;        /* 移除内边距 */
    color: #303133;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 1px;
    line-height: 1.4; /* 添加行高控制 */
}

.progress-container {
    margin-bottom: 15px;
}

.papers-patents {
    margin: 20px 0;
}

/* 添加页面淡入动画 */
.fade-in {
    animation: fadeInPage 1s ease-out; /* 修改为 0.8s 以保持一致 */
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