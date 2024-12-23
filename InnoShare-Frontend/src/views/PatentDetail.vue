<template>
    <div class="h-screen flex mt-20 ">
        <!-- 左侧固定栏 -->
        <div class="sidebar bg-gray-800 text-white p-4 fixed flex flex-col justify-between "
            style="height: 92%; width: 16%;">
            <!-- 顶部部分 -->
            <div>
                <!-- 研究主题 -->
                <div class="study-subjects text-left">
                    <h3 class="text-2xl font-bold mb-4 text-center">研究主题</h3>
                    <ul class="overflow-y-auto h-80 fixxed custom-scrollbar border border-gray-200 rounded-md p-2 ">
                        <li v-for="subject in subjects" :key="subject.link" class="mb-5 ">
                            <a @click="searchBySubject(subject.name)"
                                class="text-gray-300 hover:text-blue-600 underline">
                                {{ subject.name }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 底部部分 -->
            <div>
                <!-- 操作按钮 -->
                <div class="space-y-3">

                    <button
                        class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-black mb-10 w-full flex justify-between items-center"
                        @click="downloadPDF">
                        <i class="fas fa-download mr-2"></i>
                        打开PDF
                    </button>
                </div>

            </div>
        </div>

        <!-- 右侧内容展示 -->
        <div class="content p-4 bg-white overflow-y-auto" style="height: 92%; padding-left: 16%; width: 100%;">
            <section id="section1" class="mb-8 flex justify-center items-center w-full">
                <div class="flex flex-col w-3/4 shadow-2xl" style="background-color:whitesmoke;">
                    <div class="rounded-lg shadow-md overflow-hidden">
                        <div class="p-4 leading-loose">
                            <h3 class="text-xl font-medium mb-2">{{ patent.title }}</h3>
                            <p class="text-lg text-gray-500 mb-2 text-left">
                                <span class="font-bold">摘要：</span>{{ patent.abstract }}
                            </p>
                            <div class="flex flex-col items-start text-lg text-gray-500 text-left">
                                <div>
                                    <span class="font-bold">代理人：</span>
                                    <span>{{ patent.assignee }}</span>
                                </div>
                                <div>
                                    <span class="font-bold">作者：</span>
                                    <span>{{ patent.author }}</span>
                                </div>
                                <div>
                                    <span class="font-bold">创建日期：</span>
                                    <span>{{ patent.creationDate }}</span>
                                </div>
                                <div>
                                    <span class="font-bold">发布日期：</span>
                                    <span>{{ patent.publicationDate }}</span>
                                </div>

                            </div>
                        </div>

                        <div class="p-4 border-t border-gray-200 flex justify-end">
                            <a :href="patent.resultUrl" target="_blank"
                                class="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer">
                                查看专利详情 <i class="fas fa-external-link-alt ml-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section2" class="mb-8 flex justify-center items-center w-full">
                <div class="flex flex-col w-3/4 shadow-2xl" style="background-color:whitesmoke;">
                    <div class="p-4">
                        <h4 class="text-xl font-medium mb-2">专利时间线</h4>
                        <el-timeline style="max-width: 600px">
                            <el-timeline-item v-for="(entry, index) in patent.timeline" :key="index"
                                :timestamp="formatDate(entry.date)" placement="top" type="primary"
                                class="timeline-item">
                                <el-card class="timeline-card">
                                    <h4>{{ entry.event }}</h4>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from '@/axiosConfig';
import PdfPreview from '@/components/PdfPreview/index.vue';
import { useRoute, useRouter } from 'vue-router';
const pdfUrl = ref();
const searchQuery = ref(''); // your search query value
const selectType = ref('patent'); // or 'patent' based on your logic

const router = useRouter(); // to navigate using the router
const searchBySubject = (subjectName) => {
    router.push({
        path: '/search',
        query: {
            type: selectType.value === 'paper' ? 'achievements' : 'patents',
            query: subjectName,
            subject: subjectName, // pass the clicked subject as a query parameter
            subjectLevel: 1,
            sortBy: '_score',
            order: 'desc',
            page: 0,
        },
    });
};
const patent = ref({
    id: '',
    title: '',
    assignee: '',
    author: '',
    creationDate: '',
    publicationDate: '',
    abstract: '',
    classification: [],
    resultUrl: '',
    pdfUrl: '',
    timeline: [],
});
// 格式化日期函数
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
};
const subjects = ref([]);
const fetchPatent = async (patentId) => {
    try {
        const response = await axiosInstance.get('/academic/patent/get', {
            params: { patentId }
        });
        console.log('获取专利信息成功:', response.data.data);
        const data = response.data.data;

        // 转换时间线数组
        const timeline = [];
        // 如果时间线数组为空，加入默认时间线
        if (data.timeline && data.timeline.length > 0) {
            for (let i = 0; i < data.timeline.length; i += 2) {
                // 每两个元素一组，分别是日期和事件
                const date = data.timeline[i].split('Date: ')[1];  // 提取日期部分
                const event = data.timeline[i + 1].split(' Event: ')[1]; // 提取事件部分
                timeline.push({
                    date,
                    event
                });
            }
        } else {
            // 时间线为空，加入默认时间线项
            timeline.push({
                date: new Date(data.publicationDate).toLocaleDateString('zh-CN'),  // 使用 publicationDate 作为默认时间
                event: "Patent publication"  // 默认事件内容
            });
        }
        console.log('分类:', data.classification[0]);
        // 处理 classification 字段，将分号分隔的字段转为数组并生成 subjects
        const subjects1 = data.classification[0].split(';').map(subject => subject.trim());
        console.log('学科信息:', subjects1);

        subjects.value = subjects1.map(subject => {
            return {
                name: subject,
                link: `/subjects/${subject.toLowerCase().replace(/\s+/g, '-').replace(/\(.*\)/, '')}`
            };
        });

        // 更新 patent 数据
        patent.value = {
            id: data.id,
            title: data.title,
            assignee: data.assignee,
            creationDate: new Date(data.creationDate).toLocaleDateString('zh-CN'),
            publicationDate: new Date(data.publicationDate).toLocaleDateString('zh-CN'),
            abstract: data.abstractText,
            classification: subjects.value,  // 更新为处理后的分类数据
            resultUrl: data.resultUrl,
            pdfUrl: data.pdfUrl,
            author: data.author,
            timeline
        };

        pdfUrl.value = patent.value.pdfUrl;
        console.log('获取专利信息成功:', pdfUrl.value);
        console.log('时间线:', patent.value.timeline);
        console.log('学科信息:', patent.value.classification);
    } catch (error) {
        console.error('获取专利信息失败:', error);
    }
};

