<template>
    <VuePdfApp :page-scale="pageScale" :theme="theme" :style="`width: ${viewerWidth}; height: ${viewerHeight};`"
      :pdf="src" :fileName="fileName" @pages-rendered="pagesRendered" v-bind="$attrs" :config="config"></VuePdfApp>
  </template>
   
   
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import VuePdfApp from 'vue3-pdf-app'
  import 'vue3-pdf-app/dist/icons/main.css'
   
  // 工具栏配置项
  const config = ref({
    // 右侧其他区工具
    sidebar: {
      viewThumbnail: true,//启用缩略图视图
      viewOutline: true,//启用大纲视图
      viewAttachments: false,//启用附件视图
    },
    secondaryToolbar: {
      secondaryPresentationMode: true,//启用演示模式
      secondaryOpenFile: true, //启用打开文件功能
      secondaryPrint: true,//启用打印功能
      secondaryDownload: true,//启用下载功能
      secondaryViewBookmark: true,//启用书签视图
      firstPage: false,//启用跳转到第一页
      lastPage: false,//启用跳转到最后一页
      pageRotateCw: true,//启用顺时针旋转页面
      pageRotateCcw: true,//启用逆时针旋转页面
      cursorSelectTool: false,//启用选择工具
      cursorHandTool: false,//启用手形工具
      scrollVertical: false,//启用垂直滚动
      scrollHorizontal: false,//启用水平滚动
      scrollWrapped: false,//启用包裹滚动
      spreadNone: false,//启用无跨页模式
      spreadOdd: false,// 启用奇数页跨页模式
      spreadEven: false,//启用偶数页跨页模式
      documentProperties: false,//启用文档属性查看
    },
    // 配置左侧工具栏
    toolbar: {
      toolbarViewerLeft: {
        findbar: false,//启用查找条
        previous: true,// 启用上一页按钮
        next: true,//启用下一页按钮
        pageNumber: true,// 启用页码显示
      },
      //  配置右侧工具栏
      toolbarViewerRight: {
        presentationMode: true,//启用演示模式
        openFile: false,//启用打开文件功能
        print: true,//启用打印功能
        download: true,// 启用下载功能
        viewBookmark: false,// 启用书签视图
      },
      // 配置中间工具栏
      toolbarViewerMiddle: {
        zoomOut: true,// 启用缩小功能
        zoomIn: true,//启用放大功能。
        scaleSelectContainer: false,//启用缩放选择容器功能
      },
    },
    errorWrapper: true,//启用错误包装，这可能用于显示错误信息或处理错误情况。
  })
   
  interface Props {
    src: string | ArrayBuffer // pdf地址
    width?: string | number // 预览容器宽度
    height?: string | number // 预览容器高度
    pageScale?: number | string // 页面默认缩放规则，可选 'page-actual'|'page-width'|'page-height'|'page-fit'|'auto'
    theme?: string // 预览主题 可选 dark | light
    fileName?: string // 覆盖pdf文件名
  }
   
  const props = withDefaults(defineProps<Props>(), {
    src: '',
    width: '100%',
    height: '100%',
    pageScale: 'page-fit', // 默认自适应展示一页
    theme: 'dark',
    fileName: ''
  })
  const viewerWidth = computed(() => {
    if (typeof props.width === 'number') {
      return props.width + 'px'
    } else {
      return props.width
    }
  })
  const viewerHeight = computed(() => {
    if (typeof props.height === 'number') {
      return props.height + 'px'
    } else {
      return props.height
    }
  })
  // emitted only once when Pdfjs library is binded to vue component
  // Can be used to set Pdfjs config before pdf document opening.
  // function afterCreated (pdfApp: any) {
  //   console.log('afterCreated pdfApp:', pdfApp)
  // }
  // emitted when pdf is opened but pages are not rendered
  // function openHandler (pdfApp: any) {
  //   console.log('open pdfApp:', pdfApp)
  // }
  const emit = defineEmits(['loaded'])
  // emitted when pdf document pages are rendered. Can be used to set default pages scale
  function pagesRendered(pdfApp: any) {
    // console.log('pdfApp页码渲染完成:', pdfApp)
    emit('loaded', pdfApp)
  }
  </script>
   
   
   
  <style lang="less" scoped>
  @themeColor: #1677FF;
   
  :deep(*) {
    box-sizing: content-box;
  }
   
  // 定制化主题色
  .pdf-app.dark {
    --pdf-app-background-color: rgb(83, 86, 89, 0);
    --pdf-sidebar-content-color: rgb(51, 54, 57);
    --pdf-toolbar-sidebar-color: #24364e;
    --pdf-toolbar-color: rgb(50, 54, 57);
    --pdf-loading-bar-color: #606c88;
    --pdf-loading-bar-secondary-color: @themeColor;
    --pdf-find-results-count-color: #d9d9d9;
    --pdf-find-results-count-font-color: #525252;
    --pdf-find-message-font-color: #a6b7d0;
    --pdf-not-found-color: #f66;
    --pdf-split-toolbar-button-separator-color: #fff;
    --pdf-toolbar-font-color: #d9d9d9;
    --pdf-button-hover-font-color: @themeColor;
    --pdf-button-toggled-color: #606c88;
    --pdf-horizontal-toolbar-separator-color: #fff;
    --pdf-input-color: #606c88;
    --pdf-input-font-color: #d9d9d9;
    --pdf-find-input-placeholder-font-color: @themeColor;
    --pdf-thumbnail-selection-ring-color: hsla(0, 0%, 100%, .15);
    --pdf-thumbnail-selection-ring-selected-color: rgb(147, 179, 242);
    --pdf-error-wrapper-color: #f55;
    --pdf-error-more-info-color: #d9d9d9;
    --pdf-error-more-info-font-color: #000;
    --pdf-overlay-container-color: rgba(0, 0, 0, .2);
    --pdf-overlay-container-dialog-color: #24364e;
    --pdf-overlay-container-dialog-font-color: #d9d9d9;
    --pdf-overlay-container-dialog-separator-color: #fff;
    --pdf-dialog-button-font-color: #d9d9d9;
    --pdf-dialog-button-color: #606c88;
   
    :deep(.thumbnail.selected>.thumbnailSelectionRing) {
      background-color: rgb(147, 179, 242);
    }
  }
   
  .pdf-app.light {
    --pdf-app-background-color: rgb(245, 245, 245);
    --pdf-sidebar-content-color: rgb(245, 245, 245);
    --pdf-toolbar-sidebar-color: rgb(190, 190, 190);
    --pdf-toolbar-color: rgb(225, 225, 225);
    --pdf-loading-bar-color: #3f4b5b;
    --pdf-loading-bar-secondary-color: #666;
    --pdf-find-results-count-color: #3f4b5b;
    --pdf-find-results-count-font-color: hsla(0, 0%, 100%, .87);
    --pdf-find-message-font-color: hsla(0, 0%, 100%, .87);
    --pdf-not-found-color: brown;
    --pdf-split-toolbar-button-separator-color: #000;
    --pdf-toolbar-font-color: rgb(142, 142, 142);
    --pdf-button-hover-font-color: #666;
    --pdf-button-toggled-color: #3f4b5b;
    --pdf-horizontal-toolbar-separator-color: #000;
    --pdf-input-color: #3f4b5b;
    --pdf-input-font-color: #d9d9d9;
    --pdf-find-input-placeholder-font-color: #666;
    --pdf-thumbnail-selection-ring-color: hsla(208, 7%, 46%, .7);
    --pdf-thumbnail-selection-ring-selected-color: #3f4b5b;
    --pdf-error-wrapper-color: #f55;
    --pdf-error-more-info-color: #d9d9d9;
    --pdf-error-more-info-font-color: #000;
    --pdf-overlay-container-color: hsla(208, 7%, 46%, .7);
    --pdf-overlay-container-dialog-color: #6c757d;
    --pdf-overlay-container-dialog-font-color: #d9d9d9;
    --pdf-overlay-container-dialog-separator-color: #000;
    --pdf-dialog-button-font-color: #d9d9d9;
    --pdf-dialog-button-color: #3f4b5b;
   
    :deep(.thumbnail.selected>.thumbnailSelectionRing) {
      background-color: rgb(105, 105, 105);
    }
  }
  </style>