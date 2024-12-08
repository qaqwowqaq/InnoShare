<template>
    <section id="section4" class="mb-8 flex flex-col justify-start items-center w-full">
        <div class="text-left   max-w-screen-md shadow-2xl bg-green-100" style="height: 400px;width: 80%;">
            <div class="flex justify-between mx-auto w-full max-w-screen-lg">
                <div v-for="(subjects, category, index) in categorizedSubjects" :key="category">
                    <div class="flex h-full">
                    <el-card class=" px-12 card-container">

                        <div slot="header" class="text-center">
                            <h2 class="text-xl font-medium">
                                {{ category === 'researchStart'
                                    ? '研究起点'
                                    : category === 'researchSource'
                                        ? '研究来源'
                                        : '研究领域' }}
                            </h2>
                        </div>
                        <el-list class="center-list" style="height:300px;">
                            <el-list-item v-for="subject in subjects" :key="subject.name" class="list-item">
                                <el-link :href="subject.link" target="_blank">{{ subject.name }}</el-link>
                            </el-list-item>
                        </el-list><!-- 添加箭头 -->

                    </el-card>
                    <div v-if="category!=='paper'"  class=" " style=' position: relative; width:0;height:400px;'>

                        <div class="arrow arrow-right">

                        </div></div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</template>

<script setup>
import { ref, computed } from 'vue';

// subjects 数据，包含每个主题的名称和链接
const subjects = ref([
    { name: '人工智能', link: '/subjects/ai' },
    { name: '机器学习', link: '/subjects/ml' },
    { name: '自然语言处理', link: '/subjects/nlp' },
]);

// 去除重复项，并计算每个类别的subjects
const uniqueSubjects = computed(() => {
    const seen = new Set();
    return subjects.value.filter((subject) => {
        if (seen.has(subject.name)) {
            return false;
        }
        seen.add(subject.name);
        return true;
    });
});

// 将主题分配到三个类别（研究起点、研究来源、本文）
const categorizedSubjects = computed(() => {
    const result = {
        researchStart: [],
        researchSource: [],
        paper: [],
    };

    const subjectsArray = Array.from(uniqueSubjects.value);
    const chunkSize = Math.ceil(subjectsArray.length / 3);

    for (let i = 0; i < subjectsArray.length; i += chunkSize) {
        result.researchStart.push(...subjectsArray.slice(i, i + chunkSize));
        if (i + chunkSize < subjectsArray.length) {
            result.researchSource.push(...subjectsArray.slice(i + chunkSize, i + 2 * chunkSize));
        }
        if (i + 2 * chunkSize < subjectsArray.length) {
            result.paper.push(...subjectsArray.slice(i + 2 * chunkSize, i + 3 * chunkSize));
        }
    }

    return result;
});
</script>

<style scoped>
/* 卡片的过渡动画效果 */
.el-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.el-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}



/* 卡片样式 */
.card-container {
    width: 100%;
    /* 使卡片宽度平均分布 */
    transition: transform 0.5s ease-in-out;
}

.card-container:hover {
    transform: scale(1.05);
    /* 鼠标悬停时，卡片略微放大 */
}

/* 水平和垂直居中列表内容 */
.center-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.list-item {
    margin: 10px 0;
    /* 给每个列表项添加一些垂直间距 */
}

/* 箭头的样式 */
.arrow {
    position: absolute;
    top: 50%;
    /* 垂直居中 */
    width: 0;
    height: 25px;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-left: 25px solid rgba(0, 0, 0, 0.9);
    /* 设置箭头颜色 */
    transition: all 0.3s ease-in-out;
    margin-top: -22px;
}



/* 箭头尾巴 */
.arrow::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -60px; /* 调整尾巴的位置 */
    width: 50px; /* 设置尾巴长度 */
    height: 20px; /* 设置尾巴宽度 */
    background-color: rgba(0, 0, 0, 0.9); /* 设置尾巴颜色 */
    transform: translateY(-50%);
    box-shadow: 6px 12px 25px rgba(0, 0, 0, 0.5); /* 给箭头加重阴影并调整透明度 */
}
/* 右侧箭头 */
.arrow-right {
    left: 100%;
    /* 右侧位置 */
    margin-left: 26px;
    /* 调整箭头与卡片之间的距离 */
}

</style>