const route = useRoute();
const doi = route.params.id;
onMounted(() => {
    const patentId = doi; // 假设这个ID是从路由中获取的
    fetchPatent(patentId);
});

const downloadPDF = () => {
    try {
        const link = document.createElement("a");
        link.href = 'https://patentimages.storage.googleapis.com/88/b7/67/655eedecd8e6f0/AT394924B.pdf';  // 直接提供 PDF 文件 URL
        link.target = '_blank';  // 设置新标签页打开
        document.body.appendChild(link);
        link.click();  // 触发点击，打开新标签页
        document.body.removeChild(link);  // 移除链接
    } catch (error) {
        console.error("下载失败：", error);
    }
};




// 预览窗口
const isPreviewOpen = ref(false);
const loading = ref(false);


const openPreview = () => {
    isPreviewOpen.value = true;
    loading.value = true;
};

const closePreview = () => {
    isPreviewOpen.value = false;
    nextTick(() => {
        if (window.MathJax) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.body]);
        }
    });
};

const onLoaded = () => {
    loading.value = false;
};
</script>

<style scoped>
/* 自定义样式 */
.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.timeline-item {
    text-align: left;
    transition: transform 0.3s ease, opacity 0.3s ease;
    position: relative;
    /* 使每个时间线项相对于其父元素定位 */
    z-index: 0;
}



/* 时间线卡片的背景和阴影效果 */
.timeline-card {

    background-color: #f5f7fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.3s ease;
}

/* 时间线项的缩放和渐显效果 */
.el-timeline-item .el-card {

    opacity: 0;
    animation: fadeIn 0.5s ease-in-out forwards;
}

/* 每个时间点逐渐显现的动画 */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 调整时间线点的样式 */
.el-timeline-item .el-timeline-item__timestamp {
    justify-content: flex-end;
    /* 将时间对齐到右侧 */
    font-size: 14px;
    font-weight: bold;
    color: #1f76ce;
    /* 蓝色 */
    text-align: left;
    /* 将时间对齐到右侧 */
    width: 100%;
    /* 确保占满整个空间 */
    margin-right: 10px;
    /* 给右侧一些间距 */
    z-index: 1;
}

/* 时间线的样式，使竖线连接 */
.el-timeline {
    border-left: 3px solid #2568ac;
    /* 设置左侧竖线的颜色和宽度 */
    position: relative;
}

/* 调整时间线的间距 */
.el-timeline-item {
    margin-bottom: 20px;
    position: relative;
    padding-left: 20px;
    /* 确保时间线条和内容之间有间距 */
}

.el-timeline-item__dot {
    position: absolute;
    left: -10px;
    /* 调整点的位置，使其与时间线条连接 */
    top: 0;
    background-color: #409eff;
    /* 蓝色 */
    border-radius: 50%;
    width: 100px;
    height: 10px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    /* 点的阴影 */
}

.el-timeline-item .el-timeline-item__content {
    padding-left: 20px;
}
</style>