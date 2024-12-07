<template>
    <div class="statistic">
        <div class="div-info">
            <div class="left title">
                <span>
                    <i class="el-icon-coin"></i>
                    &nbsp;&nbsp;信息概况
                </span>
            </div>
            <div class="info-detail left">
                <p>注册用户数：&emsp;{{ stats.totalUsers }}</p>
                <p>认证用户数：&emsp;{{ stats.authenticatedUsers }}</p>
                <p>学术成果数：&emsp;&emsp;{{ stats.totalAchievements }}</p>
                <p>待认证申请数：&emsp;{{ stats.pendingAuthRequests }}</p>
                <p>总下载量：&emsp;&emsp;{{ stats.totalDownloads }}</p>
            </div>
        </div>
        <el-divider></el-divider>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="div-time">
                    <div class="left">
                        <span class="title">
                            <i class="el-icon-odometer"></i>
                            &nbsp;&nbsp;<el-tooltip class="item" effect="light" content="近一百次请求的平均响应时间" placement="top">
                                <span>平均响应时间</span>
                            </el-tooltip>
                        </span>
                    </div>
                    <div id="time-chart" style="width: 100%; height: 400px;"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="div-active">
                    <div class="left">
                        <span class="title">
                            <i class="el-icon-data-line"></i>
                            &nbsp;&nbsp;<el-tooltip class="item" effect="light" content="每天的请求次数" placement="top">
                                <span>平台活跃指数</span>
                            </el-tooltip>
                        </span>
                    </div>
                    <div id="active-chart" style="width: 100%; height: 400px;"></div>
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
            stats: {
                totalUsers: 100,
                authenticatedUsers: 3513413441,
                totalAchievements: 0,
                pendingAuthRequests: 0,
                totalDownloads: 0,
                responseTime: 0,
                activeIndex: [],
            },
        };
    },
    mounted() {
        // this.fetchStatistics();
    },
    methods: {
        fetchStatistics() {
            this.$axios.get('/api/admin/statistics', {
                headers: {
                    Authorization: `Bearer ${this.$store.state.adminToken}`
                }
            })
            .then(response => {
                this.stats = response.data;
                // 绘制图表
                this.$nextTick(() => {
                    this.showTimeChart();
                    this.showActiveChart();
                });
            })
            .catch(() => {
                this.$message.error("获取统计信息失败！");
            });
        },
        showTimeChart() {
            let timeChart = echarts.init(document.getElementById('time-chart'));
            let option = {
                series: [
                    {
                        type: 'gauge',
                        min: 0,
                        max: 500,
                        detail: {
                            formatter: '{value} ms',
                        },
                        data: [{ value: this.stats.responseTime }],
                    },
                ],
            };
            timeChart.setOption(option);
        },
        showActiveChart() {
            let activeChart = echarts.init(document.getElementById('active-chart'));
            let option = {
                xAxis: {
                    type: 'category',
                    data: this.stats.activeIndex.map(item => item.date),
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        type: 'line',
                        data: this.stats.activeIndex.map(item => item.value),
                        areaStyle: {},
                    },
                ],
            };
            activeChart.setOption(option);
        },
    },
};
</script>

<style scoped>
.statistic {
    font-size: 14px;
}

@media (max-width: 768px) {
    .statistic {
        padding: 10px;
        font-size: 12px;
    }
    .info-detail p {
        font-size: 12px;
    }
}

.statistic .title {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 20px;
}
.statistic .left {
    text-align: left;
}
.info-detail {
    margin-left: 40px;
    margin-bottom: 20px;
}
</style>